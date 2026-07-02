import { Link } from '@/i18n/routing';
import {
  PRIORITY_LOCATIONS,
  PRIORITY_PROFESSIONS,
  type PriorityLocation,
  type PriorityProfession,
} from '@/lib/seo-priority';

/**
 * Maillage interne SEO local.
 *
 * Pourquoi c'est crucial :
 * - Les visiteurs qui tapent "site internet avocat Lyon" ne trouvent pas
 *   /creation-site-internet-avocat-lyon (ça n'existe pas) — Google leur
 *   propose la meilleure page entre /creation-site-internet-lyon et
 *   /site-internet-avocat. Mais Google n'a aucun signal qu'il existe une
 *   complémentarité entre les deux.
 * - Ces blocs de liens internes croisés apportent à Google ET aux LLM une
 *   carte des combinaisons "ville × métier" couvertes par le site,
 *   booste le PageRank interne des pages spokes, et augmente la
 *   pertinence sémantique sur les requêtes longue traîne géolocalisées.
 */

type CrossLinksProps = {
  excludeSlug?: string;
};

/**
 * Bloc affiché en bas d'une page METIER : liste les villes prioritaires
 * où Perrine intervient pour ce métier.
 */
export function ProfessionToLocationsLinks({ excludeSlug, profession }: CrossLinksProps & { profession: { name: string; slug: string } }) {
  const locations = PRIORITY_LOCATIONS.filter((l) => l.slug !== excludeSlug);

  return (
    <section className="py-16 md:py-20 bg-paper-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 text-center">
            Disponible dans toute la France pour les {profession.name.toLowerCase()}s
          </h2>
          <p className="text-primary/60 text-center mb-10 max-w-2xl mx-auto">
            Création de sites internet sur mesure dans les principales métropoles françaises.
            Intervention 100 % à distance, partout en France.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {locations.map((loc: PriorityLocation) => (
              <Link
                key={loc.slug}
                href={`/creation-site-internet-${loc.slug}`}
                className="px-4 py-3 border-2 border-primary/10 rounded-sketch text-center text-primary/80 hover:border-accent/40 hover:bg-accent/5 hover:text-primary transition-all duration-300 text-sm"
              >
                <span className="block font-medium">Site internet</span>
                <span className="text-primary font-semibold">{loc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Bloc affiché en bas d'une page VILLE : liste les métiers prioritaires
 * pour lesquels Perrine intervient dans cette ville.
 */
export function LocationToProfessionsLinks({ excludeSlug, location }: CrossLinksProps & { location: { name: string; slug: string } }) {
  const professions = PRIORITY_PROFESSIONS.filter((p) => p.slug !== excludeSlug);

  return (
    <section className="py-16 md:py-20 bg-paper-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 text-center">
            Spécialités sectorielles à {location.name}
          </h2>
          <p className="text-primary/60 text-center mb-10 max-w-2xl mx-auto">
            Sites internet sur mesure pour les principales professions à {location.name} et alentours.
            Chaque secteur a ses propres exigences réglementaires et UX, traitées en détail sur ces pages dédiées.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {professions.map((p: PriorityProfession) => (
              <Link
                key={p.slug}
                href={`/site-internet-${p.slug}`}
                className="px-4 py-3 border-2 border-primary/10 rounded-sketch text-center text-primary/80 hover:border-accent/40 hover:bg-accent/5 hover:text-primary transition-all duration-300 text-sm"
              >
                <span className="block font-medium">Site internet</span>
                <span className="text-primary font-semibold capitalize">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
