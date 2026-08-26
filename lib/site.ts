export const PHONE_DISPLAY = "(269) 248-1209"
export const PHONE_TEL = "tel:2692481209"
export const EMAIL = "info@dirtydawgzovencleaning.com"
export const FACEBOOK_URL =
  "https://www.facebook.com/people/Dirty-Dawgz-Oven-Cleaning-LLC/61586346754471/"

/**
 * Link to the Dirty Dawgz Google Business Profile / reviews.
 * A Google search link works even without the short review URL; swap in the
 * g.page review link (https://g.page/r/.../review) once available for a
 * one-tap "leave a review" experience.
 */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Dirty+Dawgz+Oven+Cleaning+Michigan+reviews"

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

export interface GoogleReview {
  author: string
  rating: number
  text: string
  city?: string
}

/**
 * Real Google reviews, hand-copied from the Dirty Dawgz Google Business
 * Profile. Leave empty until real reviews are pasted in — the reviews
 * section renders a "find us on Google" band instead of fake testimonials.
 * Never put invented reviews here.
 */
export const GOOGLE_REVIEWS: GoogleReview[] = []
