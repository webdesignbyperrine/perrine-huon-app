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
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16 lg:w-20 lg:h-20">
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
              
              {/* Nom - même style que Header */}
              <h3 className="text-xl lg:text-2xl tracking-wide mb-6">
                <span className={`font-semibold ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>PERRINE</span>
                <span className={`ml-2 font-light ${theme === 'dark' ? 'text-paper/40' : 'text-primary/40'}`}>HUON</span>
              </h3>
              
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

            {/* ===== Réseaux sociaux - mis en avant ===== */}
            <div className={`max-w-3xl mx-auto transition-all duration-700 delay-100 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h4 className={`font-semibold mb-5 text-center ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>Restons connectés</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/perrinehuon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-5 rounded-sketch-xl transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-paper/5 hover:bg-paper/10 border-2 border-paper/10 hover:border-[#0077B5]/50' 
                      : 'bg-primary/5 hover:bg-primary/10 border-2 border-primary/10 hover:border-[#0077B5]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#0077B5] rounded-sketch flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>LinkedIn</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-paper/40' : 'text-primary/40'}`}>@perrinehuon</p>
                    </div>
                  </div>
                  
                  <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-paper/60' : 'text-primary/60'}`}>
                    Conseils web et vie de freelance
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-[#0077B5] text-xs font-medium group-hover:gap-3 transition-all duration-300">
                    Me suivre
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/perrinehuon.web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-5 rounded-sketch-xl transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-paper/5 hover:bg-paper/10 border-2 border-paper/10 hover:border-[#E4405F]/50' 
                      : 'bg-primary/5 hover:bg-primary/10 border-2 border-primary/10 hover:border-[#E4405F]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45] rounded-sketch flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>Instagram</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-paper/40' : 'text-primary/40'}`}>@perrinehuon.web</p>
                    </div>
                  </div>
                  
                  <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-paper/60' : 'text-primary/60'}`}>
                    Coulisses et inspirations design
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-[#E4405F] text-xs font-medium group-hover:gap-3 transition-all duration-300">
                    Me suivre
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61586560335973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-5 rounded-sketch-xl transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-paper/5 hover:bg-paper/10 border-2 border-paper/10 hover:border-[#1877F2]/50' 
                      : 'bg-primary/5 hover:bg-primary/10 border-2 border-primary/10 hover:border-[#1877F2]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1877F2] rounded-sketch flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-paper' : 'text-primary'}`}>Facebook</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-paper/40' : 'text-primary/40'}`}>Perrine Huon</p>
                    </div>
                  </div>
                  
                  <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-paper/60' : 'text-primary/60'}`}>
                    Actualités et partages web
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-[#1877F2] text-xs font-medium group-hover:gap-3 transition-all duration-300">
                    Me suivre
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>
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
