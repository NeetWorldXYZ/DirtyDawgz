import { Shield, Clock, Award, ThumbsUp } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "We prioritize fire safety and code compliance in every job. A clean kitchen is a safe kitchen, and we make sure yours meets the highest standards.",
  },
  {
    icon: Clock,
    title: "Minimal Downtime",
    description:
      "We know every hour your kitchen is offline costs money. Our team works efficiently around your schedule to get you back to business fast.",
  },
  {
    icon: Award,
    title: "Experienced Professionals",
    description:
      "Our technicians are trained, experienced, and equipped with commercial-grade tools and eco-friendly cleaning solutions to tackle even the toughest jobs.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description:
      "We stand behind every job we do. If you're not satisfied with the results, we'll come back and make it right. That's the Dirty Dawgz promise.",
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="bg-secondary py-20 text-secondary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-primary-foreground md:text-4xl">
            The Dirty Dawgz Difference
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary-foreground/70">
            {"When you call the Dirty Dawgz, you get Michigan's most trusted cleaning team. We treat your kitchen like our own and proudly serve communities across the entire state."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                <reason.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-primary-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary-foreground/70">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
