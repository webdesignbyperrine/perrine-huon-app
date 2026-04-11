import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

function getLocaleFromRequest(request: NextRequest): string {
  const country = request.headers.get('x-vercel-ip-country');
  
  if (country === 'FR') {
    return 'fr';
  }
  
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.includes('fr')) return 'fr';
  if (acceptLanguage?.includes('es')) return 'es';
  if (acceptLanguage?.includes('en')) return 'en';
  
  return 'fr';
}

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return updateSession(request);
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const hasLocaleInPath = routing.locales.some(locale => 
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocaleInPath && pathname === '/') {
    const detectedLocale = getLocaleFromRequest(request);
    
    if (detectedLocale !== 'fr') {
      const url = request.nextUrl.clone();
      url.pathname = `/${detectedLocale}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|wav|mp3|woff|woff2|ttf|json)$).*)',
  ],
};
