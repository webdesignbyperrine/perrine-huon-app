'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Testimonial } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle, LoadingSpinner, CTAQuiz } from '@/components/ui';

const demoTestimonials: Testimonial[] = [
  {
    id: '1', name: 'Marie L.', profession: 'Avocate', company: null, city: 'Paris 8e',
    content: 'Mon site reflète enfin le sérieux de mon cabinet. Perrine a parfaitement compris mes contraintes déontologiques et a créé un site élégant qui inspire confiance à mes clients.',
    rating: 5.0, is_published: true, sort_order: 1, created_at: '',
  },
  {
    id: '2', name: 'Thomas D.', profession: 'Restaurateur', company: 'Le Comptoir', city: 'Lyon',
    content: 'Nos réservations en ligne ont augmenté de 40% depuis le nouveau site. L\'intégration du menu interactif et du système de réservation est impeccable.',
    rating: 5.0, is_published: true, sort_order: 2, created_at: '',
  },
  {
    id: '3', name: 'Sophie M.', profession: 'Expert-Comptable', company: null, city: 'Bordeaux',
    content: 'Un site moderne qui me démarque des autres cabinets. Le SEO local a transformé ma visibilité : je reçois maintenant des demandes qualifiées chaque semaine.',
    rating: 5.0, is_published: true, sort_order: 3, created_at: '',
  },
  {
    id: '4', name: 'Jean-Pierre R.', profession: 'Menuisier ébéniste', company: null, city: 'Lille',
    content: 'Enfin visible sur Google ! Mes demandes de devis ont doublé en 3 mois. Le portfolio met parfaitement en valeur mon travail. Simple, efficace, professionnel.',
    rating: 5.0, is_published: true, sort_order: 4, created_at: '',
  },
  {
    id: '5', name: 'Claire B.', profession: 'Présidente d\'association', company: null, city: 'Paris 15e',
    content: 'Budget serré mais résultat professionnel. Perrine a compris nos besoins associatifs et a livré un site qui facilite nos inscriptions et notre communication.',
    rating: 5.0, is_published: true, sort_order: 5, created_at: '',
  },
  {
    id: '6', name: 'Karim A.', profession: 'Kinésithérapeute', company: null, city: 'Marseille',
    content: 'La prise de rendez-vous en ligne intégrée au site a changé mon quotidien. Moins d\'appels téléphoniques, plus de temps pour mes patients.',
    rating: 4.5, is_published: true, sort_order: 6, created_at: '',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Note : ${rating} sur 5`}>
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
          <div key={testimonial.id} className={idx === 1 ? 'border-t border-primary/10 pt-4' : ''}>
            <StarRating rating={testimonial.rating} />
            <blockquote className="mt-2 mb-2 text-primary/80 leading-relaxed text-sm italic line-clamp-3">
              {testimonial.content}
            </blockquote>
            <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
            <p className="text-xs text-primary/50">
              {[testimonial.profession, testimonial.company].filter(Boolean).join(' · ')}
            </p>
          </div>
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

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

  const displayTestimonials = testimonials.length > 0 ? testimonials : demoTestimonials;

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
            subtitle="Ils nous font confiance"
            title="Témoignages"
            description="Découvrez ce que nos clients disent de leur expérience et des résultats obtenus."
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
