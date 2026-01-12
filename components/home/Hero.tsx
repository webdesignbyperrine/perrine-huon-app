'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectQualifier } from '@/components/project-qualifier';
import HeroIllustration from '@/components/illustrations/HeroIllustration';
import { useSound } from '@/hooks/useSound';
import TypewriterText from '@/components/TypewriterText';

export default function Hero() {
  const [showQualifier, setShowQualifier] = useState(false);
  const qualifierRef = useRef<HTMLDivElement>(null);
  
  // Son au clic sur "C'est parti" 🎮
  const { play: playRaceStartSound } = useSound('/sounds/race-start.wav', { volume: 0.5 });

  // Fonction pour ouvrir le qualifier (utilisée par le bouton Hero et le Header)
  const openQualifier = useCallback(() => {
    playRaceStartSound();
    setShowQualifier(true);
  }, [playRaceStartSound]);

  // Ouvrir le qualifier si le paramètre URL est présent (depuis une autre page)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openQualifier') === 'true') {
      // Petit délai pour laisser la page se charger
      setTimeout(() => {
        openQualifier();
        // Nettoyer l'URL
        window.history.replaceState({}, '', '/');
      }, 300);
    }
  }, [openQualifier]);

  // Scroll vers le haut du qualifier quand il s'ouvre
  useEffect(() => {
    if (showQualifier && qualifierRef.current) {
      setTimeout(() => {
        const yOffset = -80;
        const element = qualifierRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 100);
    }
  }, [showQualifier]);

  // Écouter l'événement pour fermer le questionnaire depuis le Header
  useEffect(() => {
    const handleCloseQualifier = () => {
      if (showQualifier) {
        setShowQualifier(false);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('closeQualifier', handleCloseQualifier);
    return () => window.removeEventListener('closeQualifier', handleCloseQualifier);
  }, [showQualifier]);

  // Écouter l'événement pour ouvrir le qualifier depuis le Header
  useEffect(() => {
    const handleOpenQualifier = () => {
      openQualifier();
    };

    window.addEventListener('openQualifier', handleOpenQualifier);
    return () => window.removeEventListener('openQualifier', handleOpenQualifier);
  }, [openQualifier]);

  return (
    <section className="relative min-h-screen bg-paper-light grain-overlay overflow-hidden">
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Grande forme circulaire floue - extrême haut droite (déborde largement) */}
        <div 
          className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, var(--primary-blue) 0%, transparent 70%)',
          }}
        />
        
        {/* Cercle contour - extrême gauche (majorité cachée) */}
        <div 
          className="absolute top-[25%] -left-36 w-48 h-48 rounded-full border-2 border-primary/15"
        />
        
        {/* Forme floue accent - extrême bas gauche (déborde largement) */}
        <div 
          className="absolute -bottom-40 -left-32 w-64 h-64 rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Lignes décoratives - courbe de transition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <svg 
          className="absolute left-0 w-full h-32 text-primary lg:bottom-[5vh] bottom-0" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 50 Q 200 20 400 50 T 800 50 T 1200 50 T 1600 50" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15"/>
          <path d="M0 70 Q 200 40 400 70 T 800 70 T 1200 70 T 1600 70" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.1"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
          {/* Vue principale - avant le qualifier */}
          <div className={`transition-all duration-500 ease-out ${showQualifier ? 'opacity-0 scale-95 absolute inset-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
            
          <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 pt-18 pb-20">
            
            {/* Contenu textuel - Gauche */}
            <div className="flex-1 lg:flex-none lg:w-[45%] max-w-xl text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border-2 border-primary/20 rounded-full mb-6 animate-fade-in-down">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-primary/70 uppercase tracking-wider">
                  Web Designer & Developer
                </span>
                  </div>

                  {/* Titre principal */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                <span className="text-primary">Vous bossez.</span>
                <br />
                <span className="text-primary">Votre site web aussi.</span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl lg:text-2xl text-primary/60 mb-2 animate-fade-in-up animation-delay-200">
                Pensé pour être trouvé.
                <br />
                Conçu pour convertir.
              </p>
              
              {/* Phrase manuscrite */}
              <p className="text-2xl lg:text-3xl text-accent mb-6 animate-fade-in-up animation-delay-200" style={{ fontFamily: 'var(--font-caveat)' }}>
                <TypewriterText 
                  text="Construisons ensemble votre succès digital."
                  delay={60}
                  startDelay={800}
                  showCursor={true}
                />
              </p>

              {/* CTA Principal avec badge */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 animate-fade-in-up animation-delay-300">
                {/* Wrapper bouton */}
                <div className="flex flex-col items-center">
                  
                  {/* Bouton CTA principal */}
                  <button
                    onClick={() => {
                      openQualifier();
                    }}
                    className="btn-cta-hero-enhanced group w-full sm:w-auto"
                  >
                    {/* Effet shimmer */}
                    <span className="btn-shimmer"></span>
                    
                    <span className="relative flex flex-col items-center justify-center gap-1">
                      {/* Label Quiz interactif */}
                      <span className="text-xs font-medium uppercase tracking-wider opacity-80">Quiz interactif</span>
                      
                      {/* Contenu principal */}
                      <span className="flex items-center justify-center gap-3">
                        {/* Icône devis/document */}
                        <span className="btn-icon-bounce">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </span>
                        <span className="font-bold">Quel est votre projet ?</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </span>
                  </button>
                  
                  {/* Badge de confiance - en dessous du bouton, centré */}
                  <span className="text-sm text-primary/50 flex items-center gap-2 mt-3">
                    <svg className="w-4 h-4 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>2 min chrono</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Illustration Lottie - Droite */}
            <div className="flex-1 lg:flex-none lg:w-[55%] flex items-center justify-center animate-fade-in-right animation-delay-300">
              <HeroIllustration className="w-full max-w-none lg:scale-110 xl:scale-125 origin-center" />
            </div>

            </div>

          </div>

          {/* ============================================ */}
          {/* Project Qualifier - Mode actif */}
          {/* ============================================ */}
          <div ref={qualifierRef} className={`transition-all duration-500 ease-out ${showQualifier ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
            {showQualifier && (
            <div className="min-h-screen py-24">
                {/* Bouton retour */}
                <button
                  onClick={() => setShowQualifier(false)}
                className="mb-6 flex items-center gap-2 text-primary/50 hover:text-primary transition-colors text-sm group"
                >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                Retour à l&apos;accueil
                </button>

                <ProjectQualifier mode="inline" />
              </div>
            )}
          </div>

        </div>

    </section>
  );
}
