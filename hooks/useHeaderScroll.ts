'use client';

import { useState, useEffect, RefObject } from 'react';

interface HeaderScrollState {
  /** Le header a été scrollé (> 50px) */
  scrolled: boolean;
  /** Le header chevauche actuellement une section avec classe `.section-dark` */
  onDarkSection: boolean;
}

/**
 * Suit l'état de scroll du header : position scrollée et chevauchement avec les sections sombres.
 * Gère proprement l'abonnement et la désabonnement à l'événement scroll.
 * @param headerRef - Ref vers l'élément header pour calculer la hauteur.
 * @returns État `scrolled` et `onDarkSection`.
 */
export function useHeaderScroll(headerRef: RefObject<HTMLElement | null>): HeaderScrollState {
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      const headerEl = headerRef.current;
      if (!headerEl) return;

      const headerHeight = headerEl.getBoundingClientRect().height;
      const headerMidInViewport = headerHeight / 2;

      const darkSections = document.querySelectorAll('.section-dark');
      let isOnDark = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Buffer de 80px pour la vague SVG de transition au-dessus de la section
        if (rect.top - 80 <= headerMidInViewport && rect.bottom >= headerMidInViewport) {
          isOnDark = true;
        }
      });

      setOnDarkSection(isOnDark);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerRef]);

  return { scrolled, onDarkSection };
}
