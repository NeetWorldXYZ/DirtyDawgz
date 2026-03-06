import Link from "next/link"
import { ArrowLeft, Phone, CheckCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

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
}

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
}: ServicePageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href="/#services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </Link>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <Icon className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{subtitle}</span>
              </div>
              <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary-foreground/70">
                {heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/#quote">Request a Free Quote</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="tel:2692481209">
                    <Phone className="mr-2 h-4 w-4" />
                    (269) 248-1209
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why It's Important */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Why It Matters
              </p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                {whyTitle}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whyPoints.map((point) => (
                <div
                  key={point.heading}
                  className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-card-foreground">
                    {point.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Often */}
        <section className="bg-muted py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Recommended Schedule
              </p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                {frequencyTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {frequencyDescription}
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {frequencyItems.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-oswald)] font-bold uppercase tracking-tight text-card-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Guarantee */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                The Dirty Dawgz Promise
              </p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-primary-foreground md:text-4xl">
                Our Guarantee
              </h2>
              <ul className="mt-8 flex flex-col gap-4 text-left">
                {guarantee.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-secondary-foreground/10 bg-secondary-foreground/5 px-6 py-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-secondary-foreground/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/#quote">Get Your Free Quote</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="tel:2692481209">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
