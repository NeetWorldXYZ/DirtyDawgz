import { Star } from "lucide-react"
import { Reveal } from "@/components/motion"
import { CUSTOMER_REVIEWS } from "@/lib/site"

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-[#fbbc04] text-[#fbbc04]" : "text-white/20"}`}
        />
      ))}
    </div>
  )
}

/**
 * Renders nothing until real reviews are added to CUSTOMER_REVIEWS in
 * lib/site.ts - the section appears automatically once they're in.
 */
export function ReviewsSection() {
  if (CUSTOMER_REVIEWS.length === 0) return null

  return (
    <section className="dd-stripes bg-[#141414] py-12 text-secondary-foreground sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-8 max-w-3xl sm:mb-12">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Reviews
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl text-white md:text-5xl">
            Michigan Kitchens <span className="text-primary">Vouch for the Dawgz.</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_REVIEWS.map((review, i) => (
            <Reveal key={review.author} delay={i * 110}>
              <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-7">
                <Stars rating={review.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-5 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-wider text-white">
                  {review.author}
                  {review.city ? (
                    <span className="font-normal text-white/50">, {review.city}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-white/40">Review from {review.source}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
