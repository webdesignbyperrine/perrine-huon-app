'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    published: false,
  });

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
    
    const dataToInsert = {
      ...formData,
      published_at: formData.published ? new Date().toISOString() : null,
    };

    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert([dataToInsert]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push('/admin/blog');
    }
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/admin/blog" className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← Retour aux articles
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                NOUVEL ARTICLE
              </span>
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Titre de l'article *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: Les tendances web design 2024"
              />
            </div>

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
                placeholder="tendances-web-design-2024"
              />
              <p className="text-white/40 text-xs mt-2">
                URL : /blog/{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Extrait
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Résumé de l'article en quelques lignes..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Contenu de l'article
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="Rédigez votre article ici... Utilisez la barre d'outils pour formater et ajouter des images."
              />
              <p className="text-white/40 text-xs mt-2">
                💡 Vous pouvez insérer des images depuis votre ordinateur ou via URL, les aligner et les placer n'importe où dans le texte.
              </p>
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Image de couverture (URL)
              </label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="https://..."
              />
              {formData.featured_image && (
                <div className="mt-4">
                  <img
                    src={formData.featured_image}
                    alt="Aperçu"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

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

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? 'Création...' : 'Créer l\'article'}
              </button>
              <Link
                href="/admin/blog"
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

