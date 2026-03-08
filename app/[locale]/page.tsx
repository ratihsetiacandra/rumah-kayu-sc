import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductsSection } from "@/components/products-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { ShowcaseJogloSection } from "@/components/showcase-joglo-section"
import { ValueSection } from "@/components/value-section"
import { LocationSection } from "@/components/location-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { isValidLocale } from "@/lib/translations"
import { notFound } from "next/navigation"

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ProductsSection />
      <ShowcaseSection />
      <ShowcaseJogloSection />
      <ValueSection />
      <LocationSection />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
