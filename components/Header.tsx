'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/images/logo_vert_perrine_huon.png');
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    // Si on est sur la home, scroll vers le haut
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Sinon, le Link navigue vers "/"
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navigation = [
    { name: 'À propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo perroquet */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent-red rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src={logoUrl}
                  alt="Perrine Huon Logo"
                  width={48}
                  height={48}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 brightness-0 invert"
                  key={logoUrl}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <span className="text-xl font-light tracking-wider hidden sm:block">
              <span className="text-white">PERRINE</span>
              <span className="text-white/40 ml-2">HUON</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/60 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider font-light"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Style tube en verre avec liquide */}
          <div className="hidden lg:block">
            <Link
              href="#contact"
              className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <div 
                className="relative flex items-center px-8 py-3 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <span 
                  className="absolute top-0 left-4 right-4 h-1.5 rounded-t-full pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                />
                <span 
                  className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                    boxShadow: '0 0 15px rgba(47, 69, 88, 0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  <span 
                    className="absolute top-0.5 left-4 right-4 h-1.5 rounded-full transition-transform duration-500 group-hover/cta:translate-x-1"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                  />
                </span>
                <span className="relative z-10 text-white text-sm uppercase tracking-wider font-semibold drop-shadow-lg">
                  Contact
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 glass-dark rounded-2xl p-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white/60 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider font-light py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="group/cta relative block w-full mt-4 transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div 
                className="relative flex items-center justify-center px-8 py-3 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <span 
                  className="absolute top-0 left-4 right-4 h-1.5 rounded-t-full pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                />
                <span 
                  className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                    boxShadow: '0 0 15px rgba(47, 69, 88, 0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  <span 
                    className="absolute top-0.5 left-4 right-4 h-1.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                  />
                </span>
                <span className="relative z-10 text-white text-sm uppercase tracking-wider font-semibold drop-shadow-lg">
                  Contact
                </span>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
