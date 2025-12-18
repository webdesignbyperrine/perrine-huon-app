'use client';

import Image from 'next/image';

type CropSettings = {
  x: number;      // Position X en % (0-100)
  y: number;      // Position Y en % (0-100)
  width: number;  // Largeur en % (0-100)
  height: number; // Hauteur en % (0-100)
};

type CroppedImageProps = {
  src: string;
  alt: string;
  crop?: CropSettings | null;
  className?: string;
  priority?: boolean;
};

export default function CroppedImage({
  src,
  alt,
  crop,
  className = '',
  priority = false,
}: CroppedImageProps) {
  // Si pas de crop, afficher normalement
  if (!crop) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        unoptimized
      />
    );
  }

  // Calculer le scale nécessaire pour que la zone recadrée remplisse le conteneur
  // Si la zone fait 50% de largeur, on doit scale x2 (100/50)
  const scaleX = 100 / crop.width;
  const scaleY = 100 / crop.height;
  const scale = Math.max(scaleX, scaleY);

  // Calculer la position pour centrer la zone recadrée
  // On doit décaler l'image pour que le point (crop.x, crop.y) soit à l'origine
  const translateX = -crop.x * scale;
  const translateY = -crop.y * scale;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className}`}
        style={{
          objectFit: 'cover',
          objectPosition: `${crop.x + crop.width / 2}% ${crop.y + crop.height / 2}%`,
          transform: `scale(${scale})`,
          transformOrigin: `${crop.x + crop.width / 2}% ${crop.y + crop.height / 2}%`,
        }}
        priority={priority}
        unoptimized
      />
    </div>
  );
}
