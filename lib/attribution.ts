/**
 * Google Ads / UTM attribution capture.
 *
 * Visitors usually land on an ad URL carrying a click ID, then browse a few
 * pages before filling in the quote form, so the click ID has to outlive the
 * landing page. We stash it in localStorage on first sight and merge it into
 * the quote payload at submit time, which is what lets the CRM attribute the
 * lead back to the campaign that paid for it.
 *
 * Every storage access is wrapped: a tracking failure must never break a page
 * or block a real enquiry.
 */

export const ATTRIBUTION_KEY = "dd_attribution"

/** Google's click IDs. These are the ones that actually drive attribution. */
export const CLICK_ID_FIELDS = ["gclid", "gbraid", "wbraid"] as const

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export const TRACKED_PARAMS = [...CLICK_ID_FIELDS, ...UTM_FIELDS] as const

/** Per-field caps, matching what the CRM's zod schema accepts. */
export const FIELD_LIMITS: Record<string, number> = {
  gclid: 200,
  gbraid: 200,
  wbraid: 200,
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 120,
  utm_term: 120,
  utm_content: 120,
  page: 500,
  referrer: 500,
}

export interface Attribution {
  gclid?: string
  gbraid?: string
  wbraid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  /** Landing page URL, path only, no query string. */
  page?: string
  referrer?: string
}

/** Trim a value to its field limit; returns undefined for empty values. */
export function clampField(field: string, value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, FIELD_LIMITS[field] ?? 200)
}

/** Current URL with the query string stripped. */
function currentPage(): string {
  return window.location.href.split("?")[0].split("#")[0]
}

/** Read what we have stored, tolerating absent or corrupt storage. */
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {}
  } catch {
    return {}
  }
}

/**
 * Capture any tracked parameters on the current URL, merging them over what is
 * already stored. A clean URL never wipes an earlier capture: the visitor who
 * arrived on an ad and then browsed to a plain page keeps their click ID.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return
  try {
    const params = new URLSearchParams(window.location.search)
    const stored = readAttribution()
    let found = false

    for (const key of TRACKED_PARAMS) {
      const value = clampField(key, params.get(key))
      if (value) {
        stored[key] = value
        found = true
      }
    }

    // Only record where they landed on the hit that carried the parameters,
    // so a later page view cannot overwrite the true landing page.
    if (found) {
      stored.page = clampField("page", currentPage())
      const referrer = clampField("referrer", document.referrer)
      if (referrer) stored.referrer = referrer
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored))
    }
  } catch {
    /* never break the page over tracking */
  }
}

/**
 * The attribution fields to merge into a lead payload. Falls back to the
 * current page when nothing was stored, so every lead reports where it came
 * from even when there is no campaign behind it.
 */
export function attributionPayload(): Attribution {
  const stored = readAttribution()
  const payload: Attribution = {}

  for (const key of TRACKED_PARAMS) {
    const value = clampField(key, stored[key])
    if (value) payload[key] = value
  }

  const page = clampField("page", stored.page) ?? safeCurrentPage()
  if (page) payload.page = page

  const referrer = clampField("referrer", stored.referrer)
  if (referrer) payload.referrer = referrer

  return payload
}

function safeCurrentPage(): string | undefined {
  try {
    return typeof window === "undefined" ? undefined : clampField("page", currentPage())
  } catch {
    return undefined
  }
}
