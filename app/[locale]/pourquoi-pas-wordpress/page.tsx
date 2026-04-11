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
  const t = await getTranslations({ locale, namespace: 'wordpress.metadata' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://perrinehuon.com/pourquoi-pas-wordpress',
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: 'https://perrinehuon.com/pourquoi-pas-wordpress',
      siteName: tMeta('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}


export default async function PourquoiPasWordPressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'wordpress' });

  const comparisonRows = t.raw('comparisonTable.rows');
  const sections = t.raw('sections');
  const wordpressOkCases = t.raw('whenWordpressOk.cases');

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          {
            name: t('breadcrumb.current'),
            url: 'https://perrinehuon.com/pourquoi-pas-wordpress',
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
                    <th className="p-4 md:p-6 text-primary/70 font-bold text-center">
                      {t('comparisonTable.headers.wordpress')}
                    </th>
                    <th className="p-4 md:p-6 text-accent font-bold text-center">
                      {t('comparisonTable.headers.custom')}
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
                      <td
                        className={`p-4 md:p-6 text-center text-sm ${
                          row.winner === 'wordpress'
                            ? 'text-accent font-medium'
                            : 'text-primary/50'
                        }`}
                      >
                        {row.wordpress}
                      </td>
                      <td
                        className={`p-4 md:p-6 text-center text-sm ${
                          row.winner === 'custom'
                            ? 'text-accent font-medium'
                            : 'text-primary/50'
                        }`}
                      >
                        {row.custom}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      {sections.map((section: any, sectionIndex: number) => (
        <section
          key={section.title}
          className={`py-20 ${
            sectionIndex % 2 === 0
              ? 'bg-paper'
              : 'bg-paper-light grain-overlay'
          }`}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph: string, i: number) => (
                  <p
                    key={i}
                    className="text-primary/70 text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Quand WordPress peut convenir */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              {t('whenWordpressOk.title')}
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              {t('whenWordpressOk.subtitle')}
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 border-primary/10">
              <ul className="space-y-4">
                {wordpressOkCases.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-primary/70"
                  >
                    <span className="flex-shrink-0 mt-1 text-primary/30">
                      —
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-primary/60 text-sm leading-relaxed border-t border-primary/10 pt-6">
                {t('whenWordpressOk.disclaimer')}
              </p>
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
