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
    sessionStorage.setItem('logoClick', 'true');
    window.dispatchEvent(new CustomEvent('closeQualifier'));
    
    if (pathname === '/') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      const logoClick = sessionStorage.getItem('logoClick');
      if (logoClick === 'true') {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        sessionStorage.removeItem('logoClick');
      }
    }
  }, [pathname]);

  useEffect(() => {
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
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/#services' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'À propos', href: '/#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.includes('#')) {
      const anchor = href.split('#')[1];
      
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-paper-light/95 backdrop-blur-md border-b-2 border-primary/10 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Cercle décoratif */}
              <div className="absolute -inset-2 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                <Image
                  src={logoUrl}
                  alt="Perrine Huon Logo"
                  width={48}
                  height={48}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  key={logoUrl}
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(30%) sepia(50%) saturate(600%) hue-rotate(175deg) brightness(90%) contrast(90%)'
                  }}
                />
              </div>
            </div>
            <span className="text-base lg:text-xl font-medium tracking-wide">
              <span className="text-primary">PERRINE</span>
              <span className="text-primary/40 ml-1 lg:ml-2">HUON</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-primary/60 hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-medium group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button - Style ligne claire avec accent rose */}
          <div className="hidden lg:block">
            <Link
              href="/#rdv"
              onClick={(e) => handleNavClick(e, '/#rdv')}
              className="btn-cta btn-cta-pulse group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* Icône calendrier ligne claire */}
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="text-sm uppercase tracking-wider font-semibold">
                  On s'appelle ?
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button - Style ligne claire */}
          <button
            type="button"
            className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Style carte dessinée */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-6 bg-paper-light border-2 border-primary/20 rounded-sketch-lg shadow-sketch animate-fade-in-down">
            <div className="space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 text-sm uppercase tracking-wider font-medium"
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* CTA Mobile */}
            <div className="mt-6 pt-6 border-t-2 border-primary/10">
              <Link
                href="/#rdv"
                className="btn-cta w-full justify-center"
                onClick={(e) => handleNavClick(e, '/#rdv')}
              >
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="text-sm uppercase tracking-wider font-semibold">
                  On s'appelle ?
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
