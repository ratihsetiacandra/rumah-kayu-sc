"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const features = t.features.items.map((item, index) => ({
    num: String(index + 1).padStart(2, '0'),
    ...item
  }))

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-card to-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
        >
          {t.features.badge}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance"
        >
          {t.features.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[760px] text-muted-foreground text-sm sm:text-base"
        >
          {t.features.description}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-xl sm:rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-xl"
            >
              <div className="text-sm font-bold text-accent mb-2 sm:mb-3">{feature.num}</div>
              <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
