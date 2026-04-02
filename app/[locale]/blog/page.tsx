import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPosts } from "@/lib/blog"
import { baseUrl, getLocalizedUrl } from "@/lib/seo-schemas"
import { getTranslations, isValidLocale, locales, type Locale } from "@/lib/translations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"
import { BlogListingContent } from "./blog-listing-content"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) return {}

  const messages = getTranslations(locale)
  const title =
    locale === "id"
      ? "Blog | Rumah Kayu SC - Artikel Rumah Kayu Tradisional"
      : "Blog | Rumah Kayu SC - Traditional Wooden House Articles"
  const description =
    locale === "id"
      ? "Baca artikel terbaru tentang rumah kayu tradisional Jawa, tips memilih material, dan inspirasi desain dari Rumah Kayu SC."
      : "Read the latest articles about traditional Javanese wooden houses, material selection tips, and design inspiration from Rumah Kayu SC."

  const blogUrl = `${baseUrl}/${locale}/blog`

  return {
    title,
    description,
    alternates: {
      canonical: blogUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        id: `${baseUrl}/id/blog`,
        "x-default": `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      type: "website",
      url: blogUrl,
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: "Rumah Kayu SC",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "id"
              ? "Rumah Kayu SC - Blog Rumah Kayu Tradisional"
              : "Rumah Kayu SC - Traditional Wooden House Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const messages = getTranslations(locale)
  const posts = getBlogPosts(locale)

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "id" ? "Blog Rumah Kayu SC" : "Rumah Kayu SC Blog",
    url: `${baseUrl}/${locale}/blog`,
    inLanguage: locale,
    description:
      locale === "id"
        ? "Artikel tentang rumah kayu tradisional Jawa"
        : "Articles about traditional Javanese wooden houses",
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
    })),
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
    ],
  }

  return (
    <LanguageProvider locale={locale} messages={messages}>
      <Header />
      <main>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={locale === "id" ? "RSS Feed - Rumah Kayu SC Blog" : "RSS Feed - Rumah Kayu SC Blog"}
          href={`/${locale}/blog/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([collectionSchema, breadcrumbSchema]),
          }}
        />
        <BlogListingContent posts={posts} locale={locale} />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
