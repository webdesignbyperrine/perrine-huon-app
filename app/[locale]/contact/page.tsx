import { Metadata } from 'next';
import ContactCard from './ContactCard';

export const metadata: Metadata = {
  title: 'Contact - Perrine Huon',
  description: 'Contactez Perrine Huon - Développeur Web Freelance spécialisé en création de sites internet sur mesure',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return <ContactCard />;
}
