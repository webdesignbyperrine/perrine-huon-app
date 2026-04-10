import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Webdesign & Développement Web',
  description: 'Conseils, actualités et guides sur la création de sites internet, le développement web, le SEO local, l\'IA générative et le marketing digital. Par Perrine Huon, développeuse web freelance.',
  alternates: { canonical: 'https://perrinehuon.com/blog' },
  openGraph: {
    title: 'Blog Webdesign & Développement Web | Perrine Huon',
    description: 'Conseils, actualités et guides sur la création de sites internet, le développement web, le SEO local et le marketing digital.',
    url: 'https://perrinehuon.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
