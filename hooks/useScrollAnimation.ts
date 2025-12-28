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

/**
 * Hook pour animer plusieurs éléments avec un délai en cascade
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean[]] {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisibleItems(new Array(itemCount).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animer les éléments en cascade avec un délai
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * 100); // 100ms entre chaque élément
          }
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setVisibleItems(new Array(itemCount).fill(false));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Vérification initiale
    const rect = element.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyVisible) {
      setVisibleItems(new Array(itemCount).fill(true));
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, itemCount, hasMounted]);

  // Retourner tous visibles si pas encore monté
  return [ref, hasMounted ? visibleItems : new Array(itemCount).fill(true)];
}

/**
 * Classes CSS utilitaires pour les animations
 */
export const animationClasses = {
  // États de base (avant animation)
  hidden: 'opacity-0',
  hiddenUp: 'opacity-0 translate-y-8',
  hiddenDown: 'opacity-0 -translate-y-8',
  hiddenLeft: 'opacity-0 translate-x-8',
  hiddenRight: 'opacity-0 -translate-x-8',
  hiddenScale: 'opacity-0 scale-95',
  
  // États animés (après animation)
  visible: 'opacity-100 translate-y-0 translate-x-0 scale-100',
  
  // Transitions
  transition: 'transition-all duration-700 ease-out',
  transitionFast: 'transition-all duration-500 ease-out',
  transitionSlow: 'transition-all duration-1000 ease-out',
};

/**
 * Helper pour générer les classes d'animation
 */
export function getAnimationClass(
  isVisible: boolean,
  variant: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeScale' | 'fade' = 'fadeUp',
  speed: 'fast' | 'normal' | 'slow' = 'normal'
): string {
  const hiddenClass = {
    fade: animationClasses.hidden,
    fadeUp: animationClasses.hiddenUp,
    fadeDown: animationClasses.hiddenDown,
    fadeLeft: animationClasses.hiddenLeft,
    fadeRight: animationClasses.hiddenRight,
    fadeScale: animationClasses.hiddenScale,
  }[variant];

  const transitionClass = {
    fast: animationClasses.transitionFast,
    normal: animationClasses.transition,
    slow: animationClasses.transitionSlow,
  }[speed];

  return `${transitionClass} ${isVisible ? animationClasses.visible : hiddenClass}`;
}


