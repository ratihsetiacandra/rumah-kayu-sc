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
      title: "Rumah Kayu SC | Traditional Javanese Wooden House Specialist in Bali",
      description: "Premium Joglo, Limasan & Gladak wooden houses handcrafted in Tabanan, Bali. Traditional Javanese architecture with elegant modern finishing for homes, villas & commercial spaces.",
      ogLocale: "en_US",
      alternateLocale: ["id_ID"],
    },
    id: {
      title: "Rumah Kayu SC | Spesialis Rumah Kayu Jawa Tradisional di Bali",
      description: "Rumah kayu Joglo, Limasan & Gladak premium buatan tangan di Tabanan, Bali. Arsitektur Jawa tradisional dengan finishing modern elegan untuk hunian, villa & ruang komersial.",
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
        "x-default": getLocalizedUrl("en"),
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
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: locale === "id" ? "Rumah Kayu SC - Spesialis rumah kayu Joglo, Limasan, Gladak di Bali" : "Rumah Kayu SC - Joglo, Limasan, Gladak wooden house specialist in Bali",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/og-image.jpg"],
    },
  }
}

export function getSeoSchemas(locale: Locale, messages: TranslationType) {
  const localizedUrl = getLocalizedUrl(locale)

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: "Rumah Kayu SC",
    url: baseUrl,
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
      "https://www.instagram.com/rumahkayu.sc",
      "https://www.threads.com/@rumahkayu.sc",
      "https://www.tiktok.com/@rumahkayu.sc",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseUrl}#local-business`,
    name: "Rumah Kayu SC",
    alternateName: ["Rumah Kayu Tabanan", "Rumah Kayu SC Bali"],
    description: messages.meta.description,
    url: localizedUrl,
    telephone: phone,
    image: [`${baseUrl}/og-image.jpg`, `${baseUrl}/images/joglo.jpg`, `${baseUrl}/images/limasan.jpg`],
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
      latitude: -8.5375,
      longitude: 115.1249,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Bali",
      },
      {
        "@type": "Country",
        name: "Indonesia",
      },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: organizationSchema.sameAs,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "id" ? "Beranda" : "Home",
        item: localizedUrl,
      },
    ],
  }

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${localizedUrl}#service-joglo`,
      name: locale === "id" ? "Rumah Kayu Joglo" : "Joglo Wooden House",
      description: locale === "id"
        ? "Rumah kayu Joglo tradisional Jawa dengan detail ukiran premium dan kesan megah."
        : "Traditional Javanese Joglo wooden house with premium carved details and majestic impression.",
      provider: { "@id": `${baseUrl}#local-business` },
      areaServed: { "@type": "Country", name: "Indonesia" },
      image: `${baseUrl}/images/joglo.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${localizedUrl}#service-limasan`,
      name: locale === "id" ? "Rumah Kayu Limasan" : "Limasan Wooden House",
      description: locale === "id"
        ? "Rumah kayu Limasan dengan proporsi atap indah dan nuansa elegan yang tenang."
        : "Limasan wooden house with beautiful roof proportions and calm elegant ambiance.",
      provider: { "@id": `${baseUrl}#local-business` },
      areaServed: { "@type": "Country", name: "Indonesia" },
      image: `${baseUrl}/images/limasan.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${localizedUrl}#service-gladak`,
      name: locale === "id" ? "Rumah Kayu Gladak" : "Gladak Wooden House",
      description: locale === "id"
        ? "Rumah kayu Gladak sederhana, hangat, dan penuh karakter natural untuk ruang relaksasi."
        : "Simple, warm Gladak wooden house full of natural character for relaxation spaces.",
      provider: { "@id": `${baseUrl}#local-business` },
      areaServed: { "@type": "Country", name: "Indonesia" },
      image: `${baseUrl}/images/gladak.jpg`,
    },
  ]

  return [organizationSchema, localBusinessSchema, breadcrumbSchema, ...serviceSchemas]
}
