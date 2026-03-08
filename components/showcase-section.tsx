"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

const photos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20side%20road%20full-aGFVNk7FvNRZAXC4KvjIWXMwiUxyPR.jpeg",
    alt: "Aerial view bangunan Joglo cafe Balyand Lifestyle di tepi jalan dengan sawah di latar belakang, Bali",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20tempat%20duduk%20luar-Chgh2UXR9ItIIP1R9iAVhCAnpsKF01.jpeg",
    alt: "Teras kayu malam hari dengan kursi rotan dan lampu kuning hangat",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20side%20road-onkeKbhbnmXwVYOFy4WkC2vt7K3YOr.jpeg",
    alt: "Dua bangunan Joglo kayu cafe Balyand Lifestyle di tepi jalan Bali tampak depan",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20bar-d2lCgaaM73tChAVz9HAdyAjfWQBCM4.jpeg",
    alt: "Interior bar Kopi Teras Sawah dengan plafon ukir berlapis lampu sorot",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20side%20road%20mini-LQAClsMllgOK0lTdoMBdjQ9iPLam5x.jpeg",
    alt: "Eksterior cafe kayu dengan atap Joglo merah, lantera gantung, dan tanaman hijau",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20tempat%20duduk%20samping-SYirpc8ZLTPbs5rD9L5zJFUArq7LgJ.jpeg",
    alt: "Interior bar counter kayu dengan kursi rotan tinggi menghadap jendela kaca besar",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KTS%20balyand-haaP4Ihs8oNg0t4AqTPEt4WluaRU7D.jpeg",
    alt: "Eksterior teras kayu Balyand Lifestyle dengan tiang, railing, dan tanaman gantung",
    span: "col-span-2 row-span-1",
  },
]

export function ShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { t, locale } = useLanguage()

  const waMessage = encodeURIComponent(
    locale === 'id'
      ? 'Halo Rumah Kayu SC, saya ingin konsultasi tentang bangunan kayu untuk usaha/komersial.'
      : 'Hello Rumah Kayu SC, I would like to consult about a wooden building for commercial use.'
  )

  return (
    <section id="showcase" className="py-12 sm:py-16 lg:py-24 bg-secondary/40" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
          >
            {t.showcase.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance max-w-3xl"
          >
            {t.showcase.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[720px] text-muted-foreground text-sm sm:text-base"
          >
            {t.showcase.description}
          </motion.p>
        </div>

        {/* Photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
              className={`group overflow-hidden rounded-xl sm:rounded-2xl ${photo.span}`}
              style={{ aspectRatio: photo.span.includes("row-span-2") ? "auto" : photo.span.includes("col-span-2") ? "16/7" : "4/3" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                sizes={photo.span.includes("col-span-2") ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: photo.span.includes("row-span-2") ? "100%" : undefined }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Caption + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-muted-foreground italic">
            {t.showcase.project}
          </p>
          <Link
            href={`https://wa.me/6281997826396?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all whitespace-nowrap"
          >
            {t.showcase.cta}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
