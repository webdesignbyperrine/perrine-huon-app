import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import ScrollToAnchor from '@/components/ScrollToAnchor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: 'https://perrinehuon.com' },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      siteName: t('siteName'),
    },
  };
}

// Lazy load des composants non critiques (below the fold) pour améliorer les performances
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <div className="min-h-[400px]" />,
});

const PortfolioPreview = dynamic(() => import('@/components/home/PortfolioPreview'), {
  loading: () => <div className="min-h-[400px]" />,
});

const ContactForm = dynamic(() => import('@/components/home/ContactForm'), {
  loading: () => <div className="min-h-[300px]" />,
});

const FAQPreview = dynamic(() => import('@/components/home/FAQPreview'), {
  loading: () => <div className="min-h-[400px]" />,
});

const BlogPreview = dynamic(() => import('@/components/home/BlogPreview'), {
  loading: () => <div className="min-h-[400px]" />,
});

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <ScrollToAnchor />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <PortfolioPreview />
      <ContactForm />
      <FAQPreview />
      <BlogPreview />
    </div>
  );
}
