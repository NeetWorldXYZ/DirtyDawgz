import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion"
import { HowSteps } from "@/components/how-steps"

const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description: "Tell us about your kitchen and equipment. Photos help, and our quote form takes them.",
  },
  {
    number: "02",
    title: "We Build Your Service Plan",
    description: "We determine what needs cleaning and how often it should be serviced.",
  },
  {
    number: "03",
    title: "The Dawgz Get Dirty",
    description: "Our crew handles the cleaning while documenting the work, start to finish.",
  },
  {
    number: "04",
    title: "You Get a Clean Kitchen",
    description: "Before/after documentation and recommendations for future service, in your inbox.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-white/10 bg-[#0e0e0e] py-12 text-secondary-foreground sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-9 max-w-3xl sm:mb-14">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl text-white md:text-5xl">
            Hiring the Dawgz Is <span className="text-primary">the Easy Part.</span>
          </h2>
        </Reveal>

        <HowSteps steps={steps} />

        <Reveal delay={200} className="mt-14">
          <a
            href="/#quote"
            className="group inline-flex items-center gap-3 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-white"
          >
            Start With Step One
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
