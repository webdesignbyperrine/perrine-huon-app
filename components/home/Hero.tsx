'use client';

import { useState, useEffect, useRef } from 'react';
import { ProjectQualifier } from '@/components/project-qualifier';
import HeroIllustration from '@/components/illustrations/HeroIllustration';

export default function Hero() {
  const [showQualifier, setShowQualifier] = useState(false);
  const qualifierRef = useRef<HTMLDivElement>(null);

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in-up">
                Soyez visible où
                <br />
                <span className="text-primary/60">vos clients vous cherchent.</span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl lg:text-2xl text-primary/60 mb-8 animate-fade-in-up animation-delay-200">
                Votre site web conçu sur mesure.
                <br />
                Sites web, applications & SEO géolocalisé.
              </p>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animation-delay-300">
                <button
                  onClick={() => setShowQualifier(true)}
                  className="btn-cta btn-cta-pulse group w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-3">
                    {/* Icône stylo/aiguille */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                      <path d="M2 2l7.586 7.586"/>
                      <circle cx="11" cy="11" r="2"/>
                    </svg>
                    <span>Définir mes besoins</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
              </button>
                
                <span className="text-sm text-primary/40 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gratuit • 2 min
                </span>
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
                Retour à l'accueil
                </button>

                <ProjectQualifier mode="inline" />
              </div>
            )}
          </div>

        </div>

    </section>
  );
}
