import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { Sun, Activity, Heart, Sprout, Bird, Code, Rocket } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'biography' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: 'https://perrinehuon.com/mon-parcours',
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      url: 'https://perrinehuon.com/mon-parcours',
      siteName: tMeta('siteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'en' ? 'en_US' : 'es_ES',
    },
  };
}

const lifeIcons = [
  Sun,      // 1. L'enfance - soleil
  Activity, // 2. La leucémie - battement cardiaque
  Heart,    // 3. L'adoption - coeur
  Sprout,   // 4. La dépression/reconstruction - pousse
  Bird,     // 5. Le divorce/liberté - oiseau en vol
  Code,     // 6. La reconversion tech - code
  Rocket,   // 7. Paris et le freelance - fusée
];

export default async function MonParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'biography' });

  const lives = [
    { number: 1, title: t('lives.0.title'), content: t.raw('lives.0.content') },
    { number: 2, title: t('lives.1.title'), content: t.raw('lives.1.content') },
    { number: 3, title: t('lives.2.title'), content: t.raw('lives.2.content') },
    { number: 4, title: t('lives.3.title'), content: t.raw('lives.3.content') },
    { number: 5, title: t('lives.4.title'), content: t.raw('lives.4.content') },
    { number: 6, title: t('lives.5.title'), content: t.raw('lives.5.content') },
    { number: 7, title: t('lives.6.title'), content: t.raw('lives.6.content') },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          { name: t('breadcrumb.biography'), url: 'https://perrinehuon.com/mon-parcours' },
        ]}
      />

      <div className="min-h-screen bg-paper dark:bg-primary">
        {/* Header avec photo de fond */}
        <header className="relative pt-8 lg:pt-12 pb-16 lg:pb-24 section-dark overflow-hidden">
          {/* Photo de fond */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/perrine-huon-hero-parcours.png"
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
          {/* Overlay bleu avec opacité */}
          <div className="absolute inset-0 z-[1]" style={{ backgroundColor: 'rgba(43, 91, 138, 0.82)' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 lg:mb-10 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('hero.backLink')}
              </Link>

              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Photo portrait cercle */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-3 border-2 border-white/20 rounded-full transform rotate-3" />
                  <div className="relative w-40 h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <Image
                      src="/images/perrine-huon-portrait-parcours-v2.png"
                      alt="Perrine Huon"
                      fill
                      className="object-cover"
                      style={{ objectPosition: '50% 50%' }}
                      priority
                      sizes="(max-width: 768px) 160px, 208px"
                    />
                  </div>
                </div>

                {/* Titre */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {t('hero.title')}
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/75 leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl font-light text-primary-dark dark:text-paper/90 leading-relaxed">
                {t('intro')}
              </p>
            </div>
          </div>
        </section>

        {/* Les 7 vies */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
              {lives.map((life, index) => (
                <article 
                  key={life.number}
                  className="relative"
                >
                  <div className="flex items-start gap-5 lg:gap-8 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#2B5B8A', color: '#FFFFFF' }}>
                      {(() => {
                        const Icon = lifeIcons[index];
                        return <Icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />;
                      })()}
                    </div>
                    <div className="flex-1 pt-1.5 lg:pt-2">
                      <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark dark:text-paper">
                        {life.title}
                      </h2>
                    </div>
                  </div>

                  <div className="ml-0 lg:ml-[5.5rem]">
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none text-primary-dark/80 dark:text-paper/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: life.content }}
                    />
                  </div>

                  {index < lives.length - 1 && (
                    <div className="mt-12 lg:mt-16 border-b border-primary-dark/10 dark:border-paper/10" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 lg:py-16 bg-primary/5 dark:bg-paper/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p 
                className="text-xl lg:text-2xl font-light text-primary-dark dark:text-paper/90 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: t.raw('conclusion') }}
              />

              {/* Mes livres */}
              <div className="mt-12 lg:mt-16 p-6 lg:p-8 bg-paper dark:bg-primary border-2 border-primary-dark/10 dark:border-paper/10 rounded-sketch-lg">
                <h3 className="text-2xl lg:text-3xl font-bold text-primary-dark dark:text-paper mb-6">
                  {t('books.title')}
                </h3>
                <p className="text-lg text-primary-dark/80 dark:text-paper/70 mb-6">
                  {t('books.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.amazon.fr/stores/Perrine-Huon/author/B004MZ3BJQ?ref=ap_rdr&shoppingPortalEnabled=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 px-6 py-3 border-2 rounded-sketch-lg transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#2B5B8A', color: '#FFFFFF', borderColor: '#2B5B8A' }}
                  >
                    <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span className="font-medium">{t('books.cta')}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="http://www.michel-lafon.fr/auteur/124-Perrine+Huon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 px-6 py-3 bg-transparent text-primary-dark dark:text-paper border-2 border-primary-dark/20 dark:border-paper/20 hover:border-primary dark:hover:border-paper/40 rounded-sketch-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-medium">{t('books.editorLink')}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Lien LinkedIn */}
              <div className="mt-8 text-center">
                <a
                  href="https://www.linkedin.com/pulse/vies-de-merde-perrine-huon--smo4e/?trackingId=kW%2Ff0wZ%2FR3SvFEvV207e8A%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-dark/60 dark:text-paper/60 hover:text-primary-dark dark:hover:text-paper transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm">{t('linkedinLink')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark dark:text-paper mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg lg:text-xl text-primary-dark/70 dark:text-paper/70 mb-8">
                {t('cta.description')}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-sketch-lg transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#2B5B8A', color: '#FFFFFF' }}
              >
                {t('cta.button')}
                <svg className="w-5 h-5" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
