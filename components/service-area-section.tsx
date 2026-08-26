import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"

/** Stylized Michigan silhouette — Upper Peninsula band + Lower Peninsula mitten. */
function MichiganMark() {
  return (
    <svg
      viewBox="0 0 340 380"
      role="img"
      aria-label="Outline of the state of Michigan"
      className="h-auto w-full max-w-md"
    >
      <defs>
        <linearGradient id="mi-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b2b2b" />
          <stop offset="55%" stopColor="#1d1d1d" />
          <stop offset="100%" stopColor="#161616" />
        </linearGradient>
      </defs>
      {/* Upper Peninsula with a modest Keweenaw bump */}
      <path
        d="M28,86
           C46,76 66,72 86,68
           L98,50
           L108,58
           C106,66 103,72 106,74
           C128,70 150,72 172,74
           L206,68
           L228,78
           L218,92
           C196,102 172,96 148,102
           C124,108 100,104 76,110
           C56,114 38,112 26,104
           C24,98 25,90 28,86
           Z"
        fill="url(#mi-steel)"
        stroke="#c41e2a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Lower Peninsula — the mitten, thumb lobe to the east */}
      <path
        d="M150,118
           C132,128 122,148 116,172
           C108,200 106,232 110,262
           C113,286 120,308 130,324
           L236,324
           C242,308 246,290 247,272
           L246,252
           C258,246 268,234 272,218
           C275,204 274,190 268,182
           C262,176 254,180 252,190
           C250,202 244,212 236,216
           C232,204 230,190 226,176
           C220,152 208,132 192,122
           C178,114 162,112 150,118
           Z"
        fill="url(#mi-steel)"
        stroke="#c41e2a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Home-base marker in southwest Michigan */}
      <circle cx="152" cy="302" r="6" fill="#c41e2a">
        <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="152" cy="302" r="12" fill="none" stroke="#c41e2a" strokeOpacity="0.4" strokeWidth="1.5">
        <animate attributeName="r" values="8;16" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function ServiceAreaSection() {
  return (
    <section
      id="service-area"
      className="dd-stripes border-y border-white/10 bg-[#0e0e0e] py-20 text-secondary-foreground lg:py-28"
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
            <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
              Built in Michigan. <span className="text-primary">Cleaning Kitchens Across Michigan.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              From the Indiana border to the Upper Peninsula, Dirty Dawgz crews travel to
              restaurants, schools, bars, and franchise kitchens in every corner of the state.
              Wherever your commercial kitchen is, we&apos;ll come to you.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/45">
              One location or twenty — we service independent restaurants and multi-location
              groups on the same documented, scheduled program.
            </p>
            <Button
              asChild
              size="lg"
              className="dd-sheen mt-8 bg-primary px-10 py-6 font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/#quote">Get a Quote for Your Area</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
