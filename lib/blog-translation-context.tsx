"use client"

import { createContext, useContext, type ReactNode } from "react"

interface TranslationContextType {
  translationSlug?: string
}

const TranslationContext = createContext<TranslationContextType>({})

export function TranslationProvider({
  translationSlug,
  children,
}: {
  translationSlug?: string
  children: ReactNode
}) {
  return (
    <TranslationContext.Provider value={{ translationSlug }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslationSlug() {
  return useContext(TranslationContext)
}

// Legacy exports for backward compatibility
export const BlogTranslationContext = TranslationContext
export function BlogTranslationProvider({
  translationSlug,
  children,
}: {
  translationSlug?: string
  children: ReactNode
}) {
  return (
    <TranslationContext.Provider value={{ translationSlug }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useBlogTranslation() {
  return useContext(TranslationContext)
}
