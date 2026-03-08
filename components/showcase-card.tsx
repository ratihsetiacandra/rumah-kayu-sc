"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { ShowcaseMeta } from "@/lib/showcase"

interface ShowcaseCardProps {
  showcase: ShowcaseMeta
  locale: string
  index: number
  isInView: boolean
}

export function ShowcaseCard({ showcase, locale, index, isInView }: ShowcaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        href={`/${locale}/showcases/${showcase.slug}`}
        className="flex flex-col h-full bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl transition-shadow hover:shadow-2xl"
      >
        {/* Primary image */}
        <div className="h-[200px] sm:h-[240px] overflow-hidden shrink-0">
          <Image
            src={showcase.primaryImage}
            alt={showcase.primaryImageAlt}
            width={800}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-1 p-5 sm:p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {showcase.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-wood-dark text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 line-clamp-2">
            {showcase.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {showcase.description}
          </p>

          {/* Image count indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>
              {showcase.images.length} {locale === "id" ? "foto" : "photos"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
