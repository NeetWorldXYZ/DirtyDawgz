import Image from "next/image"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
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
                <p className="font-[family-name:var(--font-oswald)] text-xs uppercase tracking-widest text-primary-foreground/60">
                  Oven Cleaning LLC
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-foreground/60">
              {"Michigan's premier commercial kitchen cleaning company. Got a dirty oven? Call the Dirty Dawgz! Proudly serving all of Michigan."}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-widest text-primary-foreground">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/ovencleaning"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Conveyor Oven Cleaning
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
                  href="/hoodcleaning"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Hood Vent Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="#service-area"
                  className="text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
                >
                  Service Area
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-widest text-primary-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:2692481209"
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                (269) 248-1209
              </a>
              <a
                href="mailto:info@dirtydawgzovencleaning.com"
                className="flex items-center gap-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all">info@dirtydawgzovencleaning.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/10 pt-8">
          <p className="text-center text-xs text-secondary-foreground/40">
            {new Date().getFullYear()} Dirty Dawgz Oven Cleaning LLC. All rights reserved. Proudly serving all of Michigan.
          </p>
        </div>
      </div>
    </footer>
  )
}
