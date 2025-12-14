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
      title: 'Le SEO Local : Votre Atout pour Dominer Votre Marché',
      slug: 'seo-local-dominer-marche',
      excerpt: 'Découvrez comment le référencement géolocalisé peut transformer votre visibilité en ligne et attirer des clients qualifiés dans votre zone.',
      cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      published_at: '2024-12-05T10:00:00Z',
      seo_city: 'Lyon',
    },
    {
      id: '2',
      title: '10 Tendances Web Design pour 2025',
      slug: 'tendances-web-design-2025',
      excerpt: 'Les tendances qui vont marquer le web design en 2025 : minimalisme, 3D, animations et expériences immersives.',
      cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
      published_at: '2024-12-01T10:00:00Z',
      seo_city: 'Paris',
    },
    {
      id: '3',
      title: 'Performance Web : Pourquoi Votre Site Doit Être Rapide',
      slug: 'performance-web-importance',
      excerpt: 'La vitesse de votre site impacte directement votre SEO, vos conversions et l\'expérience utilisateur. Voici comment l\'optimiser.',
      cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      published_at: '2024-11-28T10:00:00Z',
      seo_city: 'Marseille',
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
                    {post.seo_city && (
                      <>
                        <span>•</span>
                        <span>📍 {post.seo_city}</span>
                      </>
                    )}
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
          <Link
            href="/#contact"
            className="inline-block glass-dark px-12 py-5 hover:bg-white/5 transition-all duration-300"
          >
            <span className="text-white/80 font-semibold tracking-wider uppercase text-sm">
              Parlons de votre projet
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}


