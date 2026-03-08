import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog"
import { baseUrl } from "@/lib/seo-schemas"
import { getTranslations, isValidLocale, locales, type Locale } from "@/lib/translations"
import { mdxComponents } from "@/components/mdx-components"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"
import { BlogPostContent } from "./blog-post-content"

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const slugs = getAllBlogSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) return {}

  const post = getBlogPost(locale, slug)
  if (!post) return {}

  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`

  return {
    title: `${post.title} | Rumah Kayu SC`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        id: `${baseUrl}/id/blog`,
      },
    },
    openGraph: {
      type: "article",
      url: postUrl,
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: "Rumah Kayu SC",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) notFound()

  const post = getBlogPost(locale, slug)
  if (!post) notFound()

  const messages = getTranslations(locale)

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${baseUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Rumah Kayu SC",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicons/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${post.slug}`,
    },
    inLanguage: locale,
    keywords: post.tags.join(", "),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/${locale}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <LanguageProvider locale={locale} messages={messages}>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([blogPostingSchema, breadcrumbSchema]),
          }}
        />
        <BlogPostContent post={post} locale={locale}>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </BlogPostContent>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
