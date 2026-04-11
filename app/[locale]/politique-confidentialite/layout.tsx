import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité du site perrinehuon.com — Protection des données personnelles, RGPD, cookies. Perrine Huon, développeuse web freelance.',
  alternates: { canonical: 'https://perrinehuon.com/politique-confidentialite' },
};

export default async function PolitiqueConfidentialiteLayout({
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
