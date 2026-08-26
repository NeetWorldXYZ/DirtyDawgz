"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PHONE_DISPLAY, PHONE_TEL, PORTAL_URL } from "@/lib/site"

const navLinks = [
  { href: "/ovencleaning", label: "Oven Cleaning" },
  { href: "/hoodcleaning", label: "Hood Cleaning" },
  { href: "/greasetrapcleaning", label: "Grease Traps" },
  { href: "/#service-area", label: "Service Area" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b text-secondary-foreground transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#111111]/95 shadow-lg shadow-black/30 backdrop-blur"
          : "border-transparent bg-[#141414]",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Dirty Dawgz Oven Cleaning LLC logo"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <p className="font-[family-name:var(--font-oswald)] text-base font-bold uppercase leading-tight tracking-wide text-primary-foreground sm:text-lg">
              Dirty Dawgz
            </p>
            <p className="font-[family-name:var(--font-oswald)] text-[9px] uppercase tracking-[0.25em] text-primary-foreground/60 sm:text-[10px]">
              Commercial Kitchen Cleaning
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-oswald)] text-sm font-medium uppercase tracking-wider text-secondary-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PORTAL_URL}
            className="font-[family-name:var(--font-oswald)] text-sm font-medium uppercase tracking-wider text-secondary-foreground/60 transition-colors hover:text-primary"
          >
            Customer Login
          </a>
          <Link
            href={PHONE_TEL}
            className="flex items-center gap-2 text-sm font-semibold text-secondary-foreground/90 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>{PHONE_DISPLAY}</span>
          </Link>
          <Button
            asChild
            className="bg-primary font-[family-name:var(--font-oswald)] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
          >
            <a href="/#quote">Get a Quote</a>
          </Button>
        </nav>

        <button
          className="text-secondary-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#141414] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-[family-name:var(--font-oswald)] text-sm font-medium uppercase tracking-wider text-secondary-foreground/80 transition-colors hover:bg-white/5 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PORTAL_URL}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-[family-name:var(--font-oswald)] text-sm font-medium uppercase tracking-wider text-secondary-foreground/60 transition-colors hover:bg-white/5 hover:text-primary"
            >
              Customer Login
            </a>
            <Link
              href={PHONE_TEL}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-white/5 hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>{PHONE_DISPLAY}</span>
            </Link>
            <Button
              asChild
              className="mt-2 bg-primary font-[family-name:var(--font-oswald)] font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <a href="/#quote" onClick={() => setMobileMenuOpen(false)}>
                Get a Quote
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
