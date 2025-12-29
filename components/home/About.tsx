'use client';

import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const techLogos = [
  { src: '/images/logos/logo_lovable.jpeg', label: 'Lovable', className: 'rounded' },
  { src: '/images/logos/logo_cursor.jpeg', label: 'Cursor', className: 'rounded' },
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
  
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

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
            
            {/* Nom */}
            <p 
              className={`text-2xl sm:text-3xl font-light tracking-wider mt-6 transition-all duration-700 delay-300 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-paper">PERRINE</span>
              <span className="text-paper/40 ml-2">HUON</span>
            </p>
          </div>

          {/* Photo */}
          <div ref={sectionRef} className="relative mb-12 lg:mb-16">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto">
              {/* Cercle décoratif */}
              <div className="absolute -inset-4 border-2 border-paper/10 rounded-full" />
              <div className="absolute -inset-8 border-2 border-paper/5 rounded-full" />
              
              {/* Photo */}
              <div 
                className={`relative w-full h-full rounded-full overflow-hidden border-4 border-paper/20 shadow-2xl transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <Image
                  src="/images/perrine-huon-creation.webp"
                  alt="Perrine Huon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div ref={contentRef} className="max-w-3xl mx-auto text-center space-y-8">
            <p 
              className={`text-xl lg:text-2xl font-light text-paper/90 leading-relaxed transition-all duration-700 ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Je construis des <span className="text-accent font-medium">projets digitaux</span> avec{' '}
              rigueur, créativité, et beaucoup d'écoute.
            </p>

            <div 
              className={`w-16 h-0.5 bg-paper/20 mx-auto transition-all duration-700 delay-150 ${
                contentVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />

            <p 
              className={`text-lg text-paper/60 leading-relaxed transition-all duration-700 delay-200 ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Je m'efforce de créer des designs qui ne se démodent pas. 
              Je mise sur l'<span className="text-paper/90">efficacité</span> et l'optimisation de l'<span className="text-paper/90">expérience utilisateur</span>.
            </p>

            <p 
              className={`text-lg text-paper/60 leading-relaxed transition-all duration-700 delay-300 ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Un beau site, c'est bien. Un site qui vous rapporte des clients, <span className="text-paper/90">c'est mieux</span>.
              Mon objectif ? Que votre site <span className="text-paper/90">attire</span>,{' '}
              <span className="text-paper/90">convainque</span>, et <span className="text-accent">convertisse</span>.
            </p>
          </div>

          {/* Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 lg:mt-16">
            
            {/* Card Stack Tech */}
            <div 
              className={`p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h4 className="text-xs text-paper/40 uppercase tracking-wider mb-4">Stack technique</h4>
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
                    />
                    <span className="text-[10px] text-paper/40">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Clients */}
            <div 
              className={`p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h4 className="text-xs text-paper/40 uppercase tracking-wider mb-4">Ils m'ont fait confiance</h4>
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
                    />
                    <span className="text-[10px] text-paper/40">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Spécialités */}
            <div 
              className={`p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h4 className="text-xs text-paper/40 uppercase tracking-wider mb-4">Spécialités</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h2c1-3 2-5 4-5s3 4 4 5 2 5 4 5 3-2 4-5h2" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="text-paper/80 text-sm font-medium">Vibe Coding</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-paper/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 17.5h7M17.5 14v7" />
                  </svg>
                  <span className="text-paper/80 text-sm font-medium">Low Code & No Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-paper/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  <span className="text-paper/80 text-sm font-medium">MVP / SaaS / CRM</span>
                </div>
              </div>
            </div>

            {/* Card LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/perrinehuon/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-6 bg-paper/5 border-2 border-paper/10 rounded-sketch-lg hover:border-accent/30 hover:bg-paper/10 transition-all duration-300 group flex flex-col items-center justify-center ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h4 className="text-xs text-paper/40 uppercase tracking-wider mb-4">En savoir plus</h4>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-paper/70 group-hover:text-paper text-sm font-medium transition-colors">LinkedIn</span>
              </div>
            </a>

          </div>

        </div>
      </div>
      
    </section>
  );
}
