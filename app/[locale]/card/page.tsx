import { headers } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Perrine Huon — Carte de visite digitale',
  description:
    'Ajoutez la carte de visite de Perrine Huon, développeur web freelance, à votre Apple Wallet ou Google Wallet.',
  robots: { index: false },
};

type OS = 'ios' | 'android' | 'other';

function detectOS(ua: string): OS {
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

function PHLogo({ size = 140 }: { size?: number }) {
  return (
    <Image
      src="/images/wallet/logo-blanc.png"
      alt="Logo Perrine Huon"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
}

const GOOGLE_WALLET_BADGE: Record<string, string> = {
  fr: '/images/wallet/fr_add_to_google_wallet.svg',
  en: '/images/wallet/en_add_to_google_wallet.svg',
  es: '/images/wallet/es_add_to_google_wallet.svg',
};

const APPLE_WALLET_BADGE: Record<string, string> = {
  fr: '/images/wallet/fr_add_to_apple_wallet.svg',
  en: '/images/wallet/en_add_to_apple_wallet.svg',
  es: '/images/wallet/es_add_to_apple_wallet.svg',
};

function AppleWalletButton({ locale }: { locale: string }) {
  const src = APPLE_WALLET_BADGE[locale] ?? APPLE_WALLET_BADGE.fr;
  return (
    <a
      href="/api/wallet/apple"
      className="flex justify-center active:scale-95 transition-transform duration-150"
      aria-label="Ajouter à Apple Wallet"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Ajouter à Apple Wallet"
        style={{ width: '66%', height: 'auto', display: 'block' }}
      />
    </a>
  );
}

function GoogleWalletButton({ locale }: { locale: string }) {
  const src = GOOGLE_WALLET_BADGE[locale] ?? GOOGLE_WALLET_BADGE.fr;
  return (
    <a
      href="/api/wallet/google"
      className="flex justify-center active:scale-95 transition-transform duration-150"
      aria-label="Ajouter à Google Wallet"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Ajouter à Google Wallet"
        style={{ width: '66%', height: 'auto', display: 'block' }}
      />
    </a>
  );
}

function VCardButton() {
  return (
    <a
      href="/api/wallet/vcard"
      className="flex items-center justify-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors"
      style={{ color: '#2B5B8A' }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Télécharger ma fiche contact (.vcf)
    </a>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: 'rgba(43,91,138,0.15)' }} />
      <span className="text-xs" style={{ color: '#94A3B8' }}>ou</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(43,91,138,0.15)' }} />
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#0A66C2" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529"/>
          <stop offset="50%" stopColor="#DD2A7B"/>
          <stop offset="100%" stopColor="#8134AF"/>
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2B5B8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2B5B8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function ContactRow({ icon, label, href, text }: { icon: ReactNode; label: string; href: string; text: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-2 group"
    >
      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">{icon}</span>
      <span className="text-xs font-medium w-16 flex-shrink-0" style={{ color: '#64748B' }}>{label}</span>
      <span className="text-xs font-semibold truncate group-hover:underline" style={{ color: '#2B5B8A' }}>{text}</span>
    </a>
  );
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';
  const os = detectOS(ua);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(160deg, #D4C4A8 0%, #CDBF9B 60%, #C5B590 100%)' }}
    >
      {/* Carte */}
      <div
        className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
        style={{ background: 'rgba(232,220,196,0.88)', border: '1.5px solid rgba(43,91,138,0.12)' }}
      >
        {/* Bandeau bleu foncé */}
        <div className="w-full flex flex-col items-center justify-center gap-4 py-8" style={{ background: '#1E293B' }}>
          <PHLogo />
          <div className="text-center">
            <p className="text-3xl font-medium mb-1" style={{ color: '#DE337A', fontFamily: 'var(--font-caveat, cursive)' }}>
              Développeuse web indépendante
            </p>
            <h1 className="text-2xl tracking-tight" style={{ color: '#fff', fontFamily: 'var(--font-outfit, system-ui)' }}>
              <span style={{ fontWeight: 400 }}>PERRINE</span>{' '}
              <span style={{ fontWeight: 700 }}>HUON</span>
            </h1>
          </div>
        </div>

        {/* Corps */}
        <div className="px-6 py-7 flex flex-col gap-5">

          {/* Tagline */}
          <p className="text-center text-sm leading-relaxed" style={{ color: '#2B5B8A', fontFamily: 'var(--font-outfit, system-ui)' }}>
            Sites internet sur mesure · Experte référencement Google et IA ·{' '}
            <span className="font-semibold">Devis gratuit sous 48h</span>
          </p>

          {/* Boutons Wallet selon le device */}
          {os === 'ios' && (
            <>
              <AppleWalletButton locale={locale} />
              <Divider />
              <GoogleWalletButton locale={locale} />
            </>
          )}
          {os === 'android' && (
            <>
              <GoogleWalletButton locale={locale} />
              <Divider />
              <AppleWalletButton locale={locale} />
            </>
          )}
          {os === 'other' && (
            <>
              <AppleWalletButton locale={locale} />
              <GoogleWalletButton locale={locale} />
            </>
          )}

          <Divider />
          <VCardButton />

          {/* Infos rapides */}
          <div className="rounded-2xl px-4 py-4 flex flex-col gap-2.5" style={{ background: 'rgba(43,91,138,0.06)', border: '1px solid rgba(43,91,138,0.1)' }}>
            <ContactRow icon={<GlobeIcon />} label="Site web" href="https://www.perrinehuon.com" text="perrinehuon.com" />
            <ContactRow icon={<MailIcon />} label="Email" href="mailto:contact@perrinehuon.com" text="contact@perrinehuon.com" />
            <ContactRow icon={<LinkedInIcon />} label="LinkedIn" href="https://www.linkedin.com/in/perrinehuon/" text="linkedin.com/in/perrinehuon" />
            <ContactRow icon={<InstagramIcon />} label="Instagram" href="https://www.instagram.com/perrinehuon.web" text="@perrinehuon.web" />
          </div>

          {/* Tags spécialités */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['Site vitrine', 'E-commerce', 'SEO local', 'Landing page', 'App web', 'Refonte', 'CRM', 'Logiciel de gestion', 'GEO'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: 'rgba(43,91,138,0.1)', color: '#2B5B8A', border: '1px solid rgba(43,91,138,0.15)', fontFamily: 'var(--font-outfit, system-ui)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA principal */}
          <Link
            href="/?openQualifier=true"
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-3.5 text-4xl font-medium active:scale-95 transition-all duration-150"
            style={{ background: '#fff', color: '#DE337A', border: '2.5px solid #DE337A', fontFamily: 'var(--font-caveat, cursive)' }}
          >
            Configurer mon projet
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-center" style={{ color: 'rgba(43,91,138,0.5)', fontFamily: 'var(--font-outfit, system-ui)' }}>
        © 2026 Perrine Huon · Tous droits réservés
      </p>
    </main>
  );
}
