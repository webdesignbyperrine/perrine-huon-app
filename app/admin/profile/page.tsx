'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

export default function AdminProfilePage() {
  const { user, profile, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setSuccess(false);

    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id);

    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/admin" className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← Dashboard
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                PROFIL
              </span>
            </h1>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
              ✓ Profil mis à jour avec succès
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
            {/* Email (lecture seule) */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
              />
              <p className="text-white/40 text-xs mt-2">L'email ne peut pas être modifié</p>
            </div>

            {/* Nom */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Nom complet
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Votre nom"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Quelques mots sur vous..."
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                URL de l'avatar
              </label>
              <input
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="https://..."
              />
              {formData.avatar_url && (
                <div className="mt-4">
                  <img
                    src={formData.avatar_url}
                    alt="Avatar preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/10"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
              <Link
                href="/admin"
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



