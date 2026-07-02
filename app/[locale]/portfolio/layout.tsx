import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: 'Réalisations & Projets Sites Web',
    description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeur web freelance. Sites vitrines, e-commerce, applications sur mesure pour PME et professions libérales.',
    alternates: { canonical: 'https://www.perrinehuon.com/portfolio' },
    openGraph: {
      title: 'Réalisations & Projets Sites Web | Perrine Huon',
      description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeur web freelance.',
      url: 'https://www.perrinehuon.com/portfolio',
      siteName: t('siteName'),
    },
  };
}

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = 'https://www.perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: `${baseUrl}${localePath || '/'}` },
          { name: 'Portfolio', url: `${baseUrl}${localePath}/portfolio` },
        ]}
      />
      {children}
    </>
  );
}
