import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion"

const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description: "Tell us about your kitchen and equipment. Photos help — our quote form takes them.",
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
    <section className="border-y border-white/10 bg-[#0e0e0e] py-20 text-secondary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-14 max-w-3xl">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
            Hiring the Dawgz Is <span className="text-primary">the Easy Part.</span>
          </h2>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 130} className="relative">
              <span className="font-[family-name:var(--font-oswald)] text-6xl font-bold text-white/10">
                {step.number}
              </span>
              <div className="mt-3 h-0.5 w-10 bg-primary" />
              <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14">
          <Link
            href="/#quote"
            className="group inline-flex items-center gap-3 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-white"
          >
            Start With Step One
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
