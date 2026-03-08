import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Locale } from "./translations"

export interface BlogPostMeta {
  title: string
  description: string
  image: string
  readingTime: string
  date: string
  author: string
  tags: string[]
  slug: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

const blogDirectory = (locale: Locale) =>
  path.join(process.cwd(), "content", "blog", locale)

export function getBlogPosts(locale: Locale): BlogPostMeta[] {
  const dir = blogDirectory(locale)

  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)

    return {
      title: data.title,
      description: data.description,
      image: data.image,
      readingTime: data.readingTime,
      date: data.date,
      author: data.author,
      tags: data.tags ?? [],
      slug: data.slug ?? filename.replace(/\.md$/, ""),
    } satisfies BlogPostMeta
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

    const fileSlug = data.slug ?? filename.replace(/\.md$/, "")

    if (fileSlug === slug) {
      return {
        title: data.title,
        description: data.description,
        image: data.image,
        readingTime: data.readingTime,
        date: data.date,
        author: data.author,
        tags: data.tags ?? [],
        slug: fileSlug,
        content,
      }
    }
  }

  return null
}

export function getAllBlogSlugs(locale: Locale): string[] {
  const posts = getBlogPosts(locale)
  return posts.map((post) => post.slug)
}
