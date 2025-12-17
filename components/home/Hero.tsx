'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ProjectQualifier } from '@/components/project-qualifier';

export default function Hero() {
  const [showQualifier, setShowQualifier] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/images/logo_vert_perrine_huon.png');
  const qualifierRef = useRef<HTMLDivElement>(null);
  
  // Mettre à true pour afficher les cercles décoratifs en arrière-plan
  const showBackgroundOrbs = false;

  useEffect(() => {
    // Charger le logo depuis les settings
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      })
      .catch(error => {
        console.error('Error loading logo:', error);
      });
  }, []);

  // Scroll vers le haut du qualifier quand il s'ouvre
  useEffect(() => {
    if (showQualifier && qualifierRef.current) {
      // Attendre un peu pour que le DOM soit mis à jour
      setTimeout(() => {
        const yOffset = -80; // Offset pour le header fixe
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
        // Fermer le questionnaire
        setShowQualifier(false);
        // Scroller vers le haut après fermeture
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300); // Attendre la fin de l'animation de fermeture
      } else {
        // Si le questionnaire n'est pas ouvert, juste scroller vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('closeQualifier', handleCloseQualifier);
    return () => window.removeEventListener('closeQualifier', handleCloseQualifier);
  }, [showQualifier]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900 pb-32">
      {/* Fond avec grille subtile */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Éléments 3D colorés en arrière-plan - Contrôlé par showBackgroundOrbs */}
      {showBackgroundOrbs && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Orbe centrale qui pulse */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-secondary/30 via-secondary/20 to-transparent rounded-full transition-all duration-700 ${isHovering ? 'scale-125 opacity-80' : 'scale-100 opacity-40'}`}
            style={{ filter: 'blur(80px)' }}
          />
          
          {/* Cercles décoratifs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-secondary/10 rounded-full animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-secondary/5 rounded-full animate-rotate-slow" style={{ animationDuration: '35s' }} />
        </div>
      )}

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Vue principale - avant le qualifier */}
          <div className={`transition-all duration-500 ease-out ${showQualifier ? 'opacity-0 scale-95 absolute inset-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
            
            {/* Logo Perroquet centré */}
            <div className="text-center pt-[72px] md:pt-[104px] mb-6">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full glass-dark border border-secondary/20">
                <Image
                  src={logoUrl}
                  alt="Perrine Huon Logo"
                  width={64}
                  height={64}
                  className="object-contain brightness-0 invert opacity-90"
                  key={logoUrl}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>

            {/* Header - Titre professionnel */}
            <div className="text-center mb-8">
              <h2 className="text-lg md:text-xl font-light tracking-[0.4em] uppercase text-white/50">
                WEB DESIGNER & DEVELOPER
              </h2>
            </div>

            {/* Sous-titre SEO */}
            <p className="text-center text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-12 font-light">
              Soyez visible là où vos clients vous cherchent
            </p>

            {/* ============================================ */}
            {/* ZONE INTERACTIVE PRINCIPALE - Le focus */}
            {/* ============================================ */}
            <div 
              className="relative mx-auto max-w-3xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Card interactive principale */}
              <button
                onClick={() => setShowQualifier(true)}
                className="group relative w-full p-8 md:p-12 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Fond glassmorphism */}
                <div className="absolute inset-0 glass-dark" />
                
                {/* Bordure animée */}
                <div className="absolute inset-0 rounded-3xl border border-secondary/20 group-hover:border-secondary/40 transition-colors duration-500" />
                
                {/* Glow effect au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Particules flottantes */}
                <div 
                  className="absolute inset-0 overflow-hidden rounded-3xl p-0 m-0"
                  style={{
                    backgroundClip: 'unset',
                    WebkitBackgroundClip: 'unset',
                    color: 'rgba(240, 234, 214, 1)',
                    borderColor: 'rgba(126, 125, 121, 1)'
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-secondary/30 rounded-full"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>

                {/* Contenu */}
                <div className="relative z-10 text-center">
                  {/* Icône animée */}
                  <div className="mb-6 inline-flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl group-hover:bg-secondary/40 transition-all duration-500" style={{ transform: 'scale(2)' }} />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-10 h-10 text-secondary group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Titre principal */}
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      Votre projet web
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      conçu sur-mesure
                    </span>
                  </h1>

                  {/* Sous-titre */}
                  <p className="text-white/50 text-base md:text-lg mb-8 max-w-md mx-auto">
                    On fait le point en 2 min ?
                  </p>

                  {/* CTA Button - Effet tube en verre avec liquide animé au hover */}
                  <div className="relative inline-block group/btn">
                    {/* Tube en verre (conteneur) */}
                    <div 
                      className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full transition-transform duration-300 group-hover/btn:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Reflet du verre en haut */}
                      <span 
                        className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                        }}
                      />
                      
                      {/* Liquide (fond) avec animation de vague au hover */}
                      <span 
                        className="absolute inset-1 rounded-full pointer-events-none overflow-hidden liquid-container"
                        style={{
                          background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                          boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {/* Vague animée au hover */}
                        <span className="liquid-wave absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100" />
                        
                        {/* Reflet sur le liquide - bouge au hover */}
                        <span 
                          className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/btn:translate-x-2"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)'
                          }}
                        />
                        
                        {/* Bulles animées - plus actives au hover */}
                        <span 
                          className="absolute w-2 h-2 rounded-full bg-white/30 bubble-1"
                          style={{ right: '12%', bottom: '25%' }}
                        />
                        <span 
                          className="absolute w-1.5 h-1.5 rounded-full bg-white/20 bubble-2"
                          style={{ right: '30%', bottom: '30%' }}
                        />
                        <span 
                          className="absolute w-1 h-1 rounded-full bg-white/25 bubble-3"
                          style={{ left: '15%', bottom: '20%' }}
                        />
                        <span 
                          className="absolute w-1.5 h-1.5 rounded-full bg-white/20 bubble-4"
                          style={{ left: '35%', bottom: '35%' }}
                        />
                        <span 
                          className="absolute w-1 h-1 rounded-full bg-white/30 bubble-5"
                          style={{ right: '50%', bottom: '20%' }}
                        />
                        
                        {/* Shimmer effect au hover */}
                        <span className="liquid-shimmer absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100" />
                      </span>
                      
                      {/* Texte par-dessus */}
                      <span className="relative z-10 text-white font-semibold tracking-wide drop-shadow-lg">
                        Définir mes besoins
                      </span>
                    </div>
                  </div>

                  {/* Indicateur réassurance */}
                  <p className="mt-6 text-white/30 text-sm flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Gratuit • Sans engagement
                  </p>
                </div>
              </button>

            </div>

          </div>

          {/* ============================================ */}
          {/* Project Qualifier - Mode actif */}
          {/* ============================================ */}
          <div ref={qualifierRef} className={`transition-all duration-500 ease-out ${showQualifier ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
            {showQualifier && (
              <div className="py-4">
                {/* Bouton retour */}
                <button
                  onClick={() => setShowQualifier(false)}
                  className="mb-4 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour
                </button>

                <ProjectQualifier mode="inline" />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Scroll indicator - discret */}
      {!showQualifier && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      )}

      {/* Overlay noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.6;
          }
        }
        
        /* Bulles avec animation de base */
        .bubble-1 {
          animation: bubble-float 2s ease-in-out infinite;
        }
        .bubble-2 {
          animation: bubble-float 2.5s ease-in-out infinite 0.3s;
        }
        .bubble-3 {
          animation: bubble-float 3s ease-in-out infinite 0.6s;
        }
        .bubble-4 {
          animation: bubble-float 2.2s ease-in-out infinite 0.9s;
        }
        .bubble-5 {
          animation: bubble-float 2.8s ease-in-out infinite 0.4s;
        }
        
        /* Animation des bulles accélérée au hover */
        .group\\/btn:hover .bubble-1 {
          animation: bubble-active 0.6s ease-in-out infinite;
        }
        .group\\/btn:hover .bubble-2 {
          animation: bubble-active 0.8s ease-in-out infinite 0.1s;
        }
        .group\\/btn:hover .bubble-3 {
          animation: bubble-active 0.7s ease-in-out infinite 0.2s;
        }
        .group\\/btn:hover .bubble-4 {
          animation: bubble-active 0.5s ease-in-out infinite 0.15s;
        }
        .group\\/btn:hover .bubble-5 {
          animation: bubble-active 0.9s ease-in-out infinite 0.25s;
        }
        
        @keyframes bubble-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-4px) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes bubble-active {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-8px) translateX(3px) scale(1.3);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-12px) translateX(-2px) scale(1.1);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-6px) translateX(4px) scale(1.4);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
        }
        
        /* Vague liquide */
        .liquid-wave {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.1) 25%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.1) 75%,
            transparent 100%
          );
          animation: wave-move 1.5s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes wave-move {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        /* Shimmer effect */
        .liquid-shimmer {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.15) 40%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.15) 60%,
            transparent 80%
          );
          animation: shimmer-move 2s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        
        @keyframes shimmer-move {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
      
      {/* Séparateur animé en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-white/10 animate-pulse" />
      </div>
    </section>
  );
}
