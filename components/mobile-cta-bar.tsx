import Link from "next/link"
import { Phone, FileText } from "lucide-react"
import { PHONE_TEL } from "@/lib/site"

/** Persistent bottom CALL | GET QUOTE bar on mobile. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-white/10 md:hidden">
      <Link
        href={PHONE_TEL}
        className="flex items-center justify-center gap-2 bg-[#141414] py-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-[0.2em] text-white active:bg-[#1f1f1f]"
      >
        <Phone className="h-4 w-4 text-primary" />
        Call
      </Link>
      <Link
        href="/#quote"
        className="flex items-center justify-center gap-2 bg-primary py-4 font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground active:bg-primary/90"
      >
        <FileText className="h-4 w-4" />
        Get Quote
      </Link>
    </div>
  )
}
