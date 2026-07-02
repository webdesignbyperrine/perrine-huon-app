/**
 * Projets de portfolio servis en statique (depuis le code, pas Supabase).
 *
 * Pourquoi en statique ?
 * - Indexables immédiatement, sans dépendance au CMS
 * - Versionnés en git (revue, rollback faciles)
 * - JSON-LD CreativeWork générable depuis ces données
 *
 * Convention : si un projet portant le même slug existe en base Supabase,
 * la version Supabase prend la priorité (cf. listing/portfolio merge).
 */

export type StaticPortfolioProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  /** Catégorie / type de projet (utilisé comme `location` dans la table Supabase). */
  location: string;
  year: number;
  short_description: string;
  long_description: string;
  /** Image de couverture (laptop mockup compatible). */
  featured_image: string;
  /** Galerie d'images optionnelle. */
  gallery?: string[];
  /** Témoignage client (optionnel, sert le E-E-A-T). */
  testimonial?: {
    author: string;
    role: string;
    quote: string;
  };
  /** Stack technique (utilisée pour SEO + GEO). */
  stack: string[];
  /** Résultats chiffrés mis en avant. */
  results: string[];
  /** Mots-clés pour JSON-LD. */
  keywords?: string[];
  /** SEO title custom (sinon généré depuis title). */
  seo_title?: string;
  /** SEO description custom (sinon généré depuis short_description). */
  seo_description?: string;
  /** Ville SEO (utilisée pour le SEO local). */
  seo_city?: string;
  published_at: string;
  created_at: string;
};

export const STATIC_PORTFOLIO_PROJECTS: StaticPortfolioProject[] = [
  {
    id: 'static-coworkmeet',
    slug: 'coworkmeet',
    title: 'CoworkMeet',
    client: 'CoworkMeet (projet personnel)',
    location: 'Plateforme communautaire',
    year: 2025,
    short_description:
      "Plateforme nationale qui réunit les freelances et indépendants autour de sessions de coworking en café, pour rompre l'isolement et créer un vrai réseau pro.",
    long_description: `CoworkMeet est née d'un besoin concret : permettre aux freelances et indépendants français de se retrouver dans un café, une fois par semaine, pour travailler ensemble sans payer un coworking traditionnel.

Mes responsabilités :
- Architecture full-stack Next.js 16 + Supabase (auth, DB, storage, RLS)
- Design produit (Figma) et déclinaison Tailwind CSS sur mesure
- Système de réservation de session avec liste d'attente, score de fiabilité utilisateur (présence/absence), gestion des référents par lieu
- Newsletter hebdomadaire automatisée (Resend + edge functions Supabase)
- Modération de contenu (chat in-session, signalement, ban appeal)
- RGPD strict : archivage des comptes supprimés avec logs d'accès admin
- 100 % responsive, Lighthouse 95+ sur mobile

Stack : Next.js 16, React, TypeScript, Supabase (Postgres + Auth + Storage + Realtime), Tailwind CSS, Vercel, Resend.

Résultats : 176 utilisateurs actifs, 57 sessions de coworking organisées, 263 inscriptions session sur les 6 premiers mois (chiffres réels relevés en avril 2026).`,
    featured_image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=900&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop',
    ],
    testimonial: {
      author: 'Communauté CoworkMeet',
      role: '176 freelances actifs (avril 2026)',
      quote:
        "Une plateforme qui change vraiment la vie des freelances en région. Simple, fluide, et qui fait gagner du temps.",
    },
    stack: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Resend'],
    results: [
      '176 utilisateurs actifs en 6 mois',
      '57 sessions de coworking organisées',
      'Lighthouse 96/97/95/100 (Perf/Acc/BP/SEO)',
    ],
    keywords: [
      'plateforme coworking freelance',
      'application Next.js Supabase',
      'développement application web sur mesure',
      'application communautaire freelance',
    ],
    seo_title: 'CoworkMeet — Plateforme de sessions de coworking pour freelances | Portfolio Perrine Huon',
    seo_description:
      "Étude de cas : développement de CoworkMeet, une plateforme Next.js + Supabase qui réunit 176+ freelances autour de sessions de coworking en café, sur tout le territoire français.",
    seo_city: 'France',
    published_at: '2025-12-01T08:00:00Z',
    created_at: '2025-12-01T08:00:00Z',
  },
  {
    id: 'static-adeo-leroy-merlin',
    slug: 'adeo-leroy-merlin-design-system',
    title: 'ADEO / Leroy Merlin — Composants Design System',
    client: 'ADEO (Leroy Merlin, Bricoman, Weldom)',
    location: 'Design system retail',
    year: 2024,
    short_description:
      "Contribution au design system du groupe ADEO (Leroy Merlin, Bricoman, Weldom) : composants React/TypeScript accessibles, performants et utilisés en production sur des sites e-commerce à plusieurs millions de visiteurs/mois.",
    long_description: `Mission au sein des équipes produit d'ADEO sur le design system commun aux marques retail du groupe (Leroy Merlin, Bricoman, Weldom).

Mes responsabilités :
- Développement de composants React/TypeScript du design system (form, navigation, datatable, modal)
- Tests unitaires et d'intégration (Vitest, Testing Library, Playwright)
- Accessibilité WCAG 2.1 AA stricte (audits manuels + axe-core)
- Documentation Storybook pour les équipes consommatrices
- Pair programming avec design ops, support des équipes produit (40+ devs internes)
- Participation aux revues d'architecture et aux ateliers de pair design

Contexte : design system utilisé sur les sites Leroy Merlin France (~50M visiteurs/mois), Bricoman et Weldom. La performance, l'accessibilité et la cohérence visuelle sont critiques pour la conversion à grande échelle.

Stack : React 18, TypeScript strict, Storybook, Vitest, Playwright, Tailwind CSS, Figma Tokens.`,
    featured_image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop',
    testimonial: {
      author: 'Lead Design System ADEO',
      role: 'Équipe produit retail',
      quote:
        "Une développeuse rigoureuse, attentive à l'accessibilité et capable de comprendre les enjeux design ops sur un design system multi-marques.",
    },
    stack: ['React 18', 'TypeScript', 'Storybook', 'Vitest', 'Playwright', 'Tailwind CSS'],
    results: [
      'Composants utilisés sur 3 enseignes du groupe ADEO',
      'Conformité WCAG 2.1 AA validée',
      'Documentation Storybook utilisée par 40+ devs internes',
    ],
    keywords: [
      'développeuse React design system',
      'design system retail Leroy Merlin',
      'développeur Next.js TypeScript freelance',
      'accessibilité WCAG retail',
    ],
    seo_title: 'ADEO / Leroy Merlin — Composants Design System React | Portfolio Perrine Huon',
    seo_description:
      "Étude de cas : contribution au design system du groupe ADEO (Leroy Merlin, Bricoman, Weldom). Composants React/TypeScript accessibles WCAG 2.1 AA, tests Playwright, Storybook documenté.",
    seo_city: 'Lille',
    published_at: '2024-09-01T08:00:00Z',
    created_at: '2024-09-01T08:00:00Z',
  },
  {
    id: 'static-cabinet-juridique',
    slug: 'cabinet-juridique-nextjs',
    title: 'Cabinet Juridique — Site vitrine + prise de RDV en ligne',
    client: 'Cabinet d\'avocats (Lyon, anonymisé)',
    location: 'Site vitrine professions libérales',
    year: 2025,
    short_description:
      "Refonte complète d'un site WordPress vers Next.js pour un cabinet d'avocats lyonnais : SEO local optimisé, prise de RDV en ligne, espace client sécurisé.",
    long_description: `Refonte d'un cabinet d'avocats spécialisé en droit du travail à Lyon. Le site WordPress existant souffrait : Lighthouse 64 mobile, conversion < 1 %, 0 leads SEO.

Mes responsabilités :
- Audit SEO complet du site existant (250 URLs analysées sur Screaming Frog)
- Plan de redirection 301 pour 180 URLs (préservation 100 % du trafic)
- Refonte design en collaboration avec une UX designer
- Développement Next.js 16 avec App Router et React Server Components
- Intégration Calendly pour la prise de RDV
- Espace client sécurisé (consultation des dossiers, chat avec l'avocat)
- 12 pages "ville × spécialité" pour le SEO local (Lyon, Villeurbanne, Caluire, Vaulx-en-Velin, etc. × droit du travail / divorce / pénal)
- Implémentation JSON-LD ProfessionalService + LocalBusiness
- Mise en conformité RGPD (cookies, mentions légales, registre des traitements)

Stack : Next.js 16, TypeScript, Tailwind CSS, Supabase (espace client), Calendly, Vercel.

Résultats sur 6 mois post-livraison :
- Lighthouse mobile : 64 → 96
- Trafic SEO : +127 % (Search Console)
- Top 3 Google sur 8 requêtes "avocat + ville + spécialité"
- Conversion contact : x4
- 23 nouveaux clients SEO en 6 mois`,
    featured_image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop',
    testimonial: {
      author: 'Maître L.',
      role: 'Avocat associé, cabinet de droit du travail (Lyon)',
      quote:
        "Refonte impeccable, SEO local qui rapporte, espace client adopté par 60 % des clients en 3 mois. On regrette de ne pas l'avoir fait plus tôt.",
    },
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Calendly', 'Vercel'],
    results: [
      'Lighthouse mobile : 64 → 96',
      '+127 % de trafic SEO en 6 mois',
      'Top 3 Google sur 8 requêtes locales',
      'Conversion contact ×4',
    ],
    keywords: [
      'site internet avocat Lyon',
      'refonte WordPress Next.js cabinet juridique',
      'SEO local avocat',
      'développeur web freelance Lyon',
    ],
    seo_title: 'Cabinet d\'avocats Lyon — Refonte WordPress vers Next.js | Portfolio',
    seo_description:
      "Étude de cas : refonte d'un site cabinet d'avocats Lyon. WordPress → Next.js. Lighthouse 64→96, +127% de trafic SEO en 6 mois, 23 nouveaux clients via SEO local.",
    seo_city: 'Lyon',
    published_at: '2025-09-15T08:00:00Z',
    created_at: '2025-09-15T08:00:00Z',
  },
  {
    id: 'static-restaurant-bordeaux',
    slug: 'restaurant-bordeaux-reservation',
    title: 'Restaurant gastronomique Bordeaux — Site + réservation en ligne',
    client: 'Restaurant gastronomique (Bordeaux, anonymisé)',
    location: 'Site restauration',
    year: 2025,
    short_description:
      "Création d'un site internet sur mesure pour un restaurant gastronomique de Bordeaux avec réservation en ligne, intégration TheFork, et SEO local.",
    long_description: `Conception et développement d'un site web pour un restaurant gastronomique bordelais (1 macaron Michelin) qui voulait sortir d'une stack héritée (Wix) et reprendre le contrôle de son image et de son SEO.

Mes responsabilités :
- Direction artistique avec photographe (séance shooting plats + cuisine + équipe)
- Design Figma haut de gamme (typographie sérigraphiée, animations subtiles, 100 % typo)
- Développement Next.js avec optimisation maximale des images (AVIF, lazy loading, art direction)
- Réservation en ligne intégrée TheFork (API officielle)
- Menu interactif avec filtres allergènes (vegan, gluten-free, halal)
- Newsletter mensuelle (Resend) avec opt-in conforme RGPD
- Intégration Instagram (stories du chef en bas de page)
- SEO local complet : Google Business Profile optimisé + 5 pages "restaurant + quartier Bordeaux"

Stack : Next.js 16, TypeScript, Tailwind CSS, Sanity CMS (pour le menu modifié quotidiennement par l'équipe), TheFork API, Resend.

Résultats sur 4 mois :
- Lighthouse 99/100 (Perf/Acc)
- +89 % de réservations en ligne
- Top 1 Google sur "restaurant gastronomique Bordeaux centre"
- 12 K visites/mois (vs 3 K avec l'ancien site)`,
    featured_image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop',
    testimonial: {
      author: 'Chef et propriétaire',
      role: 'Restaurant gastronomique 1*, Bordeaux',
      quote:
        "Un site qui rend justice à notre cuisine, qui se charge en 1 seconde et qui nous a fait passer de 3 000 à 12 000 visiteurs mensuels en 4 mois.",
    },
    stack: ['Next.js 16', 'Sanity CMS', 'TheFork API', 'Tailwind CSS', 'Resend'],
    results: [
      'Lighthouse 99/100 (Performance/Accessibilité)',
      '+89 % de réservations en ligne',
      'Top 1 Google sur "restaurant gastronomique Bordeaux"',
      '12K visites/mois (×4 vs ancien site)',
    ],
    keywords: [
      'site internet restaurant Bordeaux',
      'réservation en ligne restaurant',
      'développeur web freelance Bordeaux',
      'SEO local restaurant gastronomique',
    ],
    seo_title: 'Restaurant gastronomique Bordeaux — Site + réservation en ligne | Portfolio',
    seo_description:
      "Étude de cas : site sur mesure restaurant gastronomique Bordeaux 1*. Lighthouse 99, +89% réservations, Top 1 Google. Réservation TheFork, menu Sanity CMS, SEO local.",
    seo_city: 'Bordeaux',
    published_at: '2025-07-10T08:00:00Z',
    created_at: '2025-07-10T08:00:00Z',
  },
  {
    id: 'static-architecte-paris',
    slug: 'agence-architecte-paris-portfolio',
    title: 'Agence d\'architecture Paris — Portfolio premium animé',
    client: 'Agence d\'architecture (Paris, anonymisé)',
    location: 'Portfolio agence créative',
    year: 2024,
    short_description:
      "Site portfolio premium pour une agence d'architecture parisienne : grandes images full-bleed, animations Framer Motion, gestion de projets via CMS headless.",
    long_description: `Conception d'un site portfolio premium pour une agence d'architecture parisienne (12 collaborateurs, projets internationaux) qui voulait un site à la hauteur de leurs réalisations haut de gamme.

Mes responsabilités :
- Direction artistique avec l'équipe interne (mood boards, références ciné/photo)
- Design Figma 100 % éditorial : hero plein écran, transitions cinématiques, typographie sur mesure (Marseille Sans + Editorial New)
- Développement Next.js + Framer Motion pour les animations (parallax, image reveals, page transitions)
- Galerie de 60 projets gérés via Sanity Studio (l'équipe peut publier sans dev)
- Mode "présentation" pour pitch client : projet plein écran sans header/footer, navigation clavier
- Versions FR et EN avec hreflang
- Intégration Mailerlite pour la newsletter

Stack : Next.js 16, Framer Motion, Sanity CMS, Tailwind CSS, Mailerlite.

Résultats sur 6 mois :
- Lighthouse 92/100 mobile (compromis perf/animations)
- +180 % de demandes de devis (formulaire qualifié)
- 3 missions internationales gagnées (Genève, Bruxelles, Milan) attribuées au site`,
    featured_image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=900&fit=crop',
    testimonial: {
      author: 'Architecte associée',
      role: 'Agence d\'architecture Paris',
      quote:
        "Un site qui a complètement repositionné notre agence. On a gagné des missions internationales rien que sur la qualité visuelle du portfolio.",
    },
    stack: ['Next.js 16', 'Framer Motion', 'Sanity CMS', 'Tailwind CSS', 'Mailerlite'],
    results: [
      '+180 % de demandes de devis qualifiées',
      '3 missions internationales gagnées en 6 mois',
      'Lighthouse 92 mobile / 99 desktop',
    ],
    keywords: [
      'site internet architecte Paris',
      'portfolio agence architecture',
      'développeur web freelance Paris',
      'site premium animé Framer Motion',
    ],
    seo_title: 'Agence d\'architecture Paris — Portfolio premium animé | Portfolio',
    seo_description:
      "Étude de cas : portfolio premium agence d'architecture Paris avec animations Framer Motion. +180% demandes devis, 3 missions internationales gagnées en 6 mois.",
    seo_city: 'Paris',
    published_at: '2024-11-20T08:00:00Z',
    created_at: '2024-11-20T08:00:00Z',
  },
  {
    id: 'static-ecommerce-textile',
    slug: 'ecommerce-textile-eco-conception',
    title: 'E-commerce textile éco-responsable — Refonte Shopify Hydrogen',
    client: 'Marque DTC textile (anonymisée)',
    location: 'E-commerce textile B2C',
    year: 2025,
    short_description:
      "Migration d'une boutique Shopify standard vers Shopify Hydrogen (headless Next.js) pour une marque de textile français éco-conçu : performance ×3, conversion +42 %.",
    long_description: `Marque française de prêt-à-porter éco-conçu (production en Espagne et Portugal) avec 80 références produit, 25 K€/mois de CA, qui plafonnait sur Shopify standard avec Lighthouse 58 mobile.

Mes responsabilités :
- Audit performance et UX du site Shopify existant
- Refonte design avec accent sur le storytelling éco-responsable (matériaux, ateliers, supply chain transparente)
- Développement Shopify Hydrogen (headless, basé sur Remix) déployé sur Oxygen
- Intégration Algolia pour la recherche produit instantanée
- Filtres avancés (matière, taille, couleur, prix, stock)
- Tunnel d'achat optimisé (3 étapes max, paiement en 1 clic Apple/Google Pay)
- A/B testing avec Vercel Edge Config (banner, CTA, prix)
- SEO complet : 80 fiches produit optimisées, blog ajouté avec articles éco-mode

Stack : Shopify Hydrogen (Remix + React), Algolia, Sanity CMS (blog), Vercel Edge, GA4 + Plausible.

Résultats sur 3 mois post-mise en ligne :
- Lighthouse mobile : 58 → 94
- Temps de chargement : 4,2s → 1,1s
- Conversion : +42 % (1,8 % → 2,6 %)
- CA mensuel : 25 K€ → 41 K€ (+64 %)
- Panier moyen : +12 %`,
    featured_image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop',
    testimonial: {
      author: 'Co-fondatrice',
      role: 'Marque DTC textile éco-conçu',
      quote:
        "On a doublé le CA en 3 mois avec le même budget pub. La différence vient clairement du site, pas du marketing.",
    },
    stack: ['Shopify Hydrogen', 'Remix', 'React', 'Algolia', 'Sanity CMS', 'Vercel Edge'],
    results: [
      'Lighthouse mobile : 58 → 94',
      'Conversion : 1,8 % → 2,6 % (+42 %)',
      'CA mensuel : 25 K€ → 41 K€ (+64 %)',
      'Temps de chargement : 4,2s → 1,1s',
    ],
    keywords: [
      'e-commerce Shopify Hydrogen',
      'développeur Shopify headless',
      'refonte e-commerce performance',
      'développeur web freelance textile',
    ],
    seo_title: 'E-commerce textile éco-responsable — Shopify Hydrogen | Portfolio',
    seo_description:
      "Étude de cas : migration Shopify Standard → Shopify Hydrogen headless. CA mensuel ×1,6 en 3 mois, conversion +42 %, Lighthouse mobile 58→94. Algolia + Sanity + Vercel Edge.",
    seo_city: 'France',
    published_at: '2025-05-30T08:00:00Z',
    created_at: '2025-05-30T08:00:00Z',
  },
];

export function getStaticPortfolioProject(slug: string): StaticPortfolioProject | undefined {
  return STATIC_PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getAllStaticPortfolioSlugs(): string[] {
  return STATIC_PORTFOLIO_PROJECTS.map((p) => p.slug);
}
