"use client"

import { useEffect, useRef } from "react"

/**
 * The hero's ambient layer: the red ember glow and stainless wash (now with
 * a gentle mouse parallax on desktop) plus a few whisper-faint steam wisps
 * rising behind the headline - end-of-shift kitchen, not smoke.
 *
 * Pointer-events: none throughout; purely decorative. The parallax listens
 * only on devices with a hover pointer and skips entirely under
 * prefers-reduced-motion.
 */
export function HeroAmbient() {
  const emberRef = useRef<HTMLDivElement | null>(null)
  const washRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const dx = e.clientX / window.innerWidth - 0.5
        const dy = e.clientY / window.innerHeight - 0.5
        if (emberRef.current) {
          emberRef.current.style.transform = `translate(${dx * -22}px, ${dy * -14}px)`
        }
        if (washRef.current) {
          washRef.current.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`
        }
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Ember glow + stainless wash, drifting slightly against the mouse */}
      <div
        ref={emberRef}
        className="dd-ember absolute -top-32 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(196,30,42,0.22)_0%,_transparent_65%)] transition-transform duration-700 ease-out"
      />
      <div
        ref={washRef}
        className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(180,190,200,0.08)_0%,_transparent_65%)] transition-transform duration-700 ease-out"
      />

      {/* Steam wisps rising behind the headline - negative delays keep the
          column full from the first frame instead of starting empty */}
      <div
        className="dd-steam absolute bottom-0 left-[10%] h-80 w-20 rounded-full bg-white blur-2xl"
        style={{ "--steam-max": 0.11, "--steam-dur": "15s", "--steam-delay": "0s" } as React.CSSProperties}
      />
      <div
        className="dd-steam absolute bottom-0 left-[16%] h-64 w-12 rounded-full bg-white blur-xl"
        style={{ "--steam-max": 0.08, "--steam-dur": "11s", "--steam-delay": "-6s" } as React.CSSProperties}
      />
      <div
        className="dd-steam absolute bottom-0 left-[40%] h-96 w-24 rounded-full bg-white blur-3xl"
        style={{ "--steam-max": 0.09, "--steam-dur": "19s", "--steam-delay": "-9s" } as React.CSSProperties}
      />
      <div
        className="dd-steam absolute bottom-0 left-[58%] h-72 w-16 rounded-full bg-white blur-2xl"
        style={{ "--steam-max": 0.1, "--steam-dur": "13s", "--steam-delay": "-3s" } as React.CSSProperties}
      />
      <div
        className="dd-steam absolute bottom-0 left-[82%] h-64 w-14 rounded-full bg-white blur-xl"
        style={{ "--steam-max": 0.07, "--steam-dur": "17s", "--steam-delay": "-12s" } as React.CSSProperties}
      />
    </div>
  )
}
