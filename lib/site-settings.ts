import { createClient } from '@/lib/supabase/server';

export interface SiteSettings {
  logo_url: string;
  site_title: string;
  site_description: string;
  calendly_url: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  logo_url: '/images/logo_vert_perrine_huon.png',
  site_title: 'Perrine Huon',
  site_description: 'Web Designer & Développeuse Front-End',
  calendly_url: 'https://calendly.com/perrinehuon/30min',
};

/**
 * Récupère les paramètres du site depuis le profil admin en base de données.
 * Utilise `order + limit(1)` pour garantir un résultat déterministe.
 * En cas d'erreur, retourne les valeurs par défaut sans faire planter l'application.
 * @returns Paramètres du site (logo, titre, description, Calendly).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('avatar_url, name, bio')
      .order('created_at', { ascending: true })
      .limit(1);

    if (error) {
      console.error('Erreur lecture site-settings:', error.message);
      return DEFAULT_SETTINGS;
    }

    const profile = profiles?.[0];
    if (!profile) return DEFAULT_SETTINGS;

    return {
      logo_url: profile.avatar_url ?? DEFAULT_SETTINGS.logo_url,
      site_title: profile.name ?? DEFAULT_SETTINGS.site_title,
      site_description: profile.bio ?? DEFAULT_SETTINGS.site_description,
      calendly_url: DEFAULT_SETTINGS.calendly_url,
    };
  } catch (error) {
    console.error('Erreur inattendue site-settings:', error);
    return DEFAULT_SETTINGS;
  }
}
