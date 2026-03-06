"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Dirty Dawgz Oven Cleaning LLC logo"
            width={72}
            height={72}
            className="rounded-full"
          />
          <div className="hidden sm:block">
            <p className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase leading-tight tracking-wide text-primary-foreground">
              Dirty Dawgz
            </p>
            <p className="font-[family-name:var(--font-oswald)] text-[10px] uppercase tracking-widest text-primary-foreground/70">
              Oven Cleaning LLC
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="#why-us"
            className="text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
          >
            Why Us
          </Link>
          <Link
            href="#service-area"
            className="text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
          >
            Service Area
          </Link>
          <Link
            href="#quote"
            className="text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
          >
            Get a Quote
          </Link>
          <Link
            href="tel:2692481209"
            className="flex items-center gap-2 text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>(269) 248-1209</span>
          </Link>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#quote">Request a Quote</Link>
          </Button>
        </nav>

        <button
          className="md:hidden text-secondary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-secondary-foreground/10 bg-secondary md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/5 hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/5 hover:text-primary"
            >
              Why Us
            </Link>
            <Link
              href="#service-area"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/5 hover:text-primary"
            >
              Service Area
            </Link>
            <Link
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/5 hover:text-primary"
            >
              Get a Quote
            </Link>
            <Link
              href="tel:2692481209"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/5 hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>(269) 248-1209</span>
            </Link>
            <Button asChild className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#quote" onClick={() => setMobileMenuOpen(false)}>
                Request a Quote
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
