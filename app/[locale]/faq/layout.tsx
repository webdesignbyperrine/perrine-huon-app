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
    title: 'Questions Fréquentes — Création de Site Internet',
    description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus de travail. FAQ complète par Perrine Huon, développeuse web freelance.',
    alternates: { canonical: 'https://perrinehuon.com/faq' },
    openGraph: {
      title: 'FAQ — Création de Site Internet | Perrine Huon',
      description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus.',
      url: 'https://perrinehuon.com/faq',
      siteName: t('siteName'),
    },
  };
}

export default async function FAQLayout({
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
