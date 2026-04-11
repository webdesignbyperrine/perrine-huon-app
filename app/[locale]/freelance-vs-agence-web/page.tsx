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
  const t = await getTranslations({ locale, namespace: 'freelance.metadata' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://perrinehuon.com/freelance-vs-agence-web',
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: 'https://perrinehuon.com/freelance-vs-agence-web',
      siteName: tMeta('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}


export default async function FreelanceVsAgencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'freelance' });

  const comparisonRows = t.raw('comparisonTable.rows');
  const freelanceAdvantages = t.raw('whenChooseFreelance.advantages');
  const agenceAdvantages = t.raw('whenChooseAgency.advantages');
  const perrineBenefits = t.raw('whyPerrine.benefits');
  const faqs = t.raw('faqs.items');

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          {
            name: t('breadcrumb.current'),
            url: 'https://perrinehuon.com/freelance-vs-agence-web',
          },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm"
            >
              ← {t('hero.backToHome')}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('comparisonTable.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left p-4 md:p-6 text-primary font-bold">
                      {t('comparisonTable.headers.criterion')}
                    </th>
                    <th className="p-4 md:p-6 text-accent font-bold text-center">
                      {t('comparisonTable.headers.freelance')}
                    </th>
                    <th className="p-4 md:p-6 text-primary font-bold text-center">
                      {t('comparisonTable.headers.agency')}
                    </th>
                    <th className="p-4 md:p-6 text-primary/50 font-bold text-center">
                      {t('comparisonTable.headers.diy')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row: any, index: number) => (
                    <tr
                      key={row.criterion}
                      className={
                        index % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-primary/[0.02]'
                      }
                    >
                      <td className="p-4 md:p-6 text-primary font-medium text-sm">
                        {row.criterion}
                      </td>
                      <td className="p-4 md:p-6 text-center text-accent text-sm font-medium">
                        {row.freelance}
                      </td>
                      <td className="p-4 md:p-6 text-center text-primary/70 text-sm">
                        {row.agency}
                      </td>
                      <td className="p-4 md:p-6 text-center text-primary/50 text-sm">
                        {row.diy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quand choisir un freelance */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('whenChooseFreelance.title')}
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              {t('whenChooseFreelance.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelanceAdvantages.map((item: any) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-accent/20"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-accent"
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
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quand choisir une agence */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('whenChooseAgency.title')}
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              {t('whenChooseAgency.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agenceAdvantages.map((item: any) => (
                <div
                  key={item.title}
                  className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Les avantages de travailler avec Perrine */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('whyPerrine.title')}
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              {t('whyPerrine.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perrineBenefits.map((item: any, index: number) => (
                <div
                  key={item.title}
                  className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm mb-4 inline-flex">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {item.description}
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
              {faqs.map((faq: any) => (
                <details
                  key={faq.question}
                  className="group bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-primary font-semibold text-lg hover:bg-primary/5 transition-colors">
                    {faq.question}
                    <span className="flex-shrink-0 ml-4 text-accent group-open:rotate-45 transition-transform text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-primary/70 leading-relaxed">
                    {faq.answer}
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
