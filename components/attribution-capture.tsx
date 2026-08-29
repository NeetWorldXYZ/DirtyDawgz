"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { captureAttribution } from "@/lib/attribution"

/**
 * Site-wide Google Ads / UTM capture. Mounted once in the root layout so it
 * runs on every page load, and again on client-side navigations in case a
 * tagged link points somewhere other than the homepage.
 *
 * Renders nothing. usePathname (rather than useSearchParams) keeps every page
 * statically rendered; the query string is read straight off window.location.
 */
export function AttributionCapture() {
  const pathname = usePathname()

  useEffect(() => {
    captureAttribution()
  }, [pathname])

  return null
}
