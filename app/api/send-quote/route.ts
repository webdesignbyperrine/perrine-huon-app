import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, rateLimitedResponse } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip, { maxRequests: 3 });

    if (!rateLimit.allowed) {
      return rateLimitedResponse(rateLimit.resetTime);
    }

    const remaining = rateLimit.remaining;

    const body = await request.json();
    const { firstName, lastName, email, company, projectSummary, projectData } = body;

    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le prénom est requis (minimum 2 caractères)' },
        { status: 400 }
      );
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom est requis (minimum 2 caractères)' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    const sanitizedData = {
      name: `${firstName.trim()} ${lastName.trim()}`.slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 255),
      company: company ? String(company).trim().slice(0, 100) : null,
      city: null,
      message: projectSummary?.slice(0, 5000) || 'Demande de devis via le qualifier',
      source: 'qualifier_express',
      status: 'new' as const,
    };

    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([sanitizedData]);

    if (dbError) {
      console.error('Erreur insertion send-quote:', dbError.message);
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY manquante — emails non envoyés');
      return NextResponse.json(
        { success: true, message: 'Demande enregistrée avec succès' },
        { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
      );
    }

    const brevoListId = parseInt(process.env.BREVO_LIST_ID ?? '2', 10);

    const brevoHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': brevoApiKey,
    };

    // Ajout du contact dans Brevo — non bloquant
    fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: {
          PRENOM: firstName.trim(),
          NOM: lastName.trim(),
          ENTREPRISE: company?.trim() || '',
        },
        listIds: [brevoListId],
        updateEnabled: true,
      }),
    }).catch((err) => console.error('Erreur ajout contact Brevo:', err));

    // Email de notification à Perrine
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: {
          name: 'Perrine Huon',
          email: 'contact@perrinehuon.com',
        },
        to: [{ email: 'contact@perrinehuon.com', name: 'Perrine Huon' }],
        replyTo: {
          email: email.trim(),
          name: `${firstName.trim()} ${lastName.trim()}`,
        },
        subject: `Nouvelle demande de devis - ${firstName.trim()} ${lastName.trim()}`,
        htmlContent: generateEmailHtml({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          company: company?.trim() || null,
          projectData,
        }),
      }),
    });

    if (!emailResponse.ok) {
      console.error('Erreur Brevo send-quote:', emailResponse.status);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Demande de devis envoyée avec succès' },
      { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );
  } catch (error) {
    console.error('Erreur API send-quote:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  projectData: {
    projectType?: string;
    features?: string[];
    featureOther?: string;
    designStyle?: string;
    animationLevel?: string;
    budget?: string;
    deadline?: string;
    accompagnement?: string;
    inspirations?: string;
  };
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'site-vitrine': 'Site vitrine',
  'e-commerce': 'E-commerce',
  'application': 'Application web',
  'refonte': 'Refonte de site',
  'landing-page': 'Landing page',
  'autre': 'Autre projet',
};

const FEATURES_LABELS: Record<string, string> = {
  'formulaire-contact': 'Formulaire de contact',
  'blog': 'Blog',
  'galerie': 'Galerie photos',
  'reservation': 'Système de réservation',
  'paiement': 'Paiement en ligne',
  'espace-membre': 'Espace membre',
  'multilingue': 'Multilingue',
  'seo': 'Optimisation SEO',
  'analytics': 'Analytics',
  'autre': 'Autre',
};

const DESIGN_LABELS: Record<string, string> = {
  'minimaliste': 'Minimaliste & épuré',
  'moderne': 'Moderne & dynamique',
  'elegant': 'Élégant & sophistiqué',
  'creatif': 'Créatif & original',
  'corporate': 'Corporate & professionnel',
};

const ANIMATION_LABELS: Record<string, string> = {
  'aucune': 'Aucune animation',
  'subtile': 'Subtiles et élégantes',
  'dynamique': 'Dynamiques et engageantes',
  'wow': 'Effet WOW maximum',
};

const BUDGET_LABELS: Record<string, string> = {
  'starter': 'Starter (< 1 500€)',
  'essentiel': 'Essentiel (1 500€ - 3 000€)',
  'premium': 'Premium (3 000€ - 6 000€)',
  'sur-mesure': 'Sur-mesure (> 6 000€)',
};

const DEADLINE_LABELS: Record<string, string> = {
  'urgent': 'Urgent (< 2 semaines)',
  'normal': 'Normal (2-4 semaines)',
  'flexible': 'Flexible (1-2 mois)',
  'pas-presse': 'Pas pressé (> 2 mois)',
};

const ACCOMPAGNEMENT_LABELS: Record<string, string> = {
  'autonome': 'Autonome',
  'guide': 'Guidé',
  'complet': 'Accompagnement complet',
};

function generateEmailHtml(data: EmailData): string {
  const { firstName, lastName, email, company, projectData } = data;

  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : null;

  const resolveLabel = (map: Record<string, string>, key: string) =>
    escapeHtml(map[key] ?? key);

  const featuresList = projectData?.features
    ?.filter((f) => f !== 'autre')
    .map((f) => resolveLabel(FEATURES_LABELS, f))
    .join(', ') ?? '';

  const safeFeatureOther = projectData?.featureOther
    ? escapeHtml(projectData.featureOther)
    : null;

  const safeInspirations = projectData?.inspirations
    ? escapeHtml(projectData.inspirations)
    : null;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #E94E8A 0%, #9B59B6 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                Nouvelle demande de devis
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">
                Via le questionnaire express
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                Informations de contact
              </h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Nom complet :</td>
                  <td style="padding: 8px 0; color: #1a365d; font-weight: 600;">${safeFirstName} ${safeLastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email :</td>
                  <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #E94E8A; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
                </tr>
                ${safeCompany ? `<tr>
                  <td style="padding: 8px 0; color: #666;">Entreprise :</td>
                  <td style="padding: 8px 0; color: #1a365d; font-weight: 600;">${safeCompany}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                Détails du projet
              </h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${projectData?.projectType ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Type de projet</strong>
                    <span style="color: #1a365d; font-size: 16px;">${resolveLabel(PROJECT_TYPE_LABELS, projectData.projectType)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${featuresList ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Fonctionnalités</strong>
                    <span style="color: #1a365d; font-size: 16px;">${featuresList}</span>
                    ${safeFeatureOther ? `<br><em style="color: #888; font-size: 14px;">Autres : ${safeFeatureOther}</em>` : ''}
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${projectData?.designStyle ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Style de design</strong>
                    <span style="color: #1a365d; font-size: 16px;">${resolveLabel(DESIGN_LABELS, projectData.designStyle)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${projectData?.animationLevel ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Niveau d'animations</strong>
                    <span style="color: #1a365d; font-size: 16px;">${resolveLabel(ANIMATION_LABELS, projectData.animationLevel)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${projectData?.budget ? `<tr>
                  <td style="padding: 10px; background-color: #fff3e0; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Budget</strong>
                    <span style="color: #e65100; font-size: 16px; font-weight: 600;">${resolveLabel(BUDGET_LABELS, projectData.budget)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${projectData?.deadline ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Délais souhaités</strong>
                    <span style="color: #1a365d; font-size: 16px;">${resolveLabel(DEADLINE_LABELS, projectData.deadline)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${projectData?.accompagnement ? `<tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Accompagnement</strong>
                    <span style="color: #1a365d; font-size: 16px;">${resolveLabel(ACCOMPAGNEMENT_LABELS, projectData.accompagnement)}</span>
                  </td>
                </tr><tr><td colspan="2" style="height: 10px;"></td></tr>` : ''}
                ${safeInspirations ? `<tr>
                  <td style="padding: 10px; background-color: #e8f5e9; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Inspirations</strong>
                    <span style="color: #2e7d32; font-size: 16px;">${safeInspirations}</span>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: Votre demande de devis')}" style="display: inline-block; background: linear-gradient(135deg, #E94E8A 0%, #9B59B6 100%); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Répondre à ${safeFirstName}
              </a>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; margin: 0; font-size: 12px;">
                Email envoyé automatiquement depuis le site perrinehuon.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
