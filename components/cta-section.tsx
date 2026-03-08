"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const waMessage = encodeURIComponent(t.whatsappMessages.general)

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-28" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-card to-secondary/60 border border-primary/15 rounded-2xl sm:rounded-[34px] p-6 sm:p-10 lg:p-14 text-center shadow-xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
          >
            {t.cta.badge}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance"
          >
            {t.cta.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-[760px] mx-auto text-muted-foreground text-sm sm:text-base mb-5 sm:mb-7"
          >
            {t.cta.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href={`https://wa.me/6281997826396?text=${waMessage}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-br from-primary to-wood-dark text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
