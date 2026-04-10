import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Questions Fréquentes — Création de Site Internet',
  description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus de travail. FAQ complète par Perrine Huon, développeuse web freelance.',
  alternates: { canonical: 'https://perrinehuon.com/faq' },
  openGraph: {
    title: 'FAQ — Création de Site Internet | Perrine Huon',
    description: 'Réponses à toutes vos questions sur la création de sites internet : tarifs, délais, SEO, technologies, processus.',
    url: 'https://perrinehuon.com/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
