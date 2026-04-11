/**
 * Optimiseur d'images côté client — Convertit et compresse les images pour le web.
 * - Conversion en WebP (si supporté par le navigateur)
 * - Compression automatique avec qualité configurable
 * - Redimensionnement proportionnel
 *
 * IMPORTANT: Ce module doit être utilisé exclusivement côté client (composants 'use client').
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  /** Qualité de compression entre 0 et 1 (défaut : 0.85). */
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Optimise une image pour le web en la redimensionnant et en la compressant.
 * @param file - Fichier image source.
 * @param options - Options d'optimisation (dimensions, qualité, format).
 * @returns Fichier optimisé. Retourne l'original si exécuté hors navigateur.
 * @throws Error si le contexte canvas n'est pas disponible ou si le chargement échoue.
 */
export async function optimizeImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> {
  if (typeof window === 'undefined') return file;

  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.85,
    format = 'webp',
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Canvas context non disponible'));
      return;
    }

    img.onload = () => {
      URL.revokeObjectURL(img.src);

      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = `image/${format}`;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Échec de conversion de l\'image'));
            return;
          }

          const originalName = file.name.split('.')[0];
          const extension = format === 'webp' ? 'webp' : format === 'jpeg' ? 'jpg' : 'png';
          const optimizedFile = new File(
            [blob],
            `${originalName}-optimized.${extension}`,
            { type: mimeType }
          );

          resolve(optimizedFile);
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Échec du chargement de l\'image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Vérifie si le format WebP est supporté par le navigateur courant.
 * @returns `true` si WebP est supporté, `false` sinon ou hors navigateur.
 */
export function isWebPSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

/**
 * Retourne le meilleur format d'image selon le support navigateur.
 * Doit être appelé uniquement côté client.
 * @returns 'webp' si supporté, sinon 'jpeg'.
 */
export function getBestFormat(): 'webp' | 'jpeg' {
  return isWebPSupported() ? 'webp' : 'jpeg';
}

/**
 * Présets d'optimisation prédéfinis.
 * Note : `getBestFormat()` est évalué au moment de l'appel à `optimizeImageWithPreset`,
 * pas à l'initialisation du module, pour éviter une exécution côté serveur.
 */
const PRESET_CONFIGS: Record<string, Omit<ImageOptimizationOptions, 'format'>> = {
  logo:      { maxWidth: 500,  maxHeight: 500,  quality: 0.9  },
  avatar:    { maxWidth: 400,  maxHeight: 400,  quality: 0.85 },
  cover:     { maxWidth: 1920, maxHeight: 1080, quality: 0.85 },
  gallery:   { maxWidth: 1600, maxHeight: 1200, quality: 0.82 },
  content:   { maxWidth: 1200, maxHeight: 1200, quality: 0.8  },
  thumbnail: { maxWidth: 600,  maxHeight: 400,  quality: 0.75 },
};

export type OptimizationPreset = keyof typeof PRESET_CONFIGS;

/**
 * Optimise une image avec un preset nommé.
 * Le format WebP/JPEG est détecté dynamiquement au moment de l'appel.
 * @param file - Fichier image source.
 * @param preset - Nom du preset : 'logo', 'avatar', 'cover', 'gallery', 'content', 'thumbnail'.
 * @returns Fichier optimisé.
 */
export function optimizeImageWithPreset(file: File, preset: OptimizationPreset): Promise<File> {
  const config = PRESET_CONFIGS[preset];
  return optimizeImage(file, { ...config, format: getBestFormat() });
}
