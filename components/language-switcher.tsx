"use client"

import { getAlternateLocale } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import { useTranslationSlug } from "@/lib/blog-translation-context"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { startTransition } from "react"

export function LanguageSwitcher() {
  const { locale } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const { translationSlug } = useTranslationSlug()

  const switchLocale = (nextLocale: "en" | "id") => {
    if (nextLocale === locale) {
      return
    }

    const segments = pathname.split("/")
    segments[1] = nextLocale

    // If on a blog post with a known translation, swap the slug
    const isBlogPost = segments[2] === "blog" && segments[3]
    if (isBlogPost && translationSlug) {
      segments[3] = translationSlug
    } else if (isBlogPost && !translationSlug) {
      // No translation available — fall back to blog listing
      segments.splice(3)
    }

    // If on a showcase page with a known translation, swap the slug
    const isShowcase = segments[2] === "showcases" && segments[3]
    if (isShowcase && translationSlug) {
      segments[3] = translationSlug
    } else if (isShowcase && !translationSlug) {
      // No translation available — fall back to showcases listing
      segments.splice(3)
    }

    const nextPath = segments.join("/") || `/${nextLocale}`
    const hash = typeof window !== "undefined" ? window.location.hash : ""

    startTransition(() => {
      router.push(`${nextPath}${hash}`)
    })
  }

  const alternateLocale = getAlternateLocale(locale)

  return (
    <div className="relative flex items-center bg-secondary rounded-full p-0.5">
      <motion.div
        className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] bg-card rounded-full shadow-sm"
        initial={false}
        animate={{
          x: locale === "id" ? 2 : "calc(100% + 2px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <button
        onClick={() => switchLocale("id")}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
          locale === "id" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        <span className="text-base leading-none">🇮🇩</span>
        <span className="hidden sm:inline">ID</span>
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
          locale === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        <span className="text-base leading-none">🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
      <span className="sr-only">
        Current language {locale}. Alternate language {alternateLocale}.
      </span>
    </div>
  )
}
