const items = [
  "Commercial Kitchen Specialists",
  "Michigan Based & Operated",
  "Fully Insured",
  "Before & After Documentation",
  "NFPA 96 Standard Hood Cleaning",
  "Flexible Off-Hours Scheduling",
]

export function TrustTicker() {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex flex-shrink-0 items-center"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-[0.25em] text-secondary-foreground/70"
        >
          {item}
          <span className="h-2 w-2 rotate-45 bg-primary" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="dd-marquee overflow-hidden border-y border-white/10 bg-[#0e0e0e] py-4">
      <div className="dd-marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
