'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';

type Project = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: number | null;
  short_description: string | null;
  long_description: string | null;
  featured_image: string | null;
  published: boolean;
};

type UploadedImage = {
  id: string;
  url: string;
  file_name: string;
  file_size: number;
  is_main?: boolean;
};

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [initialImageIds, setInitialImageIds] = useState<string[]>([]);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  async function fetchProject() {
    const supabase = createClient();
    
    // Récupérer le projet
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single();

    if (projectError) {
      setError('Projet introuvable');
      setLoading(false);
      return;
    }

    setProject(projectData);

    // Récupérer les images liées au projet
    const { data: mediaData, error: mediaError } = await supabase
      .from('project_media')
      .select(`
        media_id,
        is_main,
        sort_order,
        media_assets (
          id,
          file_url,
          file_name,
          file_size
        )
      `)
      .eq('project_id', params.id)
      .order('sort_order', { ascending: true });

    if (!mediaError && mediaData) {
      const loadedImages = mediaData.map((item: any) => ({
        id: item.media_assets.id,
        url: item.media_assets.file_url,
        file_name: item.media_assets.file_name,
        file_size: item.media_assets.file_size,
        is_main: item.is_main,
      }));
      
      setImages(loadedImages);
      setInitialImageIds(loadedImages.map((img: UploadedImage) => img.id));
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!project) return;

    setSaving(true);
    setError('');

    const supabase = createClient();
    
    // Mettre à jour l'image principale
    const mainImage = images.find(img => img.is_main);
    
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        title: project.title,
        slug: project.slug,
        client: project.client,
        location: project.location,
        year: project.year,
        short_description: project.short_description,
        long_description: project.long_description,
        featured_image: mainImage?.url || images[0]?.url || null,
        published: project.published,
      })
      .eq('id', params.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    // Gérer les images
    const currentImageIds = images.map(img => img.id);
    const removedImageIds = initialImageIds.filter(id => !currentImageIds.includes(id));

    // Supprimer les relations des images retirées
    if (removedImageIds.length > 0) {
      await supabase
        .from('project_media')
        .delete()
        .eq('project_id', params.id)
        .in('media_id', removedImageIds);
    }

    // Supprimer toutes les relations existantes et recréer
    await supabase
      .from('project_media')
      .delete()
      .eq('project_id', params.id);

    // Créer les nouvelles relations
    if (images.length > 0) {
      const projectMedia = images.map((img, index) => ({
        project_id: params.id,
        media_id: img.id,
        sort_order: index,
        is_main: img.is_main || false,
      }));

      await supabase.from('project_media').insert(projectMedia);
    }

    router.push('/admin/projects');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70 mb-4">Projet introuvable</p>
          <Link href="/admin/projects" className="text-secondary hover:underline">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/admin/projects" className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← Retour aux projets
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                MODIFIER LE PROJET
              </span>
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Titre du projet *
              </label>
              <input
                type="text"
                required
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Slug (URL) *
              </label>
              <input
                type="text"
                required
                value={project.slug}
                onChange={(e) => setProject({ ...project, slug: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
              <p className="text-white/40 text-xs mt-2">
                URL : /portfolio/{project.slug}
              </p>
            </div>

            {/* Client et Type de projet */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Client
                </label>
                <input
                  type="text"
                  value={project.client || ''}
                  onChange={(e) => setProject({ ...project, client: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Type de projet
                </label>
                <select
                  value={project.location || ''}
                  onChange={(e) => setProject({ ...project, location: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-secondary transition-colors"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Site vitrine">Site vitrine</option>
                  <option value="Site multi-pages">Site multi-pages</option>
                  <option value="SaaS / Application web">SaaS / Application web</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Landing page">Landing page</option>
                  <option value="Refonte de site">Refonte de site</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            {/* Année */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Année
              </label>
              <input
                type="number"
                value={project.year || ''}
                onChange={(e) => setProject({ ...project, year: parseInt(e.target.value) || null })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            {/* Description courte */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Description courte
              </label>
              <input
                type="text"
                value={project.short_description || ''}
                onChange={(e) => setProject({ ...project, short_description: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            {/* Description longue */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Description détaillée
              </label>
              <textarea
                value={project.long_description || ''}
                onChange={(e) => setProject({ ...project, long_description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>

            {/* Galerie d'images */}
            <div>
              <label className="block text-white/80 mb-4 text-sm uppercase tracking-wider">
                Galerie d'images du projet
              </label>
              <ImageUploader
                images={images}
                onImagesChange={setImages}
                maxImages={10}
              />
              <p className="text-white/40 text-xs mt-2">
                La première image (ou celle marquée comme "Principale") sera utilisée comme image de couverture
              </p>
            </div>

            {/* Publié */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={project.published}
                onChange={(e) => setProject({ ...project, published: e.target.checked })}
                className="w-5 h-5 bg-primary-800/50 border border-white/10 rounded"
              />
              <label htmlFor="published" className="text-white/80 text-sm uppercase tracking-wider">
                Publié
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
              <Link
                href="/admin/projects"
                className="px-8 py-4 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider text-center"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

