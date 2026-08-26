import { Star, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/motion"
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL } from "@/lib/site"

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

export function ReviewsSection() {
  return (
    <section className="dd-stripes bg-[#141414] py-20 text-secondary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-12 max-w-3xl">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Reviews
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
            Michigan Kitchens <span className="text-primary">Vouch for the Dawgz.</span>
          </h2>
        </Reveal>

        {GOOGLE_REVIEWS.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GOOGLE_REVIEWS.map((review, i) => (
              <Reveal key={review.author} delay={i * 110}>
                <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-7">
                  <Stars rating={review.rating} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-5 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-wider text-white">
                    {review.author}
                    {review.city ? (
                      <span className="font-normal text-white/50"> — {review.city}</span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-xs text-white/40">Review from Google</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal delay={150} className={GOOGLE_REVIEWS.length > 0 ? "mt-10" : ""}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-4 border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-6 w-6 fill-[#fbbc04] text-[#fbbc04]" />
                ))}
              </div>
              <p className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wider text-white">
                Rated on Google
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-white">
              Read Our Google Reviews
              <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
