'use client';

import { useEffect, useState } from 'react';
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            >
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`relative bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 flex flex-col ${
                    gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Guillemet décoratif */}
                  <span className="absolute -top-3 left-6 text-5xl font-serif text-accent/20 leading-none select-none" aria-hidden="true">
                    &ldquo;
                  </span>

                  <StarRating rating={testimonial.rating} />

                  <blockquote className="mt-4 mb-6 text-primary/70 leading-relaxed flex-1">
                    {testimonial.content}
                  </blockquote>

                  <div className="border-t border-primary/10 pt-4 mt-auto">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-primary/50">
                      {[testimonial.profession, testimonial.company].filter(Boolean).join(' · ')}
                      {testimonial.city && (
                        <span> — {testimonial.city}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
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
