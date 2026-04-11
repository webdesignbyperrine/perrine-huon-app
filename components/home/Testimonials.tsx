'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import type { Testimonial } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle, LoadingSpinner, CTAQuiz } from '@/components/ui';
import { getLocalizedField } from '@/lib/i18n-helpers';

function getDemoTestimonials(t: any): Testimonial[] {
  return [
    {
      id: '1',
      name: t('demo.1.name'),
      profession: t('demo.1.profession'),
      company: null,
      city: null,
      content: t('demo.1.content'),
      rating: 5,
      is_published: true,
      sort_order: 1,
      created_at: '',
    },
    {
      id: '2',
      name: t('demo.2.name'),
      profession: t('demo.2.profession'),
      company: null,
      city: null,
      content: t('demo.2.content'),
      rating: 5,
      is_published: true,
      sort_order: 2,
      created_at: '',
    },
    {
      id: '3',
      name: t('demo.3.name'),
      profession: t('demo.3.profession'),
      company: null,
      city: null,
      content: t('demo.3.content'),
      rating: 5,
      is_published: true,
      sort_order: 3,
      created_at: '',
    },
    {
      id: '4',
      name: t('demo.4.name'),
      profession: t('demo.4.profession'),
      company: null,
      city: null,
      content: t('demo.4.content'),
      rating: 5,
      is_published: true,
      sort_order: 4,
      created_at: '',
    },
    {
      id: '5',
      name: t('demo.5.name'),
      profession: t('demo.5.profession'),
      company: null,
      city: null,
      content: t('demo.5.content'),
      rating: 5,
      is_published: true,
      sort_order: 5,
      created_at: '',
    },
    {
      id: '6',
      name: t('demo.6.name'),
      profession: t('demo.6.profession'),
      company: null,
      city: null,
      content: t('demo.6.content'),
      rating: 4.5,
      is_published: true,
      sort_order: 6,
      created_at: '',
    },
  ];
}

function StarRating({ rating }: { rating: number }) {
  const t = useTranslations('testimonials');
  return (
    <div className="flex gap-1" aria-label={t('ratingAria', { rating })}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg key={star} className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            {filled ? (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill="currentColor"
                className="text-accent"
              />
            ) : half ? (
              <>
                <defs>
                  <clipPath id={`half-${star}`}>
                    <rect x="0" y="0" width="10" height="20" />
                  </clipPath>
                </defs>
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                  fill="currentColor"
                  className="text-accent"
                  clipPath={`url(#half-${star})`}
                />
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                  fill="currentColor"
                  className="text-primary/15"
                />
              </>
            ) : (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill="currentColor"
                className="text-primary/15"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function TestimonialContent({ testimonial, isSecond }: { testimonial: Testimonial, isSecond: boolean }) {
  const locale = useLocale() as 'fr' | 'en' | 'es';
  
  return (
    <div className={isSecond ? 'border-t border-gray-400/30 pt-4' : ''}>
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-2 mb-2 text-gray-800 leading-relaxed text-sm italic line-clamp-3">
        {getLocalizedField(testimonial, 'content', locale)}
      </blockquote>
      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
      <p className="text-xs text-gray-600">
        {[getLocalizedField(testimonial, 'profession', locale), testimonial.company].filter(Boolean).join(' · ')}
      </p>
    </div>
  );
}

interface PostItStackProps {
  testimonialPairs: [Testimonial, Testimonial?][];
  delayOffset: number;
}

function PostItStack({ testimonialPairs, delayOffset }: PostItStackProps) {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isFalling, setIsFalling] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (stackRef.current) observer.observe(stackRef.current);
    return () => observer.disconnect();
  }, []);

  const fallToNext = useCallback(() => {
    if (isFalling || testimonialPairs.length <= 1) return;
    setIsFalling(true);

    setTimeout(() => {
      setCurrentPairIndex(prev => (prev + 1) % testimonialPairs.length);
      setIsFalling(false);
    }, 1200);
  }, [isFalling, testimonialPairs.length]);

  useEffect(() => {
    if (!isVisible) return;

    const initialDelay = setTimeout(() => {
      autoPlayRef.current = setInterval(fallToNext, 5000);
    }, delayOffset);

    return () => {
      clearTimeout(initialDelay);
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible, fallToNext, delayOffset]);

  const handleClick = () => {
    if (isFalling) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    fallToNext();
    autoPlayRef.current = setInterval(fallToNext, 5000);
  };

  const currentPair = testimonialPairs[currentPairIndex];
  const nextPairIndex = (currentPairIndex + 1) % testimonialPairs.length;
  const nextPair = testimonialPairs[nextPairIndex];

  const renderPostIt = (pair: (Testimonial | undefined)[], isTop: boolean, falling: boolean) => (
    <div
      className={`postit-card absolute inset-0 p-5 flex flex-col ${isTop ? 'cursor-pointer' : ''} ${
        isTop && falling ? 'is-falling' : ''
      }`}
      style={{
        background: 'linear-gradient(145deg, #F5F0E6 0%, #EDE6D6 50%, #E8E0D0 100%)',
        boxShadow: isTop 
          ? '3px 3px 8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(43, 91, 138, 0.05)'
          : '2px 2px 6px rgba(0, 0, 0, 0.08)',
        borderRadius: '2px',
        zIndex: isTop ? 2 : 1,
      }}
      onClick={isTop ? handleClick : undefined}
    >
      {/* Texture papier */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Coin relevé */}
      <div 
        className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%)',
        }}
      />

      {/* Bande adhésive */}
      <div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
        style={{
          background: 'linear-gradient(180deg, rgba(200, 180, 140, 0.6) 0%, rgba(180, 160, 120, 0.4) 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {pair.map((testimonial, idx) => testimonial && (
          <TestimonialContent key={testimonial.id} testimonial={testimonial} isSecond={idx === 1} />
        ))}
      </div>
    </div>
  );

  return (
    <div ref={stackRef} className="relative h-[420px] md:h-[380px] overflow-hidden">
      {/* Post-it du dessous (suivant) - toujours présent */}
      {renderPostIt(nextPair, false, false)}
      
      {/* Post-it du dessus (actuel) - celui qui tombe */}
      {renderPostIt(currentPair, true, isFalling)}

      {/* Indicateurs */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {testimonialPairs.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentPairIndex ? 'bg-accent scale-125' : 'bg-primary/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'fr' | 'en' | 'es';
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  const demoTestimonials = getDemoTestimonials(t);

  useEffect(() => {
    async function fetchTestimonials() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const supabaseHasTranslations = locale === 'fr' || (testimonials.length > 0 && `content_${locale}` in testimonials[0]);
  const displayTestimonials = testimonials.length > 0 && supabaseHasTranslations ? testimonials : demoTestimonials;

  const createPairsForStack = useCallback((startIndex: number, totalStacks: number): [Testimonial, Testimonial?][] => {
    const pairs: [Testimonial, Testimonial?][] = [];
    const testimonialsPerStack = Math.ceil(displayTestimonials.length / totalStacks);
    
    for (let i = 0; i < testimonialsPerStack; i += 2) {
      const idx1 = (startIndex + i) % displayTestimonials.length;
      const idx2 = (startIndex + i + 1) % displayTestimonials.length;
      
      if (i + 1 < testimonialsPerStack) {
        pairs.push([displayTestimonials[idx1], displayTestimonials[idx2]]);
      } else {
        pairs.push([displayTestimonials[idx1]]);
      }
    }
    
    return pairs.length > 0 ? pairs : [[displayTestimonials[0]]];
  }, [displayTestimonials]);

  const stacksData = [
    createPairsForStack(0, 3),
    createPairsForStack(2, 3),
    createPairsForStack(4, 3),
  ];

  return (
    <section id="testimonials" className="relative pt-32 lg:pt-40 pb-32 lg:pb-40 bg-paper-light grain-overlay overflow-hidden">
      {/* Transition ondulée en haut - depuis section bleue (About) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <svg
          className="w-full h-20 lg:h-28"
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 0 L0 60 Q 200 30 400 60 T 800 60 T 1200 60 T 1600 60 L1600 0 Z" fill="#2B5B8A"/>
        </svg>
      </div>

      {/* Formes décoratives (desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[10%] -right-40 w-[360px] h-[360px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, var(--primary-blue) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[8%] -left-36 w-64 h-64 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 60%)' }}
        />
        <div className="absolute top-[25%] -left-28 w-36 h-36 rounded-full border-2 border-primary/10" />
        <div className="absolute bottom-[18%] -right-24 w-32 h-32 rounded-full border border-primary/8" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="mb-16">
          <SectionTitle
            subtitle={t('subtitle')}
            title={t('title')}
            description={t('description')}
            isVisible={titleVisible}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div
              ref={gridRef}
              className={`relative max-w-7xl mx-auto transition-all duration-700 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Grille des 3 piles de post-its - 1 en mobile, 3 en desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 pb-8">
                {stacksData.map((pairs, stackIndex) => (
                  <div 
                    key={stackIndex}
                    className={stackIndex > 0 ? 'hidden md:block' : ''}
                  >
                    <PostItStack
                      testimonialPairs={pairs}
                      delayOffset={stackIndex * 2000}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={ctaRef}
              className={`text-center mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <CTAQuiz />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
