import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Freelance vs Agence Web : Comment Choisir en 2026',
  description:
    'Freelance ou agence web ? Comparez les avantages, inconvénients et tarifs pour faire le bon choix pour votre site internet. Guide complet 2026.',
  alternates: {
    canonical: 'https://perrinehuon.com/freelance-vs-agence-web',
  },
  openGraph: {
    title: 'Freelance vs Agence Web : Comment Choisir en 2026',
    description:
      'Freelance ou agence web ? Comparez les avantages, inconvénients et tarifs pour faire le bon choix pour votre site internet.',
    type: 'website',
    url: 'https://perrinehuon.com/freelance-vs-agence-web',
    siteName: 'Perrine Huon - Création de Sites Internet',
    locale: 'fr_FR',
  },
};

const comparisonRows = [
  {
    criterion: 'Tarif moyen site vitrine',
    freelance: '1 500 – 4 000 €',
    agence: '5 000 – 15 000 €',
    diy: '0 – 500 €',
  },
  {
    criterion: 'Délai de livraison',
    freelance: '2 – 6 semaines',
    agence: '6 – 16 semaines',
    diy: '1 – 4 semaines',
  },
  {
    criterion: 'Interlocuteur unique',
    freelance: '✓',
    agence: '✗ (équipe multiple)',
    diy: '✓ (vous-même)',
  },
  {
    criterion: 'Personnalisation',
    freelance: 'Totale',
    agence: 'Totale',
    diy: 'Limitée (templates)',
  },
  {
    criterion: 'Performance & SEO',
    freelance: 'Excellente',
    agence: 'Excellente',
    diy: 'Variable',
  },
  {
    criterion: 'Réactivité',
    freelance: 'Très rapide',
    agence: 'Moyenne',
    diy: 'N/A',
  },
  {
    criterion: 'Maintenance',
    freelance: 'Incluse ou en option',
    agence: 'Contrat annuel',
    diy: 'À votre charge',
  },
  {
    criterion: 'Scalabilité',
    freelance: 'Bonne',
    agence: 'Excellente',
    diy: 'Limitée',
  },
];

const freelanceAdvantages = [
  {
    title: 'Rapport qualité-prix imbattable',
    description:
      'Sans les frais de structure d\'une agence, un freelance propose des tarifs 40 à 60% inférieurs pour une qualité équivalente.',
  },
  {
    title: 'Communication directe',
    description:
      'Pas d\'intermédiaire. Vous échangez directement avec la personne qui conçoit et développe votre site, ce qui réduit les malentendus.',
  },
  {
    title: 'Flexibilité & réactivité',
    description:
      'Un freelance s\'adapte à votre planning et peut réagir rapidement aux demandes de modifications, sans les processus lourds d\'une agence.',
  },
  {
    title: 'Engagement personnel',
    description:
      'Votre projet n\'est pas un dossier parmi des dizaines. Le freelance s\'engage personnellement dans la réussite de votre site.',
  },
];

const agenceAdvantages = [
  {
    title: 'Ressources multiples',
    description:
      'Une agence dispose de spécialistes variés (designer, développeur, rédacteur, SEO) qui peuvent intervenir en parallèle.',
  },
  {
    title: 'Projets de grande envergure',
    description:
      'Pour des projets très complexes nécessitant plusieurs expertises simultanées, une agence peut mobiliser une équipe complète.',
  },
  {
    title: 'Continuité de service',
    description:
      'En cas d\'absence d\'un collaborateur, l\'agence assure la continuité du projet grâce à son équipe.',
  },
];

const perrineBenefits = [
  {
    title: 'Technologies premium, tarif freelance',
    description:
      'Next.js, React, Tailwind CSS : les mêmes outils que les meilleures agences, sans les frais de structure.',
  },
  {
    title: 'SEO intégré dès le départ',
    description:
      'Le référencement naturel est pensé dès la conception, pas ajouté comme une option coûteuse après coup.',
  },
  {
    title: 'Suivi personnalisé de A à Z',
    description:
      'De la stratégie à la mise en ligne, un accompagnement sur mesure à chaque étape de votre projet.',
  },
  {
    title: 'Performance mesurable',
    description:
      'Des sites qui obtiennent 95+ sur Google PageSpeed, avec des résultats concrets en visibilité et conversions.',
  },
  {
    title: 'Transparence totale',
    description:
      'Devis détaillé, planning clair, communication régulière. Vous savez toujours où en est votre projet.',
  },
];

const faqs = [
  {
    question: 'Un freelance peut-il gérer un projet complexe aussi bien qu\'une agence ?',
    answer:
      'Absolument. Un freelance expérimenté maîtrise l\'ensemble de la chaîne de création (design, développement, SEO) et peut mobiliser des collaborateurs spécialisés si nécessaire. Pour la majorité des projets de PME et professions libérales, un freelance est non seulement suffisant mais souvent préférable pour la qualité de la relation client.',
  },
  {
    question: 'Que se passe-t-il si le freelance n\'est plus disponible ?',
    answer:
      'Un code propre et bien documenté garantit que n\'importe quel développeur compétent peut reprendre le projet. C\'est pourquoi j\'utilise des technologies standards (Next.js, React) et que je fournis une documentation complète. Votre site ne dépend jamais d\'une seule personne.',
  },
  {
    question: 'Comment choisir entre freelance et agence pour mon projet ?',
    answer:
      'Si votre budget est inférieur à 10 000€ et que vous souhaitez un interlocuteur unique avec une relation de confiance, le freelance est idéal. Si votre projet nécessite plus de 5 métiers différents en simultané (ex: application mobile + web + marketing), une agence peut être pertinente.',
  },
  {
    question: 'Pourquoi ne pas simplement créer mon site moi-même avec WordPress ?',
    answer:
      'C\'est possible pour des besoins très simples, mais un site fait maison manquera souvent de performance, de sécurité et de référencement professionnel. Le temps que vous y consacrerez pourrait être mieux investi dans votre activité principale. Un professionnel vous fait gagner du temps et vous garantit un résultat à la hauteur de votre image.',
  },
];

export default function FreelanceVsAgencePage() {
  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          {
            name: 'Freelance vs Agence',
            url: 'https://perrinehuon.com/freelance-vs-agence-web',
          },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} />

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
              Freelance vs Agence Web
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 leading-relaxed max-w-3xl mx-auto">
              Comment choisir le bon partenaire pour la création de votre site
              internet ? Comparaison objective pour vous aider à décider.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Comparatif détaillé
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/60 backdrop-blur-sm rounded-sketch-lg border-2 border-primary/10 overflow-hidden">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="text-left p-4 md:p-6 text-primary font-bold">
                      Critère
                    </th>
                    <th className="p-4 md:p-6 text-accent font-bold text-center">
                      Freelance
                    </th>
                    <th className="p-4 md:p-6 text-primary font-bold text-center">
                      Agence
                    </th>
                    <th className="p-4 md:p-6 text-primary/50 font-bold text-center">
                      WordPress DIY
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
                      <td className="p-4 md:p-6 text-center text-accent text-sm font-medium">
                        {row.freelance}
                      </td>
                      <td className="p-4 md:p-6 text-center text-primary/70 text-sm">
                        {row.agence}
                      </td>
                      <td className="p-4 md:p-6 text-center text-primary/50 text-sm">
                        {row.diy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quand choisir un freelance */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Quand choisir un freelance ?
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              Le freelance est le choix idéal pour la majorité des projets web
              de PME, professions libérales et associations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelanceAdvantages.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-accent/20"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-accent"
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
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quand choisir une agence */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Quand choisir une agence ?
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              L&apos;agence peut être pertinente dans certains cas spécifiques.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agenceAdvantages.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
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

      {/* Les avantages de travailler avec Perrine */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Les avantages de travailler avec Perrine
            </h2>
            <p className="text-primary/60 text-center max-w-2xl mx-auto mb-14">
              Le meilleur des deux mondes : l&apos;expertise technique d&apos;une
              agence avec la proximité et les tarifs d&apos;un freelance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perrineBenefits.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm mb-4 inline-flex">
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
              Questions fréquentes
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
              Convaincu par le freelance ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Discutons de votre projet lors d&apos;un premier échange gratuit et
              sans engagement. Vous verrez par vous-même les avantages de
              travailler en direct.
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              Discuter de mon projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
