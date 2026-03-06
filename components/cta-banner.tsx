import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:px-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-primary-foreground md:text-4xl">
          Ready for a Cleaner Kitchen?
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          Don&apos;t wait until grease buildup becomes a safety hazard. Get in touch today for a
          free, no-obligation quote.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-secondary px-8 text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            <Link href="#quote">Get a Free Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/30 bg-transparent px-8 text-lg text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="tel:2692481209">
              <Phone className="mr-2 h-5 w-5" />
              (269) 248-1209
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
