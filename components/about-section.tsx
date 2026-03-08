"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[0.9fr_1.1fr] gap-4 sm:gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-card border border-border rounded-2xl sm:rounded-[22px] p-5 sm:p-6 lg:p-8 shadow-xl"
          >
            <div className="flex flex-col justify-center h-full gap-4 sm:gap-5">
              <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary">
                {t.about.badge}
              </span>
              <blockquote className="relative pl-5 sm:pl-6 border-l-[3px] border-primary/40">
                <span className="absolute -top-3 -left-1 text-5xl sm:text-6xl text-primary/15 font-serif leading-none select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-wood-dark leading-snug">
                  {t.about.tagline}
                </p>
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-card border border-border rounded-2xl sm:rounded-[22px] p-5 sm:p-6 lg:p-8 shadow-xl"
          >
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance">
              {t.about.title}
            </h2>
            <p 
              className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-4"
              dangerouslySetInnerHTML={{ __html: t.about.description1 }}
            />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {t.about.description2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
