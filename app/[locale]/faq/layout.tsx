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
    title: 'Questions Fréquentes — Création de Site Internet',
    description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus de travail. FAQ complète par Perrine Huon, développeur web freelance.',
    alternates: { canonical: 'https://www.perrinehuon.com/faq' },
    openGraph: {
      title: 'FAQ — Création de Site Internet | Perrine Huon',
      description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus.',
      url: 'https://www.perrinehuon.com/faq',
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

  const baseUrl = 'https://www.perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: `${baseUrl}${localePath || '/'}` },
          { name: 'FAQ', url: `${baseUrl}${localePath}/faq` },
        ]}
      />
      {children}
    </>
  );
}
