import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { LanguageProvider } from "@/lib/language-context"
import {
  baseUrl,
  getLocaleMetadata,
  getSeoSchemas,
  getLocalizedUrl,
} from "@/lib/seo-schemas"
import { getTranslations, isValidLocale, locales, type Locale } from "@/lib/translations"
import "../globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1f1c" },
  ],
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  return getLocaleMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const messages = getTranslations(locale)
  const localizedUrl = getLocalizedUrl(locale)
  const schemas = getSeoSchemas(locale, messages)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="alternate" hrefLang="en" href={getLocalizedUrl("en")} />
        <link rel="alternate" hrefLang="id" href={getLocalizedUrl("id")} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${localizedUrl}#webpage`,
              url: localizedUrl,
              inLanguage: locale,
              name: messages.meta.title,
              description: messages.meta.description,
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <LanguageProvider locale={locale} messages={messages}>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
