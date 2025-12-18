'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type UploadedImage = {
  id: string;
  url: string;
  file_name: string;
  file_size: number;
  is_main?: boolean;
};

type ImageUploaderProps = {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
};

// Composant pour une image triable
function SortableImage({
  image,
  onRemove,
  onSetMain,
  formatFileSize,
}: {
  image: UploadedImage;
  onRemove: (id: string) => void;
  onSetMain: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group glass-dark rounded-lg overflow-hidden ${
        image.is_main ? 'ring-2 ring-secondary' : ''
      } ${isDragging ? 'shadow-2xl scale-105' : ''}`}
    >
      {/* Handle de drag */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 p-1.5 bg-black/60 rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        title="Glisser pour réorganiser"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>

      {/* Image */}
      <div className="relative aspect-video bg-primary-800">
        <Image
          src={image.url}
          alt={image.file_name}
          fill
          className="object-cover"
          draggable={false}
        />
        
        {/* Badge "Principale" */}
        {image.is_main && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-secondary text-white text-xs font-semibold uppercase tracking-wider">
            Principale
          </div>
        )}

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {!image.is_main && (
            <button
              type="button"
              onClick={() => onSetMain(image.id)}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              title="Définir comme image principale"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={() => onRemove(image.id)}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            title="Supprimer"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-white text-xs truncate" title={image.file_name}>
          {image.file_name}
        </p>
        <p className="text-white/50 text-xs">{formatFileSize(image.file_size)}</p>
      </div>
    </div>
  );
}

export default function ImageUploader({ images, onImagesChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);

      const newImages = arrayMove(images, oldIndex, newIndex);
      onImagesChange(newImages);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images autorisées`);
      return;
    }

    setUploading(true);
    setError('');

    const supabase = createClient();
    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      try {
        // Vérifier le type de fichier
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} n'est pas une image valide`);
          continue;
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} est trop volumineux (max 5MB)`);
          continue;
        }

        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        // Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          setError(`Erreur lors de l'upload de ${file.name}`);
          continue;
        }

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        // Créer l'entrée dans media_assets
        const { data: mediaData, error: mediaError } = await supabase
          .from('media_assets')
          .insert({
            file_name: file.name,
            file_url: publicUrl,
            file_type: file.type,
            file_size: file.size,
            alt_text: file.name.split('.')[0],
          })
          .select()
          .single();

        if (mediaError) {
          console.error('Media insert error:', mediaError);
          continue;
        }

        newImages.push({
          id: mediaData.id,
          url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          is_main: images.length === 0 && newImages.length === 0, // Première image = principale
        });

      } catch (error) {
        console.error('Error processing file:', error);
        setError(`Erreur lors du traitement de ${file.name}`);
      }
    }

    onImagesChange([...images, ...newImages]);
    setUploading(false);
    e.target.value = '';
  }

  function handleRemoveImage(imageId: string) {
    const updatedImages = images.filter(img => img.id !== imageId);
    
    // Si on supprime l'image principale et qu'il reste des images, marquer la première comme principale
    const removedImage = images.find(img => img.id === imageId);
    if (removedImage?.is_main && updatedImages.length > 0) {
      updatedImages[0].is_main = true;
    }
    
    onImagesChange(updatedImages);
  }

  function handleSetMainImage(imageId: string) {
    const updatedImages = images.map(img => ({
      ...img,
      is_main: img.id === imageId,
    }));
    onImagesChange(updatedImages);
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <div className="space-y-4">
      {/* Upload button */}
      <div>
        <label className="inline-block px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50">
          {uploading ? 'Upload en cours...' : `+ Ajouter des images (${images.length}/${maxImages})`}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading || images.length >= maxImages}
            className="hidden"
          />
        </label>
        <p className="text-white/40 text-xs mt-2">
          Max {maxImages} images • JPG, PNG, WebP • Max 5MB par image
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Images grid with drag and drop */}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  onRemove={handleRemoveImage}
                  onSetMain={handleSetMainImage}
                  formatFileSize={formatFileSize}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length === 0 && (
        <div className="glass-dark p-8 rounded-lg text-center">
          <div className="text-4xl mb-4">🖼️</div>
          <p className="text-white/60 text-sm">Aucune image ajoutée</p>
          <p className="text-white/40 text-xs mt-2">Cliquez sur le bouton ci-dessus pour ajouter des images</p>
        </div>
      )}

      {/* Message d'aide pour le drag and drop */}
      {images.length > 1 && (
        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-white/70 text-sm">
            ↔️ <strong className="text-blue-400">Réorganisez vos images</strong>
          </p>
          <p className="text-white/50 text-xs mt-1">
            Glissez-déposez les images pour modifier leur ordre d'affichage.
          </p>
        </div>
      )}

      {/* Message d'optimisation */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
        <p className="text-white/70 text-sm">
          ✨ <strong className="text-secondary">Optimisation automatique activée</strong>
        </p>
        <p className="text-white/50 text-xs mt-1">
          Chaque image est automatiquement compressée et convertie en format WebP pour des performances optimales (60-80% plus légères).
        </p>
      </div>
    </div>
  );
}
