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
];

export function getStaticPortfolioProject(slug: string): StaticPortfolioProject | undefined {
  return STATIC_PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getAllStaticPortfolioSlugs(): string[] {
  return STATIC_PORTFOLIO_PROJECTS.map((p) => p.slug);
}
