'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle, LoadingSpinner, SectionLink, CTAQuiz } from '@/components/ui';

function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Animations au scroll
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [carouselContainerRef, carouselVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // Navigation du carousel
  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * cardWidth * 0.85,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const goToNext = (maxIndex: number) => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  // Articles de démo
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
    <section id="blog-preview" className="relative pt-8 lg:pt-12 pb-32 lg:pb-40 bg-primary section-dark overflow-hidden">
      {/* Transition ondulée en haut - beige vers bleu - supprimée car FAQPreview gère cette transition */}
      
      {/* Fond avec grain */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0" />
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême gauche (déborde) */}
        <div className="absolute top-[10%] -left-40 w-80 h-80 bg-paper/8 rounded-full blur-[80px]" />
        
        {/* Forme floue accent - extrême droite (déborde) */}
        <div className="absolute bottom-[15%] -right-36 w-64 h-64 bg-accent/8 rounded-full blur-[70px]" />
        
        {/* Cercle contour - extrême droite (majoritairement caché) */}
        <div 
          className="absolute top-[20%] -right-32 w-40 h-40 rounded-full border-2 border-paper/10"
        />
        
        {/* Cercle contour - extrême gauche bas (majoritairement caché) */}
        <div 
          className="absolute bottom-[20%] -left-24 w-32 h-32 rounded-full border border-paper/10"
        />
      </div>
      
      <div className="container mx-auto px-4 pt-8">
        <div ref={titleRef} className="mb-16">
          <SectionTitle
            subtitle="Actualités & Conseils"
            title="Blog"
            description="Conseils, astuces et actualités sur le web design, le développement et le SEO local."
            theme="dark"
            isVisible={titleVisible}
          />
        </div>

        {loading ? (
          <LoadingSpinner theme="dark" />
        ) : (
          <>
            {/* Carousel Container */}
            <div ref={carouselContainerRef} className={`relative max-w-7xl mx-auto transition-all duration-700 ${carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Boutons de navigation */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-paper/10 backdrop-blur-sm border border-paper/20 flex items-center justify-center text-paper hover:bg-paper/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed -translate-x-1/2 lg:-translate-x-6"
                aria-label="Article précédent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => goToNext(displayPosts.length - 1)}
                disabled={currentIndex >= displayPosts.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-paper/10 backdrop-blur-sm border border-paper/20 flex items-center justify-center text-paper hover:bg-paper/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed translate-x-1/2 lg:translate-x-6"
                aria-label="Article suivant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {displayPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] snap-center bg-paper/5 border border-paper/10 rounded-sketch-lg hover:bg-paper/10 hover:border-paper/20 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-sketch-lg">
                      <div 
                        className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{ 
                          backgroundImage: (post.featured_image || post.cover_image_url)
                            ? `url(${post.featured_image || post.cover_image_url})` 
                            : undefined 
                        }}
                      >
                        {!(post.featured_image || post.cover_image_url) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-paper/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3 text-sm text-paper/40">
                        <time>{formatDate(post.published_at || new Date().toISOString())}</time>
                      </div>

                      {/* Titre */}
                      <h3 className="text-lg font-bold mb-3 text-paper group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-paper/60 mb-4 line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                        Lire l&apos;article
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Indicateurs (dots) */}
              <div className="flex justify-center gap-2 mt-6">
                {displayPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-accent w-6' 
                        : 'bg-paper/30 hover:bg-paper/50'
                    }`}
                    aria-label={`Aller à l'article ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div ref={ctaRef} className={`text-center mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <SectionLink href="/blog" theme="dark">Voir tous les articles</SectionLink>
              <CTAQuiz />
            </div>
          </>
        )}
      </div>
      
    </section>
  );
}

export default BlogPreview;
