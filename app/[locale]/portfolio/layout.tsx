import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: 'Réalisations & Projets Sites Web',
    description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeuse web freelance. Sites vitrines, e-commerce, applications sur mesure pour PME et professions libérales.',
    alternates: { canonical: 'https://perrinehuon.com/portfolio' },
    openGraph: {
      title: 'Réalisations & Projets Sites Web | Perrine Huon',
      description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeuse web freelance.',
      url: 'https://perrinehuon.com/portfolio',
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
  return children;
}
