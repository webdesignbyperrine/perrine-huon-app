/**
 * Gestion des paramètres du site
 * Centralise la récupération des settings (logo, titre, etc.)
 */

import { createClient } from '@/lib/supabase/server';

export interface SiteSettings {
  logo_url: string;
  site_title: string;
  site_description: string;
  calendly_url: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  logo_url: '/images/logo_vert_perrine_huon.png',
  site_title: 'Perrine Huon',
  site_description: 'Web Designer & Développeuse Front-End',
  calendly_url: 'https://calendly.com/prne-hn/30min',
};

/**
 * Récupère les paramètres du site depuis la base de données
 * Utilise le profil de l'admin pour stocker les settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    
    // Récupérer le premier profil (admin)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('avatar_url, name, bio')
      .limit(1);

    if (profiles && profiles.length > 0) {
      const profile = profiles[0];
      
      return {
        logo_url: profile.avatar_url || DEFAULT_SETTINGS.logo_url,
        site_title: profile.name || DEFAULT_SETTINGS.site_title,
        site_description: profile.bio || DEFAULT_SETTINGS.site_description,
        calendly_url: DEFAULT_SETTINGS.calendly_url,
      };
    }

    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Version client-side des settings
 */
export async function getSiteSettingsClient(): Promise<SiteSettings> {
  try {
    const response = await fetch('/api/site-settings');
    if (response.ok) {
      return await response.json();
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return DEFAULT_SETTINGS;
  }
}


