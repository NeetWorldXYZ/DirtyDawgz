import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustTicker } from "@/components/trust-ticker"
import { ServicesSection } from "@/components/services-section"
import { WhyUsSection } from "@/components/why-us-section"
import { HowItWorks } from "@/components/how-it-works"
import { RecurringSection } from "@/components/recurring-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ServiceAreaSection } from "@/components/service-area-section"
import { CtaBanner } from "@/components/cta-banner"
import { QuoteSection } from "@/components/quote-section"
import { SiteFooter } from "@/components/site-footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <TrustTicker />
      <ServicesSection />
      {/* ProofSection (before/after slider) is parked until real job photos
          land in lib/site.ts — re-add it here to bring the section back. */}
      <WhyUsSection />
      <HowItWorks />
      <RecurringSection />
      <ReviewsSection />
      <ServiceAreaSection />
      <CtaBanner />
      <QuoteSection />
      <SiteFooter />
      <MobileCtaBar />
    </main>
  )
}
