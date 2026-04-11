import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { createClient } from '@/lib/supabase/server';
import type { Testimonial } from '@/types/database.types';
import { getLocalizedField } from '@/lib/i18n-helpers';
import type { Locale } from '@/i18n/config';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'testimonials-page' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: 'https://perrinehuon.com/avis-clients-temoignages',
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      url: 'https://perrinehuon.com/avis-clients-temoignages',
      siteName: tMeta('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'en' ? 'en_US' : 'es_ES',
    },
  };
}

function StarRating({ rating, ariaLabel }: { rating: number; ariaLabel: string }) {
  return (
    <div className="flex gap-1" aria-label={ariaLabel}>
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
  translations,
}: {
  testimonials: Testimonial[];
  translations: { basedOn: string; reviews: string; ariaLabel: string };
}) {
  const avg =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const rounded = Math.round(avg * 10) / 10;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-6xl md:text-7xl font-bold text-accent">
        {rounded}
      </span>
      <StarRating rating={rounded} ariaLabel={translations.ariaLabel} />
      <span className="text-primary/50 text-sm">
        {translations.basedOn} {testimonials.length} {translations.reviews}
      </span>
    </div>
  );
}

export default async function TemoignagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'testimonials-page' });
  const tCommon = await getTranslations({ locale, namespace: 'testimonials' });
  
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

  const demoTestimonials = getDemoTestimonials(tCommon);
  const supabaseHasTranslations = locale === 'fr' || (testimonials.length > 0 && `content_${locale}` in testimonials[0]);
  const displayTestimonials =
    testimonials.length > 0 && supabaseHasTranslations ? testimonials : demoTestimonials;

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          {
            name: t('breadcrumb.testimonials'),
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
              {t('hero.back_link')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto mb-12">
              {t('hero.subtitle')}
            </p>
            <AverageRatingDisplay 
              testimonials={displayTestimonials}
              translations={{
                basedOn: t('hero.rating_based_on'),
                reviews: t('hero.rating_reviews'),
                ariaLabel: t('rating.aria_label')
              }}
            />
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
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                  }}
                />

                <div 
                  className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.03) 50%)',
                  }}
                />

                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
                  style={{
                    background: 'linear-gradient(180deg, rgba(200, 180, 140, 0.6) 0%, rgba(180, 160, 120, 0.4) 100%)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                />

                <div className="relative z-10">
                  <StarRating rating={testimonial.rating} ariaLabel={t('rating.aria_label')} />
                  <blockquote className="mt-4 mb-6 text-gray-800 leading-relaxed italic">
                    {getLocalizedField(testimonial, 'content', locale as Locale)}
                  </blockquote>
                  <div className="border-t border-gray-400/30 pt-4">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {[getLocalizedField(testimonial, 'profession', locale as Locale), testimonial.company]
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
              {t('cta.title')}
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
