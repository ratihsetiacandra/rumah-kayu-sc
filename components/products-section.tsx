"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"

const productImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joglo%20kamar-2dn0Qk10etbaZIW2s2KzFkXKT7jsUu.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/limasan-NtIPoOiR3S5dFkLTIDtcIdWkdti7G5.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gladak-9vWz15vdjkWm74OyiDMYvAdeZIn33e.jpeg",
]

const productAlts = [
  "Rumah Joglo - rumah kayu tradisional Jawa dengan atap piramida bertingkat",
  "Rumah Limasan - rumah kayu tradisional Jawa dengan tampilan malam yang elegan",
  "Rumah Gladak - rumah kayu tradisional Jawa dengan tiang ukiran dan beranda",
]

export function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const productKeys: Array<'joglo' | 'limasan' | 'gladak'> = ['joglo', 'limasan', 'gladak']

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-24" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
        >
          {t.products.badge}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance"
        >
          {t.products.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[760px] text-muted-foreground text-sm sm:text-base"
        >
          {t.products.description}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {t.products.items.map((product, index) => {
            const waMessage = encodeURIComponent(t.whatsappMessages[productKeys[index]])
            
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl transition-shadow hover:shadow-2xl"
              >
                <div className="h-[200px] sm:h-[240px] lg:h-[260px] overflow-hidden">
                  <Image
                    src={productImages[index]}
                    alt={productAlts[index]}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6 lg:p-7">
                  <span className="inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-secondary text-wood-dark text-xs sm:text-sm font-semibold">
                    {product.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-3 mb-2 sm:mb-3">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                    {product.description}
                  </p>
                  <Link
                    href={`https://wa.me/6281997826396?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-card text-foreground border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    {t.products.askButton} {product.title}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
