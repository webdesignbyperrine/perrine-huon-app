import frServicesData from '@/messages/fr/services-data.json';
import enServicesData from '@/messages/en/services-data.json';
import esServicesData from '@/messages/es/services-data.json';
import type { Locale } from '@/i18n/config';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  content: string;
  features: string[];
  faqs: ServiceFAQ[];
  priceRange: string;
  ctaText: string;
}

type ServicesDataByLocale = {
  [key: string]: Omit<Service, 'slug'>;
};

const servicesDataByLocale: Record<Locale, ServicesDataByLocale> = {
  fr: frServicesData as ServicesDataByLocale,
  en: enServicesData as ServicesDataByLocale,
  es: esServicesData as ServicesDataByLocale,
};

/**
 * Get all services for a specific locale
 */
export function getServicesData(locale: Locale = 'fr'): Service[] {
  const data = servicesDataByLocale[locale];
  return Object.entries(data).map(([slug, service]) => ({
    slug,
    ...service,
  }));
}

/**
 * Get a single service by slug for a specific locale
 */
export function getServiceBySlug(slug: string, locale: Locale = 'fr'): Service | undefined {
  const services = getServicesData(locale);
  return services.find((service) => service.slug === slug);
}

/**
 * Get all service slugs (language-agnostic)
 */
export function getAllServiceSlugs(): string[] {
  return Object.keys(frServicesData);
}

// Legacy export for backward compatibility (deprecated - use getServicesData instead)
export const services: Service[] = getServicesData('fr');

