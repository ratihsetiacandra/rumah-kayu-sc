"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPostMeta
  locale: string
  index: number
  isInView: boolean
}

export function BlogCard({ post, locale, index, isInView }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="block bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-xl transition-shadow hover:shadow-2xl"
      >
        <div className="h-[200px] sm:h-[220px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-wood-dark text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
