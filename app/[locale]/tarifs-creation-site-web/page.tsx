import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMetadata = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'tarifs' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: { canonical: 'https://perrinehuon.com/tarifs-creation-site-web' },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      url: 'https://perrinehuon.com/tarifs-creation-site-web',
      siteName: tMetadata('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

const pricingPlans = [
  {
    id: 'vitrine',
    popular: false,
  },
  {
    id: 'ecommerce',
    popular: true,
  },
  {
    id: 'webapp',
    popular: false,
  },
  {
    id: 'maintenance',
    popular: false,
  },
];

const inclusions = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const faqs = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tarifs' });

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          { name: t('breadcrumb.pricing'), url: 'https://perrinehuon.com/tarifs-creation-site-web' },
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
              ← {t('hero.backLink')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="mt-10">
              <Link href="/?openQualifier=true" className="btn-cta">
                {t('hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-accent shadow-sketch-accent'
                    : 'border-primary/10 hover:border-primary/20'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    {t('plans.vitrine.popularBadge')}
                  </span>
                )}
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t(`plans.${plan.id}.name`)}
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-accent mb-3">
                  {t(`plans.${plan.id}.price`)}
                </p>
                <p className="text-primary/60 text-sm mb-6 leading-relaxed">
                  {t(`plans.${plan.id}.description`)}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const featureKey = `plans.${plan.id}.features.${i}`;
                    try {
                      const feature = t(featureKey);
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-primary/70 text-sm"
                        >
                          <svg
                            className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      );
                    } catch {
                      return null;
                    }
                  }).filter(Boolean)}
                </ul>
                <Link
                  href="/?openQualifier=true"
                  className={
                    plan.popular ? 'btn-cta text-center' : 'btn-sketch text-center'
                  }
                >
                  {t('plans.vitrine.cta')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('inclusions.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm mb-4">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {t(`inclusions.items.${index}.title`)}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {t(`inclusions.items.${index}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('faqs.title')}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.id}
                  className="group bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-primary font-semibold text-lg hover:bg-primary/5 transition-colors">
                    {t(`faqs.items.${index}.question`)}
                    <span className="flex-shrink-0 ml-4 text-accent group-open:rotate-45 transition-transform text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-primary/70 leading-relaxed">
                    {t(`faqs.items.${index}.answer`)}
                  </div>
                </details>
              ))}
            </div>
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
