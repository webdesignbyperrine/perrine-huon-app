'use client';

import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';

const techLogos = [
  { src: '/images/logos/logo_lovable.jpeg', label: 'Lovable', className: 'rounded' },
  { src: '/images/logos/logo_cursor.jpeg', label: 'Cursor', className: 'rounded' },
  { src: '/images/logos/logo_next-js.svg', label: 'Next.js', className: 'invert' },
  { src: '/images/logos/logo_supabase.png', label: 'Supabase' },
  { src: '/images/logos/logo_Vercel.svg', label: 'Vercel', className: 'invert' },
  { src: '/images/logos/logo_tailwind.png', label: 'Tailwind' },
];

const clientLogos = [
  { src: '/images/logos/Logo_Adeo.png', label: 'Adeo' },
  { src: '/images/logos/logo_leroymerlin.jpg', label: 'Leroy Merlin', className: 'rounded' },
  { src: '/images/logos/logo_michel-lafon.png', label: 'Michel Lafon' },
  { src: '/images/logos/logo_education-nationale.png', label: 'Éducation Nat.' },
  { src: '/images/logos/logo_Axa.png', label: 'Axa' },
  { src: '/images/logos/logo_coworkmeet.png', label: 'CoworkMeet', className: 'rounded' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const techCarouselRef = useRef<HTMLDivElement>(null);
  const clientCarouselRef = useRef<HTMLDivElement>(null);

  const useMobileAutoSlide = (ref: RefObject<HTMLDivElement | null>, itemCount: number) => {
    useEffect(() => {
      const container = ref.current;
      if (!container || itemCount <= 1) return;

      const mediaQuery = window.matchMedia('(min-width: 640px)');
      if (mediaQuery.matches) return; // Pas d'autoplay sur desktop

      const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-slide="true"]'));
      if (!slides.length) return;

      let index = 0;

      const scrollToIndex = (idx: number) => {
        const target = slides[idx];
        if (!target) return;
        container.scrollTo({
          left: target.offsetLeft,
          behavior: 'smooth',
        });
      };

      const intervalId = window.setInterval(() => {
        index = (index + 1) % slides.length;
        scrollToIndex(index);
      }, 2200);

      const stopOnTouch = () => window.clearInterval(intervalId);
      container.addEventListener('touchstart', stopOnTouch, { passive: true });

      return () => {
        window.clearInterval(intervalId);
        container.removeEventListener('touchstart', stopOnTouch);
      };
    }, [ref, itemCount]);
  };

  useMobileAutoSlide(techCarouselRef, techLogos.length);
  useMobileAutoSlide(clientCarouselRef, clientLogos.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-32 bg-primary-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-16 sm:mb-24">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Derrière l'écran
                </span>
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8" />
              {/* Nom avec même typo que le header */}
              <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wider mt-8">
                <span className="text-white">PERRINE</span>
                <span className="text-white/40 ml-2 sm:ml-3">HUON</span>
              </p>
            </div>
          </div>

          <div ref={sectionRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo avec écran d'ordi */}
            <div className="relative group">
              <div className="relative max-w-lg mx-auto photo-container">
                {/* Glow effect animé */}
                <div className="absolute -inset-8 bg-gradient-to-br from-secondary via-accent-red to-accent-orange opacity-30 blur-[80px] group-hover:opacity-40 transition-opacity duration-500 blob-glow" />
                
                {/* Cadre d'écran MacBook */}
                <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  {/* Écran */}
                  <div className="relative bg-gray-900 rounded-[2rem] p-3 shadow-2xl border border-gray-700">
                    {/* Barre du haut avec caméra */}
                    <div className="absolute top-0 left-0 right-0 h-7 bg-gray-800 rounded-t-[2rem] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </div>
                    
                    {/* Zone d'affichage */}
                    <div className="mt-5 bg-primary-900 rounded-t-[1.25rem] rounded-b-[1.5rem] overflow-hidden aspect-[4/3]">
                      {/* Photo plein écran avec bords droits */}
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src="/images/perrine-huon-creation.webp"
                          alt="Perrine Huon"
                          fill
                          className="object-cover mt-2 mb-2"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Pied du MacBook */}
                  <div className={`relative mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Charnière */}
                    <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-sm mx-8" />
                    {/* Base */}
                    <div className="h-2 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg mx-4" 
                      style={{ 
                        clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                      }} 
                    />
                    {/* Encoche */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-500 rounded-t-full" />
                  </div>
                </div>
              </div>
            </div>
            
            <style jsx>{`
              .photo-container {
                animation: photo-float 8s ease-in-out infinite;
              }
              @keyframes photo-float {
                0%, 100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-6px);
                }
              }
              .blob-mask {
                border-radius: 50% 50% 45% 55% / 45% 55% 50% 50%;
                animation: heartbeat 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                overflow: hidden;
              }
              @keyframes heartbeat {
                0%, 100% {
                  border-radius: 50% 50% 45% 55% / 45% 55% 50% 50%;
                  transform: scale(1);
                }
                25% {
                  border-radius: 45% 55% 50% 50% / 50% 50% 55% 45%;
                  transform: scale(1.02);
                }
                50% {
                  border-radius: 55% 45% 55% 45% / 55% 45% 50% 50%;
                  transform: scale(1);
                }
                75% {
                  border-radius: 50% 50% 45% 55% / 50% 55% 45% 50%;
                  transform: scale(1.01);
                }
              }
              .blob-glow {
                border-radius: 50%;
                animation: glow-pulse 4s ease-in-out infinite;
              }
              @keyframes glow-pulse {
                0%, 100% {
                  opacity: 0.2;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.35;
                  transform: scale(1.05);
                }
              }
              .logo-track {
                scrollbar-width: none;
              }
              .logo-track::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Contenu */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
                  Je construis des <span className="text-secondary font-normal">projets digitaux</span> avec{' '}
                  <span className="text-secondary font-normal">rigueur</span>, <span className="text-secondary font-normal">créativité</span>, et beaucoup d'écoute.
                </p>

                <div className="w-16 h-[1px] bg-secondary/50" />

                <p className="text-lg text-white/60 leading-relaxed font-light">
                  Un beau site, c'est bien. Un site qui vous rapporte des clients, <span className="text-white/90">c'est mieux</span>.
                  Mon objectif ? Que votre site travaille pour vous. Qu'il <span className="text-white/90">attire</span>,{' '}
                  <span className="text-white/90">convainque</span>, et <span className="text-accent-orange">convertisse</span>.
                </p>
              </div>

              {/* Cards d'information */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {/* Card 1 - Stack Tech */}
                <div className="glass-dark p-5 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">Ma Stack Tech</h4>
                  <div className="sm:hidden -mx-2">
                    <div
                      ref={techCarouselRef}
                      className="logo-track flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-1 touch-pan-x scroll-smooth"
                    >
                      {techLogos.map((logo) => (
                        <div
                          key={logo.label}
                          data-slide="true"
                          className="flex flex-col items-center gap-2 shrink-0 snap-center bg-white/5 rounded-lg px-3 py-3"
                        >
                          <img
                            src={logo.src}
                            alt={logo.label}
                            className={`h-12 w-auto object-contain drop-shadow-md ${logo.className ?? ''}`}
                          />
                          <span className="text-[11px] text-white/70 font-medium">{logo.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:grid grid-cols-3 gap-x-4 gap-y-3 items-center justify-items-center">
                    {techLogos.map((logo) => (
                      <div key={logo.label} className="flex flex-col items-center gap-1 group">
                        <img
                          src={logo.src}
                          alt={logo.label}
                          className={`h-8 md:h-9 group-hover:scale-110 transition-transform ${logo.className ?? ''}`}
                        />
                        <span className="text-[10px] text-white/50">{logo.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 2 - Entreprises */}
                <div className="glass-dark p-5 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">Ils m'ont fait confiance</h4>
                  <div className="sm:hidden -mx-2">
                    <div
                      ref={clientCarouselRef}
                      className="logo-track flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-1 touch-pan-x scroll-smooth"
                    >
                      {clientLogos.map((logo) => (
                        <div
                          key={logo.label}
                          data-slide="true"
                          className="flex flex-col items-center gap-2 shrink-0 snap-center bg-white/5 rounded-lg px-3 py-3"
                        >
                          <img
                            src={logo.src}
                            alt={logo.label}
                            className={`h-12 w-auto object-contain drop-shadow-md ${logo.className ?? ''}`}
                          />
                          <span className="text-[11px] text-white/70 font-medium">{logo.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:grid grid-cols-3 gap-x-4 gap-y-3 items-center justify-items-center">
                    {clientLogos.map((logo) => (
                      <div key={logo.label} className="flex flex-col items-center gap-1 group">
                        <img
                          src={logo.src}
                          alt={logo.label}
                          className={`h-9 md:h-10 group-hover:scale-110 transition-transform ${logo.className ?? ''}`}
                        />
                        <span className="text-[10px] text-white/50">{logo.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 - Spécialités */}
                <div className="glass-dark p-5 rounded-xl hover:bg-white/5 transition-colors duration-300">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">Spécialités</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {/* Icône Vibe Coding - ondes/vibrations */}
                      <svg className="w-5 h-5 text-secondary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12h2c1-3 2-5 4-5s3 4 4 5 2 5 4 5 3-2 4-5h2" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                      </svg>
                      <span className="text-white/80 text-sm font-medium">Vibe Coding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Icône Low/No Code - blocs/puzzle */}
                      <svg className="w-5 h-5 text-accent-orange flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <path d="M14 17.5h7M17.5 14v7" />
                      </svg>
                      <span className="text-white/80 text-sm font-medium">Low Code & No Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Icône MVP/SaaS/CRM - fusée */}
                      <svg className="w-5 h-5 text-accent-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                      </svg>
                      <span className="text-white/80 text-sm font-medium">MVP / SaaS / CRM</span>
                    </div>
                  </div>
                </div>

                {/* Card 4 - LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/perrinehuon/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-dark p-5 rounded-xl hover:bg-white/5 transition-all duration-300 group flex flex-col items-center justify-center"
                >
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">En savoir plus</h4>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">LinkedIn</span>
                  </div>
                </a>
              </div>
            </div>
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
