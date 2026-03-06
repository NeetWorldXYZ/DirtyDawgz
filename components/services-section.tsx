import Link from "next/link"
import { Flame, Wind, Droplets, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Flame,
    title: "Commercial Conveyor Oven Cleaning",
    href: "/ovencleaning",
    description:
      "Conveyor ovens run non-stop, and built-up grease and carbon can slow production, create fire hazards, and affect food quality. Our deep-clean process strips away every layer of baked-on residue, restoring your oven to peak performance. We work around your schedule to minimize downtime and get you back to full operation fast.",
    features: [
      "Complete disassembly and deep cleaning",
      "Carbon and grease buildup removal",
      "Conveyor belt and chamber detailing",
      "Fire hazard reduction",
      "Improved energy efficiency",
    ],
  },
  {
    icon: Droplets,
    title: "Grease Trap Cleaning",
    href: "/greasetrapcleaning",
    description:
      "A neglected grease trap is a ticking time bomb for your kitchen. Overflows, foul odors, and health code violations are just the beginning. Our thorough grease trap cleaning service pumps, scrapes, and restores your trap to full capacity, keeping you compliant and your kitchen running smoothly.",
    features: [
      "Full pump-out and disposal",
      "Wall and baffle scraping",
      "Flow testing and inspection",
      "Health code compliance",
      "Odor elimination",
    ],
  },
  {
    icon: Wind,
    title: "Hood Vent Cleaning",
    href: "/hoodcleaning",
    description:
      "Your hood vent system is your kitchen's first line of defense against grease fires. Over time, grease accumulates in filters, ductwork, and fans, creating a serious safety risk. Our certified technicians clean every component from hood to rooftop, ensuring your system meets NFPA 96 standards and protects your business.",
    features: [
      "Complete hood-to-fan cleaning",
      "Filter degreasing and restoration",
      "Ductwork and fan cleaning",
      "NFPA 96 compliance",
      "Before and after documentation",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {"From conveyor ovens to grease traps and hood vents, businesses across Michigan trust the Dirty Dawgz to deliver thorough, professional cleaning that keeps commercial kitchens safe, efficient, and code-compliant."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-tight text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-card-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-6 w-full bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <Link href={service.href} className="inline-flex items-center justify-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
