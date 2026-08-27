"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Reveal } from "@/components/motion"
import { PROOF_PAIRS } from "@/lib/site"

const tabs = [
  { key: "ovens", label: "Ovens" },
  { key: "hoods", label: "Hoods" },
  { key: "greasetraps", label: "Grease Traps" },
] as const

export function ProofSection() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("ovens")
  const pair = PROOF_PAIRS[active]

  return (
    <section id="proof" className="dd-stripes bg-[#141414] py-12 text-secondary-foreground sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal className="mb-8 max-w-3xl sm:mb-12">
          <p className="mb-3 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            The Proof
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl text-white md:text-5xl">
            We Clean the Stuff <span className="text-primary">Nobody Else Wants To.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            Every Dirty Dawgz job is photo-documented, before and after. Drag the slider —
            this is the difference we deliver on ovens, hood systems, and grease traps across
            Michigan.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`border px-6 py-2.5 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  active === tab.key
                    ? "border-primary bg-primary text-white"
                    : "border-white/20 bg-transparent text-white/60 hover:border-primary/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <BeforeAfterSlider pair={pair} />

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              {pair.label}
              {pair.location ? <span className="text-white/50"> — {pair.location}</span> : null}
            </p>
            <p className="flex items-center gap-2 text-sm text-white/50">
              <Camera className="h-4 w-4 text-primary" />
              Before &amp; after documentation included with every service.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
