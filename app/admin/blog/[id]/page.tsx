'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SingleImageUploader from '@/components/admin/SingleImageUploader';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published: boolean;
  published_at: string | null;
};

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  async function fetchPost() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      setError('Article introuvable');
      setLoading(false);
    } else {
      setPost(data);
      setLoading(false);
    }
  }

  // Générer du contenu avec IA
  async function generateWithAI(type: 'excerpt' | 'content') {
    if (!post?.title) {
      alert('Le titre est requis pour générer du contenu');
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, type }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        if (type === 'excerpt') {
          setPost({ ...post, excerpt: data.content });
        } else {
          setPost({ ...post, content: data.content });
        }
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Erreur lors de la génération. Vérifiez que votre clé API OpenAI est configurée.');
    }

    setGenerating(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;

    setSaving(true);
    setError('');

    const supabase = createClient();
    
    const updates = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      published: post.published,
      published_at: post.published && !post.published_at ? new Date().toISOString() : post.published_at,
    };

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', params.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push('/admin/blog');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70 mb-4">Article introuvable</p>
          <Link href="/admin/blog" className="text-secondary hover:underline">
            Retour aux articles
          </Link>
        </div>
      </div>
    );
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
                MODIFIER L'ARTICLE
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
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Slug (URL) *
              </label>
              <input
                type="text"
                required
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
              />
              <p className="text-white/40 text-xs mt-2">
                URL : /blog/{post.slug}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white/80 text-sm uppercase tracking-wider">
                  Extrait (résumé)
                </label>
                <button
                  type="button"
                  onClick={() => generateWithAI('excerpt')}
                  disabled={generating}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  ✨ Générer avec IA
                </button>
              </div>
              <textarea
                value={post.excerpt || ''}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white/80 text-sm uppercase tracking-wider">
                  Contenu de l'article
                </label>
                <button
                  type="button"
                  onClick={() => generateWithAI('content')}
                  disabled={generating}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {generating ? '⏳ Génération...' : '✨ Générer avec IA'}
                </button>
              </div>
              <RichTextEditor
                content={post.content || ''}
                onChange={(html) => setPost({ ...post, content: html })}
                placeholder="Rédigez votre article ici... Utilisez la barre d'outils pour formater et ajouter des images."
              />
              <p className="text-white/40 text-xs mt-2">
                💡 Insérez des images depuis votre ordinateur ou via URL, alignez-les et placez-les n'importe où. Ou générez un brouillon avec l'IA et personnalisez-le !
              </p>
            </div>

            <div>
              <SingleImageUploader
                imageUrl={post.featured_image || ''}
                onImageChange={(url) => setPost({ ...post, featured_image: url })}
                label="Image de couverture"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={post.published}
                onChange={(e) => setPost({ ...post, published: e.target.checked })}
                className="w-5 h-5 bg-primary-800/50 border border-white/10 rounded"
              />
              <label htmlFor="published" className="text-white/80 text-sm uppercase tracking-wider">
                Publié
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
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

