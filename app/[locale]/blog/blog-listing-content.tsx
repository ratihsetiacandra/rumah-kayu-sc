"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import { useLanguage } from "@/lib/language-context"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogListingContentProps {
  posts: BlogPostMeta[]
  locale: string
}

export function BlogListingContent({ posts, locale }: BlogListingContentProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 lg:py-24" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1180px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
        >
          {t.blog.title}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl lg:text-[3.6rem] font-bold leading-[1.1] lg:leading-[1.05] text-foreground mb-3 sm:mb-4 text-balance"
        >
          {t.blog.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[760px] text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12"
        >
          {t.blog.subtitle}
        </motion.p>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                locale={locale}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-center py-16"
          >
            {t.blog.noPosts}
          </motion.p>
        )}
      </div>
    </section>
  )
}
