"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Showcase } from "@/lib/showcase"

interface ShowcaseDetailContentProps {
  showcase: Showcase
  locale: string
  children: React.ReactNode
}

export function ShowcaseDetailContent({ showcase, locale, children }: ShowcaseDetailContentProps) {
  const { t } = useLanguage()

  const waMessage = encodeURIComponent(showcase.ctaMessage)

  return (
    <article className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-[1180px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}#showcases`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.showcases.backToShowcases}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {showcase.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-wood-dark text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
            {showcase.title}
          </h1>

          <p className="max-w-[760px] text-muted-foreground text-sm sm:text-base">
            {showcase.description}
          </p>
        </motion.div>

        {/* Photo masonry grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8"
        >
          {showcase.images.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className={`group overflow-hidden rounded-xl sm:rounded-2xl ${photo.span}`}
              style={{
                aspectRatio: photo.span.includes("row-span-2")
                  ? "auto"
                  : photo.span.includes("col-span-2")
                    ? "16/7"
                    : "4/3",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                sizes={
                  photo.span.includes("col-span-2")
                    ? "(max-width: 640px) 100vw, 66vw"
                    : "(max-width: 640px) 50vw, 33vw"
                }
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  minHeight: photo.span.includes("row-span-2") ? "100%" : undefined,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Markdown content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-[760px] mx-auto prose-custom mb-10"
        >
          {children}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href={`https://wa.me/6281997826396?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {t.showcases.cta}
          </Link>
        </motion.div>
      </div>
    </article>
  )
}
