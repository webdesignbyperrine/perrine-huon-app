'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SingleImageUploader from '@/components/admin/SingleImageUploader';
import { generateSlug } from '@/lib/utils';
import {
  AdminPageLayout,
  AdminError,
  AdminInput,
  AdminCheckbox,
  AdminFormButtons,
  AdminLabelWithAI,
} from '@/components/admin/ui';

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

  const updateField = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const { generate, generating } = useAIGeneration({
    onSuccess: (content, type) => updateField(type, content),
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert([{
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null,
      }]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push('/admin/blog');
    }
  }

  return (
    <AdminPageLayout backHref="/admin/blog" backLabel="Retour aux articles" title="NOUVEL ARTICLE">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Titre de l'article"
          required
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Ex: Les tendances web design 2024"
        />

        <AdminInput
          label="Slug (URL)"
          required
          value={formData.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          placeholder="tendances-web-design-2024"
          hint={`URL : /blog/${formData.slug}`}
        />

        <div>
          <AdminLabelWithAI
            label="Extrait (résumé)"
            onGenerate={() => generate(formData.title, 'excerpt')}
            disabled={!formData.title}
            generating={generating}
          />
          <textarea
            value={formData.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
            placeholder="Résumé de l'article en quelques lignes..."
          />
          <p className="text-white/40 text-xs mt-1">
            💡 Astuce : Remplissez d'abord le titre, puis cliquez sur "Générer avec IA"
          </p>
        </div>

        <div>
          <AdminLabelWithAI
            label="Contenu de l'article"
            onGenerate={() => generate(formData.title, 'content')}
            disabled={!formData.title}
            generating={generating}
          />
          <RichTextEditor
            content={formData.content}
            onChange={(html) => updateField('content', html)}
            placeholder="Rédigez votre article ici... Utilisez la barre d'outils pour formater et ajouter des images."
          />
          <p className="text-white/40 text-xs mt-2">
            💡 Insérez des images depuis votre ordinateur ou via URL, alignez-les et placez-les n'importe où. Ou générez un brouillon avec l'IA et personnalisez-le !
          </p>
        </div>

        <div>
          <SingleImageUploader
            imageUrl={formData.featured_image}
            onImageChange={(url) => updateField('featured_image', url)}
            label="Image de couverture"
            articleTitle={formData.title}
          />
          <p className="text-white/40 text-xs mt-2">
            💡 Uploadez une image depuis votre ordinateur ou cliquez "✨ Générer avec IA" pour créer une image unique basée sur votre titre
          </p>
        </div>

        <AdminCheckbox
          id="published"
          label="Publier immédiatement"
          checked={formData.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={loading}
          submitLabel="Créer l'article"
          loadingLabel="Création..."
          cancelHref="/admin/blog"
        />
      </form>
    </AdminPageLayout>
  );
}
