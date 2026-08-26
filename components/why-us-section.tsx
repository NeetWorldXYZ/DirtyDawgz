import { Flame, Camera, CalendarClock, FileText, Wrench, MapPin, RefreshCcw, Wind } from "lucide-react"
import { Reveal } from "@/components/motion"

const reasons = [
  {
    icon: Flame,
    title: "Commercial Kitchen Specialists",
    description:
      "We don't clean offices or carpets. Ovens, hood systems, and grease traps are the whole job — and we're built for them.",
  },
  {
    icon: Wrench,
    title: "Professional Equipment",
    description:
      "Commercial-grade degreasers, pressure equipment, and tools made for baked-on carbon — not a mop bucket and a prayer.",
  },
  {
    icon: Wind,
    title: "Hood-to-Rooftop Exhaust Cleaning",
    description:
      "Filters, plenums, ductwork, and rooftop fans cleaned to NFPA 96 standards, with a certificate for your records.",
  },
  {
    icon: Camera,
    title: "Before & After Documentation",
    description:
      "Every job is photographed before and after, so you — and your insurance company — can see exactly what was done.",
  },
  {
    icon: FileText,
    title: "Detailed Service Reports",
    description:
      "Written reports with findings and recommendations after every visit. Paperwork inspectors actually want to see.",
  },
  {
    icon: RefreshCcw,
    title: "Recurring Service Programs",
    description:
      "We track your cleaning schedule and show up when service is due. You never have to remember a date.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    description:
      "Nights, weekends, off-hours — we work around your service windows so your kitchen never loses production time.",
  },
  {
    icon: MapPin,
    title: "Michigan-Based Crews",
    description:
      "Locally owned and operated. When you call, you talk to the crew that shows up — not a national call center.",
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-16 max-w-3xl">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Why Dirty Dawgz
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-5xl">
            Not Your Average <span className="text-primary">Cleaning Company.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Dirty Dawgz specializes in the difficult, greasy equipment inside commercial
            kitchens — the work most cleaning companies won&apos;t touch. That focus shows in
            the results.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={(i % 4) * 90}
              className="group flex h-full flex-col bg-card p-7 transition-colors duration-300 hover:bg-[#161616]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center border border-primary/25 bg-primary/10">
                <reason.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-oswald)] text-base font-bold uppercase tracking-tight text-card-foreground transition-colors duration-300 group-hover:text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/60">
                {reason.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
