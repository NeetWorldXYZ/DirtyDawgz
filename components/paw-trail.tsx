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

const PAW_COUNT = 12

/**
 * A trail of Dawgz paw prints that walks across the section as it scrolls
 * into view — left to right, alternating like real footsteps, staggered so
 * the trail appears print by print. Low contrast on purpose: personality,
 * not decoration that shouts. Desktop only (the vertical mobile layout has
 * nowhere for a horizontal trail to walk).
 */
export function PawTrail() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`dd-paw-trail mb-2 hidden h-10 items-center justify-between px-2 lg:flex ${
        inView ? "is-inview" : ""
      }`}
      aria-hidden
    >
      {Array.from({ length: PAW_COUNT }, (_, i) => (
        <span
          key={i}
          className="dd-paw fill-white/[0.09] last:fill-primary/40"
          style={{ transitionDelay: `${i * 130}ms` }}
        >
          <Paw flip={i % 2 === 1} />
        </span>
      ))}
    </div>
  )
}
