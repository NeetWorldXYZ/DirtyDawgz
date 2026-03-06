import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,30,42,0.15)_0%,_transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center lg:flex-row lg:gap-16 lg:px-8 lg:py-32 lg:text-left">
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {"Michigan's Premier Commercial Cleaning Company"}
          </p>
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Got a Dirty Oven?
            <br />
            <span className="text-primary">Call the Dirty Dawgz</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground/70">
            {"Michigan's premier oven, grease trap, and hood vent cleaning company. We handle the grease so you can focus on what you do best."}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#quote">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary-foreground/20 bg-transparent px-8 text-lg text-secondary-foreground hover:bg-secondary-foreground/5 hover:text-secondary-foreground"
            >
              <Link href="tel:2692481209">
                <Phone className="mr-2 h-5 w-5" />
                (269) 248-1209
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
            <Image
              src="/images/logo.png"
              alt="Dirty Dawgz Oven Cleaning LLC mascot"
              width={500}
              height={500}
              className="relative rounded-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
