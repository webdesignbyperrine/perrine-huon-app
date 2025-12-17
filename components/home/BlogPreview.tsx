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
      title: 'SEO Local 2026 : Comment dominer les recherches géolocalisées',
      slug: 'seo-local-referencement-geolocalisé-2026',
      excerpt: 'Google My Business, citations locales, avis clients... Le guide complet pour être visible dans votre ville et attirer des clients qualifiés près de chez vous.',
      cover_image_url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      published_at: '2025-12-17T10:00:00Z',
    },
    {
      id: '2',
      title: 'Tendances Web Design 2026 : Ce qui va tout changer',
      slug: 'tendances-web-design-2026',
      excerpt: 'IA générative, interfaces immersives, micro-interactions... Découvrez les tendances qui vont redéfinir le web design en 2026.',
      cover_image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      published_at: '2025-12-15T10:00:00Z',
    },
    {
      id: '3',
      title: 'Performance web : Pourquoi la vitesse de votre site impacte vos ventes',
      slug: 'performance-web-vitesse-site-conversion',
      excerpt: 'Core Web Vitals, temps de chargement, expérience utilisateur... Chaque seconde compte. Découvrez comment optimiser votre site pour convertir plus.',
      cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      published_at: '2025-12-12T10:00:00Z',
    },
    {
      id: '4',
      title: 'Vibe Coding : La révolution de 2025 et ce qui nous attend',
      slug: 'vibe-coding-2025-2026',
      excerpt: 'Comment le vibe coding a transformé le développement web en 2025, et pourquoi 2026 s\'annonce encore plus disruptif.',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      published_at: '2025-12-10T10:00:00Z',
    },
    {
      id: '5',
      title: 'Les événements design majeurs de 2025 : Retour sur une année charnière',
      slug: 'evenements-design-2025',
      excerpt: 'De Config Figma à Awwwards, les moments forts qui ont marqué la communauté design cette année.',
      cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      published_at: '2025-12-05T10:00:00Z',
    },
    {
      id: '6',
      title: 'IA et création web : Où en est-on vraiment fin 2025 ?',
      slug: 'ia-creation-web-2025',
      excerpt: 'État des lieux de l\'IA dans la création de sites : ce qui fonctionne, ce qui déçoit, et comment l\'utiliser intelligemment.',
      cover_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      published_at: '2025-12-01T10:00:00Z',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <section id="blog-preview" className="relative py-20 bg-[#0d1a2d] overflow-hidden">
      {/* Motif grille */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px)
          `
        }}
      />
      {/* Vaguelettes topographiques */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='topographic' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50' fill='none' stroke='rgba(107, 142, 200, 0.15)' stroke-width='1'/%3E%3Cpath d='M0 40 Q 25 20 50 40 T 100 40' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3Cpath d='M0 60 Q 25 40 50 60 T 100 60' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23topographic)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
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
      
      {/* Séparateur animé en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-white/10 animate-pulse" />
      </div>
    </section>
  );
}

