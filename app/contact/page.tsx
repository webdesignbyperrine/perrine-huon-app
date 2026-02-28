import { Metadata } from 'next';
import ContactCard from './ContactCard';

export const metadata: Metadata = {
  title: 'Contact - Perrine Huon',
  description: 'Contactez Perrine Huon - Product Designer, Web Developer & UX Designer',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return <ContactCard />;
}
