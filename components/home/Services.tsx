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
      description: 'Vitrine, e-commerce ou corporate : un site qui travaille pour vous.',
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
      description: 'Apparaissez en premier quand vos clients cherchent près de chez eux.',
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
      description: 'Votre site est lent ou mal référencé ? Je lui redonne vie.',
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
      description: 'Vous gérez votre business, je m\'occupe de votre site.',
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
      description: 'Pas de recette toute faite. Une stratégie marketing pensée pour vous.',
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-[#0d1a2d] overflow-hidden">
      {/* Motif grille */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px)
          `
        }}
      />
      {/* Vaguelettes topographiques */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='topographic' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50' fill='none' stroke='rgba(107, 142, 200, 0.15)' stroke-width='1'/%3E%3Cpath d='M0 40 Q 25 20 50 40 T 100 40' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3Cpath d='M0 60 Q 25 40 50 60 T 100 60' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23topographic)'/%3E%3C/svg%3E")`
        }}
      />
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                SERVICES
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Du conseil à la mise en ligne, je m'occupe de tout
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
                <div className="text-white/50 group-hover:text-white/80 transition-colors duration-500 mb-6">
                  {service.icon}
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h3>
                <p className="text-sm text-white/50 font-light tracking-wider uppercase mb-4">
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

          {/* CTA - Style tube en verre avec liquide */}
          <div className="text-center mt-20">
            <a
              href="#contact"
              className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <div 
                className="relative flex items-center gap-3 px-12 py-5 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                {/* Reflet du verre */}
                <span 
                  className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                />
                
                {/* Liquide */}
                <span 
                  className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                    boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  <span 
                    className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                  />
                </span>
                
                <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
                  Discuter de mon projet
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Séparateur animé en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-white/10 animate-pulse" />
      </div>
    </section>
  );
}
