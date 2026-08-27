import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site"

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 sm:py-20 lg:py-24">
      <div className="dd-stripes absolute inset-0 opacity-60" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:px-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase leading-none tracking-tight text-primary-foreground md:text-7xl">
          Got a Dirty Kitchen?
        </h2>
        <p className="font-[family-name:var(--font-oswald)] text-2xl font-semibold uppercase tracking-[0.25em] text-primary-foreground/90 md:text-3xl">
          Send in the Dawgz.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#141414] px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-white hover:bg-[#141414]/90"
          >
            <a href="/#quote">Get a Free Quote</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/40 bg-transparent px-10 py-6 font-[family-name:var(--font-oswald)] text-lg uppercase tracking-wider text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href={PHONE_TEL}>
              <Phone className="mr-2 h-5 w-5" />
              {PHONE_DISPLAY}
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
