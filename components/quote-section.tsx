import { Phone, Mail } from "lucide-react"
import { QuoteForm } from "@/components/quote-form"

export function QuoteSection() {
  return (
    <section id="quote" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Get Started
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Request a Free Quote
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Tell us about your cleaning needs and we will put together a custom quote for your
            business. No obligation, no hassle.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm lg:p-8">
              <QuoteForm />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-card-foreground">
                Contact Us Directly
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:2692481209"
                  className="flex items-center gap-3 text-sm text-card-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">(269) 248-1209</p>
                    <p className="text-xs text-muted-foreground">Call or text us anytime</p>
                  </div>
                </a>
                <a
                  href="mailto:info@dirtydawgzovencleaning.com"
                  className="flex items-center gap-3 text-sm text-card-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium break-all">info@dirtydawgzovencleaning.com</p>
                    <p className="text-xs text-muted-foreground">Email us your questions</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary p-6 text-secondary-foreground">
              <h3 className="mb-3 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-primary-foreground">
                Why Request a Quote?
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "100% free, no-obligation estimates",
                  "Custom pricing for your specific needs",
                  "Fast response within 24 hours",
                  "Flexible scheduling options",
                  "Bundled service discounts available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
