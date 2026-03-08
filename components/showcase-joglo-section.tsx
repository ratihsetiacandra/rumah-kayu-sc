"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

const photos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joglo%20kamar-GPcahbRgA5SQbizeI1M2qX870MHy1P.jpeg",
    alt: "Rumah Joglo dengan pintu ukir putih antik, patung Ganesha, dan halaman hijau rimbun di Bali",
    cols: "col-span-2",
    aspect: "aspect-[16/7]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joglo%20antik-Aas2dSwFr0tozVHIGzPt1EWmwXMzKh.jpeg",
    alt: "Joglo antik kayu natural dengan teras panggung, kursi kayu, dan pintu ukiran khas Jawa",
    cols: "col-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joglo%20warung%20SC-Xw1RqK8bLrGQo1daq0ZyzMnNfaKShI.jpeg",
    alt: "Joglo terbuka dengan tiang penyangga, pagar biru antik, dua patung totem batu, dan atap piramida genteng merah",
    cols: "col-span-1",
    aspect: "aspect-[4/3]",
  },
]

export function ShowcaseJogloSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { t, locale } = useLanguage()

  const waMessage = encodeURIComponent(
    locale === 'id'
      ? 'Halo Rumah Kayu SC, saya tertarik dengan rumah kayu Joglo untuk hunian.'
      : 'Hello Rumah Kayu SC, I am interested in a Joglo wooden house for residential use.'
  )

  return (
    <section id="showcase-joglo" className="py-12 sm:py-16 lg:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
          >
            {t.showcaseJoglo.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance max-w-3xl"
          >
            {t.showcaseJoglo.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[720px] text-muted-foreground text-sm sm:text-base"
          >
            {t.showcaseJoglo.description}
          </motion.p>
        </div>

        {/* Photo grid — wide banner on top, two equal squares below */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
              className={`group overflow-hidden rounded-xl sm:rounded-2xl ${photo.cols} ${photo.aspect}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                sizes={photo.cols === "col-span-2" ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Caption + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-muted-foreground italic">
            {t.showcaseJoglo.project}
          </p>
          <Link
            href={`https://wa.me/6281997826396?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all whitespace-nowrap"
          >
            {t.showcaseJoglo.cta}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
