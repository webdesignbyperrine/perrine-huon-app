/**
 * Optimiseur d'images - Convertit et compresse les images pour le web
 * - Conversion en WebP (si supporté)
 * - Compression automatique
 * - Redimensionnement intelligent
 * - Optimisation de la taille fichier
 * 
 * IMPORTANT: Ce module doit être utilisé côté client uniquement (composants 'use client')
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Optimise une image pour le web
 * @param file - Fichier image à optimiser
 * @param options - Options d'optimisation
 * @returns Promise<File> - Fichier optimisé
 */
export async function optimizeImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> {
  // Vérification côté client
  if (typeof window === 'undefined') {
    console.warn('Image optimization is only available on client side');
    return file;
  }

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
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      // Calculer les nouvelles dimensions en gardant le ratio
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Configurer le canvas
      canvas.width = width;
      canvas.height = height;

      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir en blob avec le format souhaité
      const mimeType = `image/${format}`;
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Image conversion failed'));
            return;
          }

          // Créer un nouveau fichier optimisé
          const originalName = file.name.split('.')[0];
          const extension = format === 'webp' ? 'webp' : format === 'jpeg' ? 'jpg' : 'png';
          const optimizedFile = new File(
            [blob],
            `${originalName}-optimized.${extension}`,
            { type: mimeType }
          );

          // Afficher les statistiques de compression
          const originalSize = (file.size / 1024).toFixed(2);
          const optimizedSize = (optimizedFile.size / 1024).toFixed(2);
          const reduction = (((file.size - optimizedFile.size) / file.size) * 100).toFixed(1);
          
          console.log(`📊 Optimisation d'image:`);
          console.log(`   Original: ${originalSize} KB`);
          console.log(`   Optimisé: ${optimizedSize} KB`);
          console.log(`   Réduction: ${reduction}%`);
          console.log(`   Format: ${format.toUpperCase()}`);
          console.log(`   Dimensions: ${width}x${height}px`);

          resolve(optimizedFile);
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Charger l'image
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Vérifie si le format WebP est supporté par le navigateur
 */
export function isWebPSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Détecte le meilleur format à utiliser selon le navigateur
 */
export function getBestFormat(): 'webp' | 'jpeg' {
  return isWebPSupported() ? 'webp' : 'jpeg';
}

/**
 * Présets d'optimisation prédéfinis
 */
export const OPTIMIZATION_PRESETS = {
  // Pour les logos (petite taille, haute qualité)
  logo: {
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.9,
    format: getBestFormat(),
  },
  
  // Pour les avatars de profil
  avatar: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.85,
    format: getBestFormat(),
  },
  
  // Pour les images de couverture de blog
  cover: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.85,
    format: getBestFormat(),
  },
  
  // Pour les images dans les galeries de projets
  gallery: {
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 0.82,
    format: getBestFormat(),
  },
  
  // Pour les images dans le contenu des articles
  content: {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.8,
    format: getBestFormat(),
  },
  
  // Pour les thumbnails
  thumbnail: {
    maxWidth: 600,
    maxHeight: 400,
    quality: 0.75,
    format: getBestFormat(),
  },
} as const;

/**
 * Optimise une image avec un preset prédéfini
 */
export async function optimizeImageWithPreset(
  file: File,
  preset: keyof typeof OPTIMIZATION_PRESETS
): Promise<File> {
  return optimizeImage(file, OPTIMIZATION_PRESETS[preset]);
}

