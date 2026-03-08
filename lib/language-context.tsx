"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Locale, TranslationType } from "./translations"

interface LanguageContextType {
  locale: Locale
  t: TranslationType
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: Locale
  messages: TranslationType
}) {
  return (
    <LanguageContext.Provider value={{ locale, t: messages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
