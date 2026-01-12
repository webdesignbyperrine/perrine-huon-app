'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  AdminPageLayout,
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

export default function NewFAQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'général',
    order_position: 0,
    published: true,
  });

  const updateField = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('faqs')
      .insert([formData]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push('/admin/faq');
    }
  }

  return (
    <AdminPageLayout backHref="/admin/faq" backLabel="Retour aux FAQ" title="NOUVELLE QUESTION">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Question"
          required
          value={formData.question}
          onChange={(e) => updateField('question', e.target.value)}
          placeholder="Ex: Quels sont vos tarifs ?"
        />

        <AdminTextarea
          label="Réponse"
          required
          value={formData.answer}
          onChange={(e) => updateField('answer', e.target.value)}
          rows={6}
          placeholder="Rédigez votre réponse détaillée..."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <AdminSelect
            label="Catégorie"
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            options={FAQ_CATEGORIES}
          />

          <AdminInput
            label="Position d'affichage"
            type="number"
            value={formData.order_position}
            onChange={(e) => updateField('order_position', parseInt(e.target.value))}
            placeholder="0"
            hint="Plus le nombre est petit, plus la question apparaît en haut"
          />
        </div>

        <AdminCheckbox
          id="published"
          label="Publier immédiatement"
          checked={formData.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={loading}
          submitLabel="Créer la FAQ"
          loadingLabel="Création..."
          cancelHref="/admin/faq"
        />
      </form>
    </AdminPageLayout>
  );
}
