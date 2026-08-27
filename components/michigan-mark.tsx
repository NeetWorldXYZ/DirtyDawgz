"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Michigan silhouette traced from US Census state-boundary GeoJSON
 * (equirectangular projection, cos-latitude corrected), so both peninsulas,
 * the thumb, and Saginaw Bay are the real shapes rather than a caricature.
 *
 * When scrolled into view the red outline draws itself around both
 * peninsulas (pathLength=1 + dash animation in globals.css), the steel fill
 * fades in behind it, then the home-base marker pops and pulses.
 */
const LOWER_PENINSULA =
  "M309.8,357.6 L249.6,360.0 L249.6,355.9 L197.0,355.9 L159.9,355.9 L168.9,347.7 L175.0,333.7 L180.6,325.1 L184.8,313.1 L187.2,296.0 L186.2,277.5 L173.1,241.3 L177.2,227.6 L174.3,211.1 L184.5,194.4 L186.7,180.3 L185.3,172.8 L192.6,169.7 L193.5,159.5 L205.0,156.7 L213.8,145.4 L213.1,168.0 L217.7,169.0 L223.5,157.8 L223.8,138.6 L227.4,133.8 L239.6,130.7 L235.7,117.4 L243.8,106.1 L253.8,105.4 L265.0,112.6 L275.9,113.6 L281.3,122.5 L289.6,123.2 L303.5,131.4 L308.4,131.1 L315.9,144.4 L309.8,151.6 L315.7,160.8 L317.9,171.4 L315.2,194.7 L306.2,200.5 L304.0,212.5 L293.2,216.6 L287.4,231.0 L289.6,236.5 L300.3,241.6 L308.6,233.7 L318.4,217.6 L333.7,211.5 L341.3,216.3 L345.9,225.2 L350.5,251.2 L351.3,264.2 L356.1,279.9 L351.5,302.5 L344.2,305.9 L344.0,297.7 L339.1,300.1 L333.5,318.9 L324.5,326.1 L321.8,340.5 L310.6,352.5 L309.8,357.6 Z"

const UPPER_PENINSULA =
  "M125.8,147.5 L119.0,141.0 L123.1,132.1 L112.6,130.7 L116.8,122.2 L117.3,111.2 L108.0,103.7 L102.9,95.8 L83.9,89.7 L78.0,91.7 L59.0,82.5 L13.2,69.8 L8.3,59.2 L0.0,55.4 L17.3,48.9 L25.1,41.4 L44.6,38.3 L57.3,29.1 L63.1,28.7 L68.0,22.2 L81.9,13.0 L89.0,5.1 L99.5,0.0 L109.5,4.4 L91.9,23.6 L87.8,30.1 L88.0,41.7 L96.5,32.9 L111.9,34.2 L123.8,40.4 L134.6,57.5 L140.4,60.6 L151.6,57.8 L154.3,61.6 L165.5,63.7 L189.4,49.3 L201.8,47.9 L218.4,48.6 L229.6,43.8 L238.2,43.5 L239.9,60.9 L248.6,63.3 L257.4,60.6 L261.1,64.7 L266.9,59.5 L279.8,57.8 L280.1,79.7 L285.9,89.0 L294.7,91.4 L295.7,85.2 L304.2,85.2 L308.8,91.7 L304.9,96.5 L280.6,92.4 L268.9,95.1 L256.2,87.6 L252.5,94.4 L254.2,100.3 L248.6,98.9 L240.4,90.3 L226.0,85.2 L218.7,84.9 L211.6,93.1 L199.9,95.1 L187.2,93.4 L182.1,96.8 L180.9,103.7 L167.0,109.5 L167.7,101.3 L161.6,99.6 L159.2,108.1 L148.9,108.5 L144.3,112.2 L137.5,127.0 L124.8,145.8 L125.8,147.5 Z"

export function MichiganMark() {
  const ref = useRef<SVGSVGElement | null>(null)
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
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="-8 -8 372 376"
      role="img"
      aria-label="Outline of the state of Michigan"
      className={`dd-trace h-auto w-full max-w-md ${inView ? "is-inview" : ""}`}
    >
      <defs>
        <linearGradient id="mi-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e2e2e" />
          <stop offset="55%" stopColor="#1f1f1f" />
          <stop offset="100%" stopColor="#161616" />
        </linearGradient>
      </defs>
      <path
        d={UPPER_PENINSULA}
        pathLength={1}
        className="dd-trace-path"
        fill="url(#mi-steel)"
        stroke="#c41e2a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d={LOWER_PENINSULA}
        pathLength={1}
        className="dd-trace-path dd-trace-later"
        fill="url(#mi-steel)"
        stroke="#c41e2a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Home-base marker in southwest Michigan */}
      <g className="dd-trace-marker">
        <circle cx="235" cy="322" r="6" fill="#c41e2a">
          <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="235" cy="322" r="12" fill="none" stroke="#c41e2a" strokeOpacity="0.4" strokeWidth="1.5">
          <animate attributeName="r" values="8;16" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
}
