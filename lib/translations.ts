import en from "@/messages/en.json"
import id from "@/messages/id.json"

export const locales = ["en", "id"] as const
export const defaultLocale = "en"

export type Locale = (typeof locales)[number]
export type TranslationType = typeof id

const translations = {
  en,
  id,
} satisfies Record<Locale, TranslationType>

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getTranslations(locale: Locale): TranslationType {
  return translations[locale]
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "id" : "en"
}
