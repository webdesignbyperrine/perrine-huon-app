import frProfessionsData from '@/messages/fr/professions-data.json'
import enProfessionsData from '@/messages/en/professions-data.json'
import esProfessionsData from '@/messages/es/professions-data.json'
import type { Locale } from '@/i18n/config'

export interface Profession {
  slug: string
  name: string
  category: 'profession-liberale' | 'pme' | 'association'
  metaTitle: string
  metaDescription: string
  h1: string
  introduction: string
  keyFeatures: string[]
  regulations: string | null
  faqs: { question: string; answer: string }[]
}

type ProfessionData = Omit<Profession, 'slug'>

const professionsDataByLocale: Record<Locale, Record<string, ProfessionData>> = {
  fr: frProfessionsData as Record<string, ProfessionData>,
  en: enProfessionsData as Record<string, ProfessionData>,
  es: esProfessionsData as Record<string, ProfessionData>,
}

export function getProfessionsData(locale: Locale = 'fr'): Profession[] {
  const data = professionsDataByLocale[locale]
  return Object.entries(data).map(([slug, profession]) => ({
    slug,
    ...profession,
  }))
}

export const professions: Profession[] = getProfessionsData('fr')

export function getProfessionBySlug(slug: string, locale: Locale = 'fr'): Profession | undefined {
  const professions = getProfessionsData(locale)
  return professions.find((p) => p.slug === slug)
}

export function getAllProfessionSlugs(): string[] {
  return Object.keys(frProfessionsData)
}

export function getProfessionsByCategory(category: string, locale: Locale = 'fr'): Profession[] {
  return getProfessionsData(locale).filter((p) => p.category === category)
}
