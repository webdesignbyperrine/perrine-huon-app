'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const { user, profile, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    faqs: 0,
    messages: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  async function fetchStats() {
    const supabase = createClient();
    
    const [projectsCount, postsCount, faqsCount, messagesCount] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('faqs').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    ]);

    setStats({
      projects: projectsCount.count || 0,
      posts: postsCount.count || 0,
      faqs: faqsCount.count || 0,
      messages: messagesCount.count || 0,
    });
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70 mb-4">Accès refusé</p>
          <Link href="/" className="text-secondary hover:underline">Retour au site</Link>
        </div>
      </div>
    );
  }

  const adminLinks = [
    { title: 'Projets', href: '/admin/projects', icon: '🎨', count: stats.projects },
    { title: 'Articles', href: '/admin/blog', icon: '📝', count: stats.posts },
    { title: 'FAQ', href: '/admin/faq', icon: '❓', count: stats.faqs },
    { title: 'Médias', href: '/admin/media', icon: '🖼️', count: 0 },
    { title: 'Messages', href: '/admin/messages', icon: '✉️', count: stats.messages, highlight: stats.messages > 0 },
    { title: 'Profil', href: '/admin/profile', icon: '👤', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  DASHBOARD
                </span>
              </h1>
              <p className="text-white/50">Bienvenue, {profile?.name || profile?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider"
            >
              Déconnexion
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-dark p-6 rounded-xl">
              <div className="text-4xl font-bold text-secondary mb-2">{stats.projects}</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Projets publiés</div>
            </div>
            <div className="glass-dark p-6 rounded-xl">
              <div className="text-4xl font-bold text-accent-orange mb-2">{stats.posts}</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Articles publiés</div>
            </div>
            <div className="glass-dark p-6 rounded-xl relative">
              {stats.messages > 0 && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-accent-red rounded-full animate-pulse" />
              )}
              <div className="text-4xl font-bold text-accent-red mb-2">{stats.messages}</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Nouveaux messages</div>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group glass-dark p-8 rounded-xl hover:bg-white/5 transition-all duration-300 relative ${
                  link.highlight ? 'border-2 border-accent-red/50' : ''
                }`}
              >
                {link.highlight && link.count > 0 && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center text-xs font-bold">
                    {link.count}
                  </div>
                )}
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                  {link.title}
                </h3>
                {link.count > 0 && !link.highlight && (
                  <p className="text-white/50 text-sm">{link.count} élément(s)</p>
                )}
                <div className="mt-4 flex items-center text-secondary text-sm font-semibold group-hover:gap-2 transition-all">
                  Gérer
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Liens vers le site */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block glass-dark px-8 py-4 hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

