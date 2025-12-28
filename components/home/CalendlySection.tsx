'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CalendlySection() {
  const calendlyUrl = "https://calendly.com/prne-hn/30min";
  
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [cardRef, cardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [benefitsRef, benefitsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="rdv" className="relative pt-8 lg:pt-12 pb-32 lg:pb-40 bg-primary section-dark scroll-mt-24 overflow-hidden">
      {/* Transition ondulée en haut - supprimée car PortfolioPreview gère cette transition */}
      
      {/* Fond avec grain */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0" />
      
      {/* Éléments décoratifs - z-index 0 pour rester en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-40 right-20 w-8 h-8 text-paper/10" viewBox="0 0 32 32">
          <polygon points="16,4 28,28 4,28" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-48 left-20 w-6 h-6 text-paper/10" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Titre */}
          <div ref={titleRef} className="text-center mb-12">
            <span 
              className={`inline-block text-sm font-medium text-paper/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Prendre rendez-vous
            </span>
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-paper mb-4 transition-all duration-700 delay-100 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              On s'appelle ?
            </h2>
            <p 
              className={`text-lg text-paper/60 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              30 minutes pour faire connaissance, comprendre vos besoins et vous proposer les meilleures solutions.
            </p>
            
            {/* Ligne décorative */}
            <div 
              className={`w-24 h-0.5 bg-paper/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
                titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>
          
          {/* Carte principale */}
          <div 
            ref={cardRef}
            className={`relative bg-paper/5 border-2 border-paper/10 rounded-sketch-xl p-8 md:p-12 text-center hover:border-paper/20 transition-all duration-500 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Icône visio */}
            <div className="w-20 h-20 mx-auto mb-8 bg-paper/5 border-2 border-paper/20 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-paper/80" 
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

            {/* Sous-titre */}
            <h3 className="text-2xl sm:text-3xl font-bold text-paper mb-4">
              Discutons de votre projet
            </h3>
            
            <p className="text-paper/60 max-w-xl mx-auto mb-10">
              Première consultation offerte, sans engagement. Je vous conseille sur la meilleure approche pour votre projet.
            </p>

            {/* Bouton CTA */}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-pulse group inline-flex items-center gap-3"
            >
              {/* Icône calendrier */}
              <svg 
                className="w-5 h-5" 
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
              
              <span>Réserver un créneau</span>

              {/* Flèche */}
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Badge gratuit */}
            <p className="mt-8 text-paper/40 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-paper/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Première consultation offerte • Sans engagement
            </p>
          </div>

          {/* Bénéfices */}
          <div ref={benefitsRef} className="grid md:grid-cols-3 gap-6 mt-12">
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
                className={`group bg-paper/5 border-2 border-paper/10 rounded-sketch-lg p-6 text-center hover:border-paper/20 hover:-translate-y-1 transition-all duration-500 ${
                  benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-paper/5 border-2 border-paper/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-paper mb-2">{item.title}</h3>
                <p className="text-paper/50 text-sm">{item.description}</p>
                
                {/* Ligne de hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 rounded-b-sketch-lg" />
              </div>
            ))}
          </div>

        </div>
      </div>
      
    </section>
  );
}
