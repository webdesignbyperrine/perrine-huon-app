import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité du site perrinehuon.com — Protection des données personnelles, RGPD, cookies. Perrine Huon, développeuse web freelance.',
  alternates: { canonical: 'https://perrinehuon.com/politique-confidentialite' },
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
