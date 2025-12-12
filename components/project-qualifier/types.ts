// Types pour le parcours de qualification de projet

export type ProjectType = 
  | 'site-vitrine-onepage'
  | 'site-vitrine-multipage'
  | 'ecommerce'
  | 'landing-page'
  | 'application-web'
  | 'mvp-prototype'
  | 'dashboard-crm'
  | 'refonte';

export type Feature = 
  | 'blog'
  | 'espace-membres'
  | 'paiement'
  | 'reservation'
  | 'formulaires-avances'
  | 'multilingue'
  | 'api-integrations'
  | 'admin-dashboard'
  | 'autre';

export type DesignStyle = 
  | 'minimaliste'
  | 'moderne'
  | 'corporate';

export type AnimationLevel = 
  | 'sobre'
  | 'modere'
  | 'immersif';

export type Budget = 
  | 'petit'
  | 'moyen'
  | 'confortable'
  | 'large';

export type Deadline = 
  | 'urgent'
  | 'standard'
  | 'flexible'
  | 'pas-contrainte';

export type AccompagnementLevel = 
  | 'autonomie'
  | 'formation'
  | 'maintenance'
  | 'partenariat';

export interface QualifierData {
  projectType: ProjectType | null;
  features: Feature[];
  featureOther: string;
  designStyle: DesignStyle | null;
  animationLevel: AnimationLevel | null;
  budget: Budget | null;
  deadline: Deadline | null;
  accompagnement: AccompagnementLevel | null;
  inspirations: string;
}

export type Step = 
  | 'intro'
  | 'project-type'
  | 'features'
  | 'design-style'
  | 'animation-level'
  | 'budget'
  | 'deadline'
  | 'accompagnement'
  | 'inspirations'
  | 'summary';

export const STEPS_ORDER: Step[] = [
  'intro',
  'project-type',
  'features',
  'design-style',
  'animation-level',
  'budget',
  'deadline',
  'accompagnement',
  'inspirations',
  'summary'
];

export const STEP_LABELS: Record<Step, string> = {
  'intro': 'Introduction',
  'project-type': 'Type de projet',
  'features': 'Fonctionnalités',
  'design-style': 'Style de design',
  'animation-level': 'Animations',
  'budget': 'Budget',
  'deadline': 'Délais',
  'accompagnement': 'Accompagnement',
  'inspirations': 'Inspirations',
  'summary': 'Récapitulatif'
};

// Options de configuration
export const PROJECT_TYPES: { value: ProjectType; label: string; description: string; icon: string }[] = [
  { value: 'site-vitrine-onepage', label: 'Site vitrine one-page', description: 'Présentation concise et percutante', icon: 'page' },
  { value: 'site-vitrine-multipage', label: 'Site vitrine multipage', description: 'Structure complète et détaillée', icon: 'pages' },
  { value: 'ecommerce', label: 'Site e-commerce', description: 'Vente en ligne et gestion produits', icon: 'cart' },
  { value: 'landing-page', label: 'Landing page / Page de vente', description: 'Conversion et acquisition', icon: 'target' },
  { value: 'application-web', label: 'Application web (SaaS)', description: 'Outil métier ou service en ligne', icon: 'app' },
  { value: 'mvp-prototype', label: 'MVP / Prototype', description: 'Test rapide d\'une idée', icon: 'rocket' },
  { value: 'dashboard-crm', label: 'Tableau de bord / CRM', description: 'Gestion et visualisation de données', icon: 'dashboard' },
  { value: 'refonte', label: 'Refonte de site existant', description: 'Modernisation et optimisation', icon: 'refresh' },
];

export const FEATURES_OPTIONS: { value: Feature; label: string; icon: string }[] = [
  { value: 'blog', label: 'Blog / Système de contenu', icon: 'blog' },
  { value: 'espace-membres', label: 'Espace membres / Authentification', icon: 'users' },
  { value: 'paiement', label: 'Paiement en ligne', icon: 'credit-card' },
  { value: 'reservation', label: 'Réservation / Booking', icon: 'calendar' },
  { value: 'formulaires-avances', label: 'Formulaires avancés', icon: 'form' },
  { value: 'multilingue', label: 'Multilingue', icon: 'globe' },
  { value: 'api-integrations', label: 'API / Intégrations tierces', icon: 'puzzle' },
  { value: 'admin-dashboard', label: 'Tableau de bord admin', icon: 'settings' },
  { value: 'autre', label: 'Autre', icon: 'plus' },
];

export const DESIGN_STYLES: { value: DesignStyle; label: string; description: string; colors: string[] }[] = [
  { 
    value: 'minimaliste', 
    label: 'Minimaliste & élégant', 
    description: 'Épuré, raffiné, focus sur l\'essentiel',
    colors: ['#f5f5f0', '#d4a574', '#a8b5a0', '#2d3436']
  },
  { 
    value: 'moderne', 
    label: 'Moderne & dynamique', 
    description: 'Audacieux, coloré, tendance',
    colors: ['#6366f1', '#06b6d4', '#84cc16', '#ec4899']
  },
  { 
    value: 'corporate', 
    label: 'Corporate & professionnel', 
    description: 'Sérieux, rassurant, institutionnel',
    colors: ['#2c3e50', '#3498db', '#1abc9c', '#d4af37']
  },
];

export const ANIMATION_LEVELS: { value: AnimationLevel; label: string; description: string }[] = [
  { value: 'sobre', label: 'Sobre', description: 'Animations subtiles et discrètes' },
  { value: 'modere', label: 'Modéré', description: 'Interactions fluides et engageantes' },
  { value: 'immersif', label: 'Immersif', description: 'Expérience wow et mémorable' },
];

export const BUDGET_OPTIONS: { value: Budget; label: string; range: string; description: string }[] = [
  { value: 'petit', label: 'Petit budget', range: '1 000€ - 3 000€', description: 'Site vitrine simple, template personnalisé' },
  { value: 'moyen', label: 'Budget moyen', range: '3 000€ - 8 000€', description: 'Design sur mesure, fonctionnalités avancées' },
  { value: 'confortable', label: 'Budget confortable', range: '8 000€ - 15 000€', description: 'Projet complet, stratégie digitale incluse' },
  { value: 'large', label: 'Budget large', range: '15 000€+', description: 'Application complexe, accompagnement premium' },
];

export const DEADLINE_OPTIONS: { value: Deadline; label: string; description: string }[] = [
  { value: 'urgent', label: 'Urgent', description: '2-4 semaines' },
  { value: 'standard', label: 'Standard', description: '1-2 mois' },
  { value: 'flexible', label: 'Flexible', description: '2-3 mois' },
  { value: 'pas-contrainte', label: 'Pas de contrainte', description: 'Prenons le temps qu\'il faut' },
];

export const ACCOMPAGNEMENT_OPTIONS: { value: AccompagnementLevel; label: string; description: string }[] = [
  { value: 'autonomie', label: 'Autonomie totale', description: 'Livraison clé en main, vous gérez ensuite' },
  { value: 'formation', label: 'Formation incluse', description: 'Prise en main guidée de votre site' },
  { value: 'maintenance', label: 'Maintenance continue', description: 'Support technique mensuel' },
  { value: 'partenariat', label: 'Partenariat long terme', description: 'Évolution continue et stratégie' },
];

// Messages d'encouragement
export const ENCOURAGEMENT_MESSAGES: string[] = [
  'Super choix ! 🎯',
  'Excellent ! On avance bien 🚀',
  'Parfait, continuons ! ✨',
  'Très bien, on y est presque ! 💪',
  'Beau projet en perspective ! 🌟',
];

