"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShowcaseCard } from "@/components/showcase-card"
import { useLanguage } from "@/lib/language-context"
import type { ShowcaseMeta } from "@/lib/showcase"

interface ShowcasesSectionProps {
  showcases: ShowcaseMeta[]
  locale: string
}

export function ShowcasesSection({ showcases, locale }: ShowcasesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { t } = useLanguage()

  return (
    <section id="showcases" className="py-12 sm:py-16 lg:py-24 bg-secondary/40" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
          >
            {t.showcases.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance max-w-3xl"
          >
            {t.showcases.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[720px] text-muted-foreground text-sm sm:text-base"
          >
            {t.showcases.description}
          </motion.p>
        </div>

        {/* Showcase cards grid */}
        {showcases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {showcases.map((showcase, index) => (
              <ShowcaseCard
                key={showcase.slug}
                showcase={showcase}
                locale={locale}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-center py-16"
          >
            {t.showcases.noShowcases}
          </motion.p>
        )}

      </div>
    </section>
  )
}
