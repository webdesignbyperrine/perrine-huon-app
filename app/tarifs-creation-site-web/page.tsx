import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Tarifs Création de Site Internet 2026 — Devis Gratuit',
  description:
    'Découvrez les tarifs de création de site internet : site vitrine à partir de 1 500€, e-commerce à partir de 3 000€, application web sur devis. Tarifs transparents, devis gratuit.',
  alternates: { canonical: 'https://perrinehuon.com/tarifs-creation-site-web' },
  openGraph: {
    title: 'Tarifs Création de Site Internet 2026 — Devis Gratuit',
    description:
      'Découvrez les tarifs de création de site internet : site vitrine à partir de 1 500€, e-commerce à partir de 3 000€, application web sur devis.',
    type: 'website',
    url: 'https://perrinehuon.com/tarifs-creation-site-web',
    siteName: 'Perrine Huon - Création de Sites Internet',
    locale: 'fr_FR',
  },
};

const pricingPlans = [
  {
    name: 'Site Vitrine',
    price: 'À partir de 1 500 €',
    description: 'Idéal pour présenter votre activité et attirer des clients locaux.',
    popular: false,
    features: [
      'Design sur mesure et responsive',
      '3 à 7 pages optimisées',
      'Optimisation SEO de base',
      'Formulaire de contact',
      'Intégration Google Maps',
      'Hébergement & mise en ligne',
      'Formation à la gestion du contenu',
      'Support 30 jours après livraison',
    ],
  },
  {
    name: 'E-commerce',
    price: 'À partir de 3 000 €',
    description: 'Boutique en ligne performante avec paiement sécurisé et gestion des stocks.',
    popular: true,
    features: [
      'Tout le pack Site Vitrine',
      'Catalogue produits illimité',
      'Paiement sécurisé (Stripe, PayPal)',
      'Gestion des stocks & commandes',
      'Pages produits optimisées SEO',
      'Emails transactionnels automatiques',
      'Tableau de bord de gestion',
      'Formation complète à la boutique',
    ],
  },
  {
    name: 'Application Web',
    price: 'Sur devis',
    description: 'Solution sur mesure pour vos besoins métier : CRM, dashboard, outil interne.',
    popular: false,
    features: [
      'Analyse fonctionnelle complète',
      'Architecture sur mesure',
      'Interface utilisateur intuitive',
      'Base de données optimisée',
      'Authentification & sécurité',
      'API & intégrations tierces',
      'Tests & recette',
      'Documentation technique',
    ],
  },
  {
    name: 'Maintenance',
    price: 'À partir de 80 €/mois',
    description: 'Gardez votre site performant, sécurisé et à jour en toute sérénité.',
    popular: false,
    features: [
      'Mises à jour de sécurité',
      'Sauvegardes automatiques',
      'Monitoring des performances',
      'Corrections de bugs prioritaires',
      'Optimisation SEO continue',
      'Support technique par email',
      'Rapport mensuel de performances',
      'Modifications mineures incluses',
    ],
  },
];

const inclusions = [
  {
    title: 'SEO Optimisé',
    description:
      'Chaque page est optimisée pour le référencement naturel : balises meta, structure sémantique, performances et SEO local.',
  },
  {
    title: 'Design Responsive',
    description:
      'Votre site s\'adapte parfaitement à tous les écrans : mobile, tablette et desktop. Testé sur tous les navigateurs.',
  },
  {
    title: 'Performance Maximale',
    description:
      'Score Google PageSpeed supérieur à 90. Temps de chargement optimisé pour une expérience utilisateur fluide.',
  },
  {
    title: 'Conseil Hébergement',
    description:
      'Recommandation et mise en place de la solution d\'hébergement la plus adaptée à votre projet et votre budget.',
  },
  {
    title: 'RGPD & Mentions Légales',
    description:
      'Conformité RGPD, politique de confidentialité et mentions légales incluses pour être en règle dès le lancement.',
  },
  {
    title: 'Formation & Autonomie',
    description:
      'Formation personnalisée pour gérer votre contenu en toute autonomie. Documentation et tutoriels vidéo inclus.',
  },
];

const faqs = [
  {
    question: 'Comment est calculé le prix final de mon site internet ?',
    answer:
      'Le tarif dépend de plusieurs facteurs : le nombre de pages, les fonctionnalités souhaitées (formulaires, réservation, paiement en ligne…), la complexité du design et le volume de contenu à intégrer. Après notre premier échange, je vous fournis un devis détaillé et transparent.',
  },
  {
    question: 'Y a-t-il des coûts cachés ou des frais supplémentaires ?',
    answer:
      'Non, je pratique une politique de transparence totale. Le devis inclut l\'ensemble de la prestation. Seuls l\'hébergement (environ 10-30€/mois selon la solution) et le nom de domaine (environ 10-15€/an) sont des frais récurrents que vous payez directement au fournisseur.',
  },
  {
    question: 'Proposez-vous des facilités de paiement ?',
    answer:
      'Oui, le paiement se fait généralement en 3 fois : un acompte de 30% à la commande, 40% à la validation du design, et 30% à la livraison. Pour les projets importants, un échéancier personnalisé peut être mis en place.',
  },
  {
    question: 'Combien de temps faut-il pour créer mon site ?',
    answer:
      'Les délais varient selon la complexité : 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour un e-commerce, et 6 à 12 semaines pour une application web sur mesure. Un planning précis est défini ensemble dès le début du projet.',
  },
  {
    question: 'Que se passe-t-il après la livraison du site ?',
    answer:
      'Après la livraison, vous bénéficiez de 30 jours de support gratuit pour toute question ou ajustement mineur. Ensuite, je propose des formules de maintenance mensuelles pour assurer la pérennité et les performances de votre site.',
  },
];

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          { name: 'Tarifs', url: 'https://perrinehuon.com/tarifs-creation-site-web' },
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
              Tarifs Création de Site Internet
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">
              Des tarifs transparents adaptés à chaque projet. Du site vitrine à
              l&apos;application web sur mesure, trouvez la formule qui vous
              correspond.
            </p>
            <div className="mt-10">
              <Link href="/?openQualifier=true" className="btn-cta">
                Obtenir un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-accent shadow-sketch-accent'
                    : 'border-primary/10 hover:border-primary/20'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h3 className="text-xl font-bold text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-accent mb-3">
                  {plan.price}
                </p>
                <p className="text-primary/60 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-primary/70 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/?openQualifier=true"
                  className={
                    plan.popular ? 'btn-cta text-center' : 'btn-sketch text-center'
                  }
                >
                  Demander un devis
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Ce qui est inclus dans chaque prestation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map((item, index) => (
                <div
                  key={item.title}
                  className="flex flex-col bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm mb-4">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Questions fréquentes sur les tarifs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-primary font-semibold text-lg hover:bg-primary/5 transition-colors">
                    {faq.question}
                    <span className="flex-shrink-0 ml-4 text-accent group-open:rotate-45 transition-transform text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-primary/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Obtenez un devis personnalisé et gratuit en quelques minutes.
              Décrivez votre projet et recevez une proposition adaptée à vos
              besoins et votre budget.
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              Obtenir mon devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
