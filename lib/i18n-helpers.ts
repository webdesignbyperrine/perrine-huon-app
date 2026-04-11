import type { Locale } from '@/i18n/config';

/**
 * Récupère la valeur d'un champ localisé avec fallback sur le français
 * 
 * @example
 * const title = getLocalizedField(post, 'title', 'en');
 * // Retourne post.title_en si présent, sinon post.title
 * 
 * @param item - L'objet contenant les données
 * @param fieldName - Le nom du champ (sans suffixe _en/_es)
 * @param locale - La locale courante ('fr', 'en', 'es')
 * @returns La valeur localisée ou le fallback français
 */
export function getLocalizedField<T extends Record<string, any>>(
  item: T,
  fieldName: string,
  locale: Locale
): string {
  // Si la locale est française, retourner directement le champ
  if (locale === 'fr') {
    return item[fieldName] || '';
  }

  // Essayer de récupérer la version localisée
  const localizedFieldName = `${fieldName}_${locale}`;
  const localizedValue = item[localizedFieldName];

  // Si la valeur localisée existe et n'est pas vide, la retourner
  if (localizedValue && localizedValue.trim() !== '') {
    return localizedValue;
  }

  // Fallback sur le français
  return item[fieldName] || '';
}

/**
 * Récupère plusieurs champs localisés d'un coup
 * 
 * @example
 * const { title, excerpt } = getLocalizedFields(post, ['title', 'excerpt'], 'en');
 * 
 * @param item - L'objet contenant les données
 * @param fieldNames - Liste des noms de champs à récupérer
 * @param locale - La locale courante
 * @returns Un objet avec les valeurs localisées
 */
export function getLocalizedFields<T extends Record<string, any>>(
  item: T,
  fieldNames: string[],
  locale: Locale
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const fieldName of fieldNames) {
    result[fieldName] = getLocalizedField(item, fieldName, locale);
  }
  
  return result;
}
