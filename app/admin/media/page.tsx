'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

type MediaAsset = {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  alt_text: string;
  created_at: string;
};

export default function AdminMediaPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchMedia();
    }
  }, [isAdmin]);

  async function fetchMedia() {
    const supabase = createClient();
    setLoading(true);

    const { data } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    setMedia(data || []);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      try {
        // Upload vers Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `media/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        // Créer l'entrée dans la base de données
        await supabase.from('media_assets').insert({
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          alt_text: file.name.split('.')[0],
        });
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }

    setUploading(false);
    fetchMedia();
    e.target.value = '';
  }

  async function deleteMedia(id: string, fileUrl: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    const supabase = createClient();

    // Supprimer le fichier du storage
    const filePath = fileUrl.split('/').slice(-2).join('/');
    await supabase.storage.from('assets').remove([filePath]);

    // Supprimer l'entrée de la base de données
    const { error } = await supabase.from('media_assets').delete().eq('id', id);

    if (!error) {
      fetchMedia();
    }
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    alert('URL copiée dans le presse-papiers !');
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <Link href="/admin" className="text-secondary hover:underline mb-4 inline-block text-sm">
                ← Dashboard
              </Link>
              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  MÉDIAS
                </span>
              </h1>
            </div>
            <label className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider hover:opacity-90 transition-opacity cursor-pointer">
              {uploading ? 'Upload en cours...' : '+ Ajouter des médias'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {/* Grille de médias */}
          {media.length === 0 ? (
            <div className="glass-dark p-12 rounded-xl text-center">
              <p className="text-white/50 mb-4">Aucun média trouvé</p>
              <label className="text-secondary hover:underline cursor-pointer">
                Téléverser vos premiers médias
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media.map((asset) => (
                <div
                  key={asset.id}
                  className="glass-dark rounded-xl overflow-hidden hover:bg-white/5 transition-all group"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-primary-800">
                    {asset.file_type.startsWith('image/') ? (
                      <Image
                        src={asset.file_url}
                        alt={asset.alt_text}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📄
                      </div>
                    )}
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyToClipboard(asset.file_url)}
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                        title="Copier l'URL"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteMedia(asset.id, asset.file_url)}
                        className="p-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold truncate mb-1" title={asset.file_name}>
                      {asset.file_name}
                    </p>
                    <p className="text-white/50 text-xs">{formatFileSize(asset.file_size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}








