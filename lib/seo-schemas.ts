import type { Metadata } from "next"
import type { Locale, TranslationType } from "./translations"

export const baseUrl = "https://rumah-kayu-sc.vercel.app"
export const phone = "+6281997826396"

export function getLocalizedUrl(locale: Locale) {
  return `${baseUrl}/${locale}`
}

export function getLocaleMetadata(locale: Locale): Metadata {
  const metadataByLocale = {
    en: {
      title: "Rumah Kayu SC - Professional Wooden House Services",
      description: "Official company profile and services overview for Rumah Kayu SC.",
      ogLocale: "en_US",
      alternateLocale: ["id_ID"],
    },
    id: {
      title: "Rumah Kayu SC - Layanan Profesional Rumah Kayu",
      description: "Profil perusahaan resmi dan ringkasan layanan Rumah Kayu SC.",
      ogLocale: "id_ID",
      alternateLocale: ["en_US"],
    },
  } satisfies Record<
    Locale,
    {
      title: string
      description: string
      ogLocale: string
      alternateLocale: string[]
    }
  >

  const localizedUrl = getLocalizedUrl(locale)
  const metadata = metadataByLocale[locale]

  return {
    metadataBase: new URL(baseUrl),
    title: metadata.title,
    description: metadata.description,
    applicationName: "Rumah Kayu SC",
    authors: [{ name: "Rumah Kayu SC", url: baseUrl }],
    creator: "Rumah Kayu SC",
    publisher: "Rumah Kayu SC",
    category: "Construction",
    classification: "Business",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicons/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicons/favicon.ico",
    },
    manifest: "/favicons/site.webmanifest",
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: getLocalizedUrl("en"),
        id: getLocalizedUrl("id"),
        "x-default": baseUrl,
      },
    },
    openGraph: {
      type: "website",
      url: localizedUrl,
      locale: metadata.ogLocale,
      alternateLocale: metadata.alternateLocale,
      siteName: "Rumah Kayu SC",
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: locale === "id" ? "Profil perusahaan Rumah Kayu SC" : "Rumah Kayu SC company profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/og-image.png"],
    },
  }
}

export function getSeoSchemas(locale: Locale, messages: TranslationType) {
  const localizedUrl = getLocalizedUrl(locale)

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${localizedUrl}#organization`,
    name: "Rumah Kayu SC",
    url: localizedUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/favicons/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://www.instagram.com/rumahkayu.sc?igsh=YjN5OWQ3bGpseGFy",
      "https://www.threads.com/@rumahkayu.sc",
      "https://www.tiktok.com/@rumahkayu.sc?_r=1&_t=ZS-94VxKvXFImo",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${localizedUrl}#local-business`,
    name: "Rumah Kayu SC",
    alternateName: "Rumah Kayu Tabanan",
    description: messages.meta.description,
    url: localizedUrl,
    telephone: phone,
    image: [`${baseUrl}/og-image.png`, `${baseUrl}/images/joglo.jpg`, `${baseUrl}/images/limasan.jpg`],
    logo: `${baseUrl}/favicons/android-chrome-512x512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tabanan",
      addressLocality: "Tabanan",
      addressRegion: "Bali",
      postalCode: "82115",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-8.5375",
      longitude: "115.1249",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: organizationSchema.sameAs,
  }

  return [organizationSchema, localBusinessSchema]
}
