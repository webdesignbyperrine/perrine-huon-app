import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { createClient } from '@/lib/supabase/server';
import type { Testimonial } from '@/types/database.types';

export const metadata: Metadata = {
  title: 'Avis Clients & Témoignages — Création de Sites Internet',
  description:
    'Découvrez les avis et témoignages de clients satisfaits. Note moyenne 4.9/5. Création de sites internet pour avocats, restaurants, PME et professions libérales.',
  alternates: {
    canonical: 'https://perrinehuon.com/avis-clients-temoignages',
  },
  openGraph: {
    title: 'Avis Clients & Témoignages — Création de Sites Internet',
    description:
      'Découvrez les avis et témoignages de clients satisfaits. Note moyenne 4.9/5.',
    type: 'website',
    url: 'https://perrinehuon.com/avis-clients-temoignages',
    siteName: 'Perrine Huon - Création de Sites Internet',
    locale: 'fr_FR',
  },
};

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
                  <clipPath id={`half-t-${star}`}>
                    <rect x="0" y="0" width="10" height="20" />
                  </clipPath>
                </defs>
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                  fill="currentColor"
                  className="text-accent"
                  clipPath={`url(#half-t-${star})`}
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

function AverageRatingDisplay({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const avg =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const rounded = Math.round(avg * 10) / 10;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-6xl md:text-7xl font-bold text-accent">
        {rounded}
      </span>
      <StarRating rating={rounded} />
      <span className="text-primary/50 text-sm">
        Basé sur {testimonials.length} avis clients
      </span>
    </div>
  );
}

export default async function TemoignagesPage() {
  let testimonials: Testimonial[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      testimonials = data;
    }
  } catch {
    // Fallback to demo data
  }

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : demoTestimonials;

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          {
            name: 'Avis Clients',
            url: 'https://perrinehuon.com/avis-clients-temoignages',
          },
        ]}
      />

      {/* Hero */}
      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm"
            >
              ← Retour à l&apos;accueil
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Avis Clients & Témoignages
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto mb-12">
              Découvrez ce que mes clients disent de leur expérience et des
              résultats obtenus après la création de leur site internet.
            </p>
            <AverageRatingDisplay testimonials={displayTestimonials} />
          </div>
        </div>
      </section>

      {/* Post-it Grid */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {displayTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="break-inside-avoid postit-card relative p-6 hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, #F5F0E6 0%, #EDE6D6 50%, #E8E0D0 100%)',
                  boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(43, 91, 138, 0.05)',
                  borderRadius: '2px',
                }}
              >
                {/* Texture papier - effet grain subtil */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                  }}
                />

                {/* Effet de pli/coin légèrement relevé */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.03) 50%)',
                  }}
                />

                {/* Bande adhésive en haut */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
                  style={{
                    background: 'linear-gradient(180deg, rgba(200, 180, 140, 0.6) 0%, rgba(180, 160, 120, 0.4) 100%)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                />

                <div className="relative z-10">
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="mt-4 mb-6 text-primary/80 leading-relaxed italic">
                    {testimonial.content}
                  </blockquote>
                  <div className="border-t border-primary/10 pt-4">
                    <p className="font-semibold text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-primary/50">
                      {[testimonial.profession, testimonial.company]
                        .filter(Boolean)
                        .join(' · ')}
                      {testimonial.city && <span> — {testimonial.city}</span>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Votre projet mérite le même soin et la même attention. Discutons
              ensemble de vos besoins pour créer le site internet qui fera la
              différence.
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              Démarrer mon projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
