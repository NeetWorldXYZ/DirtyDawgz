import Link from "next/link"
import { Flame, Wind, Droplets, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion"

const services = [
  {
    number: "01",
    icon: Flame,
    title: "Commercial Oven Cleaning",
    href: "/ovencleaning",
    tagline: "Conveyor • Pizza • Deck Ovens",
    description:
      "Deep cleaning for conveyor ovens, pizza ovens, deck ovens, and commercial cooking equipment. We strip away every layer of baked-on grease and carbon and bring your oven back to factory-clean condition.",
    features: [
      "Complete disassembly and deep cleaning",
      "Carbon and grease removal",
      "Conveyor belt and chamber detailing",
      "Improved cook quality and efficiency",
    ],
    cta: "Explore Oven Cleaning",
  },
  {
    number: "02",
    icon: Wind,
    title: "Hood & Exhaust Cleaning",
    href: "/hoodcleaning",
    tagline: "Hoods • Ducts • Rooftop Fans",
    description:
      "Complete commercial kitchen exhaust cleaning to NFPA 96 standards — hoods, filters, plenums, ductwork, and rooftop exhaust fans. Your first line of defense against grease fires, fully documented.",
    features: [
      "Hood-to-rooftop system cleaning",
      "NFPA 96 compliance & certificate",
      "Filter degreasing and restoration",
      "Before & after photo documentation",
    ],
    cta: "Explore Hood Cleaning",
  },
  {
    number: "03",
    icon: Droplets,
    title: "Grease Trap Cleaning",
    href: "/greasetrapcleaning",
    tagline: "Pump-Outs • Scraping • Compliance",
    description:
      "Scheduled grease trap cleaning built for restaurants and commercial kitchens. Full pump-outs, wall and baffle scraping, and compliant disposal — with service records for every visit.",
    features: [
      "Full pump-out and disposal",
      "Wall and baffle scraping",
      "Health code compliance records",
      "Recurring schedules available",
    ],
    cta: "Explore Grease Trap Cleaning",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-10 max-w-3xl sm:mb-16">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl text-foreground md:text-5xl">
            Three Dirty Jobs. <span className="text-primary">One Specialty.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Ovens, hood systems, and grease traps — the greasiest equipment in a commercial
            kitchen is all we do. Businesses across Michigan trust the Dawgz to keep their
            kitchens safe, efficient, and code-compliant.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 120} className="h-full">
              <Link
                href={service.href}
                className="group flex h-full flex-col items-center border border-border bg-[#161616] p-6 text-center text-secondary-foreground transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 sm:items-stretch sm:p-8 sm:text-left"
              >
                <div className="flex w-full items-start justify-center sm:justify-between">
                  <span className="hidden font-[family-name:var(--font-oswald)] text-5xl font-bold text-white/10 transition-colors duration-300 group-hover:text-primary/40 sm:inline">
                    {service.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase leading-tight tracking-tight text-white sm:mt-6 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-oswald)] text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {service.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>

                <ul className="mt-6 hidden flex-col gap-2 border-t border-white/10 pt-5 sm:flex">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-2 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {service.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
