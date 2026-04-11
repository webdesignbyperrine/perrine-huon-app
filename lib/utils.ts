import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fusionne des classes Tailwind en évitant les conflits via clsx + tailwind-merge.
 * @param inputs - Liste de valeurs de classe (string, objet conditionnel, tableau, etc.)
 * @returns Chaîne de classes fusionnées et dédupliquées.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère un slug URL-safe depuis un texte quelconque.
 * Supprime les accents, les caractères spéciaux et remplace les espaces par des tirets.
 * @param text - Texte source à convertir.
 * @returns Slug en minuscules avec tirets.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Formate une date ISO en français lisible (ex. « 15 janvier 2025 »).
 * Retourne une chaîne vide si la date est invalide plutôt que de planter.
 * @param date - Chaîne de date parseable par Date().
 * @param locale - Locale pour le formatage (par défaut 'fr-FR').
 * @returns Date formatée dans la locale demandée ou chaîne vide si invalide.
 */
export function formatDate(date: string, locale: string = 'fr-FR'): string {
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return ''
  
  // Map locales to Intl locale codes
  const localeMap: Record<string, string> = {
    'fr': 'fr-FR',
    'en': 'en-US',
    'es': 'es-ES',
  }
  
  const intlLocale = localeMap[locale] || locale
  
  return new Intl.DateTimeFormat(intlLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsed)
}

/**
 * Estime le temps de lecture d'un contenu textuel.
 * @param content - Contenu brut (HTML ou texte).
 * @returns Nombre de minutes de lecture (arrondi au supérieur).
 */
export function estimateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / WORDS_PER_MINUTE)
}

/**
 * Échappe les caractères HTML spéciaux pour éviter les injections dans les templates email.
 * Couvre &, <, >, ", ' et les backticks.
 * @param text - Chaîne potentiellement dangereuse.
 * @returns Chaîne avec caractères spéciaux échappés.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
}
