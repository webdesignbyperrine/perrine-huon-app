/**
 * Cibles de référencement local prioritaires.
 *
 * Les 10 villes et les 10 métiers ci-dessous sont les pages "spokes" SEO
 * locales qui concentrent l'essentiel du volume de recherche en France.
 *
 * Elles servent à :
 * 1. Construire un maillage interne dense (pages métier → pages villes,
 *    pages villes → pages métier).
 * 2. Lister `areaServed` dans les JSON-LD ProfessionalService des pages
 *    métier (pour signaler à Google + LLM la couverture nationale).
 * 3. Mettre en avant des combinaisons "ville × métier" dans la copy
 *    (ex : "création de site internet pour avocat à Lyon"), qui sont
 *    des requêtes longue traîne à très forte intention.
 */

export type PriorityLocation = {
  /** Slug utilisé dans l'URL `/creation-site-internet-{slug}`. */
  slug: string;
  /** Nom de la ville (forme officielle). */
  name: string;
  /** Population — utilisée pour ordonner et qualifier dans la copy. */
  population: number;
};

export type PriorityProfession = {
  /** Slug utilisé dans l'URL `/site-internet-{slug}`. */
  slug: string;
  /** Libellé court (singulier). */
  label: string;
  /** Libellé pluriel. */
  labelPlural: string;
};

export const PRIORITY_LOCATIONS: PriorityLocation[] = [
  { slug: 'paris', name: 'Paris', population: 2102000 },
  { slug: 'marseille', name: 'Marseille', population: 873000 },
  { slug: 'lyon', name: 'Lyon', population: 522000 },
  { slug: 'toulouse', name: 'Toulouse', population: 498000 },
  { slug: 'nice', name: 'Nice', population: 343000 },
  { slug: 'nantes', name: 'Nantes', population: 320000 },
  { slug: 'montpellier', name: 'Montpellier', population: 299000 },
  { slug: 'strasbourg', name: 'Strasbourg', population: 290000 },
  { slug: 'bordeaux', name: 'Bordeaux', population: 261000 },
  { slug: 'lille', name: 'Lille', population: 234000 },
];

export const PRIORITY_PROFESSIONS: PriorityProfession[] = [
  { slug: 'avocat', label: 'avocat', labelPlural: 'avocats' },
  { slug: 'medecin', label: 'médecin', labelPlural: 'médecins' },
  { slug: 'dentiste', label: 'dentiste', labelPlural: 'dentistes' },
  { slug: 'kinesitherapeute', label: 'kinésithérapeute', labelPlural: 'kinésithérapeutes' },
  { slug: 'expert-comptable', label: 'expert-comptable', labelPlural: 'experts-comptables' },
  { slug: 'architecte', label: 'architecte', labelPlural: 'architectes' },
  { slug: 'restaurant', label: 'restaurant', labelPlural: 'restaurants' },
  { slug: 'plombier', label: 'plombier', labelPlural: 'plombiers' },
  { slug: 'agence-immobiliere', label: 'agence immobilière', labelPlural: 'agences immobilières' },
  { slug: 'coach-sportif', label: 'coach sportif', labelPlural: 'coachs sportifs' },
];

export function isPriorityLocation(slug: string): boolean {
  return PRIORITY_LOCATIONS.some((l) => l.slug === slug);
}

export function isPriorityProfession(slug: string): boolean {
  return PRIORITY_PROFESSIONS.some((p) => p.slug === slug);
}
