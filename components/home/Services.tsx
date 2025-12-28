'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Services() {
  // Animations au scroll
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  
  const services = [
    {
      number: '01',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Sites Web',
      subtitle: 'Sur Mesure',
      description: 'Vitrine, e-commerce ou corporate : un site qui travaille pour vous.',
    },
    {
      number: '02',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'SEO Local',
      subtitle: 'Ultra Ciblé',
      description: 'Apparaissez en premier quand vos clients cherchent près de chez eux.',
    },
    {
      number: '04',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Performance',
      subtitle: '& Optimisation',
      description: 'Votre site est lent ou mal référencé ? Je lui redonne vie.',
    },
    {
      number: '05',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Maintenance',
      subtitle: '& Support',
      description: 'Vous gérez votre business, je m\'occupe de votre site.',
    },
    {
      number: '06',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Stratégie',
      subtitle: 'Digitale',
      description: 'Pas de recette toute faite. Une stratégie marketing pensée pour vous.',
    },
  ];

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-paper-light grain-overlay overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cercles décoratifs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 border-2 border-primary/5 rounded-full" />
        <div className="absolute bottom-20 -left-32 w-96 h-96 border-2 border-primary/5 rounded-full" />
        
        {/* Formes géométriques */}
        <svg className="absolute top-20 left-10 w-8 h-8 text-primary/10" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-40 right-20 w-6 h-6 text-primary/10" viewBox="0 0 24 24">
          <polygon points="12,4 20,20 4,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div ref={titleRef} className="text-center mb-16 lg:mb-20">
            <span 
              className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Ce que je propose
            </span>
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Services
            </h2>
            <p 
              className={`text-lg text-primary/60 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Du conseil à la mise en ligne, je m'occupe de tout
            </p>
            
            {/* Ligne décorative */}
            <div 
              className={`w-24 h-0.5 bg-primary/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
                titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>

          {/* Grille de services */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 lg:p-8 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Numéro */}
                <div className="text-5xl font-bold text-primary/5 absolute top-6 right-6 group-hover:text-accent/10 transition-colors duration-500">
                  {service.number}
                </div>

                {/* Icône */}
                <div className="text-primary/50 group-hover:text-primary transition-colors duration-500 mb-6">
                  {service.icon}
                </div>

                {/* Titre */}
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-primary/40 font-medium tracking-wider uppercase mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-primary/60 leading-relaxed">
                  {service.description}
                </p>

                {/* Ligne de hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 rounded-b-sketch-lg" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div 
            ref={ctaRef} 
            className={`text-center mt-16 transition-all duration-700 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#contact"
              className="btn-cta group inline-flex items-center gap-3"
            >
              <span>Discuter de mon projet</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
