import Link from "next/link"
import { ArrowLeft, Phone, CheckCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"
import { Reveal } from "@/components/motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site"

interface FaqItem {
  question: string
  answer: string
}

interface ServicePageProps {
  title: string
  subtitle: string
  heroDescription: string
  icon: LucideIcon
  whyTitle: string
  whyPoints: { heading: string; text: string }[]
  frequencyTitle: string
  frequencyDescription: string
  frequencyItems: { label: string; detail: string }[]
  guarantee: string[]
  /** Ordered walkthrough of what a service visit includes */
  process?: { step: string; detail: string }[]
  processTitle?: string
  faq?: FaqItem[]
  /** Schema.org service name, e.g. "Commercial Hood Cleaning" */
  schemaServiceName: string
  schemaDescription: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dirtydawgzovencleaning.com"

export function ServicePageLayout({
  title,
  subtitle,
  heroDescription,
  icon: Icon,
  whyTitle,
  whyPoints,
  frequencyTitle,
  frequencyDescription,
  frequencyItems,
  guarantee,
  process,
  processTitle,
  faq,
  schemaServiceName,
  schemaDescription,
}: ServicePageProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: schemaServiceName,
    description: schemaDescription,
    areaServed: { "@type": "State", name: "Michigan" },
    provider: {
      "@type": "LocalBusiness",
      name: "Dirty Dawgz Oven Cleaning",
      telephone: "+1-269-248-1209",
      url: siteUrl,
    },
  }

  const faqSchema = faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="dd-stripes relative overflow-hidden bg-[#141414] py-16 lg:py-24">
          <div className="dd-ember absolute -top-24 right-[-8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(196,30,42,0.2)_0%,_transparent_65%)]" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href="/#services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </Link>
            <div className="flex max-w-4xl flex-col items-start text-left">
              <p className="dd-hero-enter mb-4 inline-flex items-center border border-primary/40 bg-primary/10 px-4 py-1.5">
                <Icon className="mr-2 h-4 w-4 text-primary" />
                <span className="font-[family-name:var(--font-oswald)] text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {subtitle}
                </span>
              </p>
              <h1
                className="dd-hero-enter font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-[0.98] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl"
                style={{ animationDelay: "0.1s" }}
              >
                {title}
              </h1>
              <p
                className="dd-hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70"
                style={{ animationDelay: "0.2s" }}
              >
                {heroDescription}
              </p>
              <div
                className="dd-hero-enter mt-8 flex flex-col gap-4 sm:flex-row"
                style={{ animationDelay: "0.3s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="dd-sheen bg-primary px-8 font-[family-name:var(--font-oswald)] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/#quote">Request a Free Quote</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent px-8 font-[family-name:var(--font-oswald)] uppercase tracking-wider text-primary-foreground hover:border-primary hover:bg-primary/10 hover:text-primary-foreground"
                >
                  <Link href={PHONE_TEL}>
                    <Phone className="mr-2 h-4 w-4 text-primary" />
                    {PHONE_DISPLAY}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why It's Important */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Reveal className="mb-14 max-w-3xl">
              <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Why It Matters
              </p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                {whyTitle}
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyPoints.map((point, i) => (
                <Reveal
                  key={point.heading}
                  delay={(i % 3) * 100}
                  className="border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-card-foreground">
                    {point.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included / Process */}
        {process?.length ? (
          <section className="border-y border-white/10 bg-[#0e0e0e] py-20 text-secondary-foreground lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <Reveal className="mb-14 max-w-3xl">
                <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  What&apos;s Included
                </p>
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  {processTitle || "Every Service, Step by Step"}
                </h2>
              </Reveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {process.map((item, i) => (
                  <Reveal key={item.step} delay={i * 110}>
                    <span className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-3 h-0.5 w-10 bg-primary" />
                    <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-white">
                      {item.step}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{item.detail}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* How Often */}
        <section className="bg-muted py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Reveal className="mb-14 max-w-3xl">
              <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Recommended Schedule
              </p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                {frequencyTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {frequencyDescription}
              </p>
            </Reveal>
            <div className="grid max-w-5xl gap-6 md:grid-cols-2">
              {frequencyItems.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={(i % 2) * 100}
                  className="flex gap-4 border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-primary/25 bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-tight text-card-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faq?.length ? (
          <section className="bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-4xl px-4 lg:px-8">
              <Reveal className="mb-10">
                <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Common Questions
                </p>
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                  Frequently Asked Questions
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="text-left font-[family-name:var(--font-oswald)] text-base font-bold uppercase tracking-tight">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* Our Guarantee */}
        <section className="dd-stripes bg-[#141414] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  The Dirty Dawgz Promise
                </p>
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-primary-foreground md:text-4xl">
                  Our Guarantee
                </h2>
              </Reveal>
              <ul className="mt-8 flex flex-col gap-4 text-left">
                {guarantee.map((item, i) => (
                  <Reveal
                    key={item}
                    as="li"
                    delay={i * 80}
                    className="flex items-start gap-3 border border-white/10 bg-white/[0.04] px-6 py-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-secondary-foreground/80">{item}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={150} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="dd-sheen bg-primary px-8 font-[family-name:var(--font-oswald)] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/#quote">Get Your Free Quote</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent px-8 font-[family-name:var(--font-oswald)] uppercase tracking-wider text-primary-foreground hover:border-primary hover:bg-primary/10 hover:text-primary-foreground"
                >
                  <Link href={PHONE_TEL}>
                    <Phone className="mr-2 h-4 w-4 text-primary" />
                    Call Us Now
                  </Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}
