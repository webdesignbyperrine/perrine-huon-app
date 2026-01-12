'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [headerRef, headerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
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
      featured_image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      published_at: '2025-12-17T10:00:00Z',
    },
    {
      id: '2',
      title: 'Tendances Web Design 2026 : Ce qui va tout changer',
      slug: 'tendances-web-design-2026',
      excerpt: 'IA générative, interfaces immersives, micro-interactions... Découvrez les tendances qui vont redéfinir le web design en 2026.',
      featured_image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      published_at: '2025-12-15T10:00:00Z',
    },
    {
      id: '3',
      title: 'Performance web : Pourquoi la vitesse de votre site impacte vos ventes',
      slug: 'performance-web-vitesse-site-conversion',
      excerpt: 'Core Web Vitals, temps de chargement, expérience utilisateur... Chaque seconde compte. Découvrez comment optimiser votre site pour convertir plus.',
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      published_at: '2025-12-12T10:00:00Z',
    },
    {
      id: '4',
      title: 'Vibe Coding : La révolution de 2025 et ce qui nous attend',
      slug: 'vibe-coding-2025-2026',
      excerpt: 'Comment le vibe coding a transformé le développement web en 2025, et pourquoi 2026 s\'annonce encore plus disruptif.',
      featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      published_at: '2025-12-10T10:00:00Z',
    },
    {
      id: '5',
      title: 'Les événements design majeurs de 2025 : Retour sur une année charnière',
      slug: 'evenements-design-2025',
      excerpt: 'De Config Figma à Awwwards, les moments forts qui ont marqué la communauté design cette année.',
      featured_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      published_at: '2025-12-05T10:00:00Z',
    },
    {
      id: '6',
      title: 'IA et création web : Où en est-on vraiment fin 2025 ?',
      slug: 'ia-creation-web-2025',
      excerpt: 'État des lieux de l\'IA dans la création de sites : ce qui fonctionne, ce qui déçoit, et comment l\'utiliser intelligemment.',
      featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      published_at: '2025-12-01T10:00:00Z',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Actualités & Conseils
          </span>
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Blog
          </h1>
          <p 
            className={`text-lg text-primary/60 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Conseils, astuces et actualités sur le web design, le développement et le SEO local
          </p>
          
          {/* Ligne décorative */}
          <div 
            className={`w-24 h-0.5 bg-primary/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
              headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {displayPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group bg-paper border-2 border-primary/10 rounded-sketch-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {(post.featured_image || post.cover_image_url) && (
                    <Image
                      src={post.featured_image || post.cover_image_url || ''}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-paper to-transparent opacity-60" />
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-primary/40">
                    <time>{formatDate(post.published_at || new Date().toISOString())}</time>
                  </div>

                  {/* Titre */}
                  <h2 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>

                  {/* Extrait */}
                  <p className="text-primary/60 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Lire plus */}
                  <div className="flex items-center text-accent font-semibold mt-4 text-sm group-hover:gap-2 transition-all">
                    Lire l'article
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Barre de progression au hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/#rdv"
            className="btn-cta group inline-flex items-center gap-3"
          >
            <span>Parlons de votre projet</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
