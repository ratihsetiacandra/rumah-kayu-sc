"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, locale } = useLanguage()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/10"
    >
      <div className="container mx-auto px-4 max-w-[1180px]">
        <nav className="flex items-center justify-between min-h-[68px] md:min-h-[78px] gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 md:gap-3.5">
            <div className="w-10 h-10 md:w-[46px] md:h-[46px] rounded-xl md:rounded-[14px] bg-gradient-to-br from-[#f3ece2] to-[#d8c2a5] grid place-items-center text-wood-dark font-serif text-lg md:text-xl font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
              SC
            </div>
            <div>
              <strong className="block text-sm md:text-base text-foreground">Rumah Kayu SC</strong>
              <span className="hidden sm:block text-xs md:text-sm text-muted-foreground">{t.header.tagline}</span>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 text-[15px] text-foreground/90">
            <Link href="#about" className="hover:text-primary transition-colors">{t.header.nav.about}</Link>
            <Link href="#features" className="hover:text-primary transition-colors">{t.header.nav.features}</Link>
            <Link href="#products" className="hover:text-primary transition-colors">{t.header.nav.products}</Link>
            <Link href="#location" className="hover:text-primary transition-colors">{t.header.nav.location}</Link>
            <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">{t.header.nav.blog}</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            
            <Link
              href="https://wa.me/6281997826396"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full text-sm md:text-base font-semibold bg-gradient-to-br from-primary to-wood-dark text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t.header.whatsapp}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                <Link
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                >
                  {t.header.nav.about}
                </Link>
                <Link
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                >
                  {t.header.nav.features}
                </Link>
                <Link
                  href="#products"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                >
                  {t.header.nav.products}
                </Link>
                <Link
                  href="#location"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                >
                  {t.header.nav.location}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-foreground"
                >
                  {t.header.nav.blog}
                </Link>
                <Link
                  href="https://wa.me/6281997826396"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="sm:hidden mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold bg-gradient-to-br from-primary to-wood-dark text-primary-foreground"
                >
                  {t.header.whatsapp}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
