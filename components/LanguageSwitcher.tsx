'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { useTransition } from 'react';

const flags: Record<Locale, string> = {
  fr: '/images/flags/fr.svg',
  en: '/images/flags/en.svg',
  es: '/images/flags/es.svg',
};

const flagEmojis: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  es: '🇪🇸',
};

const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-1.5'}`}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={isPending}
          className={`
            relative flex items-center justify-center transition-all duration-200
            ${compact ? 'w-6 h-6 text-base' : 'w-7 h-7 text-lg'}
            ${locale === loc 
              ? 'opacity-100 scale-110' 
              : 'opacity-50 hover:opacity-80 hover:scale-105'
            }
            ${isPending ? 'cursor-wait' : 'cursor-pointer'}
          `}
          aria-label={localeLabels[loc]}
          title={localeLabels[loc]}
        >
          <span className="leading-none">{flagEmojis[loc]}</span>
          {locale === loc && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
