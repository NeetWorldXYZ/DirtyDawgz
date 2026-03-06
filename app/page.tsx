import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ServiceAreaSection } from "@/components/service-area-section"
import { CtaBanner } from "@/components/cta-banner"
import { QuoteSection } from "@/components/quote-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ServiceAreaSection />
      <CtaBanner />
      <QuoteSection />
      <SiteFooter />
    </main>
  )
}
