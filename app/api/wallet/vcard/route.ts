import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Génère une vCard v3.0 (format universel, compatible iOS, Android, macOS, Outlook)
 * Téléchargée comme fallback pour les appareils sans Apple/Google Wallet.
 */
export async function GET() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Perrine Huon',
    'N:Huon;Perrine;;;',
    'TITLE:Développeur Web Freelance',
    'ORG:Perrine Huon',
    'EMAIL;TYPE=WORK,INTERNET:contact@perrinehuon.com',
    'URL;TYPE=WORK:https://www.perrinehuon.com',
    'URL;TYPE=LinkedIn:https://www.linkedin.com/in/perrinehuon/',
    'URL;TYPE=Instagram:https://www.instagram.com/perrinehuon.web',
    'NOTE:Développeur web freelance spécialisée en création de sites internet sur mesure\\, applications web et SEO. Score Lighthouse 95+ garanti. Devis gratuit sous 48h.',
    'X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/perrinehuon/',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/perrinehuon.web',
    'END:VCARD',
  ].join('\r\n');

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="PerrineHuon.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
