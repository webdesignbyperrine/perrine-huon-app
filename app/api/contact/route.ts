import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Rate limiting simple en mémoire (par IP)
// Note: En production avec plusieurs instances, utiliser Redis ou similaire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 5; // Max requêtes
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Nettoyage périodique des entrées expirées
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000); // Toutes les minutes

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP pour le rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Vérifier le rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    // Valider les données
    const body = await request.json();
    const { name, email, company, message, source = 'form_home' } = body;
    
    // Validation basique
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom est requis (minimum 2 caractères)' },
        { status: 400 }
      );
    }
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }
    
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Le message est requis (minimum 10 caractères)' },
        { status: 400 }
      );
    }
    
    // Limiter la taille des champs pour éviter les abus
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 255),
      company: company ? String(company).trim().slice(0, 100) : null,
      message: message.trim().slice(0, 5000),
      source: String(source).slice(0, 50),
      status: 'new' as const,
    };

    // 1. Insérer dans Supabase
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .insert([sanitizedData]);

    if (error) {
      console.error('Erreur insertion contact:', error.message);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    // 2. Envoyer l'email de notification via Brevo
    try {
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          sender: { 
            name: 'Perrine Huon', 
            email: 'contact@perrinehuon.com'
          },
          to: [{ email: 'contact@perrinehuon.com', name: 'Perrine Huon' }],
          replyTo: { email: sanitizedData.email, name: sanitizedData.name },
          subject: `📩 Nouveau message de ${sanitizedData.name}`,
          htmlContent: generateContactEmailHtml({
            name: sanitizedData.name,
            email: sanitizedData.email,
            company: sanitizedData.company,
            message: sanitizedData.message,
          }),
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Erreur Brevo (contact):', errorData);
        // On ne bloque pas si l'email échoue, le message est déjà en base
      }
    } catch (emailError) {
      console.error('Erreur envoi email contact:', emailError);
      // On ne bloque pas si l'email échoue
    }

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        }
      }
    );

  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Générer le HTML de l'email de contact
interface ContactEmailData {
  name: string;
  email: string;
  company: string | null;
  message: string;
}

function generateContactEmailHtml(data: ContactEmailData): string {
  const { name, email, company, message } = data;
  
  // Encoder le sujet pour l'URL mailto
  const subject = encodeURIComponent('Re: Votre message sur perrinehuon.com');
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2B5B8A 0%, #1a365d 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                📩 Nouveau message
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">
                Via le formulaire de contact
              </p>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                👤 De la part de
              </h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Nom :</td>
                  <td style="padding: 8px 0; color: #1a365d; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email :</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #E94E8A; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">Entreprise :</td>
                  <td style="padding: 8px 0; color: #1a365d; font-weight: 600;">${company}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                💬 Message
              </h2>
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #E94E8A;">
                <p style="color: #1a365d; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}?subject=${subject}" style="display: inline-block; background: linear-gradient(135deg, #E94E8A 0%, #9B59B6 100%); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                &#9993; Répondre à ${firstName}
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; margin: 0; font-size: 12px;">
                Email envoyé automatiquement depuis le formulaire de contact de perrinehuon.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}




