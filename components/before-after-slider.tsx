"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { ChevronsLeftRight } from "lucide-react"
import type { BeforeAfterPair } from "@/lib/site"

/**
 * Interactive before/after comparison. Drag (or use arrow keys on) the
 * handle to wipe between the two panels. Uses real photos when the pair
 * provides them and a stylized grime/stainless treatment otherwise.
 */
export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(97, Math.max(3, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) updateFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    draggingRef.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(3, p - 4))
    if (e.key === "ArrowRight") setPosition((p) => Math.min(97, p + 4))
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden border border-white/15 sm:aspect-[21/9]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER layer (full width, underneath) */}
      <div className="absolute inset-0">
        {pair.after ? (
          <Image src={pair.after} alt={`${pair.label} after cleaning`} fill className="object-cover" />
        ) : (
          <div className="dd-steel absolute inset-0">
            <div className="dd-sheen absolute inset-0" />
          </div>
        )}
        <span className="absolute bottom-4 right-4 bg-[#141414]/85 px-3 py-1 font-[family-name:var(--font-oswald)] text-xs font-bold uppercase tracking-[0.25em] text-white">
          After
        </span>
      </div>

      {/* BEFORE layer (clipped to slider position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {pair.before ? (
          <Image src={pair.before} alt={`${pair.label} before cleaning`} fill className="object-cover" />
        ) : (
          <div className="dd-grime absolute inset-0" />
        )}
        <span className="absolute bottom-4 left-4 bg-[#141414]/85 px-3 py-1 font-[family-name:var(--font-oswald)] text-xs font-bold uppercase tracking-[0.25em] text-white/80">
          Before
        </span>
      </div>

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${pair.label} before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-10 flex w-0.5 items-center justify-center bg-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        style={{ left: `${position}%` }}
      >
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-[#141414] shadow-lg shadow-black/40">
          <ChevronsLeftRight className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  )
}
