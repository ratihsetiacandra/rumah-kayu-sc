"use client"

import { createContext, useContext, type ReactNode } from "react"

interface BlogTranslation {
  translationSlug?: string
}

const BlogTranslationContext = createContext<BlogTranslation>({})

export function BlogTranslationProvider({
  translationSlug,
  children,
}: {
  translationSlug?: string
  children: ReactNode
}) {
  return (
    <BlogTranslationContext.Provider value={{ translationSlug }}>
      {children}
    </BlogTranslationContext.Provider>
  )
}

export function useBlogTranslation() {
  return useContext(BlogTranslationContext)
}
