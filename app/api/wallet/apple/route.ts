import { NextResponse } from 'next/server';
import { generateApplePass } from '@/lib/wallet/apple-pass';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const passBuffer = await generateApplePass();

    return new Response(new Uint8Array(passBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'attachment; filename="perrinehuon.pkpass"',
        'Content-Length': passBuffer.length.toString(),
        // Pas de cache : le pass peut être mis à jour
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Apple Wallet] Erreur génération du pass :', err);
    return NextResponse.json(
      {
        error: 'Impossible de générer le pass Apple Wallet.',
        hint: 'Vérifiez les variables APPLE_TEAM_ID, APPLE_PASS_TYPE_ID, APPLE_CERT_P12_BASE64, APPLE_CERT_P12_PASS, APPLE_WWDR_CERT_PEM.',
      },
      { status: 500 }
    );
  }
}
