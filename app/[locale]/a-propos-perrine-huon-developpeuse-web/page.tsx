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
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      url: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
      siteName: tMeta('siteName'),
      locale: 'fr_FR',
    },
  };
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      title: t('approche.values.0.title'),
      description: t('approche.values.0.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: t('approche.values.1.title'),
      description: t('approche.values.1.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t('approche.values.2.title'),
      description: t('approche.values.2.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t('approche.values.3.title'),
      description: t('approche.values.3.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const skills = [
    { name: 'Next.js', category: t('skills.categories.frontend') },
    { name: 'React', category: t('skills.categories.frontend') },
    { name: 'TypeScript', category: t('skills.categories.frontend') },
    { name: 'Tailwind CSS', category: t('skills.categories.frontend') },
    { name: 'Supabase', category: t('skills.categories.backend') },
    { name: 'PostgreSQL', category: t('skills.categories.backend') },
    { name: 'Node.js', category: t('skills.categories.backend') },
    { name: 'Vercel', category: t('skills.categories.infra') },
    { name: 'SEO Technique', category: t('skills.categories.marketing') },
    { name: 'SEO Local', category: t('skills.categories.marketing') },
    { name: 'Figma', category: t('skills.categories.design') },
    { name: 'UI/UX Design', category: t('skills.categories.design') },
  ];

  const differentiators = [
    {
      title: t('differentiators.items.0.title'),
      description: t('differentiators.items.0.description'),
    },
    {
      title: t('differentiators.items.1.title'),
      description: t('differentiators.items.1.description'),
    },
    {
      title: t('differentiators.items.2.title'),
      description: t('differentiators.items.2.description'),
    },
    {
      title: t('differentiators.items.3.title'),
      description: t('differentiators.items.3.description'),
    },
    {
      title: t('differentiators.items.4.title'),
      description: t('differentiators.items.4.description'),
    },
    {
      title: t('differentiators.items.5.title'),
      description: t('differentiators.items.5.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://perrinehuon.com' },
          {
            name: t('breadcrumb.about'),
            url: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
          },
        ]}
      />

      {/* Hero */}
      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm"
            >
              {t('hero.backLink')}
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                  {t('hero.name')}
                </h1>
                <p className="text-xl md:text-2xl text-accent font-semibold mb-4">
                  {t('hero.title')}
                </p>
                <p className="text-lg text-primary/60 leading-relaxed mb-8">
                  {t('hero.description')}
                </p>
                <Link href="/?openQualifier=true" className="btn-cta">
                  {t('hero.cta')}
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-sketch-xl bg-primary/5 border-2 border-primary/10 flex items-center justify-center">
                  <span className="text-primary/30 text-sm">{t('hero.photoPlaceholder')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon Parcours */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('parcours.title')}
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 md:p-12 border-2 border-primary/10">
              <div className="space-y-6 text-primary/70 leading-relaxed text-lg">
                <p>{t('parcours.paragraphs.0')}</p>
                <p>{t('parcours.paragraphs.1')}</p>
                <p>{t('parcours.paragraphs.2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon Approche */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('approche.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-5 bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    {value.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mes Compétences */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('skills.title')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-sketch-lg p-5 border-2 border-primary/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-primary font-semibold text-sm">
                    {skill.name}
                  </span>
                  <span className="text-primary/40 text-xs mt-1">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi me choisir */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              {t('differentiators.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item, index) => (
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
