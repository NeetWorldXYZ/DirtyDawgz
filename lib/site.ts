export const PHONE_DISPLAY = "(269) 248-1209"
export const PHONE_TEL = "tel:2692481209"
export const EMAIL = "info@dirtydawgzovencleaning.com"
export const FACEBOOK_URL =
  "https://www.facebook.com/people/Dirty-Dawgz-Oven-Cleaning-LLC/61586346754471/"

/** Customer portal front door — passwordless login by billing email. */
export const PORTAL_URL = "https://app.dirtydawgzovencleaning.com/portal"

export interface BeforeAfterPair {
  /** Path under /public, e.g. "/images/work/hood-before.jpg" */
  before?: string
  after?: string
  label: string
  location?: string
}

/**
 * Before/after documentation shown in the proof slider on the homepage.
 * Drop real photo pairs into /public/images/work/ and reference them here —
 * the slider automatically uses photos when `before`/`after` are set and
 * falls back to the stylized grime/steel treatment when they are not.
 */
export const PROOF_PAIRS: Record<"ovens" | "hoods" | "greasetraps", BeforeAfterPair> = {
  ovens: {
    label: "Commercial Conveyor Oven",
  },
  hoods: {
    label: "Hood & Exhaust System",
  },
  greasetraps: {
    label: "Grease Trap Service",
  },
}

export interface CustomerReview {
  author: string
  rating: number
  text: string
  city?: string
  /** Where the review was posted, e.g. "Facebook" or "Google" */
  source: string
}

/**
 * Real customer reviews, hand-copied from Facebook (and later Google).
 * Leave empty until real reviews are pasted in — the reviews section
 * renders a "read our reviews" band instead of fake testimonials.
 * Never put invented reviews here.
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = []
