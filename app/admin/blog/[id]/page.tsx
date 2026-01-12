'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SingleImageUploader from '@/components/admin/SingleImageUploader';
import {
  AdminPageLayout,
  AdminLoadingSpinner,
  AdminNotFound,
  AdminError,
  AdminInput,
  AdminCheckbox,
  AdminFormButtons,
  AdminLabelWithAI,
} from '@/components/admin/ui';

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

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState<BlogPost | null>(null);

  const updateField = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setPost(prev => prev ? { ...prev, [key]: value } : prev);
  };

  const { generate, generating } = useAIGeneration({
    onSuccess: (content, type) => updateField(type, content),
  });

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Article introuvable');
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;

    setSaving(true);
    setError('');

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        published: post.published,
        published_at: post.published && !post.published_at ? new Date().toISOString() : post.published_at,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push('/admin/blog');
    }
  }

  if (loading) return <AdminLoadingSpinner />;
  if (!post) return <AdminNotFound message="Article introuvable" backHref="/admin/blog" backLabel="Retour aux articles" />;

  return (
    <AdminPageLayout backHref="/admin/blog" backLabel="Retour aux articles" title="MODIFIER L'ARTICLE">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Titre de l'article"
          required
          value={post.title}
          onChange={(e) => updateField('title', e.target.value)}
        />

        <AdminInput
          label="Slug (URL)"
          required
          value={post.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          hint={`URL : /blog/${post.slug}`}
        />

        <div>
          <AdminLabelWithAI
            label="Extrait (résumé)"
            onGenerate={() => generate(post.title, 'excerpt')}
            generating={generating}
          />
          <textarea
            value={post.excerpt || ''}
            onChange={(e) => updateField('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
          />
        </div>

        <div>
          <AdminLabelWithAI
            label="Contenu de l'article"
            onGenerate={() => generate(post.title, 'content')}
            generating={generating}
          />
          <RichTextEditor
            content={post.content || ''}
            onChange={(html) => updateField('content', html)}
            placeholder="Rédigez votre article ici... Utilisez la barre d'outils pour formater et ajouter des images."
          />
          <p className="text-white/40 text-xs mt-2">
            💡 Insérez des images depuis votre ordinateur ou via URL, alignez-les et placez-les n'importe où. Ou générez un brouillon avec l'IA et personnalisez-le !
          </p>
        </div>

        <div>
          <SingleImageUploader
            imageUrl={post.featured_image || ''}
            onImageChange={(url) => updateField('featured_image', url)}
            label="Image de couverture"
            articleTitle={post.title}
          />
          <p className="text-white/40 text-xs mt-2">
            💡 Uploadez une image depuis votre ordinateur ou cliquez "✨ Générer avec IA" pour créer une image unique basée sur votre titre
          </p>
        </div>

        <AdminCheckbox
          id="published"
          label="Publié"
          checked={post.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={saving}
          submitLabel="Enregistrer les modifications"
          loadingLabel="Enregistrement..."
          cancelHref="/admin/blog"
        />
      </form>
    </AdminPageLayout>
  );
}
