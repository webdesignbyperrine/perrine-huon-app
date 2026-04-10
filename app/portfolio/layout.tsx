import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations & Projets Sites Web',
  description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeuse web freelance. Sites vitrines, e-commerce, applications sur mesure pour PME et professions libérales.',
  alternates: { canonical: 'https://perrinehuon.com/portfolio' },
  openGraph: {
    title: 'Réalisations & Projets Sites Web | Perrine Huon',
    description: 'Découvrez les sites internet et applications web créés par Perrine Huon, développeuse web freelance.',
    url: 'https://perrinehuon.com/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
