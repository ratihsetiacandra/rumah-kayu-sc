"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

export function ValueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-card to-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-card to-secondary/40 border border-border rounded-[28px] p-8 sm:p-10 shadow-xl"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3.5">
            {t.value.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.6rem] font-bold leading-[1.05] text-foreground mb-4">
            {t.value.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[900px]">
            {t.value.description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
