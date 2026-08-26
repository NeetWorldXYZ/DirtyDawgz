import Image from "next/image"
import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site"

export function HeroSection() {
  return (
    <section className="dd-stripes relative flex min-h-[calc(100svh-77px)] flex-col overflow-hidden bg-[#141414] text-secondary-foreground">
      {/* Ambient light: red ember glow + cool stainless wash */}
      <div className="dd-ember absolute -top-32 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(196,30,42,0.22)_0%,_transparent_65%)]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(180,190,200,0.08)_0%,_transparent_65%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-10 px-4 py-16 text-center lg:flex-row lg:gap-16 lg:px-8 lg:text-left">
        <div className="flex max-w-3xl flex-1 flex-col items-center lg:items-start">
          <p
            className="dd-hero-enter mb-5 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-4 py-1.5 font-[family-name:var(--font-oswald)] text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 bg-primary" />
            Serving All of Michigan
          </p>

          <h1
            className="dd-hero-enter font-[family-name:var(--font-oswald)] text-[2.6rem] font-bold uppercase leading-[0.95] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            Michigan&apos;s Commercial Kitchen{" "}
            <span className="text-primary">Cleaning Specialists</span>
          </h1>

          <p
            className="dd-hero-enter mt-5 font-[family-name:var(--font-oswald)] text-base font-medium uppercase tracking-[0.18em] text-secondary-foreground/80 sm:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            Commercial Ovens <span className="text-primary">•</span> Hood &amp; Exhaust Systems{" "}
            <span className="text-primary">•</span> Grease Traps
          </p>

          <p
            className="dd-hero-enter mt-5 max-w-xl text-base leading-relaxed text-secondary-foreground/60 sm:text-lg"
            style={{ animationDelay: "0.4s" }}
          >
            Professional oven cleaning, hood cleaning, and grease trap service for restaurants,
            bars, schools, franchises, and food-service operations across Michigan. We handle the
            grease so you can focus on the food.
          </p>

          <div
            className="dd-hero-enter mt-8 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              asChild
              size="lg"
              className="dd-sheen bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <a href="/#quote">Get a Free Quote</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary-foreground/25 bg-transparent px-10 py-6 font-[family-name:var(--font-oswald)] text-lg uppercase tracking-wider text-secondary-foreground hover:border-primary hover:bg-primary/10 hover:text-secondary-foreground"
            >
              <Link href={PHONE_TEL}>
                <Phone className="mr-2 h-5 w-5 text-primary" />
                {PHONE_DISPLAY}
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="dd-hero-enter hidden flex-shrink-0 items-center justify-center lg:flex"
          style={{ animationDelay: "0.35s" }}
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -inset-1 rounded-full border border-white/10" />
            <Image
              src="/images/logo.png"
              alt="Dirty Dawgz Oven Cleaning LLC mascot"
              width={380}
              height={380}
              className="relative rounded-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative mx-auto mb-6 flex flex-col items-center gap-2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-secondary-foreground/30 p-1">
          <div className="dd-scroll-dot h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <ChevronDown className="h-4 w-4 text-secondary-foreground/40" />
      </div>
    </section>
  )
}
