'use client';

import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CTAQuiz } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';

const techLogos = [
  { src: '/images/logos/logo_next-js.svg', label: 'Next.js', className: '' },
  { src: '/images/logos/logo_supabase.png', label: 'Supabase' },
  { src: '/images/logos/logo_Vercel.svg', label: 'Vercel', className: '' },
  { src: '/images/logos/logo_tailwind.png', label: 'Tailwind' },
];

const clientLogos = [
  { src: '/images/logos/Logo_Adeo.png', label: 'Adeo' },
  { src: '/images/logos/logo_leroymerlin.jpg', label: 'Leroy Merlin', className: 'rounded bg-white p-1' },
  { src: '/images/logos/logo_coworkmeet.png', label: 'CoworkMeet', className: 'rounded' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const techCarouselRef = useRef<HTMLDivElement>(null);
  const clientCarouselRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  
  // Image qui change selon le thème : dark en mode light, light en mode dark
  const aboutImage = theme === 'dark' 
    ? '/images/perrine-huon-auteur-laptop-light.webp'
    : '/images/perrine-huon-auteur-laptop-dark.webp';

  const useMobileAutoSlide = (ref: RefObject<HTMLDivElement | null>, itemCount: number) => {
    useEffect(() => {
      const container = ref.current;
      if (!container || itemCount <= 1) return;

      const mediaQuery = window.matchMedia('(min-width: 640px)');
      if (mediaQuery.matches) return;

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
    <section id="about" className="relative pt-8 lg:pt-12 pb-32 lg:pb-40 bg-primary section-dark overflow-hidden">
      {/* Transition ondulée en haut - supprimée car Services gère cette transition */}
      
      {/* Fond avec grain */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0" />
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême haut droite (déborde) */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-paper/8 rounded-full blur-[100px]" />
        
        {/* Grande forme floue accent - extrême bas gauche (déborde) */}
        <div className="absolute -bottom-48 -left-48 w-80 h-80 bg-accent/8 rounded-full blur-[90px]" />
        
        {/* Cercle contour - extrême gauche (majoritairement caché) */}
        <div 
          className="absolute top-[15%] -left-32 w-40 h-40 rounded-full border-2 border-paper/10"
        />
        
        {/* Cercle contour - extrême droite (majoritairement caché) */}
        <div 
          className="absolute top-[40%] -right-24 w-28 h-28 rounded-full border border-paper/8"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Titre de section */}
          <div ref={titleRef} className="text-center mb-12 lg:mb-16">
            <span 
              className={`inline-block text-sm font-medium text-paper/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Qui suis-je
            </span>
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-paper mb-6 transition-all duration-700 delay-100 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Derrière l'écran
            </h2>
            
            {/* Ligne décorative */}
            <div 
              className={`w-24 h-0.5 bg-paper/20 mx-auto mt-6 transition-all duration-1000 delay-200 ${
                titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>

          {/* Layout centré : Nom + Photo + Texte */}
          <div ref={sectionRef} className="flex flex-col items-center mb-12 lg:mb-16">
            
            {/* Nom + Badge centré */}
            <div 
              ref={contentRef}
              className={`text-center mb-10 lg:mb-12 transition-all duration-700 ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wider mb-6 lg:mb-8">
                <span className="text-paper font-medium">PERRINE</span>
                <span className="text-paper/40 ml-3">HUON</span>
              </p>
              {/* Badge Web Designer - rose corail visible */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-[#e85d8c] dark:border-accent-light text-[#e85d8c] dark:text-accent-light text-sm font-semibold tracking-wide rounded-full">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                  Web Designer
                </span>
              </div>
            </div>

            {/* Photo centrée */}
            <div className="relative w-full max-w-md lg:max-w-lg mx-auto mb-10 lg:mb-14">
              {/* Conteneur de la photo */}
              <div 
                className={`relative z-10 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Cadre décoratif style "dessiné" */}
                <div className="absolute -inset-3 lg:-inset-4 border-2 border-paper/20 rounded-3xl transform rotate-2" />
                <div className="absolute -inset-2 lg:-inset-3 border border-[#e85d8c]/40 dark:border-accent/30 rounded-3xl transform -rotate-1" />
                
                {/* Photo principale */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-paper/10">
                  <Image
                    src={aboutImage}
                    alt="Perrine Huon - Web Designer & Developer"
                    fill
                    className="object-cover object-top transition-opacity duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  
                  {/* Overlay gradient subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                </div>
                
                {/* Petit élément décoratif */}
                <div 
                  className={`absolute -top-3 -left-3 lg:-top-5 lg:-left-5 w-8 h-8 lg:w-12 lg:h-12 bg-paper/20 rounded-full flex items-center justify-center transition-all duration-700 delay-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <svg className="w-4 h-4 lg:w-6 lg:h-6 text-paper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Texte descriptif centré sous la photo */}
            <div className="max-w-2xl mx-auto text-center space-y-6 lg:space-y-8">
              
              <p 
                className={`text-xl lg:text-2xl font-light text-paper/90 leading-relaxed transition-all duration-700 delay-100 ${
                  contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Je construis des <span className="text-[#e85d8c] dark:text-accent-light font-medium">projets digitaux</span> avec{' '}
                rigueur, créativité, et beaucoup d'écoute.
              </p>

              <div 
                className={`w-16 h-0.5 bg-paper/20 mx-auto transition-all duration-700 delay-200 ${
                  contentVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                }`}
              />

              <p 
                className={`text-base lg:text-lg text-paper/60 leading-relaxed transition-all duration-700 delay-300 ${
                  contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Je m'efforce de créer des designs qui ne se démodent pas. 
                Je mise sur l'<span className="text-paper/90">efficacité</span> et l'optimisation de l'<span className="text-paper/90">expérience utilisateur</span>.
              </p>

              <p 
                className={`text-base lg:text-lg text-paper/60 leading-relaxed transition-all duration-700 delay-400 ${
                  contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Un beau site, c'est bien. Un site qui vous rapporte des clients, <span className="text-paper/90">c'est mieux</span>.
                Mon objectif ? Que votre site <span className="text-paper/90">attire</span>,{' '}
                <span className="text-paper/90">convainque</span>, et <span className="text-[#e85d8c] dark:text-accent-light font-medium">convertisse</span>.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 lg:mt-16">
            
            {/* Card Stack Tech */}
            <div 
              className={`col-span-2 sm:col-span-1 p-4 sm:p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h4 className="text-[10px] sm:text-xs text-paper/40 uppercase tracking-wider mb-3 sm:mb-4">Stack technique</h4>
              <div className="sm:hidden -mx-2">
                <div
                  ref={techCarouselRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-1 touch-pan-x scroll-smooth scrollbar-hide"
                >
                  {techLogos.map((logo) => (
                    <div
                      key={logo.label}
                      data-slide="true"
                      className="flex flex-col items-center gap-2 shrink-0 snap-center bg-paper/5 rounded-lg px-3 py-3"
                    >
                      <img
                        src={logo.src}
                        alt={logo.label}
                        className={`h-10 w-auto object-contain ${logo.className ?? ''}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-[11px] text-paper/60 font-medium">{logo.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-3 gap-3 items-center justify-items-center">
                {techLogos.map((logo) => (
                  <div key={logo.label} className="flex flex-col items-center gap-1 group">
                    <img
                      src={logo.src}
                      alt={logo.label}
                      className={`h-7 group-hover:scale-110 transition-transform ${logo.className ?? ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="text-[10px] text-paper/40">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Clients */}
            <div 
              className={`col-span-2 sm:col-span-1 p-4 sm:p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h4 className="text-[10px] sm:text-xs text-paper/40 uppercase tracking-wider mb-3 sm:mb-4">Ils m'ont fait confiance</h4>
              <div className="sm:hidden -mx-2">
                <div
                  ref={clientCarouselRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-1 touch-pan-x scroll-smooth scrollbar-hide"
                >
                  {clientLogos.map((logo) => (
                    <div
                      key={logo.label}
                      data-slide="true"
                      className="flex flex-col items-center gap-2 shrink-0 snap-center bg-paper/5 rounded-lg px-3 py-3"
                    >
                      <img
                        src={logo.src}
                        alt={logo.label}
                        className={`h-10 w-auto object-contain ${logo.className ?? ''}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-[11px] text-paper/60 font-medium">{logo.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden sm:grid grid-cols-3 gap-3 items-center justify-items-center">
                {clientLogos.map((logo) => (
                  <div key={logo.label} className="flex flex-col items-center gap-1 group">
                    <img
                      src={logo.src}
                      alt={logo.label}
                      className={`h-8 group-hover:scale-110 transition-transform ${logo.className ?? ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="text-[10px] text-paper/40">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Spécialités */}
            <div 
              className={`p-4 sm:p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h4 className="text-[10px] sm:text-xs text-paper/40 uppercase tracking-wider mb-3 sm:mb-4">Spécialités</h4>
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h2c1-3 2-5 4-5s3 4 4 5 2 5 4 5 3-2 4-5h2" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="text-paper/80 text-xs sm:text-sm font-medium">Vibe Coding</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-paper/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 17.5h7M17.5 14v7" />
                  </svg>
                  <span className="text-paper/80 text-xs sm:text-sm font-medium">Low Code & No Code</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-paper/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  <span className="text-paper/80 text-xs sm:text-sm font-medium">MVP / SaaS / CRM</span>
                </div>
              </div>
            </div>

            {/* Card Réseaux sociaux */}
            <div 
              className={`p-4 sm:p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 flex flex-col items-center justify-center ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h4 className="text-[10px] sm:text-xs text-paper/40 uppercase tracking-wider mb-3 sm:mb-4">Restons connectés</h4>
              <div className="flex items-center gap-3 sm:gap-4">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/perrinehuon/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/perrinehuon.web" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#E4405F] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/profile.php?id=61586560335973" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1877F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* CTA Quiz */}
          <div className="text-center mt-16">
            <CTAQuiz />
          </div>

        </div>
      </div>
      
    </section>
  );
}
