"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Sparkles, TreeDeciduous } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function HeroSection() {
  const { t } = useLanguage()
  const waMessage = encodeURIComponent(t.whatsappMessages.general)

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-12">
      <div className="container mx-auto px-4 max-w-[1180px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="order-2 lg:order-1"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
            >
              {t.hero.badge}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1.1] lg:leading-[1.05] tracking-tight text-foreground text-balance"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-[620px] mt-4 sm:mt-6 mb-6 sm:mb-7 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.hero.description }}
            />

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <Link
                href={`https://wa.me/6281997826396?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-br from-primary to-wood-dark text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {t.hero.cta}
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold bg-card text-foreground border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                {t.hero.viewProducts}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                {t.hero.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 shrink-0" />
                {t.hero.design}
              </span>
              <span className="flex items-center gap-1.5">
                <TreeDeciduous className="w-4 h-4 shrink-0" />
                {t.hero.types}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 w-full bg-card rounded-2xl sm:rounded-[30px] overflow-hidden shadow-xl border border-primary/10"
          >
            <div className="min-h-[280px] sm:min-h-[360px] lg:min-h-[560px] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20gorden%20putih-KS9IZuFdLIqLgnU8i8Yvkow2ocmVYt.jpeg"
                alt="Teras kayu dengan lentera kertas putih dan tirai tipis — suasana rumah kayu tradisional Jawa karya Rumah Kayu SC"
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-b from-white/95 to-white/90 -mt-16 sm:-mt-20 mx-3 sm:mx-6 mb-4 sm:mb-6 relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/15"
            >
              <strong className="block mb-1.5 sm:mb-2 text-wood-dark text-sm sm:text-base">{t.hero.cardTitle}</strong>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {t.hero.cardDescription}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
