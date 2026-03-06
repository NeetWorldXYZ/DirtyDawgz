import { MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const regionHighlights = [
  "Grand Rapids",
  "Detroit",
  "Lansing",
  "Kalamazoo",
  "Ann Arbor",
  "Traverse City",
  "Flint",
  "Saginaw",
  "Muskegon",
  "Battle Creek",
  "Holland",
  "Port Huron",
  "Marquette",
  "Sault Ste. Marie",
  "Escanaba",
  "Petoskey",
]

export function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Where We Work
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Serving All of Michigan
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {"From the Indiana border to the Upper Peninsula, the Dirty Dawgz are Michigan's go-to team for commercial kitchen cleaning. No matter where your business is in the Great Lakes State, we'll come to you."}
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-tight text-card-foreground">
                Cities We Frequently Serve
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {regionHighlights.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {city}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-secondary p-6 text-center">
              <p className="text-sm leading-relaxed text-secondary-foreground/80">
                {"Don't see your city listed? No problem. We serve every county and community across the entire state of Michigan -- from the UP to the Indiana border, we've got you covered."}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="#quote">Get a Free Quote for Your Area</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
