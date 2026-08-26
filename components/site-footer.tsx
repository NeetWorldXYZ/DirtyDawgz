import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Facebook, KeyRound } from "lucide-react"
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, FACEBOOK_URL, PORTAL_URL } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0e0e0e] text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-16 md:pb-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Dirty Dawgz Oven Cleaning LLC logo"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <p className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-primary-foreground">
                  Dirty Dawgz
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
                  Commercial Kitchen Cleaning
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-foreground/60">
              Michigan&apos;s commercial kitchen cleaning specialists — commercial oven cleaning,
              hood &amp; exhaust system cleaning, and grease trap service. Got a dirty kitchen?
              Send in the Dawgz.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/ovencleaning"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Commercial Oven Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/hoodcleaning"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Hood &amp; Exhaust Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/greasetrapcleaning"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Grease Trap Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/#service-area"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Service Area
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={PHONE_TEL}
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all">{EMAIL}</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
                Follow us on Facebook
              </a>
              <a
                href={PORTAL_URL}
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <KeyRound className="h-4 w-4" />
                Customer Portal Login
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/10 pt-8">
          <p className="text-center text-xs text-secondary-foreground/40">
            {new Date().getFullYear()} Dirty Dawgz Oven Cleaning LLC. All rights reserved. Proudly
            serving all of Michigan.
          </p>
        </div>
      </div>
    </footer>
  )
}
