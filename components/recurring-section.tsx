import Link from "next/link"
import { CalendarCheck, Bell, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"

const points = [
  {
    icon: ClipboardList,
    title: "We Track Every Schedule",
    text: "Ovens, hood systems, and grease traps all have different service intervals. We keep the calendar so you don't have to.",
  },
  {
    icon: Bell,
    title: "We Contact You When You're Due",
    text: "No sticky notes, no missed compliance deadlines. When your equipment needs service, we reach out and get it booked.",
  },
  {
    icon: CalendarCheck,
    title: "Service That Fits Your Hours",
    text: "Recurring visits scheduled around your operation — overnight, early morning, or between shifts.",
  },
]

export function RecurringSection() {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Recurring Service
            </p>
            <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-5xl">
              Clean It Once. <span className="text-primary">Then Let Us Remember the Rest.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Most kitchens don&apos;t fail inspections because nobody cares — they fail because
              nobody remembered. Put your ovens, hoods, and grease traps on a Dirty Dawgz service
              plan and the schedule becomes our job.
            </p>
            <Button
              asChild
              size="lg"
              className="dd-sheen mt-8 bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/#quote">Build My Service Plan</Link>
            </Button>
          </Reveal>

          <div className="flex flex-col gap-4">
            {points.map((point, i) => (
              <Reveal key={point.title} from="right" delay={i * 120}>
                <div className="flex gap-5 border border-border bg-card p-6 transition-all duration-300 hover:-translate-x-1 hover:border-primary/40">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-primary/25 bg-primary/10">
                    <point.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-card-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
