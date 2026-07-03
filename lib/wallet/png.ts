/**
 * Encodeur PNG minimal — pur Node.js (pas de dépendances externes)
 * Génère des images PNG uni-couleur pour les passes Apple Wallet.
 */
import { deflateRawSync } from 'zlib';

function makeCRCTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const CRC_TABLE = makeCRCTable();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buf) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBytes = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0);
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

/**
 * Génère un PNG uni-couleur RGB aux dimensions données.
 * Retourne un Buffer prêt à être écrit ou inclus dans un ZIP.
 */
export function solidColorPNG(
  width: number,
  height: number,
  r: number,
  g: number,
  b: number
): Buffer {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // color type: RGB
  ihdrData[10] = 0; // compression: deflate
  ihdrData[11] = 0; // filter: adaptive
  ihdrData[12] = 0; // interlace: none

  // Build raw image data: for each row: filter byte (0=None) + RGB per pixel
  const row = Buffer.alloc(1 + width * 3);
  row[0] = 0; // filter: None
  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = r;
    row[2 + x * 3] = g;
    row[3 + x * 3] = b;
  }
  const rows: Buffer[] = [];
  for (let y = 0; y < height; y++) rows.push(row);
  const rawPixels = Buffer.concat(rows);
  const compressed = deflateRawSync(rawPixels, { level: 6 });

  // IEND chunk
  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdrData),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * Génère un PNG deux couleurs (fond + bande colorée) pour le strip Apple Wallet.
 * La bande occupe le tiers supérieur de l'image.
 */
export function stripPNG(
  width: number,
  height: number,
  bgR: number, bgG: number, bgB: number,
  accentR: number, accentG: number, accentB: number
): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2;

  const accentHeight = Math.floor(height / 3);
  const rawRows: Buffer[] = [];
  for (let y = 0; y < height; y++) {
    const isAccent = y < accentHeight;
    const row = Buffer.alloc(1 + width * 3);
    row[0] = 0;
    for (let x = 0; x < width; x++) {
      row[1 + x * 3] = isAccent ? accentR : bgR;
      row[2 + x * 3] = isAccent ? accentG : bgG;
      row[3 + x * 3] = isAccent ? accentB : bgB;
    }
    rawRows.push(row);
  }

  const rawPixels = Buffer.concat(rawRows);
  const compressed = deflateRawSync(rawPixels, { level: 6 });

  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdrData),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}
