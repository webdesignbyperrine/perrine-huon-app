import frLocationsData from '@/messages/fr/locations-data.json';
import enLocationsData from '@/messages/en/locations-data.json';
import esLocationsData from '@/messages/es/locations-data.json';

export type LocationType = 'city' | 'arrondissement' | 'region';

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  localBusinessTypes: string[];
  keyStats: string;
}

type Locale = 'fr' | 'en' | 'es';

type LocationData = Record<string, Omit<Location, 'slug'>>;

const locationsDataByLocale: Record<Locale, LocationData> = {
  fr: frLocationsData as LocationData,
  en: enLocationsData as LocationData,
  es: esLocationsData as LocationData,
};

export function getLocations(locale: Locale = 'fr'): Location[] {
  const data = locationsDataByLocale[locale];
  
  return Object.entries(data).map(([slug, location]) => ({
    slug,
    ...location,
  }));
}

export function getLocationBySlug(slug: string, locale: Locale = 'fr'): Location | undefined {
  const data = locationsDataByLocale[locale];
  const locationData = data[slug];
  
  if (!locationData) {
    return undefined;
  }
  
  return {
    slug,
    ...locationData,
  };
}

export function getAllLocationSlugs(): string[] {
  // Use French data as reference for all slugs
  return Object.keys(frLocationsData);
}

// For backward compatibility, keep the old export name
export const locations = getLocations('fr');
