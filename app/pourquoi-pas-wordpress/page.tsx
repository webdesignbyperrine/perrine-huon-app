import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Pourquoi Pas WordPress ? Les Avantages d'un Site Sur Mesure",
  description:
    'WordPress vs site sur mesure Next.js : performance, sécurité, SEO, design. Découvrez pourquoi un site sur mesure surpasse WordPress pour votre entreprise.',
  alternates: {
    canonical: 'https://perrinehuon.com/pourquoi-pas-wordpress',
  },
  openGraph: {
    title: "Pourquoi Pas WordPress ? Les Avantages d'un Site Sur Mesure",
    description:
      'WordPress vs site sur mesure Next.js : performance, sécurité, SEO, design.',
    type: 'website',
    url: 'https://perrinehuon.com/pourquoi-pas-wordpress',
    siteName: 'Perrine Huon - Création de Sites Internet',
    locale: 'fr_FR',
  },
};

const comparisonRows = [
  {
    criterion: 'Performance (PageSpeed)',
    wordpress: '40 – 70 / 100',
    surMesure: '90 – 100 / 100',
    winner: 'surMesure',
  },
  {
    criterion: 'Temps de chargement',
    wordpress: '2 – 5 secondes',
    surMesure: '< 1 seconde',
    winner: 'surMesure',
  },
  {
    criterion: 'Sécurité',
    wordpress: 'Vulnérabilités fréquentes',
    surMesure: 'Surface d\'attaque minimale',
    winner: 'surMesure',
  },
  {
    criterion: 'SEO technique',
    wordpress: 'Bon (avec plugins)',
    surMesure: 'Excellent (natif)',
    winner: 'surMesure',
  },
  {
    criterion: 'Design',
    wordpress: 'Templates adaptables',
    surMesure: '100% unique',
    winner: 'surMesure',
  },
  {
    criterion: 'Coût initial',
    wordpress: 'Faible',
    surMesure: 'Moyen à élevé',
    winner: 'wordpress',
  },
  {
    criterion: 'Coût de maintenance annuel',
    wordpress: '500 – 2 000 € (plugins, thèmes, sécu)',
    surMesure: '0 – 1 000 €',
    winner: 'surMesure',
  },
  {
    criterion: 'Mises à jour',
    wordpress: 'Fréquentes et risquées',
    surMesure: 'Rares et contrôlées',
    winner: 'surMesure',
  },
  {
    criterion: 'Évolutivité',
    wordpress: 'Limitée par les plugins',
    surMesure: 'Illimitée',
    winner: 'surMesure',
  },
];

const sections = [
  {
    title: 'Performance : la vitesse fait la différence',
    content: [
      'Un site WordPress charge en moyenne 2 à 5 secondes, contre moins d\'une seconde pour un site Next.js sur mesure. Cette différence est cruciale : 53% des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger.',
      'Avec Next.js, chaque page est pré-générée et servie depuis un CDN mondial. Pas de base de données à interroger, pas de plugins à charger : la page est déjà prête. Le résultat ? Des scores Google PageSpeed supérieurs à 90/100 systématiquement.',
    ],
  },
  {
    title: 'Sécurité : moins de risques, plus de sérénité',
    content: [
      'WordPress représente 43% du web mondial, ce qui en fait la cible n°1 des hackers. Chaque plugin, chaque thème est un vecteur potentiel d\'attaque. En 2025, plus de 4 000 vulnérabilités WordPress ont été recensées.',
      'Un site sur mesure en Next.js a une surface d\'attaque drastiquement réduite : pas de base de données exposée, pas de panneau d\'administration accessible publiquement, pas de plugins tiers vulnérables. Votre site est intrinsèquement plus sécurisé.',
    ],
  },
  {
    title: 'SEO : un avantage structurel',
    content: [
      'Google privilégie les sites rapides, légers et bien structurés. Un site Next.js génère un HTML sémantique parfait, avec un contrôle total sur les balises meta, les données structurées et la structure des URLs.',
      'Contrairement à WordPress où le SEO dépend de plugins (Yoast, RankMath) qui ajoutent du poids et de la complexité, l\'optimisation SEO est native dans un site sur mesure. Chaque page est créée avec le référencement en tête.',
    ],
  },
  {
    title: 'Design : votre identité, pas un template',
    content: [
      'Avec WordPress, même avec un thème premium à 60€, votre site ressemblera à des milliers d\'autres. Les personnalisations sont limitées par le constructeur de page, et sortir du cadre du template devient vite un cauchemar technique.',
      'Un site sur mesure est conçu pixel par pixel pour votre identité visuelle. Chaque interaction, chaque animation, chaque détail est pensé pour refléter votre marque et offrir une expérience unique à vos visiteurs.',
    ],
  },
  {
    title: 'Maintenance : la tranquillité à long terme',
    content: [
      'Un site WordPress demande une maintenance régulière : mises à jour de WordPress, des plugins (souvent 15-30 plugins), du thème, vérifications de sécurité. Chaque mise à jour comporte un risque de casser quelque chose.',
      'Un site Next.js n\'a aucune dépendance à mettre à jour côté production. Il est déployé comme un ensemble de fichiers statiques sur un CDN. Pas de serveur à maintenir, pas de plugins à surveiller : votre site fonctionne de manière autonome.',
    ],
  },
];

const wordpressOkCases = [
  'Blog personnel sans ambition de référencement',
  'Site temporaire ou événementiel à très petit budget',
  'Projet nécessitant des centaines de contributeurs simultanés',
  'Prototype ou MVP pour valider rapidement une idée',
];

export default function PourquoiPasWordPressPage() {
  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          {
            name: 'Pourquoi pas WordPress',
            url: 'https://perrinehuon.com/pourquoi-pas-wordpress',
          },
        ]}
      />

      {/* Hero */}
      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm"
            >
              ← Retour à l&apos;accueil
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Pourquoi Pas WordPress ?
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">
              WordPress domine le web avec 43% de parts de marché. Mais est-ce
              vraiment le meilleur choix pour votre site professionnel ?
              Comparaison honnête.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              WordPress vs Site Sur Mesure
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left p-4 md:p-6 text-primary font-bold">
                      Critère
                    </th>
                    <th className="p-4 md:p-6 text-primary/70 font-bold text-center">
                      WordPress
                    </th>
                    <th className="p-4 md:p-6 text-accent font-bold text-center">
                      Site Sur Mesure (Next.js)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.criterion}
                      className={
                        index % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-primary/[0.02]'
                      }
                    >
                      <td className="p-4 md:p-6 text-primary font-medium text-sm">
                        {row.criterion}
                      </td>
                      <td
                        className={`p-4 md:p-6 text-center text-sm ${
                          row.winner === 'wordpress'
                            ? 'text-accent font-medium'
                            : 'text-primary/50'
                        }`}
                      >
                        {row.wordpress}
                      </td>
                      <td
                        className={`p-4 md:p-6 text-center text-sm ${
                          row.winner === 'surMesure'
                            ? 'text-accent font-medium'
                            : 'text-primary/50'
                        }`}
                      >
                        {row.surMesure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      {sections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className={`py-20 ${
            sectionIndex % 2 === 0
              ? 'bg-paper'
              : 'bg-paper-light grain-overlay'
          }`}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-primary/70 text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Quand WordPress peut convenir */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Quand WordPress peut convenir
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              Par honnêteté, voici les cas où WordPress reste une option
              acceptable.
            </p>
            <div className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 border-primary/10">
              <ul className="space-y-4">
                {wordpressOkCases.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-primary/70"
                  >
                    <span className="flex-shrink-0 mt-1 text-primary/30">
                      —
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-primary/60 text-sm leading-relaxed border-t border-primary/10 pt-6">
                En revanche, si votre site est un véritable outil commercial qui
                doit refléter le professionnalisme de votre activité, attirer
                des clients via Google et offrir une expérience fluide, un site
                sur mesure sera toujours le meilleur investissement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt pour un site qui vous ressemble ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Passez au sur mesure et offrez à votre activité un site performant,
              sécurisé et parfaitement référencé. Premier échange gratuit et sans
              engagement.
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
