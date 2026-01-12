'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import { AdminPageLayout, AdminLoadingSpinner } from '@/components/admin/ui';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
};

type FilterType = 'all' | 'new' | 'read' | 'replied';

const FILTER_LABELS: Record<FilterType, string> = {
  all: 'Tous',
  new: 'Nouveaux',
  read: 'Lus',
  replied: 'Répondus',
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-red-500/20', text: 'text-red-300', label: '🔴 Nouveau' },
  read: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: '👁️ Lu' },
  replied: { bg: 'bg-green-500/20', text: 'text-green-300', label: '✓ Répondu' },
};

export default function AdminMessagesPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchMessages = useCallback(async () => {
    const supabase = createClient();
    setLoading(true);

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setMessages(data || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isAdmin) fetchMessages();
  }, [isAdmin, fetchMessages]);

  const updateStatus = async (id: string, status: FilterType) => {
    if (status === 'all') return;
    const supabase = createClient();
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
    if (!error) fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) fetchMessages();
  };

  if (authLoading || loading) return <AdminLoadingSpinner />;

  return (
    <AdminPageLayout backHref="/admin" backLabel="Dashboard" title="MESSAGES">

      {/* Filtres */}
      <div className="flex gap-4 mb-8">
        {(Object.keys(FILTER_LABELS) as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 uppercase text-sm tracking-wider transition-all ${
              filter === f ? 'bg-secondary text-white' : 'glass-dark text-white/60 hover:text-white'
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Liste des messages */}
      {messages.length === 0 ? (
        <div className="glass-dark p-12 rounded-xl text-center">
          <p className="text-white/50">Aucun message trouvé</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const statusStyle = STATUS_STYLES[msg.status];
            return (
              <div
                key={msg.id}
                className={`glass-dark p-6 rounded-xl hover:bg-white/5 transition-all ${
                  msg.status === 'new' ? 'border-l-4 border-accent-red' : ''
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                      <span className={`px-3 py-1 text-xs uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span>{msg.email}</span>
                      <span>•</span>
                      <span>{formatDate(msg.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateStatus(msg.id, 'read')}
                      disabled={msg.status !== 'new'}
                      className="px-3 py-1 glass-dark hover:bg-white/5 text-white/80 hover:text-white disabled:opacity-30 transition-all text-xs"
                    >
                      Marquer lu
                    </button>
                    <button
                      onClick={() => updateStatus(msg.id, 'replied')}
                      disabled={msg.status === 'replied'}
                      className="px-3 py-1 glass-dark hover:bg-white/5 text-white/80 hover:text-white disabled:opacity-30 transition-all text-xs"
                    >
                      Marquer répondu
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-3 py-1 glass-dark hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all text-xs"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Sujet:</span>
                    <p className="text-white font-semibold">{msg.subject}</p>
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Message:</span>
                    <p className="text-white/80 mt-2 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                    className="inline-flex items-center gap-2 text-secondary hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Répondre par email
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminPageLayout>
  );
}




