import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, rateLimitedResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Vérifier le rate limit (3 demandes de devis par minute)
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip, { maxRequests: 3 });
    
    if (!rateLimit.allowed) {
      return rateLimitedResponse(rateLimit.resetTime);
    }
    
    const remaining = rateLimit.remaining;

    const body = await request.json();
    const { firstName, lastName, email, company, projectSummary, projectData } = body;
    
    // Validation
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
      return NextResponse.json({ error: 'Le prénom est requis (minimum 2 caractères)' }, { status: 400 });
    }
    
    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
      return NextResponse.json({ error: 'Le nom est requis (minimum 2 caractères)' }, { status: 400 });
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

    // 1. Insérer dans Supabase
    const supabase = await createClient();
    await supabase.from('contact_messages').insert([sanitizedData]);

    // 2. Ajouter le contact dans Brevo (pour les newsletters)
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          attributes: {
            PRENOM: firstName.trim(),
            NOM: lastName.trim(),
            ENTREPRISE: company?.trim() || '',
          },
          listIds: [2],
          updateEnabled: true,
        }),
      });
    } catch (contactError) {
      console.log('Contact Brevo (ignoré):', contactError);
    }

    // 3. Envoyer l'email via Brevo
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
          email: 'contact@perrinehuon.com' // Expéditeur vérifié dans Brevo
        },
        to: [{ email: 'contact@perrinehuon.com', name: 'Perrine Huon' }],
        replyTo: { email: email.trim(), name: `${firstName.trim()} ${lastName.trim()}` },
        subject: `🎯 Nouvelle demande de devis - ${firstName.trim()} ${lastName.trim()}`,
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
      const errorData = await emailResponse.json();
      console.error('Erreur Brevo:', errorData);
      return NextResponse.json({ error: `Erreur envoi email: ${errorData.message || 'Erreur inconnue'}` }, { status: 500 });
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

// Générer le HTML de l'email
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

function generateEmailHtml(data: EmailData): string {
  const { firstName, lastName, email, company, projectData } = data;

  const projectTypeLabels: Record<string, string> = {
    'site-vitrine': 'Site vitrine',
    'e-commerce': 'E-commerce',
    'application': 'Application web',
    'refonte': 'Refonte de site',
    'landing-page': 'Landing page',
    'autre': 'Autre projet',
  };

  const featuresLabels: Record<string, string> = {
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

  const designLabels: Record<string, string> = {
    'minimaliste': 'Minimaliste & épuré',
    'moderne': 'Moderne & dynamique',
    'elegant': 'Élégant & sophistiqué',
    'creatif': 'Créatif & original',
    'corporate': 'Corporate & professionnel',
  };

  const animationLabels: Record<string, string> = {
    'aucune': 'Aucune animation',
    'subtile': 'Subtiles et élégantes',
    'dynamique': 'Dynamiques et engageantes',
    'wow': 'Effet WOW maximum',
  };

  const budgetLabels: Record<string, string> = {
    'starter': 'Starter (< 1 500€)',
    'essentiel': 'Essentiel (1 500€ - 3 000€)',
    'premium': 'Premium (3 000€ - 6 000€)',
    'sur-mesure': 'Sur-mesure (> 6 000€)',
  };

  const deadlineLabels: Record<string, string> = {
    'urgent': 'Urgent (< 2 semaines)',
    'normal': 'Normal (2-4 semaines)',
    'flexible': 'Flexible (1-2 mois)',
    'pas-presse': 'Pas pressé (> 2 mois)',
  };

  const accompagnementLabels: Record<string, string> = {
    'autonome': 'Autonome',
    'guide': 'Guidé',
    'complet': 'Accompagnement complet',
  };

  return `
<!DOCTYPE html>
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
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #E94E8A 0%, #9B59B6 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                🎯 Nouvelle demande de devis
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">
                Via le questionnaire express
              </p>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                👤 Informations de contact
              </h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Nom complet :</td>
                  <td style="padding: 8px 0; color: #1a365d; font-weight: 600;">${firstName} ${lastName}</td>
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
          
          <!-- Project Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #E94E8A; padding-bottom: 10px;">
                📋 Détails du projet
              </h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${projectData?.projectType ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">📌 Type de projet</strong>
                    <span style="color: #1a365d; font-size: 16px;">${projectTypeLabels[projectData.projectType] || projectData.projectType}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.features && projectData.features.length > 0 ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">⚙️ Fonctionnalités</strong>
                    <span style="color: #1a365d; font-size: 16px;">${projectData.features.filter((f: string) => f !== 'autre').map((f: string) => featuresLabels[f] || f).join(', ')}</span>
                    ${projectData.featureOther ? `<br><em style="color: #888; font-size: 14px;">Autres : ${projectData.featureOther}</em>` : ''}
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.designStyle ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">🎨 Style de design</strong>
                    <span style="color: #1a365d; font-size: 16px;">${designLabels[projectData.designStyle] || projectData.designStyle}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.animationLevel ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">✨ Niveau d'animations</strong>
                    <span style="color: #1a365d; font-size: 16px;">${animationLabels[projectData.animationLevel] || projectData.animationLevel}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.budget ? `
                <tr>
                  <td style="padding: 10px; background-color: #fff3e0; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">💰 Budget</strong>
                    <span style="color: #e65100; font-size: 16px; font-weight: 600;">${budgetLabels[projectData.budget] || projectData.budget}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.deadline ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">⏱️ Délais souhaités</strong>
                    <span style="color: #1a365d; font-size: 16px;">${deadlineLabels[projectData.deadline] || projectData.deadline}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.accompagnement ? `
                <tr>
                  <td style="padding: 10px; background-color: #f8f9fa; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">🤝 Accompagnement</strong>
                    <span style="color: #1a365d; font-size: 16px;">${accompagnementLabels[projectData.accompagnement] || projectData.accompagnement}</span>
                  </td>
                </tr>
                <tr><td colspan="2" style="height: 10px;"></td></tr>
                ` : ''}
                
                ${projectData?.inspirations ? `
                <tr>
                  <td style="padding: 10px; background-color: #e8f5e9; border-radius: 8px;" colspan="2">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">💡 Inspirations</strong>
                    <span style="color: #2e7d32; font-size: 16px;">${projectData.inspirations}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Votre demande de devis" style="display: inline-block; background: linear-gradient(135deg, #E94E8A 0%, #9B59B6 100%); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                📧 Répondre à ${firstName}
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; margin: 0; font-size: 12px;">
                Email envoyé automatiquement depuis le site perrinehuon.com<br>
                Contact ajouté à ta liste Brevo pour les newsletters 📧
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
