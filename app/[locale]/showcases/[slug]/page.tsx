import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { getShowcase, getAllShowcaseSlugs } from "@/lib/showcase"
import { baseUrl } from "@/lib/seo-schemas"
import { getTranslations, isValidLocale, locales, getAlternateLocale } from "@/lib/translations"
import { mdxComponents } from "@/components/mdx-components"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"
import { ShowcaseDetailContent } from "./showcase-detail-content"

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const slugs = getAllShowcaseSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/showcases/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) return {}

  const showcase = getShowcase(locale, slug)
  if (!showcase) return {}

  const showcaseUrl = `${baseUrl}/${locale}/showcases/${showcase.slug}`

  const alternateLanguages: Record<string, string> = {}
  if (showcase.translationSlug) {
    const altLocale = getAlternateLocale(locale)
    alternateLanguages[locale] = showcaseUrl
    alternateLanguages[altLocale] = `${baseUrl}/${altLocale}/showcases/${showcase.translationSlug}`
  }

  return {
    title: `${showcase.title} | Rumah Kayu SC`,
    description: showcase.description,
    alternates: {
      canonical: showcaseUrl,
      ...(showcase.translationSlug ? { languages: alternateLanguages } : {}),
    },
    openGraph: {
      type: "article",
      url: showcaseUrl,
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: "Rumah Kayu SC",
      title: showcase.title,
      description: showcase.description,
      tags: showcase.tags,
      images: [
        {
          url: showcase.primaryImage,
          width: 1200,
          height: 630,
          alt: showcase.primaryImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: showcase.title,
      description: showcase.description,
      images: [showcase.primaryImage],
    },
  }
}

export default async function ShowcaseDetailPage({
  params,
}: PageProps<"/[locale]/showcases/[slug]">) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) notFound()

  const showcase = getShowcase(locale, slug)
  if (!showcase) notFound()

  const messages = getTranslations(locale)

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
        name: locale === "id" ? "Contoh Bangunan" : "Showcases",
        item: `${baseUrl}/${locale}#showcases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: showcase.title,
        item: `${baseUrl}/${locale}/showcases/${showcase.slug}`,
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
            __html: JSON.stringify([breadcrumbSchema]),
          }}
        />
        <ShowcaseDetailContent showcase={showcase} locale={locale}>
          <MDXRemote
            source={showcase.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </ShowcaseDetailContent>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
