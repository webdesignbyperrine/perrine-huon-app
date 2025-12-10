'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

type SingleImageUploaderProps = {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
};

export default function SingleImageUploader({ imageUrl, onImageChange, label = 'Image de couverture' }: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Le fichier doit être une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    setUploading(true);

    try {
      const supabase = createClient();
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog/covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        alert('Erreur lors de l\'upload');
        console.error(uploadError);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload');
    }

    setUploading(false);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
    e.target.value = '';
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  }

  function handleRemove() {
    onImageChange('');
  }

  return (
    <div className="space-y-3">
      <label className="block text-white/80 text-sm uppercase tracking-wider">
        {label}
      </label>

      {imageUrl ? (
        // Image existante
        <div className="relative group">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-primary-800">
            <Image
              src={imageUrl}
              alt="Image de couverture"
              fill
              style={{ objectFit: 'cover' }}
            />
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-white rounded-lg transition-colors text-sm"
              >
                Changer
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Zone de drop
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            dragging
              ? 'border-secondary bg-secondary/10'
              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }`}
        >
          {uploading ? (
            <div className="space-y-3">
              <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto" />
              <p className="text-white/60 text-sm">Upload en cours...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-5xl">🖼️</div>
              <div>
                <p className="text-white/80 font-semibold mb-1">
                  Cliquez ou glissez-déposez une image
                </p>
                <p className="text-white/40 text-sm">
                  JPG, PNG, WebP • Max 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

