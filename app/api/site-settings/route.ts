import { NextResponse } from 'next/server';
import { getSiteSettings, DEFAULT_SETTINGS } from '@/lib/site-settings';

// Public, rarely changing settings: serve a cached response refreshed at most
// once a day instead of invoking a function on every page view.
export const revalidate = 86400;

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Erreur API site-settings:', error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}
