export default function Services() {
  const services = [
    {
      number: '01',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Sites Web',
      subtitle: 'Sur Mesure',
      description: 'Création de sites vitrines, e-commerce et corporate avec design moderne et performances optimales.',
    },
    {
      number: '02',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Applications',
      subtitle: 'Web & Mobile',
      description: 'Développement d\'applications complexes, SaaS, dashboards et outils métiers avec technologies modernes.',
    },
    {
      number: '03',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'SEO Local',
      subtitle: 'Ultra Ciblé',
      description: 'Stratégie SEO géolocalisé pour dominer les recherches dans votre zone géographique cible.',
    },
    {
      number: '04',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Performance',
      subtitle: '& Optimisation',
      description: 'Refonte et optimisation de sites existants pour des performances et un référencement maximaux.',
    },
    {
      number: '05',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Maintenance',
      subtitle: '& Support',
      description: 'Accompagnement continu avec mises à jour, sécurité, sauvegardes et support technique réactif.',
    },
    {
      number: '06',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Stratégie',
      subtitle: 'Digitale',
      description: 'Conseil stratégique, analyse de marché et accompagnement dans votre transformation digitale.',
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-primary-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-24">
            <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-light">02</span>
            <h2 className="text-6xl md:text-7xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                SERVICES
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Une expertise complète pour propulser votre présence digitale
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8" />
          </div>

          {/* Grille de services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative glass-dark p-8 rounded-2xl hover:bg-white/5 transition-all duration-500"
              >
                {/* Numéro */}
                <div className="text-5xl font-bold text-white/5 absolute top-6 right-6 group-hover:text-secondary/10 transition-colors duration-500">
                  {service.number}
                </div>

                {/* Icône */}
                <div className="text-secondary/60 group-hover:text-secondary transition-colors duration-500 mb-6">
                  {service.icon}
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-white mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary font-light tracking-wider uppercase mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/60 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-secondary to-accent-orange group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <a
              href="#contact"
              className="inline-block glass-dark px-12 py-5 hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-white/80 font-semibold tracking-wider uppercase text-sm">
                Discuter de mon projet
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
