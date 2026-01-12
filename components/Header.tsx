'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/hooks/useSound';
import { SunIcon, MoonIcon, DocumentIcon, EnvelopeIcon, MenuIcon, CloseIcon } from '@/components/icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/images/logo_vert_perrine_huon.png');
  const [isFlying, setIsFlying] = useState(false);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const cageRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  
  // Précharger le son pour lecture instantanée
  const { play: playParrotSound } = useSound('/sounds/parrot.wav', { volume: 0.5 });

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (isFlying) return; // Empêcher de cliquer pendant l'animation
    
    // Jouer le son immédiatement (préchargé)
    playParrotSound();
    
    // Déclencher l'animation d'envol
    animateParrotFlight();
    
    sessionStorage.setItem('logoClick', 'true');
    window.dispatchEvent(new CustomEvent('closeQualifier'));
    
    if (pathname === '/') {
      e.preventDefault();
    }
  }, [isFlying, pathname, playParrotSound]);

  const animateParrotFlight = () => {
    if (!logoContainerRef.current || !cageRef.current || !birdRef.current || !letterRef.current) return;
    
    setIsFlying(true);
    
    const container = logoContainerRef.current;
    const cage = cageRef.current;
    const bird = birdRef.current;
    const letter = letterRef.current;
    const rect = container.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;
    const logoWidth = rect.width;
    const logoHeight = rect.height;
    
    // Hauteur du viewport
    const viewportHeight = window.innerHeight;
    const bottomY = viewportHeight - 80;
    const fallDistance = bottomY - startY;
    
    // Cacher le container original et montrer les parties séparées
    container.style.opacity = '0';
    cage.classList.add('cage-waiting');
    
    // Configurer l'oiseau (partie gauche - tête et corps du perroquet)
    // Le clip coupe juste avant le H en bas à droite
    bird.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${logoWidth}px;
      height: ${logoHeight}px;
      z-index: 9999;
      pointer-events: none;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 55% 45%, 55% 100%, 0 100%);
    `;
    bird.classList.add('logo-escaped');
    
    // Configurer la lettre H (partie droite en bas)
    letter.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${logoWidth}px;
      height: ${logoHeight}px;
      z-index: 9999;
      pointer-events: none;
      clip-path: polygon(55% 45%, 100% 45%, 100% 100%, 55% 100%);
    `;
    letter.classList.add('logo-escaped');
    
    // Durées (plus rapide)
    const fallDuration = 1000;
    const bounceDuration = 280;
    const returnDuration = 900;
    
    // Positions finales de chute
    let birdLastX = startX;
    let birdLastY = startY;
    let letterLastX = startX;
    let letterLastY = startY;
    
    const startTime = performance.now();
    
    // Fonctions d'easing
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeInQuad = (t: number) => t * t;
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
    
    // Phase 1: Dislocation et chute
    const animateFall = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / fallDuration, 1);
      const easeProgress = easeInQuad(progress);
      
      // L'oiseau tombe vers la gauche avec oscillation
      const birdY = startY + (fallDistance * easeProgress);
      const birdOscillation = Math.sin(progress * Math.PI * 3) * 60 * (1 - progress * 0.3);
      const birdX = startX - (progress * 120) + birdOscillation; // Dérive vers la gauche
      const birdRotation = Math.sin(progress * Math.PI * 2.5) * 25 - progress * 15;
      
      // L'oiseau grossit x2 au début puis reste à x2
      const birdScale = 1 + Math.min(progress * 2, 1); // De 1 à 2 pendant la première moitié
      
      // La lettre H tombe vers la droite avec oscillation différente
      const letterY = startY + (fallDistance * easeProgress * 0.95); // Légèrement plus lent
      const letterOscillation = Math.sin(progress * Math.PI * 2.5 + 1) * 50 * (1 - progress * 0.3);
      const letterX = startX + (progress * 100) + letterOscillation; // Dérive vers la droite
      const letterRotation = Math.sin(progress * Math.PI * 2) * 20 + progress * 20;
      
      birdLastX = birdX;
      birdLastY = birdY;
      letterLastX = letterX;
      letterLastY = letterY;
      
      bird.style.left = `${birdX}px`;
      bird.style.top = `${birdY}px`;
      bird.style.transform = `rotate(${birdRotation}deg) scale(${birdScale})`;
      
      letter.style.left = `${letterX}px`;
      letter.style.top = `${letterY}px`;
      letter.style.transform = `rotate(${letterRotation}deg)`;
      
      if (progress < 1) {
        requestAnimationFrame(animateFall);
      } else {
        animateBounce(0);
      }
    };
    
    // Phase 2: Rebonds séparés
    const animateBounce = (bounceIndex: number) => {
      const bounceHeights = [80, 35, 12];
      const bounceDurations = [bounceDuration, bounceDuration * 0.75, bounceDuration * 0.5];
      
      if (bounceIndex >= bounceHeights.length) {
        setTimeout(() => animateReturn(), 150);
        return;
      }
      
      const bounceHeight = bounceHeights[bounceIndex];
      const bounceStartTime = performance.now();
      const thisBounce = bounceDurations[bounceIndex];
      
      const birdBounceStartX = birdLastX;
      const birdBounceStartY = birdLastY;
      const letterBounceStartX = letterLastX;
      const letterBounceStartY = letterLastY;
      
      // Direction de rapprochement progressif
      const approachFactor = bounceIndex * 0.15;
      
      const bounce = (currentTime: number) => {
        const elapsed = currentTime - bounceStartTime;
        const progress = Math.min(elapsed / thisBounce, 1);
        const bounceProgress = Math.sin(progress * Math.PI);
        
        // Oiseau rebondit et dérive légèrement vers le centre
        const birdY = bottomY - (bounceHeight * bounceProgress);
        const birdX = birdBounceStartX + (startX - birdBounceStartX) * approachFactor * easeOutQuad(progress);
        const birdRotation = Math.sin(progress * Math.PI) * 10 * (1 - bounceIndex * 0.3);
        
        // Lettre rebondit avec décalage et dérive vers le centre
        const letterY = bottomY - (bounceHeight * 0.85 * bounceProgress);
        const letterX = letterBounceStartX + (startX - letterBounceStartX) * approachFactor * easeOutQuad(progress);
        const letterRotation = -Math.sin(progress * Math.PI) * 8 * (1 - bounceIndex * 0.3);
        
        birdLastX = birdX;
        birdLastY = birdY;
        letterLastX = letterX;
        letterLastY = letterY;
        
        bird.style.left = `${birdX}px`;
        bird.style.top = `${birdY}px`;
        bird.style.transform = `rotate(${birdRotation}deg) scale(2)`;
        
        letter.style.left = `${letterX}px`;
        letter.style.top = `${letterY}px`;
        letter.style.transform = `rotate(${letterRotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(bounce);
        } else {
          animateBounce(bounceIndex + 1);
        }
      };
      
      requestAnimationFrame(bounce);
    };
    
    // Phase 3: Retour et rassemblement
    const animateReturn = () => {
      const returnStartTime = performance.now();
      const birdReturnStartX = birdLastX;
      const birdReturnStartY = birdLastY;
      const letterReturnStartX = letterLastX;
      const letterReturnStartY = letterLastY;
      
      const animateUp = (currentTime: number) => {
        const elapsed = currentTime - returnStartTime;
        const progress = Math.min(elapsed / returnDuration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        // L'oiseau remonte en arc vers la gauche puis rejoint le centre
        const birdArc = Math.sin(progress * Math.PI) * 80;
        const birdX = birdReturnStartX + (startX - birdReturnStartX) * easeProgress - birdArc * (1 - progress);
        const birdY = birdReturnStartY + (startY - birdReturnStartY) * easeProgress;
        const birdRotation = Math.sin(progress * Math.PI * 1.5) * 20 * (1 - easeProgress);
        
        // L'oiseau revient à sa taille normale (de 2 à 1)
        const birdScale = 2 - easeProgress; // De 2 à 1
        
        // La lettre remonte en arc vers la droite puis rejoint le centre
        const letterArc = Math.sin(progress * Math.PI) * 60;
        const letterX = letterReturnStartX + (startX - letterReturnStartX) * easeProgress + letterArc * (1 - progress);
        const letterY = letterReturnStartY + (startY - letterReturnStartY) * easeProgress;
        const letterRotation = -Math.sin(progress * Math.PI * 1.5) * 15 * (1 - easeProgress);
        
        bird.style.left = `${birdX}px`;
        bird.style.top = `${birdY}px`;
        bird.style.transform = `rotate(${birdRotation}deg) scale(${birdScale})`;
        
        letter.style.left = `${letterX}px`;
        letter.style.top = `${letterY}px`;
        letter.style.transform = `rotate(${letterRotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateUp);
        } else {
          // Animation terminée - tout remettre en place
          bird.style.cssText = '';
          bird.classList.remove('logo-escaped');
          letter.style.cssText = '';
          letter.classList.remove('logo-escaped');
          container.style.opacity = '1';
          cage.classList.remove('cage-waiting');
          setIsFlying(false);
        }
      };
      
      requestAnimationFrame(animateUp);
    };
    
    requestAnimationFrame(animateFall);
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
          window.scrollTo({ top: 0, behavior: 'instant' });
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
    { name: 'Services', href: '/#services' },
    { name: 'À propos', href: '/#about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.includes('#')) {
      const anchor = href.split('#')[1];
      
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
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
      <nav className="container mx-auto px-4 py-4 xl:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="relative">
              {/* Cercle décoratif - la "cage" (visible seulement pendant l'animation) */}
              <div 
                ref={cageRef}
                className={`absolute -inset-2 border-2 border-primary/20 rounded-full transition-all duration-300 ${isFlying ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Logo principal (visible normalement) */}
              <div 
                ref={logoContainerRef}
                className="relative w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 flex items-center justify-center transition-opacity duration-200"
              >
                <Image
                  src={logoUrl}
                  alt="Perrine Huon Logo"
                  width={48}
                  height={48}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  key={logoUrl}
                  style={{ 
                    filter: theme === 'dark' 
                      ? 'brightness(0) invert(1)' 
                      : 'brightness(0) saturate(100%) invert(30%) sepia(50%) saturate(600%) hue-rotate(175deg) brightness(90%) contrast(90%)'
                  }}
                />
              </div>
              
              {/* Partie oiseau (pour l'animation de dislocation) */}
              <div 
                ref={birdRef}
                className="hidden"
                style={{ display: isFlying ? 'block' : 'none' }}
              >
                <Image
                  src={logoUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                  style={{ 
                    filter: theme === 'dark' 
                      ? 'brightness(0) invert(1)' 
                      : 'brightness(0) saturate(100%) invert(30%) sepia(50%) saturate(600%) hue-rotate(175deg) brightness(90%) contrast(90%)'
                  }}
                />
              </div>
              
              {/* Partie lettre H (pour l'animation de dislocation) */}
              <div 
                ref={letterRef}
                className="hidden"
                style={{ display: isFlying ? 'block' : 'none' }}
              >
                <Image
                  src={logoUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                  style={{ 
                    filter: theme === 'dark' 
                      ? 'brightness(0) invert(1)' 
                      : 'brightness(0) saturate(100%) invert(30%) sepia(50%) saturate(600%) hue-rotate(175deg) brightness(90%) contrast(90%)'
                  }}
                />
              </div>
            </div>
            <span className="text-sm sm:text-base xl:text-xl font-medium tracking-wide whitespace-nowrap">
              <span className="text-primary">PERRINE</span>
              <span className="text-primary/40 ml-1 sm:ml-1.5 xl:ml-2 hidden min-[400px]:inline">HUON</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6 2xl:space-x-10">
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

          {/* Theme Toggle + Contact + CTA Button */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            {/* Bouton Dark Mode */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            >
              <SunIcon />
              <MoonIcon />
            </button>
            
            {/* Bouton Contact - Enveloppe */}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="contact-icon-btn group"
              aria-label="Formulaire de contact"
              title="Écrivez-moi"
            >
              <EnvelopeIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </Link>
            
            <button
              onClick={() => {
                if (pathname !== '/') {
                  window.location.href = '/?openQualifier=true';
                } else {
                  window.dispatchEvent(new CustomEvent('openQualifier'));
                }
              }}
              className="btn-cta btn-cta-ring group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <DocumentIcon className="w-4 h-4 icon-ring" />
                <span className="text-sm uppercase tracking-wider font-semibold">
                  Devis gratuit
                </span>
              </span>
            </button>
          </div>

          {/* Mobile: Contact + Phone CTA + Theme Toggle + Menu button */}
          <div className="flex xl:hidden items-center gap-2 sm:gap-3">
            {/* Bouton Contact Mobile - Enveloppe */}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="contact-icon-btn-mobile"
              aria-label="Formulaire de contact"
            >
              <EnvelopeIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </Link>
            
            {/* Bouton Devis Mobile - Rose animé */}
            <button
              onClick={() => {
                if (pathname !== '/') {
                  window.location.href = '/?openQualifier=true';
                } else {
                  window.dispatchEvent(new CustomEvent('openQualifier'));
                }
              }}
              className="phone-cta-mobile btn-cta-devis-mobile"
              aria-label="Obtenir mon devis gratuit"
            >
              <DocumentIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
            
            {/* Bouton Dark Mode Mobile */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-mobile"
              aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            >
              <SunIcon />
              <MoonIcon />
            </button>
            
            {/* Mobile menu button - Style ligne claire */}
            <button
              type="button"
              className="p-1.5 sm:p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Style carte dessinée */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-navigation" 
            className="xl:hidden mt-4 p-6 bg-paper-light border-2 border-primary/20 rounded-sketch-lg shadow-sketch animate-fade-in-down"
            aria-label="Navigation mobile"
          >
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (pathname !== '/') {
                    window.location.href = '/?openQualifier=true';
                  } else {
                    window.dispatchEvent(new CustomEvent('openQualifier'));
                  }
                }}
                className="btn-cta btn-cta-ring"
              >
                <DocumentIcon className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider font-semibold">
                  Devis gratuit
                </span>
              </button>
            </div>
          </nav>
        )}
      </nav>
    </header>
  );
}
