'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  AdminPageLayout,
  AdminLoadingSpinner,
  AdminNotFound,
  AdminError,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminCheckbox,
  AdminFormButtons,
} from '@/components/admin/ui';

const FAQ_CATEGORIES = [
  { value: 'général', label: 'Général' },
  { value: 'tarifs', label: 'Tarifs' },
  { value: 'processus', label: 'Processus' },
  { value: 'technique', label: 'Technique' },
  { value: 'SEO', label: 'SEO' },
];

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_position: number;
  published: boolean;
};

export default function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [faq, setFaq] = useState<FAQ | null>(null);

  const updateField = <K extends keyof FAQ>(key: K, value: FAQ[K]) => {
    setFaq(prev => prev ? { ...prev, [key]: value } : prev);
  };

  useEffect(() => {
    async function fetchFAQ() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('FAQ introuvable');
      } else {
        setFaq(data);
      }
      setLoading(false);
    }
    fetchFAQ();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!faq) return;

    setSaving(true);
    setError('');

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('faqs')
      .update({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order_position: faq.order_position,
        published: faq.published,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push('/admin/faq');
    }
  }

  if (loading) return <AdminLoadingSpinner />;
  if (!faq) return <AdminNotFound message="FAQ introuvable" backHref="/admin/faq" backLabel="Retour aux FAQ" />;

  return (
    <AdminPageLayout backHref="/admin/faq" backLabel="Retour aux FAQ" title="MODIFIER LA FAQ">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Question"
          required
          value={faq.question}
          onChange={(e) => updateField('question', e.target.value)}
        />

        <AdminTextarea
          label="Réponse"
          required
          value={faq.answer}
          onChange={(e) => updateField('answer', e.target.value)}
          rows={6}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <AdminSelect
            label="Catégorie"
            value={faq.category}
            onChange={(e) => updateField('category', e.target.value)}
            options={FAQ_CATEGORIES}
          />

          <AdminInput
            label="Position d'affichage"
            type="number"
            value={faq.order_position}
            onChange={(e) => updateField('order_position', parseInt(e.target.value))}
            hint="Plus le nombre est petit, plus la question apparaît en haut"
          />
        </div>

        <AdminCheckbox
          id="published"
          label="Publié"
          checked={faq.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={saving}
          submitLabel="Enregistrer les modifications"
          loadingLabel="Enregistrement..."
          cancelHref="/admin/faq"
        />
      </form>
    </AdminPageLayout>
  );
}
