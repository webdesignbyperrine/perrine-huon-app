'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_position: number;
  published: boolean;
};

export default function AdminFAQPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchFaqs();
    }
  }, [isAdmin, selectedCategory]);

  async function fetchFaqs() {
    const supabase = createClient();
    setLoading(true);

    let query = supabase
      .from('faqs')
      .select('*')
      .order('order_position', { ascending: true });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data } = await query;
    setFaqs(data || []);
    setLoading(false);
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    const supabase = createClient();
    const { error } = await supabase
      .from('faqs')
      .update({ published: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchFaqs();
    }
  }

  async function deleteFaq(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette FAQ ?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (!error) {
      fetchFaqs();
    }
  }

  const categories = ['all', 'général', 'tarifs', 'processus', 'technique'];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <Link href="/admin" className="text-secondary hover:underline mb-4 inline-block text-sm">
                ← Dashboard
              </Link>
              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  FAQ
                </span>
              </h1>
            </div>
            <Link
              href="/admin/faq/new"
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider hover:opacity-90 transition-opacity"
            >
              + Nouvelle question
            </Link>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 uppercase text-sm tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-white'
                    : 'glass-dark text-white/60 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Toutes' : cat}
              </button>
            ))}
          </div>

          {/* Liste des FAQs */}
          {faqs.length === 0 ? (
            <div className="glass-dark p-12 rounded-xl text-center">
              <p className="text-white/50 mb-4">Aucune question trouvée</p>
              <Link href="/admin/faq/new" className="text-secondary hover:underline">
                Créer votre première FAQ
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="glass-dark p-6 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* Contenu */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs uppercase tracking-wider ${
                            faq.published
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-orange-500/20 text-orange-300'
                          }`}
                        >
                          {faq.published ? '✓ Publié' : '○ Brouillon'}
                        </span>
                        <span className="text-white/30 text-xs">Position: {faq.order_position}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                      <p className="text-white/60 text-sm line-clamp-2">{faq.answer}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Link
                        href={`/admin/faq/${faq.id}`}
                        className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => togglePublished(faq.id, faq.published)}
                        className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                      >
                        {faq.published ? 'Dépublier' : 'Publier'}
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="px-4 py-2 glass-dark hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
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

