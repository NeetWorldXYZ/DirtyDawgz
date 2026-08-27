"use client"

import { useEffect, useRef, useState } from "react"

/** A single paw print: main pad plus four toes, pointing to the right. */
function Paw({ flip }: { flip: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 rotate-90 ${flip ? "-translate-y-1.5" : "translate-y-1.5"}`}
      aria-hidden
    >
      <ellipse cx="12" cy="15.5" rx="5" ry="4.2" />
      <ellipse cx="5.2" cy="9.5" rx="2" ry="2.6" transform="rotate(-20 5.2 9.5)" />
      <ellipse cx="9.6" cy="6.8" rx="2" ry="2.7" transform="rotate(-7 9.6 6.8)" />
      <ellipse cx="14.4" cy="6.8" rx="2" ry="2.7" transform="rotate(7 14.4 6.8)" />
      <ellipse cx="18.8" cy="9.5" rx="2" ry="2.6" transform="rotate(20 18.8 9.5)" />
    </svg>
  )
}

interface Step {
  number: string
  title: string
  description: string
}

const PAW_COUNT = 12
const PAW_STEP_MS = 150
/** Which paw "arrives" at each of the four columns (12 paws, justify-between). */
const ARRIVAL_PAW = [1, 4, 7, 10]

/**
 * The How It Works walk: one shared scroll trigger drives both the paw
 * prints and the numbered steps. The paws appear left to right like
 * footsteps, and each step's big number pops in (with a small bounce) at the
 * moment the trail reaches its column, followed by its bar and text.
 *
 * On mobile the trail is hidden (the steps stack vertically), so the steps
 * fall back to a quick top-to-bottom stagger via --d-sm; the paw-synced
 * --d-lg delays only apply at lg and up, where the trail exists.
 */
export function HowSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`dd-steps ${inView ? "is-inview" : ""}`}>
      {/* The walk: 12 paws, left to right, alternating like footsteps */}
      <div className="mb-2 hidden h-10 items-center justify-between px-2 lg:flex" aria-hidden>
        {Array.from({ length: PAW_COUNT }, (_, i) => (
          <span
            key={i}
            className="dd-paw fill-white/[0.09] last:fill-primary/40"
            style={{ "--paw-d": `${i * PAW_STEP_MS}ms` } as React.CSSProperties}
          >
            <Paw flip={i % 2 === 1} />
          </span>
        ))}
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.number}
            style={
              {
                "--d-sm": `${i * 120}ms`,
                "--d-lg": `${(ARRIVAL_PAW[i] ?? i * 3 + 1) * PAW_STEP_MS + 120}ms`,
              } as React.CSSProperties
            }
          >
            <span className="dd-step-num font-[family-name:var(--font-oswald)] text-6xl font-bold text-white/10">
              {step.number}
            </span>
            <div className="dd-step-rest">
              <div className="mt-3 h-0.5 w-10 bg-primary" />
              <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
