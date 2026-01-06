'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { optimizeImageWithPreset } from '@/lib/image-optimizer';

type SingleImageUploaderProps = {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
  articleTitle?: string; // Pour la génération IA
};

export default function SingleImageUploader({ imageUrl, onImageChange, label = 'Image de couverture', articleTitle }: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Le fichier doit être une image');
      return;
    }

    setUploading(true);

    try {
      // 1. Optimiser l'image automatiquement
      const optimizedFile = await optimizeImageWithPreset(file, 'cover');

      // 2. Upload vers Supabase
      const supabase = createClient();
      const fileExt = optimizedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog/covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, optimizedFile);

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

  function handleGenerateClick() {
    if (!articleTitle || articleTitle.trim() === '') {
      alert('⚠️ Veuillez d\'abord remplir le titre de l\'article en haut du formulaire.\n\nL\'IA utilisera ce titre pour générer une image pertinente, ou vous pouvez saisir un prompt personnalisé.');
      return;
    }
    setShowModal(true);
  }

  async function generateImageWithAI(prompt?: string) {
    setShowModal(false);
    setGenerating(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: articleTitle,
          customPrompt: prompt || (useCustomPrompt ? customPrompt : undefined),
          style: 'professional' 
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        onImageChange(data.imageUrl);
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Erreur lors de la génération. Vérifiez que votre clé API OpenAI est configurée.');
    }

    setGenerating(false);
    setCustomPrompt('');
    setUseCustomPrompt(false);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-white/80 text-sm uppercase tracking-wider">
            {label}
          </label>
          <button
            type="button"
            onClick={handleGenerateClick}
            disabled={generating || uploading}
            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {generating ? '🎨 Génération...' : '✨ Générer avec IA'}
          </button>
        </div>

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
          onClick={() => !generating && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            dragging
              ? 'border-secondary bg-secondary/10'
              : generating
              ? 'border-purple-500 bg-purple-500/10 cursor-wait'
              : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }`}
        >
          {generating ? (
            <div className="space-y-3">
              <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
              <p className="text-white/60 text-sm">Génération de l'image avec IA...</p>
              <p className="text-white/40 text-xs">Cela peut prendre 5-10 secondes</p>
            </div>
          ) : uploading ? (
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

        {/* Message d'optimisation */}
        <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-white/70 text-sm">
            ✨ <strong className="text-secondary">Optimisation automatique activée</strong>
          </p>
          <p className="text-white/50 text-xs mt-1">
            Vos images sont automatiquement compressées et converties en format WebP (60-80% plus légères) pour des performances optimales.
          </p>
        </div>
      </div>

      {/* Modal de génération */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-dark rounded-xl p-8 max-w-2xl w-full space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ✨ Générer une image avec IA
                </h3>
                <p className="text-white/60 text-sm">
                  Choisissez comment générer votre image de couverture
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1 : Génération automatique */}
              <div className="glass-dark p-4 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="generation-type"
                    id="auto-generation"
                    checked={!useCustomPrompt}
                    onChange={() => setUseCustomPrompt(false)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="auto-generation" className="block text-white font-semibold mb-1 cursor-pointer">
                      🤖 Génération automatique (recommandé)
                    </label>
                    <p className="text-white/60 text-sm mb-2">
                      L'IA créera une image professionnelle basée sur votre titre
                    </p>
                    {articleTitle && (
                      <div className="text-xs bg-primary-800/50 p-2 rounded text-white/80 mt-2">
                        <strong>Titre :</strong> "{articleTitle}"
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Option 2 : Prompt personnalisé */}
              <div className="glass-dark p-4 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="generation-type"
                    id="custom-prompt"
                    checked={useCustomPrompt}
                    onChange={() => setUseCustomPrompt(true)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="custom-prompt" className="block text-white font-semibold mb-1 cursor-pointer">
                      ✏️ Prompt personnalisé
                    </label>
                    <p className="text-white/60 text-sm mb-3">
                      Décrivez précisément l'image que vous souhaitez
                    </p>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => {
                        setCustomPrompt(e.target.value);
                        setUseCustomPrompt(true);
                      }}
                      placeholder="Ex: A modern minimalist website interface with purple and orange gradients, floating 3D elements, professional photography style, 8k quality..."
                      rows={4}
                      className="w-full px-3 py-2 bg-primary-800/50 border border-white/10 rounded text-white text-sm placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                    />
                    <p className="text-white/40 text-xs mt-2">
                      💡 Astuce : Soyez précis (style, couleurs, ambiance, éléments...)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => generateImageWithAI(useCustomPrompt ? customPrompt : undefined)}
                disabled={useCustomPrompt && !customPrompt.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity rounded-lg"
              >
                🎨 Générer l'image (~10 sec)
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider rounded-lg"
              >
                Annuler
              </button>
            </div>

            <div className="text-center text-white/40 text-xs">
              💰 Coût : ~0.04€ par image générée
            </div>
          </div>
        </div>
      )}
    </>
  );
}

