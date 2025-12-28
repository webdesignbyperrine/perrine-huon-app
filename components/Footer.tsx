'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <footer className="relative bg-primary py-16 overflow-hidden">
      {/* Fond avec grain */}
      <div className="absolute inset-0 bg-paper-texture opacity-10" />
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-10 left-10 w-6 h-6 text-paper/10" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-20 right-20 w-8 h-8 text-paper/10" viewBox="0 0 32 32">
          <polygon points="16,4 28,28 4,28" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div ref={footerRef} className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Contenu principal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* À propos */}
            <div className={`transition-all duration-700 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h3 className="text-xl font-bold mb-4 text-paper">Perrine Huon</h3>
              <p className="text-paper/60 mb-6 leading-relaxed">
                Création de sites et applications web avec SEO géolocalisé ultra performant.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/perrinehuon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-paper/20 rounded-full flex items-center justify-center text-paper/60 hover:text-paper hover:border-paper/40 hover:bg-paper/5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Liens rapides */}
            <div className={`transition-all duration-700 delay-100 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h3 className="text-xl font-bold mb-4 text-paper">Navigation</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Portfolio', href: '/portfolio' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'FAQ', href: '/faq' },
                  { name: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="group flex items-center gap-2 text-paper/60 hover:text-paper transition-all duration-300"
                    >
                      <span className="w-0 h-0.5 bg-accent group-hover:w-3 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO Local */}
            <div className={`transition-all duration-700 delay-200 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h3 className="text-xl font-bold mb-4 text-paper">SEO Géolocalisé</h3>
              <p className="text-paper/60 mb-4">
                Expertise en référencement local :
              </p>
              <ul className="space-y-2 text-paper/50 text-sm">
                {[
                  'Paris et Île-de-France',
                  'Lyon et région Rhône-Alpes',
                  'Lille et Hauts-de-France',
                  'Bordeaux et Nouvelle-Aquitaine',
                  'Toute la France',
                ].map((region) => (
                  <li key={region} className="flex items-center gap-2 hover:text-paper/70 transition-colors">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Séparateur */}
          <div className="w-full h-0.5 bg-paper/10 mb-8" />

          {/* Bottom bar */}
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-paper/40 text-sm transition-all duration-700 delay-300 ${footerVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p>© {currentYear} Perrine Huon. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <Link 
                href="/mentions-legales" 
                className="hover:text-paper transition-colors duration-300 text-hover-underline"
              >
                Mentions légales
              </Link>
              <Link 
                href="/politique-confidentialite" 
                className="hover:text-paper transition-colors duration-300 text-hover-underline"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
