'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook pour déclencher des animations au scroll
 * Retourne une ref à attacher à l'élément et un boolean indiquant si l'élément est visible
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    
    const element = ref.current;
    if (!element) {
      // Si pas d'élément, on affiche quand même le contenu
      setIsVisible(true);
      return;
    }

    // Vérifier si IntersectionObserver est disponible
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Vérification initiale - si l'élément est déjà visible
    const rect = element.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyVisible) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasMounted]);

  // Retourner true si pas encore monté pour éviter le flash de contenu invisible
  return [ref, hasMounted ? isVisible : true];
}




