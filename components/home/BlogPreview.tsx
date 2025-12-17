'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/database.types';

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // Articles de démo
  const demoPosts = [
    {
      id: '1',
      title: 'Comment le SEO local peut booster votre visibilité',
      slug: 'seo-local-visibilite',
      excerpt: 'Découvrez les techniques essentielles pour dominer les recherches locales dans votre zone géographique.',
      cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      published_at: '2024-12-01T10:00:00Z',
      seo_city: 'Lyon',
    },
    {
      id: '2',
      title: '10 tendances web design pour 2025',
      slug: 'tendances-web-design-2025',
      excerpt: 'Les tendances qui vont marquer le web design cette année : minimalisme, animations, et expériences immersives.',
      cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
      published_at: '2024-11-28T10:00:00Z',
      seo_city: 'Paris',
    },
    {
      id: '3',
      title: 'Pourquoi votre site doit être rapide',
      slug: 'performance-web-importance',
      excerpt: 'La performance web impacte directement votre SEO, vos conversions et l\'expérience utilisateur.',
      cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      published_at: '2024-11-25T10:00:00Z',
      seo_city: 'Marseille',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <section id="blog-preview" className="py-20 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Blog</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mt-4">
            Conseils, astuces et actualités sur le web design, le développement et le SEO local.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card group overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        backgroundImage: post.cover_image_url 
                          ? `url(${post.cover_image_url})` 
                          : undefined 
                      }}
                    >
                      {!post.cover_image_url && (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-white/50">
                    <time>{formatDate(post.published_at || new Date().toISOString())}</time>
                    {post.seo_city && (
                      <>
                        <span>•</span>
                        <span>📍 {post.seo_city}</span>
                      </>
                    )}
                  </div>

                  {/* Contenu */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-secondary font-semibold group-hover:gap-2 transition-all">
                    Lire l'article
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/blog" 
                className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <div 
                  className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <span 
                    className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                  />
                  <span 
                    className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                      boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span 
                      className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                    />
                  </span>
                  <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
                    Voir tous les articles
                  </span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

