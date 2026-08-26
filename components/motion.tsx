"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Delay in ms before the reveal animation starts once visible */
  delay?: number
  /** Direction the element travels from */
  from?: "bottom" | "left" | "right" | "none"
  as?: "div" | "section" | "span" | "li"
}

/**
 * Fade/slide-in on scroll. SEO-safe: content is fully visible in the
 * server-rendered HTML; after hydration, only elements still below the fold
 * are hidden and then revealed as they scroll into view. No-ops for reduced
 * motion or when IntersectionObserver is unavailable.
 */
export function Reveal({ children, className, delay = 0, from = "bottom", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  // null = untouched (SSR/default visible), true = hidden awaiting reveal, false = revealed
  const [hidden, setHidden] = useState<boolean | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Only animate elements that start below the viewport — everything else
    // stays visible, so there is no flash and nothing above the fold moves.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40) return

    setHidden(true)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const hiddenClass =
    from === "left"
      ? "opacity-0 -translate-x-8"
      : from === "right"
        ? "opacity-0 translate-x-8"
        : from === "none"
          ? "opacity-0"
          : "opacity-0 translate-y-8"

  return (
    <Tag
      // @ts-expect-error -- ref works for all rendered intrinsic elements
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        hidden ? hiddenClass : "opacity-100 translate-x-0 translate-y-0",
        className,
      )}
      style={delay && hidden !== null ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
