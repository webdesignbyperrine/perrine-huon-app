/**
 * Générateur de passes Apple Wallet (.pkpass) — Perrine Huon
 *
 * Design :
 *   - Strip image : logo "WEB DESIGN perrinehuon.com" (fond blanc) en haut
 *   - Fond de carte : beige kraft #D4C4A8
 *   - Recto uniquement (pas de backFields) — tout est visible immédiatement
 *   - Liens cliquables : perrinehuon.com + LinkedIn
 *   - Tags spécialités en auxiliaryField
 *   - Pas de QR code (inutile sur smartphone)
 *
 * Variables d'environnement requises :
 *   APPLE_TEAM_ID          — ex: A1B2C3D4E5
 *   APPLE_PASS_TYPE_ID     — ex: pass.com.perrinehuon.businesscard
 *   APPLE_CERT_P12_BASE64  — certificat .p12 en base64
 *   APPLE_CERT_P12_PASS    — mot de passe du .p12
 *   APPLE_WWDR_CERT_PEM    — certificat WWDR G4 (PEM)
 */
import JSZip from 'jszip';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { solidColorPNG } from './png';

const SITE_URL = 'https://www.perrinehuon.com';

// Couleurs site Perrine Huon
const COLORS = {
  white:     [255, 255, 255] as [number, number, number],
  beige:     [212, 196, 168] as [number, number, number], // #D4C4A8
  blue:      [43,  91,  138] as [number, number, number], // #2B5B8A
  blueLight: [74,  122, 168] as [number, number, number], // #4A7AA8
  pink:      [222, 51,  122] as [number, number, number], // #DE337A
};

/** Charge le logo depuis /public/images/wallet/logo-strip.png */
function loadLogoStrip(): Buffer {
  try {
    const filePath = path.join(process.cwd(), 'public', 'images', 'wallet', 'logo-strip.png');
    return fs.readFileSync(filePath);
  } catch {
    return solidColorPNG(375, 100, ...COLORS.white);
  }
}

/** Données du pass Apple Wallet */
function buildPassJson(teamId: string, passTypeId: string): object {
  return {
    formatVersion: 1,
    passTypeIdentifier: passTypeId,
    serialNumber: 'PH-2026-001',
    teamIdentifier: teamId,
    organizationName: 'Perrine Huon',
    description: 'Carte de contact — Perrine Huon Web Design',
    logoText: '',
    foregroundColor: `rgb(${COLORS.blue.join(', ')})`,
    backgroundColor: `rgb(${COLORS.beige.join(', ')})`,
    labelColor:      `rgb(${COLORS.blueLight.join(', ')})`,

    generic: {
      headerFields: [],

      primaryFields: [
        {
          key: 'name',
          label: '',
          value: 'Perrine Huon',
          textAlignment: 'PKTextAlignmentLeft',
        },
      ],

      secondaryFields: [
        {
          key: 'website',
          label: 'SITE WEB',
          value: 'perrinehuon.com',
          attributedValue: `<a href='${SITE_URL}'>perrinehuon.com</a>`,
        },
        {
          key: 'linkedin',
          label: 'LINKEDIN',
          value: 'linkedin.com/in/perrinehuon',
          attributedValue:
            "<a href='https://www.linkedin.com/in/perrinehuon/'>linkedin.com/in/perrinehuon</a>",
        },
      ],

      auxiliaryFields: [
        {
          key: 'tags',
          label: 'SPÉCIALITÉS',
          value: 'Sites web  ·  Référencement Google & IA  ·  Logiciel de gestion',
        },
      ],

      // Pas de backFields — tout est visible sur le recto
    },

    // Pas de barcodes — lien cliquable préféré sur smartphone
  };
}

/** Hash SHA1 */
function sha1hex(data: Buffer): string {
  return crypto.createHash('sha1').update(data).digest('hex');
}

/** Signature PKCS7 via node-forge */
async function signManifest(
  manifestContent: string,
  certP12Base64: string,
  certPassword: string,
  wwdrPem: string
): Promise<Buffer> {
  const forge = await import('node-forge');

  const p12Der    = forge.util.decode64(certP12Base64);
  const p12Asn1   = forge.asn1.fromDer(p12Der);
  const p12       = forge.pkcs12.pkcs12FromAsn1(p12Asn1, certPassword);

  const keyBags  = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });

  const privateKey = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag]?.[0]?.key;
  const signerCert = certBags[forge.pki.oids.certBag]?.[0]?.cert;
  const wwdrCert   = forge.pki.certificateFromPem(wwdrPem);

  if (!privateKey || !signerCert) {
    throw new Error('Impossible de lire la clé privée ou le certificat depuis le fichier P12.');
  }

  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifestContent, 'utf8');
  p7.addCertificate(signerCert);
  p7.addCertificate(wwdrCert);
  p7.addSigner({
    key: privateKey,
    certificate: signerCert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime },
    ],
  });
  p7.sign({ detached: true });

  return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary');
}

/** Génère le fichier .pkpass et retourne un Buffer */
export async function generateApplePass(): Promise<Buffer> {
  const teamId     = process.env.APPLE_TEAM_ID        ?? 'PLACEHOLDER_TEAM_ID';
  const passTypeId = process.env.APPLE_PASS_TYPE_ID   ?? 'pass.com.perrinehuon.businesscard';

  // === Images ===
  const stripData = loadLogoStrip(); // logo sur fond blanc, pleine largeur

  // Icon : bleu (notifications iOS)
  const iconSmall  = solidColorPNG(29,  29,  ...COLORS.blue);
  const iconMedium = solidColorPNG(58,  58,  ...COLORS.blue);
  const iconLarge  = solidColorPNG(87,  87,  ...COLORS.blue);

  // Logo (haut-gauche) : blanc transparent pour ne pas déborder
  const logoImg    = solidColorPNG(160, 50,  ...COLORS.beige);
  const logoImg2x  = solidColorPNG(320, 100, ...COLORS.beige);

  // Thumbnail (notifications)
  const thumbnailImg   = solidColorPNG(90,  90,  ...COLORS.blue);
  const thumbnailImg2x = solidColorPNG(180, 180, ...COLORS.blue);

  // === pass.json ===
  const passData = buildPassJson(teamId, passTypeId);
  const passJson = Buffer.from(JSON.stringify(passData, null, 2), 'utf-8');

  // === Manifest ===
  const files: Record<string, Buffer> = {
    'pass.json':        passJson,
    'icon.png':         iconSmall,
    'icon@2x.png':      iconMedium,
    'icon@3x.png':      iconLarge,
    'logo.png':         logoImg,
    'logo@2x.png':      logoImg2x,
    'thumbnail.png':    thumbnailImg,
    'thumbnail@2x.png': thumbnailImg2x,
    'strip.png':        stripData,
    'strip@2x.png':     stripData,
  };

  const manifest: Record<string, string> = {};
  for (const [name, data] of Object.entries(files)) {
    manifest[name] = sha1hex(data);
  }
  const manifestJson = Buffer.from(JSON.stringify(manifest), 'utf-8');

  // === ZIP ===
  const zip = new JSZip();
  for (const [name, data] of Object.entries(files)) {
    zip.file(name, data);
  }
  zip.file('manifest.json', manifestJson);

  // === Signature ===
  const certP12 = process.env.APPLE_CERT_P12_BASE64;
  const certPass = process.env.APPLE_CERT_P12_PASS ?? '';
  const wwdrPem  = process.env.APPLE_WWDR_CERT_PEM;

  if (certP12 && wwdrPem) {
    const signature = await signManifest(
      manifestJson.toString('utf-8'),
      certP12,
      certPass,
      wwdrPem
    );
    zip.file('signature', signature);
  } else {
    zip.file('signature', Buffer.from('PLACEHOLDER_SIGNATURE_SET_ENV_VARS'));
  }

  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
