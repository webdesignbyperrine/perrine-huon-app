'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TypewriterText from '@/components/TypewriterText';

export default function ContactCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Force le mode light pour cette page
    document.documentElement.classList.remove('dark');
    
    // Nettoyer en restaurant le mode précédent au démontage
    return () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, []);

  const calendlyUrl = "https://calendly.com/perrinehuon/30min";
  const phoneNumber = '33645182749';
  const message = encodeURIComponent(
    "Bonjour Perrine, je vous contacte depuis votre site web. J'aimerais discuter d'un projet..."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <div className="min-h-screen bg-[#D4C4A8] flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className={`w-full max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header style logo carte de visite - réutilisation du bloc Footer */}
          <div className="text-center mb-12 space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src="/images/logo_vert_perrine_huon.png"
                  alt="Perrine Huon"
                  fill
                  className="object-contain"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(25%) sepia(42%) saturate(1200%) hue-rotate(178deg) brightness(92%) contrast(90%)'
                  }}
                />
              </div>
            </div>
            
            {/* Nom - même style que Footer/Header */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-wide mb-4">
              <span className="font-semibold text-[#2B5B8A]">PERRINE</span>
              <span className="ml-2 font-light text-[#2B5B8A]/60">HUON</span>
            </h1>
            
            {/* Slogan manuscrit rose avec animation TypewriterText */}
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl mb-4 px-4 min-h-[3rem] leading-snug" 
              style={{ fontFamily: 'var(--font-caveat)', color: 'var(--accent-pink)' }}
            >
              {mounted && (
                <TypewriterText 
                  text="Construisons ensemble votre succès digital."
                  delay={50}
                  startDelay={300}
                  showCursor={true}
                />
              )}
            </div>
            
            {/* Baseline uppercase */}
            <p className="text-sm uppercase tracking-widest text-[#2B5B8A]">
              Web Designer & Developer
            </p>
          </div>

          {/* Contenu de la carte */}
          <div className="space-y-8">
            
            {/* Boutons sociaux - WhatsApp animé */}
            <div className="flex justify-center gap-6">
              {/* WhatsApp animé */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform duration-300 hover:scale-110 sphere-wiggle"
                aria-label="WhatsApp"
              >
                <div className="relative">
                  <svg
                    className="w-12 h-12 text-[#25D366] group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {/* Badge "En ligne" */}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#25D366] border-2 border-[#D4C4A8] rounded-full animate-pulse" />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/perrinehuon/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-12 h-12 text-[#0A66C2] group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Boutons RDV */}
            <div className="grid gap-4 mx-auto w-fit">
              <a
                href="https://perrinehuon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl shadow-md active:translate-y-0.5 active:shadow-sm transition-all duration-150"
                style={{
                  backgroundColor: 'var(--accent-pink)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-pink-dark)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-pink)'}
              >
                <span>Découvrir mon site</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-[#E85D8C] rounded-xl font-semibold text-[#E85D8C] shadow-md active:translate-y-0.5 active:shadow-sm transition-all duration-150 hover:bg-white/70"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Prendre RDV</span>
              </a>

              <a
                href="mailto:contact@perrinehuon.com"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-[#2B5B8A] rounded-xl font-semibold text-[#2B5B8A] shadow-md active:translate-y-0.5 active:shadow-sm transition-all duration-150 hover:bg-white/70"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>M'écrire</span>
              </a>
            </div>

            {/* Séparateur */}
            <div className="w-full h-px bg-[#2B5B8A]/20 max-w-2xl mx-auto"></div>

            {/* Titre section activités */}
            <h2 className="text-xl font-semibold text-[#2B5B8A] text-center">Mes autres activités</h2>

            {/* Cartes activités */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <a
                href="https://www.coworkmeet.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/50 backdrop-blur-sm border-l-4 border-[#E85D8C] rounded-lg p-5 shadow-sm active:scale-[0.98] active:shadow-none transition-all duration-150 hover:bg-white/70"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#E85D8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E85D8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#2B5B8A] mb-1 group-hover:text-[#E85D8C] transition-colors">
                      Fondatrice de CoworkMeet
                    </h3>
                    <p className="text-sm text-[#2B5B8A]/70 mb-3">
                      Communauté de freelances pour se rencontrer et collaborer
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E85D8C]">
                      <span>Découvrir</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://www.amazon.fr/stores/Perrine-Huon/author/B004MZ3BJQ?ref=sr_ntt_srch_lnk_1&qid=1772301859&sr=8-1&shoppingPortalEnabled=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/50 backdrop-blur-sm border-l-4 border-[#2B5B8A] rounded-lg p-5 shadow-sm active:scale-[0.98] active:shadow-none transition-all duration-150 hover:bg-white/70"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#2B5B8A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2B5B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#2B5B8A] mb-1 group-hover:text-[#2B5B8A]/80 transition-colors">
                      Auteure publiée
                    </h3>
                    <p className="text-sm text-[#2B5B8A]/70 mb-3">
                      Deux livres publiés aux Éditions Michel Lafon
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2B5B8A]">
                      <span>Voir mes livres</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Bouton vers le site principal */}
            <div className="text-center">
              <a
                href="https://perrinehuon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl shadow-md active:translate-y-0.5 active:shadow-sm transition-all duration-150"
                style={{
                  backgroundColor: 'var(--accent-pink)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-pink-dark)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-pink)'}
              >
                <span>Découvrir mon site</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
