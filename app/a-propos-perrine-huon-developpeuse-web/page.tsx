import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'À Propos — Perrine Huon, Développeuse Web Freelance',
  description:
    'Découvrez le parcours de Perrine Huon, développeuse web freelance spécialisée en création de sites internet sur mesure. Mon approche, mes valeurs et pourquoi me choisir.',
  alternates: {
    canonical: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
  },
  openGraph: {
    title: 'À Propos — Perrine Huon, Développeuse Web Freelance',
    description:
      'Découvrez le parcours de Perrine Huon, développeuse web freelance spécialisée en création de sites internet sur mesure.',
    type: 'website',
    url: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
    siteName: 'Perrine Huon - Création de Sites Internet',
    locale: 'fr_FR',
  },
};

const values = [
  {
    title: 'Écoute & Compréhension',
    description:
      'Chaque projet commence par une écoute attentive de vos besoins, votre activité et vos objectifs. Pas de solution toute faite : je construis avec vous.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Qualité Artisanale',
    description:
      'Chaque ligne de code est réfléchie. Pas de template générique ni de constructeur de page : votre site est créé sur mesure, pixel par pixel.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Transparence Totale',
    description:
      'Vous savez exactement où en est votre projet à chaque étape. Communication claire, délais respectés, pas de surprise sur la facture.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Performance & SEO',
    description:
      'Un site beau ne suffit pas, il doit être rapide et visible. Chaque projet est optimisé pour Google et pour offrir la meilleure expérience utilisateur.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const skills = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Vercel', category: 'Infra' },
  { name: 'SEO Technique', category: 'Marketing' },
  { name: 'SEO Local', category: 'Marketing' },
  { name: 'Figma', category: 'Design' },
  { name: 'UI/UX Design', category: 'Design' },
];

const differentiators = [
  {
    title: 'Interlocutrice unique',
    description:
      'Un seul point de contact du début à la fin. Pas de commercial, pas de chef de projet intermédiaire : vous parlez directement à celle qui crée votre site.',
  },
  {
    title: 'Technologies modernes',
    description:
      'Next.js, React, Tailwind CSS : les mêmes technologies utilisées par les géants du web, adaptées à votre projet pour des performances optimales.',
  },
  {
    title: 'SEO intégré dès la conception',
    description:
      'Le référencement n\'est pas un ajout en fin de projet. Il est pensé dès l\'architecture et intégré dans chaque page pour une visibilité maximale.',
  },
  {
    title: 'Accompagnement personnalisé',
    description:
      'Au-delà de la livraison du site, je vous accompagne avec une formation, des conseils stratégiques et un support réactif pour votre sérénité.',
  },
  {
    title: 'Tarifs transparents',
    description:
      'Un devis clair et détaillé avant le démarrage. Pas de frais cachés ni de surprise. Vous savez exactement ce que vous payez et ce que vous obtenez.',
  },
  {
    title: 'Résultats mesurables',
    description:
      'Chaque site est livré avec des outils d\'analyse. Vous pouvez suivre vos visiteurs, vos conversions et le retour sur investissement de votre présence en ligne.',
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-paper-light">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          {
            name: 'À Propos',
            url: 'https://perrinehuon.com/a-propos-perrine-huon-developpeuse-web',
          },
        ]}
      />

      {/* Hero */}
      <section className="relative grain-overlay pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/50 hover:text-primary transition-colors mb-8 text-sm"
            >
              ← Retour à l&apos;accueil
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                  Perrine Huon
                </h1>
                <p className="text-xl md:text-2xl text-accent font-semibold mb-4">
                  Développeuse Web Freelance
                </p>
                <p className="text-lg text-primary/60 leading-relaxed mb-8">
                  Passionnée par le web et le design, je crée des sites internet
                  sur mesure qui allient esthétique, performance et
                  référencement. Mon objectif : donner à chaque projet une
                  présence en ligne à la hauteur de son ambition.
                </p>
                <Link href="/?openQualifier=true" className="btn-cta">
                  Discutons de votre projet
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-sketch-xl bg-primary/5 border-2 border-primary/10 flex items-center justify-center">
                  <span className="text-primary/30 text-sm">Photo à venir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon Parcours */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Mon parcours
            </h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-sketch-lg p-8 md:p-12 border-2 border-primary/10">
              <div className="space-y-6 text-primary/70 leading-relaxed text-lg">
                <p>
                  Après plusieurs années dans le monde professionnel, j&apos;ai
                  fait le choix de me consacrer entièrement à ma passion : le
                  développement web. Une reconversion mûrement réfléchie, portée
                  par l&apos;envie de créer des outils numériques qui ont un réel
                  impact pour mes clients.
                </p>
                <p>
                  Formée aux technologies les plus modernes du web (Next.js,
                  React, TypeScript), je me suis spécialisée dans la création de
                  sites internet sur mesure pour les PME, professions libérales
                  et associations. Mon approche combine la rigueur technique avec
                  une sensibilité pour le design et l&apos;expérience
                  utilisateur.
                </p>
                <p>
                  Aujourd&apos;hui, je suis freelance et j&apos;accompagne mes
                  clients de A à Z : de la réflexion stratégique à la mise en
                  ligne, en passant par le design, le développement et
                  l&apos;optimisation SEO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon Approche */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Mon approche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-5 bg-white/60 backdrop-blur-sm rounded-sketch-lg p-6 border-2 border-primary/10"
                >
                  <span className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    {value.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mes Compétences */}
      <section className="py-20 bg-paper-light grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Mes compétences
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center text-center bg-white/60 backdrop-blur-sm rounded-sketch-lg p-5 border-2 border-primary/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-primary font-semibold text-sm">
                    {skill.name}
                  </span>
                  <span className="text-primary/40 text-xs mt-1">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi me choisir */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
              Pourquoi me choisir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item, index) => (
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

      {/* CTA Final */}
      <section className="py-20 bg-primary grain-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Envie de travailler ensemble ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Discutons de votre projet autour d&apos;un premier échange gratuit
              et sans engagement. Je serai ravie de vous accompagner dans la
              création de votre site internet.
            </p>
            <Link href="/?openQualifier=true" className="btn-cta">
              Parlons de votre projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
