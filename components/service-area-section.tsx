import { MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg leading-relaxed text-card-foreground/90">
                We serve every county and community across the entire state of Michigan — from the UP to the Indiana border. Wherever your commercial kitchen is located, we've got you covered.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/#quote">Get a Free Quote for Your Area</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
