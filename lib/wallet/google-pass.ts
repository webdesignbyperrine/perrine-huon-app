/**
 * Générateur de passes Google Wallet (GenericObject)
 *
 * Prérequis (variables d'environnement) :
 *   GOOGLE_WALLET_ISSUER_ID  — Identifiant émetteur obtenu sur pay.google.com/business/console
 *                               (ex: 3388000000012345678)
 *   GOOGLE_WALLET_SA_EMAIL   — Email du Service Account Google Cloud
 *                               (ex: wallet@mon-projet.iam.gserviceaccount.com)
 *   GOOGLE_WALLET_SA_KEY     — Clé privée RSA du Service Account (PEM, variable d'une seule ligne)
 *                               Exemple : -----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----
 *
 * Sans ces variables, la fonction retourne null et la route affiche un message d'aide.
 *
 * Documentation Google : https://developers.google.com/wallet/generic
 */
import jwt from 'jsonwebtoken';

const SITE_URL = 'https://www.perrinehuon.com';
const LOGO_URL = `${SITE_URL}/images/wallet/google-logo.png`;
const HERO_URL = `${SITE_URL}/images/wallet/google-hero.png`;

/** Construit le GenericClass (modèle de la carte) */
function buildGenericClass(issuerId: string): object {
  const classId = `${issuerId}.perrinehuon-businesscard`;
  return {
    id: classId,
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            twoItems: {
              startItem: {
                firstValue: { fields: [{ fieldPath: 'object.textModulesData["website"]' }] },
              },
              endItem: {
                firstValue: { fields: [{ fieldPath: 'object.textModulesData["email"]' }] },
              },
            },
          },
          {
            oneItem: {
              item: {
                firstValue: { fields: [{ fieldPath: 'object.textModulesData["specialites"]' }] },
              },
            },
          },
        ],
      },
    },
  };
}

/** Construit le GenericObject (instance de la carte) */
function buildGenericObject(issuerId: string): object {
  const classId = `${issuerId}.perrinehuon-businesscard`;
  const objectId = `${issuerId}.perrinehuon-businesscard-001`;

  return {
    id: objectId,
    classId,
    genericType: 'GENERIC_TYPE_UNSPECIFIED',
    state: 'ACTIVE',
    cardTitle: {
      defaultValue: { language: 'fr', value: 'Perrine Huon' },
    },
    subheader: {
      defaultValue: { language: 'fr', value: 'Développeuse Web Freelance' },
    },
    header: {
      defaultValue: {
        language: 'fr',
        value: 'Création de Sites Internet Sur Mesure',
      },
    },
    logo: {
      sourceUri: { uri: LOGO_URL },
      contentDescription: {
        defaultValue: { language: 'fr', value: 'Logo Perrine Huon' },
      },
    },
    heroImage: {
      sourceUri: { uri: HERO_URL },
      contentDescription: {
        defaultValue: {
          language: 'fr',
          value: 'Perrine Huon — Développeur Web Freelance',
        },
      },
    },
    hexBackgroundColor: '#D4C4A8', // beige kraft
    barcode: {
      type: 'QR_CODE',
      value: SITE_URL,
      alternateText: 'perrinehuon.com',
    },
    textModulesData: [
      {
        id: 'tags',
        header: 'Spécialités',
        body: 'Sites web  ·  Référencement Google & IA  ·  Logiciel de gestion',
      },
      {
        id: 'website',
        header: 'Site web',
        body: 'perrinehuon.com',
      },
      {
        id: 'email',
        header: 'Devis gratuit — 48h',
        body: 'contact@perrinehuon.com',
      },
      {
        id: 'atouts',
        header: 'Pourquoi me choisir ?',
        body: '→ Interlocutrice unique de A à Z\n→ Devis gratuit sous 48h\n→ Score Lighthouse 95+ garanti\n→ Paiement en 3 fois possible',
      },
    ],
    linksModuleData: {
      uris: [
        {
          uri: SITE_URL,
          description: 'Mon site web',
          id: 'website_link',
        },
        {
          uri: `${SITE_URL}/contact`,
          description: 'Demander un devis gratuit',
          id: 'devis_link',
        },
        {
          uri: 'https://www.linkedin.com/in/perrinehuon/',
          description: 'LinkedIn',
          id: 'linkedin_link',
        },
        {
          uri: 'https://www.instagram.com/perrinehuon.web',
          description: 'Instagram',
          id: 'instagram_link',
        },
        {
          uri: 'mailto:contact@perrinehuon.com',
          description: 'Envoyer un email',
          id: 'email_link',
        },
      ],
    },
  };
}

/**
 * Génère le JWT Google Wallet et retourne l'URL "Add to Google Wallet".
 * Retourne null si les variables d'environnement ne sont pas configurées.
 */
export function generateGoogleWalletUrl(): string | null {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
  const saEmail = process.env.GOOGLE_WALLET_SA_EMAIL;
  const saKey = process.env.GOOGLE_WALLET_SA_KEY;

  if (!issuerId || !saEmail || !saKey) {
    return null;
  }

  // Remplacer les \n littéraux par des vrais sauts de ligne (courant en prod)
  const privateKey = saKey.replace(/\\n/g, '\n');

  const payload = {
    iss: saEmail,
    aud: 'google',
    origins: [SITE_URL],
    typ: 'savetowallet',
    payload: {
      genericClasses: [buildGenericClass(issuerId)],
      genericObjects: [buildGenericObject(issuerId)],
    },
  };

  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return `https://pay.google.com/gp/v/save/${token}`;
}
