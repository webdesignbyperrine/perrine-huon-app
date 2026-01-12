import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import BlogPreview from '@/components/home/BlogPreview';
import FAQPreview from '@/components/home/FAQPreview';
import ContactForm from '@/components/home/ContactForm';
import ScrollToAnchor from '@/components/ScrollToAnchor';

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
