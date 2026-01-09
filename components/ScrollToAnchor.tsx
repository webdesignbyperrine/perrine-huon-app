'use client';

import { useEffect } from 'react';

export default function ScrollToAnchor() {
  useEffect(() => {
    // Vérifier s'il y a une ancre dans l'URL
    const hash = window.location.hash;
    if (hash) {
      // Petit délai pour laisser la page se charger
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return null;
}




