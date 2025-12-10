'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';

type UploadedImage = {
  id: string;
  url: string;
  file_name: string;
  file_size: number;
  is_main?: boolean;
};

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    location: '',
    year: new Date().getFullYear(),
    short_description: '',
    long_description: '',
    published: false,
  });

  // Générer automatiquement le slug à partir du titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    
    // Récupérer l'URL de l'image principale
    const mainImage = images.find(img => img.is_main);
    
    const projectData = {
      ...formData,
      featured_image: mainImage?.url || images[0]?.url || null,
    };

    const { data: project, error: insertError } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    // Créer les relations project_media pour chaque image
    if (images.length > 0 && project) {
      const projectMedia = images.map((img, index) => ({
        project_id: project.id,
        media_id: img.id,
        sort_order: index,
        is_main: img.is_main || false,
      }));

      const { error: mediaError } = await supabase
        .from('project_media')
        .insert(projectMedia);

      if (mediaError) {
        console.error('Error linking media:', mediaError);
      }
    }

    router.push('/admin/projects');
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
                NOUVEAU PROJET
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
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: Site E-commerce Mode"
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
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="site-ecommerce-mode"
              />
              <p className="text-white/40 text-xs mt-2">
                Généré automatiquement. URL : /portfolio/{formData.slug}
              </p>
            </div>

            {/* Client et Localisation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Client
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Nom du client"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Localisation
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Paris, Lyon..."
                />
              </div>
            </div>

            {/* Année */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Année
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="2024"
              />
            </div>

            {/* Description courte */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Description courte
              </label>
              <input
                type="text"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Une ligne de description"
              />
            </div>

            {/* Description longue */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Description détaillée
              </label>
              <textarea
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Description complète du projet, technologies utilisées, défis relevés..."
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
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 bg-primary-800/50 border border-white/10 rounded"
              />
              <label htmlFor="published" className="text-white/80 text-sm uppercase tracking-wider">
                Publier immédiatement
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? 'Création...' : 'Créer le projet'}
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

