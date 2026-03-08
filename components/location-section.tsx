"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

export function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="location" className="py-12 sm:py-16 lg:py-24" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
        >
          {t.location.badge}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance"
        >
          {t.location.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[760px] text-muted-foreground text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: t.location.description }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-5 sm:mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-border rounded-xl sm:rounded-[22px] p-5 sm:p-6 lg:p-7 shadow-xl"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{t.location.locationTitle}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{t.location.locationValue}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border rounded-xl sm:rounded-[22px] p-5 sm:p-6 lg:p-7 shadow-xl"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{t.location.whatsappTitle}</h3>
            <Link
              href="https://wa.me/6281997826396"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-wood-dark transition-colors text-sm sm:text-base"
            >
              081997826396
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
