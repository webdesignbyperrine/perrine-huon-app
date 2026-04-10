import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site perrinehuon.com — Perrine Huon, développeuse web freelance. Informations légales, hébergement, propriété intellectuelle, RGPD.',
  alternates: { canonical: 'https://perrinehuon.com/mentions-legales' },
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
