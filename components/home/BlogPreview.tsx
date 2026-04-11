'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle, LoadingSpinner, SectionLink, CTAQuiz } from '@/components/ui';
import { getLocalizedField } from '@/lib/i18n-helpers';

type BlogPostWithCover = BlogPost & { cover_image_url?: string };

function BlogPreview() {
  const t = useTranslations('blogPreview');
  const locale = useLocale() as 'fr' | 'en' | 'es';
  
  const [posts, setPosts] = useState<BlogPostWithCover[]>([]);
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

  const demoPosts = [
    {
      id: '1',
      title: t('demoPosts.1.title'),
      slug: 'seo-local-referencement-geolocalise-2026',
      excerpt: t('demoPosts.1.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      published_at: '2025-12-17T10:00:00Z',
    },
    {
      id: '2',
      title: t('demoPosts.2.title'),
      slug: 'tendances-web-design-2026',
      excerpt: t('demoPosts.2.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      published_at: '2025-12-15T10:00:00Z',
    },
    {
      id: '3',
      title: t('demoPosts.3.title'),
      slug: 'performance-web-vitesse-site-conversion',
      excerpt: t('demoPosts.3.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      published_at: '2025-12-12T10:00:00Z',
    },
    {
      id: '4',
      title: t('demoPosts.4.title'),
      slug: 'vibe-coding-2025-2026',
      excerpt: t('demoPosts.4.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      published_at: '2025-12-10T10:00:00Z',
    },
    {
      id: '5',
      title: t('demoPosts.5.title'),
      slug: 'evenements-design-2025',
      excerpt: t('demoPosts.5.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      published_at: '2025-12-05T10:00:00Z',
    },
    {
      id: '6',
      title: t('demoPosts.6.title'),
      slug: 'ia-creation-web-2025',
      excerpt: t('demoPosts.6.excerpt'),
      featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      cover_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      published_at: '2025-12-01T10:00:00Z',
    },
  ];

  const supabaseHasTranslations = locale === 'fr' || (posts.length > 0 && `title_${locale}` in posts[0]);
  const displayPosts = posts.length > 0 && supabaseHasTranslations ? posts : demoPosts;

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
            subtitle={t('subtitle')}
            title={t('title')}
            description={t('description')}
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
                aria-label={t('previousArticle')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => goToNext(displayPosts.length - 1)}
                disabled={currentIndex >= displayPosts.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-paper/10 backdrop-blur-sm border border-paper/20 flex items-center justify-center text-paper hover:bg-paper/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed translate-x-1/2 lg:translate-x-6"
                aria-label={t('nextArticle')}
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
                        <time>{formatDate(post.published_at || new Date().toISOString(), locale)}</time>
                      </div>

                      {/* Titre */}
                      <h3 className="text-lg font-bold mb-3 text-paper group-hover:text-accent transition-colors">
                        {getLocalizedField(post, 'title', locale)}
                      </h3>
                      <p className="text-paper/60 mb-4 line-clamp-3 text-sm">
                        {getLocalizedField(post, 'excerpt', locale)}
                      </p>
                      <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                        {t('readArticle')}
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
                    aria-label={t('goToArticle', { index: index + 1 })}
                  />
                ))}
              </div>
            </div>

            <div ref={ctaRef} className={`text-center mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <SectionLink href="/blog" theme="dark">{t('viewAll')}</SectionLink>
              <CTAQuiz />
            </div>
          </>
        )}
      </div>
      
    </section>
  );
}

export default BlogPreview;
