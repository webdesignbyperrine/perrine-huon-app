import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const baseUrl = 'https://perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}/blog`;

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: { canonical: url },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url,
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <>{children}</>;
}
