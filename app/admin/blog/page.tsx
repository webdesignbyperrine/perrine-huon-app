'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published: boolean;
  published_at: string;
  created_at: string;
};

export default function AdminBlogPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin, filter]);

  async function fetchPosts() {
    const supabase = createClient();
    setLoading(true);

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter === 'published') {
      query = query.eq('published', true);
    } else if (filter === 'draft') {
      query = query.eq('published', false);
    }

    const { data } = await query;
    setPosts(data || []);
    setLoading(false);
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    const supabase = createClient();
    const updates: { published: boolean; published_at?: string } = { published: !currentStatus };
    
    if (!currentStatus) {
      updates.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id);

    if (!error) {
      fetchPosts();
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (!error) {
      fetchPosts();
    }
  }

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
                  ARTICLES
                </span>
              </h1>
            </div>
            <Link
              href="/admin/blog/new"
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider hover:opacity-90 transition-opacity"
            >
              + Nouvel article
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex gap-4 mb-8">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 uppercase text-sm tracking-wider transition-all ${
                  filter === f
                    ? 'bg-secondary text-white'
                    : 'glass-dark text-white/60 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'published' ? 'Publiés' : 'Brouillons'}
              </button>
            ))}
          </div>

          {/* Liste des articles */}
          {posts.length === 0 ? (
            <div className="glass-dark p-12 rounded-xl text-center">
              <p className="text-white/50 mb-4">Aucun article trouvé</p>
              <Link href="/admin/blog/new" className="text-secondary hover:underline">
                Créer votre premier article
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="glass-dark p-6 rounded-xl flex items-center gap-6 hover:bg-white/5 transition-all"
                >
                  {/* Image */}
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-primary-800">
                    {post.featured_image && (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <p className="text-white/50 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs uppercase tracking-wider ${
                          post.published
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-orange-500/20 text-orange-300'
                        }`}
                      >
                        {post.published ? '✓ Publié' : '○ Brouillon'}
                      </span>
                      {post.published_at && (
                        <span className="text-white/40 text-xs">
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => togglePublished(post.id, post.published)}
                      className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                    >
                      {post.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="px-4 py-2 glass-dark hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all text-sm"
                    >
                      Supprimer
                    </button>
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



