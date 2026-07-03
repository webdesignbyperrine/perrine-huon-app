import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

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
    alternates: { canonical: 'https://www.perrinehuon.com/tarifs-creation-site-web' },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      url: 'https://www.perrinehuon.com/tarifs-creation-site-web',
      siteName: tMetadata('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

const projectTypes = [
  { id: 'landingPage', baseCount: 5, optionsCount: 8 },
  { id: 'vitrine', baseCount: 6, optionsCount: 8 },
  { id: 'multipage', baseCount: 6, optionsCount: 8 },
  { id: 'ecommerce', baseCount: 6, optionsCount: 8 },
  { id: 'webapp', baseCount: 5, optionsCount: 8 },
  { id: 'mvp', baseCount: 5, optionsCount: 6 },
  { id: 'crm', baseCount: 5, optionsCount: 8 },
  { id: 'refonte', baseCount: 5, optionsCount: 8 },
  { id: 'seo', baseCount: 5, optionsCount: 8 },
];

const reasons = [0, 1, 2];
const inclusions = [0, 1, 2, 3, 4, 5];
const faqs = [0, 1, 2, 3, 4];

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tarifs' });

  const faqJsonLdItems = faqs.map((idx) => ({
    question: t(`faqs.items.${idx}.question`),
    answer: t(`faqs.items.${idx}.answer`),
  }));

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://www.perrinehuon.com' },
          { name: t('breadcrumb.pricing'), url: 'https://www.perrinehuon.com/tarifs-creation-site-web' },
        ]}
      />
      <FAQPageJsonLd faqs={faqJsonLdItems} />

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

      {/* Pourquoi pas de prix fixes */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('whyNoPrice.title')}
            </h2>
            <p className="text-center text-primary/60 text-lg max-w-3xl mx-auto mb-14">
              {t('whyNoPrice.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasons.map((idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 border-primary/10"
                >
                  <span className="text-6xl font-black text-accent mb-4 leading-none">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {t(`whyNoPrice.reasons.${idx}.title`)}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {t(`whyNoPrice.reasons.${idx}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types de projets */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('projects.sectionTitle')}
            </h2>
            <p className="text-center text-primary/60 text-lg max-w-3xl mx-auto mb-14">
              {t('projects.sectionDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projectTypes.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 border-primary/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {t(`projects.${project.id}.name`)}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed mb-6">
                    {t(`projects.${project.id}.description`)}
                  </p>

                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
                    {t('projects.baseLabel')}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {Array.from({ length: project.baseCount }).map((_, i) => (
                      <li key={i} className="flex items-start gap-2 text-primary/70 text-sm">
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
                        {t(`projects.${project.id}.base.${i}`)}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-bold text-primary/40 uppercase tracking-wider mb-3">
                    {t('projects.optionsLabel')}
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {Array.from({ length: project.optionsCount }).map((_, i) => (
                      <li key={i} className="flex items-start gap-2 text-primary/50 text-sm">
                        <span className="text-accent/60 flex-shrink-0 font-bold leading-tight mt-0.5">+</span>
                        {t(`projects.${project.id}.options.${i}`)}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/?openQualifier=true"
                    className="btn-sketch text-center text-sm"
                  >
                    {t('projects.ctaLabel')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('inclusions.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map((index) => (
                <div
                  key={index}
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
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('faqs.title')}
            </h2>
            <div className="space-y-4">
              {faqs.map((index) => (
                <details
                  key={index}
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
