'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/contexts/ThemeContext';
import TypewriterText from '@/components/TypewriterText';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { theme } = useTheme();

  return (
    <footer className="relative bg-primary overflow-hidden">
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 bg-paper-texture opacity-5" />

      {/* ===== Formes flottantes décoratives ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cercle flottant 1 - haut droite */}
        <div 
          className={`absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 animate-float ${theme === 'dark' ? 'border-paper/10' : 'border-primary/10'}`}
          style={{ animationDelay: '0s' }}
        />
        {/* Cercle flottant 2 - gauche */}
        <div 
          className="absolute top-1/3 -left-16 w-32 h-32 rounded-full bg-accent/10 blur-xl animate-float"
          style={{ animationDelay: '1s' }}
        />
        {/* Cercle flottant 3 - bas droite */}
        <div 
          className={`absolute bottom-20 right-10 w-24 h-24 rounded-full border animate-float ${theme === 'dark' ? 'border-paper/15' : 'border-primary/15'}`}
          style={{ animationDelay: '0.5s' }}
        />
        {/* Cercle flottant 4 - milieu */}
        <div 
          className={`absolute top-1/2 right-1/4 w-16 h-16 rounded-full animate-float ${theme === 'dark' ? 'bg-paper/5' : 'bg-primary/5'}`}
          style={{ animationDelay: '1.5s' }}
        />
        {/* Petit cercle accent */}
        <div 
          className="absolute bottom-1/3 left-1/4 w-8 h-8 rounded-full bg-accent/20 animate-bounce-soft"
        />
      </div>

      {/* Contenu principal */}
      <div ref={footerRef} className="relative z-10">
        
        {/* ===== Section principale ===== */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            
            {/* ===== Header : Logo + Slogan animé ===== */}
            <div className={`text-center mb-16 transition-all duration-700 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              
              {/* Logo - bleu en light, blanc en dark */}
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                  <Image
                    src="/images/logo_vert_perrine_huon.png"
                    alt="Perrine Huon - Web Designer & Developer"
                    fill
                    className={`object-contain ${
                      theme === 'dark' 
                        ? 'brightness-0 invert opacity-90' 
                        : '[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(50%)_saturate(600%)_hue-rotate(175deg)_brightness(95%)_contrast(90%)]'
                    }`}
                  />
                </div>
              </div>
              
              {/* Slogan animé - même style que Hero */}
              <p 
                className="text-2xl lg:text-4xl text-accent mb-4" 
                style={{ fontFamily: 'var(--font-caveat)' }}
              >
                {footerVisible && (
                  <TypewriterText 
                    text="Construisons ensemble votre succès digital."
                    delay={50}
                    startDelay={300}
                    showCursor={true}
                  />
                )}
              </p>
              
              <p className={`text-sm uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-paper/50' : 'text-primary/50'}`}>
                Web Designer & Developer
              </p>
              
              {/* Mini CTA vers le qualifier */}
              <Link
                href="/?openQualifier=true"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent rounded-full text-sm font-medium transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Quels sont vos besoins ?</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* ===== LinkedIn CTA - mis en avant ===== */}
            <div className={`max-w-md mx-auto transition-all duration-700 delay-100 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h4 className={`font-semibold mb-5 text-center ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>Restons connectés</h4>
              
              <a
                href="https://www.linkedin.com/in/perrinehuon/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-5 rounded-sketch-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-paper/5 hover:bg-paper/10 border-2 border-paper/10 hover:border-accent/30' 
                    : 'bg-primary/5 hover:bg-primary/10 border-2 border-primary/10 hover:border-accent/30'
                }`}
              >
                {/* Icône LinkedIn */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#0077B5] rounded-sketch flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>LinkedIn</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-paper/40' : 'text-primary/40'}`}>@perrinehuon</p>
                  </div>
                </div>
                
                {/* Hook */}
                <p className={`text-sm leading-relaxed mb-3 ${theme === 'dark' ? 'text-paper/60' : 'text-primary/60'}`}>
                  Retrouvez mes conseils web, mes projets récents et un peu de ma vie de freelance ! 
                </p>
                
                {/* CTA */}
                <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Me suivre sur LinkedIn
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ===== Séparateur ===== */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`h-px ${theme === 'dark' ? 'bg-paper/10' : 'bg-primary/10'}`} />
          </div>
        </div>

        {/* ===== Navigation & Zones SEO - Linéaire pour référencement ===== */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs ${theme === 'dark' ? 'text-paper/30' : 'text-primary/30'}`}>
              {/* Navigation */}
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Blog', href: '/blog' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Contact', href: '/#contact' },
              ].map((item, index) => (
                <span key={item.name} className="flex items-center gap-4">
                  <Link 
                    href={item.href} 
                    className={`transition-colors duration-200 ${theme === 'dark' ? 'hover:text-paper/50' : 'hover:text-primary/50'}`}
                  >
                    {item.name}
                  </Link>
                  {index < 4 && <span>•</span>}
                </span>
              ))}
              
              <span className={`mx-2 ${theme === 'dark' ? 'text-paper/20' : 'text-primary/20'}`}>|</span>
              
              {/* Zones SEO */}
              {[
                'Paris',
                'Lyon',
                'Lille',
                'Bordeaux',
                'France',
              ].map((region, index) => (
                <span key={region} className="flex items-center gap-4">
                  <span>{region}</span>
                  {index < 4 && <span>•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Section basse : Copyright & Legal ===== */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className={`flex flex-col items-center gap-4 transition-all duration-700 delay-400 ${footerVisible ? 'opacity-100' : 'opacity-0'}`}>
              
              {/* Liens légaux */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
                <Link 
                  href="/mentions-legales" 
                  className={`transition-colors duration-200 ${theme === 'dark' ? 'text-paper/40 hover:text-paper/70' : 'text-primary/40 hover:text-primary/70'}`}
                >
                  Mentions légales
                </Link>
                <span className={`hidden sm:inline ${theme === 'dark' ? 'text-paper/20' : 'text-primary/20'}`}>•</span>
                <Link 
                  href="/politique-confidentialite" 
                  className={`transition-colors duration-200 ${theme === 'dark' ? 'text-paper/40 hover:text-paper/70' : 'text-primary/40 hover:text-primary/70'}`}
                >
                  Confidentialité
                </Link>
              </div>
              
              {/* Copyright */}
              <p className={`text-xs ${theme === 'dark' ? 'text-paper/30' : 'text-primary/30'}`}>
                © {currentYear} Perrine Huon
              </p>
              
              {/* Backlink vers l'accueil */}
              <Link 
                href="/"
                className={`group inline-flex items-center gap-2 text-sm mt-2 transition-colors duration-300 ${theme === 'dark' ? 'text-paper/40 hover:text-accent' : 'text-primary/40 hover:text-accent'}`}
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Revenir à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
