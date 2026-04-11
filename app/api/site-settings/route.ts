import { NextResponse } from 'next/server';
import { getSiteSettings, DEFAULT_SETTINGS } from '@/lib/site-settings';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Erreur API site-settings:', error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}
