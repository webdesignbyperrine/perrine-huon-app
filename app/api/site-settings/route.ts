import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Récupérer le premier profil (admin)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('avatar_url, name, bio')
      .limit(1);

    const DEFAULT_SETTINGS = {
      logo_url: '/images/logo_vert_perrine_huon.png',
      site_title: 'Perrine Huon',
      site_description: 'Web Designer & Développeuse Front-End',
      calendly_url: 'https://calendly.com/prne-hn/30min',
    };

    if (profiles && profiles.length > 0) {
      const profile = profiles[0];
      
      return NextResponse.json({
        logo_url: profile.avatar_url || DEFAULT_SETTINGS.logo_url,
        site_title: profile.name || DEFAULT_SETTINGS.site_title,
        site_description: profile.bio || DEFAULT_SETTINGS.site_description,
        calendly_url: DEFAULT_SETTINGS.calendly_url,
      });
    }

    return NextResponse.json(DEFAULT_SETTINGS);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({
      logo_url: '/images/logo_vert_perrine_huon.png',
      site_title: 'Perrine Huon',
      site_description: 'Web Designer & Développeuse Front-End',
      calendly_url: 'https://calendly.com/prne-hn/30min',
    });
  }
}








