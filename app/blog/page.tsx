'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/database.types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

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
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              BLOG
            </span>
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto font-light">
            Conseils, astuces et actualités sur le web design, le développement et le SEO local
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8" />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group glass-dark rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {post.cover_image_url && (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-60" />
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-white/50">
                    <time>{formatDate(post.published_at || new Date().toISOString())}</time>
                  </div>

                  {/* Titre */}
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>

                  {/* Extrait */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Lire plus */}
                  <div className="flex items-center text-secondary font-semibold mt-4 text-sm group-hover:gap-2 transition-all">
                    Lire l'article
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/#calendly"
            className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
          >
            <div 
              className="relative flex items-center gap-3 px-12 py-5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
              <span className="absolute inset-1 rounded-full pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(180deg, #5A8F6A 0%, #4A7C59 50%, #3A6347 100%)', boxShadow: '0 0 20px rgba(74, 124, 89, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}>
                <span className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
              </span>
              <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">Parlons de votre projet</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}



