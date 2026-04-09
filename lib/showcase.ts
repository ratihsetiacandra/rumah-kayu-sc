import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Locale } from "./translations"

export interface ShowcaseImage {
  src: string
  alt: string
  span: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ShowcaseMeta {
  title: string
  slug: string
  description: string
  primaryImage: string
  primaryImageAlt: string
  date: string
  tags: string[]
  category: string
  ctaMessage: string
  translationSlug?: string
  images: ShowcaseImage[]
  // GEO/SEO fields
  lastModified?: string
  author?: string
  authorCredentials?: string
  featured?: boolean
  location?: string
  // FAQ and rating for structured data
  faq?: FAQItem[]
  aggregateRating?: {
    ratingValue: number
    bestRating: number
    reviewCount: number
  }
}

export interface Showcase extends ShowcaseMeta {
  content: string
}

const showcaseDirectory = (locale: Locale) =>
  path.join(process.cwd(), "content", "showcases", locale)

function parseMeta(data: Record<string, unknown>, filename: string): ShowcaseMeta {
  return {
    title: data.title as string,
    slug: (data.slug as string) ?? filename.replace(/\.md$/, ""),
    description: data.description as string,
    primaryImage: data.primaryImage as string,
    primaryImageAlt: (data.primaryImageAlt as string) ?? (data.title as string),
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    category: (data.category as string) ?? "",
    ctaMessage: (data.ctaMessage as string) ?? "",
    translationSlug: data.translationSlug as string | undefined,
    images: (data.images as ShowcaseImage[]) ?? [],
    lastModified: data.lastModified as string | undefined,
    author: data.author as string | undefined,
    authorCredentials: data.authorCredentials as string | undefined,
    featured: data.featured as boolean | undefined,
    location: data.location as string | undefined,
    faq: (data.faq as FAQItem[]) ?? undefined,
    aggregateRating: data.aggregateRating as ShowcaseMeta["aggregateRating"] | undefined,
  }
}

export function getShowcases(locale: Locale): ShowcaseMeta[] {
  const dir = showcaseDirectory(locale)

  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const showcases = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)

    return parseMeta(data, filename)
  })

  return showcases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getShowcase(locale: Locale, slug: string): Showcase | null {
  const dir = showcaseDirectory(locale)

  if (!fs.existsSync(dir)) return null

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  for (const filename of files) {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    const fileSlug = (data.slug as string) ?? filename.replace(/\.md$/, "")

    if (fileSlug === slug) {
      return {
        ...parseMeta(data, filename),
        content,
      }
    }
  }

  return null
}

export function getAllShowcaseSlugs(locale: Locale): string[] {
  const showcases = getShowcases(locale)
  return showcases.map((s) => s.slug)
}
