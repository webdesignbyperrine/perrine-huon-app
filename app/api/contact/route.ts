import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, rateLimitedResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Vérifier le rate limit
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip, { maxRequests: 5 });
    
    if (!rateLimit.allowed) {
      return rateLimitedResponse(rateLimit.resetTime);
    }
    
    const remaining = rateLimit.remaining;

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

    // 2. Envoyer l'email de notification à Perrine via Brevo
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
          htmlContent: generateNotificationEmailHtml({
            name: sanitizedData.name,
            email: sanitizedData.email,
            company: sanitizedData.company,
            message: sanitizedData.message,
          }),
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Erreur Brevo (notification):', errorData);
      }
    } catch (emailError) {
      console.error('Erreur envoi email notification:', emailError);
    }

    // 3. Envoyer l'email de confirmation à l'utilisateur
    try {
      const confirmResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
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
          to: [{ email: sanitizedData.email, name: sanitizedData.name }],
          replyTo: { email: 'contact@perrinehuon.com', name: 'Perrine Huon' },
          subject: `Merci pour votre message !`,
          htmlContent: generateConfirmationEmailHtml({
            name: sanitizedData.name,
          }),
        }),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        console.error('Erreur Brevo (confirmation):', errorData);
      }
    } catch (emailError) {
      console.error('Erreur envoi email confirmation:', emailError);
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

// ============================================
// TEMPLATES EMAIL - Design harmonisé
// Couleurs : Beige #D4C4A8, Bleu #2B5B8A, Rose #ff0f7c
// ============================================

const EMAIL_STYLES = {
  bgBeige: '#D4C4A8',
  bgPaper: '#CDBF9B',
  primaryBlue: '#2B5B8A',
  primaryBlueDark: '#1E4A73',
  accentPink: '#ff0f7c',
  textLight: '#E8DCC4',
  white: '#ffffff',
};

// Header commun
function getEmailHeader(): string {
  return `
    <tr>
      <td style="background-color: ${EMAIL_STYLES.bgBeige}; padding: 30px 30px 25px 30px; text-align: center;">
        <p style="margin: 0; font-family: 'Outfit', Arial, sans-serif; font-size: 24px; font-weight: 600; color: ${EMAIL_STYLES.primaryBlue}; letter-spacing: 2px;">
          PERRINE HUON
        </p>
        <p style="margin: 8px 0 0 0; font-family: 'Outfit', Arial, sans-serif; font-size: 13px; font-weight: 400; color: ${EMAIL_STYLES.primaryBlue}; letter-spacing: 1px; opacity: 0.7;">
          Web designer
        </p>
      </td>
    </tr>
  `;
}

// Footer commun
function getEmailFooter(): string {
  return `
    <tr>
      <td style="background-color: ${EMAIL_STYLES.bgPaper}; padding: 20px; text-align: center;">
        <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 12px; opacity: 0.7;">
          Perrine Huon • Web designer
        </p>
        <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 8px 0 0 0; font-size: 12px; opacity: 0.5;">
          <a href="https://perrinehuon.com" style="color: ${EMAIL_STYLES.primaryBlue}; text-decoration: none;">perrinehuon.com</a>
        </p>
      </td>
    </tr>
  `;
}

// Email de notification pour Perrine (quand quelqu'un envoie un message)
interface NotificationEmailData {
  name: string;
  email: string;
  company: string | null;
  message: string;
}

function generateNotificationEmailHtml(data: NotificationEmailData): string {
  const { name, email, company, message } = data;
  const subject = encodeURIComponent('Re: Votre message sur perrinehuon.com');
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Outfit', Arial, Helvetica, sans-serif; background-color: ${EMAIL_STYLES.bgBeige};">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${EMAIL_STYLES.bgBeige}; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: ${EMAIL_STYLES.bgBeige}; border-radius: 12px; overflow: hidden;">
          
          ${getEmailHeader()}
          
          <!-- Titre -->
          <tr>
            <td style="background-color: ${EMAIL_STYLES.bgBeige}; padding: 30px 30px 20px 30px; text-align: center;">
              <h1 style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 26px; font-weight: 600;">
                Nouveau message
              </h1>
              <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 10px 0 0 0; font-size: 14px; opacity: 0.7;">
                Via le formulaire de contact
              </p>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <div style="background-color: rgba(255,255,255,0.5); border-radius: 12px; padding: 25px; border: 2px solid ${EMAIL_STYLES.primaryBlue}20;">
                <h2 style="color: ${EMAIL_STYLES.primaryBlue}; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                  👤 De la part de
                </h2>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: ${EMAIL_STYLES.primaryBlue}; opacity: 0.7; width: 100px;">Nom</td>
                    <td style="padding: 8px 0; color: ${EMAIL_STYLES.primaryBlue}; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: ${EMAIL_STYLES.primaryBlue}; opacity: 0.7;">Email</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: ${EMAIL_STYLES.accentPink}; text-decoration: none; font-weight: 600;">${email}</a></td>
                  </tr>
                  ${company ? `
                  <tr>
                    <td style="padding: 8px 0; color: ${EMAIL_STYLES.primaryBlue}; opacity: 0.7;">Entreprise</td>
                    <td style="padding: 8px 0; color: ${EMAIL_STYLES.primaryBlue}; font-weight: 600;">${company}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 25px 30px;">
              <div style="background-color: rgba(255,255,255,0.5); border-radius: 12px; padding: 25px; border: 2px solid ${EMAIL_STYLES.primaryBlue}20;">
                <h2 style="color: ${EMAIL_STYLES.primaryBlue}; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                  💬 Message
                </h2>
                <div style="background-color: ${EMAIL_STYLES.white}; border-radius: 8px; padding: 20px; border-left: 4px solid ${EMAIL_STYLES.accentPink};">
                  <p style="color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}?subject=${subject}" style="display: inline-block; background-color: ${EMAIL_STYLES.accentPink}; color: ${EMAIL_STYLES.white}; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px;">
                ✉️ Répondre à ${firstName}
              </a>
            </td>
          </tr>
          
          ${getEmailFooter()}
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Email de confirmation pour l'utilisateur
interface ConfirmationEmailData {
  name: string;
}

function generateConfirmationEmailHtml(data: ConfirmationEmailData): string {
  const firstName = data.name.split(' ')[0];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message bien reçu !</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Outfit', Arial, Helvetica, sans-serif; background-color: ${EMAIL_STYLES.bgBeige};">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${EMAIL_STYLES.bgBeige}; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: ${EMAIL_STYLES.bgBeige}; border-radius: 12px; overflow: hidden;">
          
          ${getEmailHeader()}
          
          <!-- Contenu principal -->
          <tr>
            <td style="background-color: ${EMAIL_STYLES.bgBeige}; padding: 40px 30px; text-align: center;">
              <h1 style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0 0 15px 0; font-size: 26px; font-weight: 600;">
                Merci ${firstName} !
              </h1>
              <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.8;">
                J'ai bien reçu votre message.
              </p>
            </td>
          </tr>
          
          <!-- Info délai -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: rgba(255,255,255,0.5); border-radius: 12px; padding: 25px; border: 2px solid ${EMAIL_STYLES.primaryBlue}20; text-align: center;">
                <h2 style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                  Réponse sous 48h
                </h2>
                <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.7;">
                  Je prends le temps de lire chaque message avec attention<br>
                  et je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Message personnalisé -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <p style="font-family: 'Outfit', Arial, sans-serif; color: ${EMAIL_STYLES.primaryBlue}; margin: 0; font-size: 15px; line-height: 1.6; font-style: italic; opacity: 0.8;">
                En attendant, n'hésitez pas à explorer mes dernières réalisations<br>
                sur mon portfolio !
              </p>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <a href="https://perrinehuon.com/portfolio" style="font-family: 'Outfit', Arial, sans-serif; display: inline-block; background-color: ${EMAIL_STYLES.accentPink}; color: ${EMAIL_STYLES.white}; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Voir le portfolio
              </a>
            </td>
          </tr>
          
          ${getEmailFooter()}
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}




