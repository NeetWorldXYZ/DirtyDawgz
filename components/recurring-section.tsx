import { Gauge, Camera, CreditCard, CalendarCheck, KeyRound, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"
import { PORTAL_URL } from "@/lib/site"

const portalFeatures = [
  {
    icon: Gauge,
    title: "Equipment Health Dials",
    text: "Every oven, hood, and grease trap gets a meter that reads 100% the day we finish cleaning and drains toward zero as service comes due. You see exactly where every kitchen stands.",
  },
  {
    icon: Camera,
    title: "Before & After Reports",
    text: "Every finished visit posts a service report with before/after photos to your portal — a permanent record for you, your insurance company, and your inspectors.",
  },
  {
    icon: CreditCard,
    title: "Approve Quotes & Pay Online",
    text: "E-sign quotes right from your phone, pay invoices by card, and download PDFs of everything. No paperwork chase, no phone tag.",
  },
  {
    icon: CalendarCheck,
    title: "One-Click Booking",
    text: "When equipment comes due, book the visit from your portal. Services at the same kitchen get bundled into one crew, one window, one total.",
  },
]

export function RecurringSection() {
  return (
    <section className="bg-muted py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Recurring Service + Customer Portal
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-5xl">
            Clean It Once. <span className="text-primary">Then Let Us Remember the Rest.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Most kitchens don&apos;t fail inspections because nobody cares — they fail because
            nobody remembered. Put your equipment on a Dirty Dawgz service plan and we track
            every schedule and contact you when you&apos;re due. And unlike anyone else in this
            business, we give you the software to see it all: every Dirty Dawgz customer gets
            a personal portal.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6">
          {portalFeatures.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 2) * 110}>
              <div className="flex h-full min-h-28 flex-col items-center justify-center gap-2.5 border border-border bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:min-h-0 sm:flex-row sm:items-start sm:justify-start sm:gap-5 sm:p-7 sm:text-left">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-primary/25 bg-primary/10 sm:h-12 sm:w-12">
                  <feature.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-oswald)] text-xs font-bold uppercase tracking-tight text-card-foreground sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:block">{feature.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="dd-sheen bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
          >
            <a href="/#quote">Build My Service Plan</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-foreground/20 bg-transparent px-10 py-6 font-[family-name:var(--font-oswald)] text-lg uppercase tracking-wider text-foreground hover:border-primary hover:bg-primary/10 hover:text-foreground"
          >
            <a href={PORTAL_URL}>
              <KeyRound className="mr-2 h-5 w-5 text-primary" />
              Customer Login
            </a>
          </Button>
          <p className="text-sm text-muted-foreground sm:ml-2">
            No passwords — enter your billing email and your portal link is sent to you.
            <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
          </p>
        </Reveal>

        <Reveal delay={250} className="mt-8">
          <p className="max-w-2xl text-base italic leading-relaxed text-muted-foreground">
            Booking a hood cleaning shouldn&apos;t be harder than booking a haircut.{" "}
            <span className="font-medium not-italic text-foreground">
              For our customers, it isn&apos;t.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
