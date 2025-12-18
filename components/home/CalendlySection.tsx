'use client';

import SectionDivider from './SectionDivider';

export default function CalendlySection() {
  const calendlyUrl = "https://calendly.com/prne-hn/30min";

  return (
    <section id="rdv" className="relative py-20 pb-32 bg-primary-900">
      {/* Divider en haut - prend la couleur de cette section (#0d1a2d) */}
      <SectionDivider bottomSectionColor="#0d1a2d" position="top" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Carte principale - Style identique au Hero */}
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 26, 45, 0.95) 0%, rgba(15, 27, 46, 0.98) 50%, rgba(10, 22, 40, 0.95) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(107, 142, 200, 0.15)'
            }}
          >
            {/* Reflet supérieur subtil */}
            <div 
              className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)',
                borderRadius: '1rem 1rem 0 0'
              }}
            />

            {/* Contenu */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              {/* Icône visio - Style identique au Hero */}
              <div 
                className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 27, 46, 0.9) 0%, rgba(10, 22, 40, 0.95) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(107, 142, 200, 0.2)'
                }}
              >
                <svg 
                  className="w-10 h-10 text-white/80" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
              </div>

              {/* Titre */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Discutons de votre projet
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light">
                30 minutes pour faire connaissance, comprendre vos besoins et vous proposer les meilleures solutions.
              </p>

              {/* Bouton CTA - Style tube en verre identique au Hero */}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.03]"
              >
                <div 
                  className="relative flex items-center gap-4 px-10 md:px-14 py-5 md:py-6 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.15) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.18)'
                  }}
                >
                  {/* Reflet du verre */}
                  <span 
                    className="absolute top-0 left-8 right-8 h-3 rounded-t-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)' }}
                  />
                  
                  {/* Liquide - Dégradé vert identique au Hero */}
                  <span 
                    className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, #1a6b5a 0%, #0d433e 50%, #082b27 100%)',
                      boxShadow: '0 0 20px rgba(13, 67, 62, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {/* Petites bulles décoratives */}
                    <span className="absolute bottom-3 left-1/4 w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="absolute bottom-4 left-1/2 w-1 h-1 rounded-full bg-white/15" />
                    <span className="absolute bottom-2 right-1/3 w-1.5 h-1.5 rounded-full bg-white/20" />
                    
                    {/* Reflet animé dans le liquide */}
                    <span 
                      className="absolute top-1 left-8 right-8 h-3 rounded-full transition-transform duration-500 group-hover/cta:translate-x-3"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.35) 70%, transparent 100%)' }}
                    />
                  </span>
                  
                  {/* Icône calendrier */}
                  <svg 
                    className="relative z-10 w-6 h-6 text-white/90 drop-shadow-lg" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  
                  <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm md:text-base drop-shadow-lg">
                    Réserver un créneau
                  </span>

                  {/* Flèche */}
                  <svg 
                    className="relative z-10 w-5 h-5 text-white/80 transition-transform duration-300 group-hover/cta:translate-x-1 drop-shadow-lg" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>

              {/* Badge gratuit - Style identique au Hero */}
              <p className="mt-8 text-white/40 text-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Première consultation offerte • Sans engagement
              </p>
            </div>
          </div>

          {/* Bénéfices - Style glass cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "30 minutes",
                description: "Un échange rapide et efficace"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "100% gratuit",
                description: "Aucun frais, discussion libre"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: "Conseils personnalisés",
                description: "Solutions adaptées à vos besoins"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(47, 69, 88, 0.3) 0%, rgba(13, 67, 62, 0.2) 100%)',
                  border: '1px solid rgba(107, 142, 200, 0.15)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13, 67, 62, 0.6) 0%, rgba(47, 69, 88, 0.4) 100%)',
                    border: '1px solid rgba(107, 142, 200, 0.2)'
                  }}
                >
                  <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
                
                {/* Ligne de hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-secondary to-accent-orange group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Divider en bas - prend la couleur de la section suivante (#0d433e) */}
      <SectionDivider bottomSectionColor="#0d433e" position="bottom" />
    </section>
  );
}
