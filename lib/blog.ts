import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Locale } from "./translations"

export interface BlogPostMeta {
  title: string
  description: string
  image: string
  imageAlt: string
  readingTime: string
  date: string
  lastModified: string
  author: string
  tags: string[]
  slug: string
  translationSlug?: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
  wordCount: number
}

const blogDirectory = (locale: Locale) =>
  path.join(process.cwd(), "content", "blog", locale)

function countWords(content: string): number {
  return content
    .replace(/---[\s\S]*?---/, "")
    .replace(/[#*`>\-\[\]()!|]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

function parseMeta(data: Record<string, unknown>, filename: string): BlogPostMeta {
  return {
    title: data.title as string,
    description: data.description as string,
    image: data.image as string,
    imageAlt: (data.imageAlt as string) ?? (data.title as string),
    readingTime: data.readingTime as string,
    date: data.date as string,
    lastModified: (data.lastModified as string) ?? (data.date as string),
    author: data.author as string,
    tags: (data.tags as string[]) ?? [],
    slug: (data.slug as string) ?? filename.replace(/\.md$/, ""),
    translationSlug: data.translationSlug as string | undefined,
  }
}

export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  const dir = blogDirectory(locale)

  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)

    return parseMeta(data, filename)
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | null {
  const dir = blogDirectory(locale)

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
        wordCount: countWords(content),
      }
    }
  }

  return null
}

export function getAllBlogSlugs(locale: Locale): string[] {
  const posts = getBlogPosts(locale)
  return posts.map((post) => post.slug)
}
