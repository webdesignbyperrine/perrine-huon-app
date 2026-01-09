'use client';

import { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

// Les paramètres de crop stockent la zone visible en pourcentages
type CropSettings = {
  x: number;      // Position X en % (0-100)
  y: number;      // Position Y en % (0-100)
  width: number;  // Largeur en % (0-100)
  height: number; // Hauteur en % (0-100)
};

type ImageCropperProps = {
  imageUrl: string;
  initialCrop?: CropSettings;
  onCropChange: (crop: CropSettings) => void;
  aspectRatio?: number;
};

export default function ImageCropper({
  imageUrl,
  initialCrop,
  onCropChange,
  aspectRatio = 16 / 9,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      // Stocker la zone recadrée en pourcentages
      onCropChange({
        x: croppedArea.x,
        y: croppedArea.y,
        width: croppedArea.width,
        height: croppedArea.height,
      });
    },
    [onCropChange]
  );

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <div className="space-y-4">
      {/* Zone de recadrage */}
      <div className="relative h-[300px] bg-primary-800 rounded-xl overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          showGrid={true}
          style={{
            containerStyle: {
              borderRadius: '12px',
            },
            cropAreaStyle: {
              border: '2px solid #5b9a8b',
            },
          }}
        />
      </div>

      {/* Contrôles de zoom */}
      <div className="glass-dark rounded-xl p-4">
        <div className="flex items-center gap-4">
          {/* Icône zoom out */}
          <button
            type="button"
            onClick={() => handleZoomChange(Math.max(1, zoom - 0.1))}
            className="p-2 bg-primary-800/50 hover:bg-primary-700/50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>

          {/* Slider de zoom */}
          <div className="flex-1">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer accent-secondary"
              style={{
                background: `linear-gradient(to right, #5b9a8b 0%, #5b9a8b ${((zoom - 1) / 2) * 100}%, #1a2a3a ${((zoom - 1) / 2) * 100}%, #1a2a3a 100%)`,
              }}
            />
          </div>

          {/* Icône zoom in */}
          <button
            type="button"
            onClick={() => handleZoomChange(Math.min(3, zoom + 0.1))}
            className="p-2 bg-primary-800/50 hover:bg-primary-700/50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>

          {/* Réinitialiser */}
          <button
            type="button"
            onClick={() => {
              setCrop({ x: 0, y: 0 });
              setZoom(1);
            }}
            className="px-3 py-2 bg-primary-800/50 hover:bg-primary-700/50 rounded-lg transition-colors text-white/60 hover:text-white text-sm"
          >
            Réinitialiser
          </button>
        </div>

        <div className="flex justify-between mt-3 text-xs text-white/40">
          <span>Zoom : {Math.round(zoom * 100)}%</span>
          <span>Glissez l'image pour la repositionner</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-white/70 text-sm">
          🖼️ <strong className="text-blue-400">Recadrez votre image</strong>
        </p>
        <p className="text-white/50 text-xs mt-1">
          Utilisez le slider pour zoomer • Glissez l'image pour la repositionner • Le cadre montre la zone visible
        </p>
      </div>
    </div>
  );
}

export type { CropSettings };




