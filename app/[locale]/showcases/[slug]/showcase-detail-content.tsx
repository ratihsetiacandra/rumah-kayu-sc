"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, X, Plus, Minus, HelpCircle } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Collapsible from "@radix-ui/react-collapsible"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import { useLanguage } from "@/lib/language-context"
import type { Showcase } from "@/lib/showcase"

interface ShowcaseDetailContentProps {
  showcase: Showcase
  locale: string
  children: React.ReactNode
}

// FAQ answer components (lightweight version for FAQ content)
const faqComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-outside pl-5 mb-3 space-y-1.5 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-outside pl-5 mb-3 space-y-1.5 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-secondary rounded px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  ),
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    // Serialize the markdown answer when component mounts
    serialize(answer, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }).then(setMdxSource)
  }, [answer])

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="border-b border-wood/20 last:border-b-0">
      <Collapsible.Trigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
        >
          <span className="font-medium text-foreground group-hover:text-wood-dark transition-colors pr-4">
            {question}
          </span>
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-wood/20 transition-colors">
            {isOpen ? (
              <Minus className="w-4 h-4 text-wood-dark" />
            ) : (
              <Plus className="w-4 h-4 text-wood-dark" />
            )}
          </span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-5 px-1">
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={faqComponents} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{answer}</p>
            )}
          </div>
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function FAQSection({ faq, locale }: { faq: { question: string; answer: string }[]; locale: string }) {
  const title = locale === "id" ? "Pertanyaan Umum" : "Frequently Asked Questions"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="max-w-[760px] mx-auto mb-10"
    >
      <div className="bg-secondary/50 rounded-2xl p-6 sm:p-8 border border-wood/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-wood-dark flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-wood-dark">
            {title}
          </h2>
        </div>
        <div className="divide-y divide-wood/10">
          {faq.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ShowcaseDetailContent({ showcase, locale, children }: ShowcaseDetailContentProps) {
  const { t } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const waMessage = encodeURIComponent(showcase.ctaMessage)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % showcase.images.length : null
    )
  }, [showcase.images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + showcase.images.length) % showcase.images.length : null
    )
  }, [showcase.images.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "Escape") closeLightbox()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, goNext, goPrev])

  const currentImage = lightboxIndex !== null ? showcase.images[lightboxIndex] : null

  return (
    <article className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-[1180px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}#showcases`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.showcases.backToShowcases}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {showcase.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-wood-dark text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
            {showcase.title}
          </h1>

          <p className="max-w-[760px] text-muted-foreground text-sm sm:text-base">
            {showcase.description}
          </p>
        </motion.div>

        {/* Photo masonry grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8"
        >
          {showcase.images.map((photo, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className={`group overflow-hidden rounded-xl sm:rounded-2xl cursor-zoom-in ${photo.span}`}
              style={{
                aspectRatio: photo.span.includes("row-span-2")
                  ? "auto"
                  : photo.span.includes("col-span-2")
                    ? "16/7"
                    : "4/3",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={900}
                sizes={
                  photo.span.includes("col-span-2")
                    ? "(max-width: 640px) 100vw, 66vw"
                    : "(max-width: 640px) 50vw, 33vw"
                }
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  minHeight: photo.span.includes("row-span-2") ? "100%" : undefined,
                }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Markdown content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-[760px] mx-auto prose-custom mb-10"
        >
          {children}
        </motion.div>

        {/* FAQ Section */}
        {showcase.faq && showcase.faq.length > 0 && (
          <FAQSection faq={showcase.faq} locale={locale} />
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: showcase.faq ? 0.65 : 0.6 }}
          className="flex justify-center"
        >
          <Link
            href={`https://wa.me/6281997826396?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            {t.showcases.cta}
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center outline-none"
          >
            <Dialog.Title className="sr-only">
              {currentImage?.alt ?? "Image lightbox"}
            </Dialog.Title>
            <AnimatePresence mode="wait">
              {currentImage && (
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center p-4 sm:p-10"
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={1600}
                    height={1200}
                    sizes="100vw"
                    className="max-w-full max-h-full object-contain rounded-lg select-none"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alt text caption */}
            {currentImage && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-lg px-4 py-2 bg-black/60 rounded-full text-white/80 text-xs sm:text-sm text-center truncate">
                {currentImage.alt}
                <span className="ml-2 text-white/50">
                  {(lightboxIndex ?? 0) + 1} / {showcase.images.length}
                </span>
              </div>
            )}

            {/* Close button */}
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            {/* Prev button */}
            {showcase.images.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next button */}
            {showcase.images.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  )
}
