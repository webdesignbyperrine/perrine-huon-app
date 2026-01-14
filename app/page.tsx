import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import ScrollToAnchor from '@/components/ScrollToAnchor';

// Lazy load des composants non critiques (below the fold) pour améliorer les performances
const PortfolioPreview = dynamic(() => import('@/components/home/PortfolioPreview'), {
  loading: () => <div className="min-h-[400px]" />, // Placeholder pour éviter le layout shift
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollToAnchor />
      <Hero />
      <Services />
      <About />
      <PortfolioPreview />
      <ContactForm />
      <FAQPreview />
      <BlogPreview />
    </div>
  );
}
