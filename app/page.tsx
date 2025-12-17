import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import BlogPreview from '@/components/home/BlogPreview';
import FAQPreview from '@/components/home/FAQPreview';
import CalendlySection from '@/components/home/CalendlySection';
import ContactForm from '@/components/home/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <PortfolioPreview />
      <CalendlySection />
      <ContactForm />
      <FAQPreview />
      <BlogPreview />
    </div>
  );
}
