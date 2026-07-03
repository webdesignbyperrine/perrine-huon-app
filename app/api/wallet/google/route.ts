import { NextResponse } from 'next/server';
import { generateGoogleWalletUrl } from '@/lib/wallet/google-pass';

export const dynamic = 'force-dynamic';

export async function GET() {
  const saveUrl = generateGoogleWalletUrl();

  if (!saveUrl) {
    return NextResponse.json(
      {
        error: 'Google Wallet non configuré.',
        hint: 'Définissez GOOGLE_WALLET_ISSUER_ID, GOOGLE_WALLET_SA_EMAIL et GOOGLE_WALLET_SA_KEY dans vos variables d\'environnement.',
        setupUrl: 'https://pay.google.com/business/console',
      },
      { status: 503 }
    );
  }

  // Redirection directe vers la page Google "Add to Wallet"
  return NextResponse.redirect(saveUrl, { status: 302 });
}
