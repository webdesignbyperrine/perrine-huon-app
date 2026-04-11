'use client';

import { useState, useEffect } from 'react';

const DEFAULT_LOGO = '/images/logo_vert_perrine_huon.png';

/**
 * Charge l'URL du logo depuis l'API site-settings.
 * Retourne l'URL par défaut en cas d'échec sans faire planter le composant.
 * @returns URL du logo à afficher.
 */
export function useLogoLoader(): string {
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.logo_url) setLogoUrl(data.logo_url);
      })
      .catch(() => {
        // Silencieux : le logo par défaut reste affiché
      });
  }, []);

  return logoUrl;
}
