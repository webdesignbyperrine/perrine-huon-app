import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site perrinehuon.com — Perrine Huon, développeuse web freelance. Informations légales, hébergement, propriété intellectuelle, RGPD.',
  alternates: { canonical: 'https://perrinehuon.com/mentions-legales' },
};

export default async function MentionsLegalesLayout({
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
