'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

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

  const categories = ['général', 'tarifs', 'processus', 'technique', 'SEO'];

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
    <div className="min-h-screen bg-[#1a1a2e] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/admin/faq" className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← Retour aux FAQ
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                NOUVELLE QUESTION
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
                Question *
              </label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Ex: Quels sont vos tarifs ?"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Réponse *
              </label>
              <textarea
                required
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Rédigez votre réponse détaillée..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-secondary transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                  Position d'affichage
                </label>
                <input
                  type="number"
                  value={formData.order_position}
                  onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="0"
                />
                <p className="text-white/40 text-xs mt-2">
                  Plus le nombre est petit, plus la question apparaît en haut
                </p>
              </div>
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
                {loading ? 'Création...' : 'Créer la FAQ'}
              </button>
              <Link
                href="/admin/faq"
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








