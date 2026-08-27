import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"
import { MichiganMark } from "@/components/michigan-mark"

export function ServiceAreaSection() {
  return (
    <section
      id="service-area"
      className="dd-stripes border-y border-white/10 bg-[#0e0e0e] py-12 text-secondary-foreground sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left" className="flex justify-center lg:order-2 lg:justify-end">
            <MichiganMark />
          </Reveal>

          <Reveal className="lg:order-1">
            <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Service Area
            </p>
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl text-white md:text-5xl">
              Built in Michigan. <span className="text-primary">Cleaning Kitchens Across Michigan.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              From the Indiana border to the Upper Peninsula, Dirty Dawgz crews travel to
              restaurants, schools, bars, and franchise kitchens in every corner of the state.
              Wherever your commercial kitchen is, we&apos;ll come to you.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/45">
              One location or twenty, we service independent restaurants and multi-location
              groups on the same documented, scheduled program.
            </p>
            <Button
              asChild
              size="lg"
              className="dd-sheen mt-8 bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <a href="/#quote">Get a Quote for Your Area</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
