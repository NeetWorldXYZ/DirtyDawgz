import type { Metadata } from "next"
import { Droplets } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Grease Trap Cleaning | Dirty Dawgz Michigan",
  description:
    "Dirty Dawgz provides commercial grease trap cleaning for restaurants across Michigan. Professional service to help keep kitchen systems clean and operating efficiently.",
}

export default function GreaseTrapCleaningPage() {
  return (
    <ServicePageLayout
      title="Grease Trap Cleaning"
      subtitle="Grease Trap Specialists"
      icon={Droplets}
      heroDescription="A clogged or neglected grease trap can shut down your kitchen in an instant. Overflows, sewer backups, foul odors, and hefty fines are all preventable with proper maintenance. The Dirty Dawgz pump, scrape, and restore your grease trap to full capacity -- keeping your kitchen compliant and running smoothly."
      whyTitle="Why Regular Grease Trap Cleaning Is Essential"
      whyPoints={[
        {
          heading: "Prevent Costly Backups",
          text: "When a grease trap overflows, it can flood your kitchen floor, contaminate food prep areas, and force an immediate shutdown. Professional cleaning ensures your trap never reaches critical capacity.",
        },
        {
          heading: "Avoid Fines & Violations",
          text: "Local municipalities require grease traps to be maintained on a regular schedule. Non-compliance can result in significant fines, mandatory closures, and even legal action. Stay compliant with scheduled cleanings.",
        },
        {
          heading: "Eliminate Foul Odors",
          text: "An overdue grease trap produces a rancid smell that can permeate your entire kitchen and dining area. Regular pump-outs eliminate odor at the source, keeping your establishment pleasant for staff and guests.",
        },
        {
          heading: "Protect Your Plumbing",
          text: "Grease that escapes a neglected trap coats your sewer lines, causing slow drains and expensive plumbing repairs. Keeping your trap clean protects the entire plumbing system downstream.",
        },
        {
          heading: "Environmental Responsibility",
          text: "Fats, oils, and grease that enter the municipal sewer system cause major environmental damage. Proper grease trap maintenance keeps harmful waste out of local waterways and treatment facilities.",
        },
        {
          heading: "Pass Inspections with Confidence",
          text: "Health and environmental inspectors check grease trap maintenance records. With the Dirty Dawgz on your schedule, you will always have up-to-date records and a spotless trap ready for inspection.",
        },
      ]}
      frequencyTitle="How Often Should You Clean Your Grease Trap?"
      frequencyDescription="Cleaning frequency varies based on your trap size and kitchen volume. Here are our guidelines based on industry best practices and Michigan regulations."
      frequencyItems={[
        {
          label: "High-Volume Restaurants",
          detail:
            "Full-service restaurants, fryers-heavy operations, and high-output kitchens should schedule grease trap cleaning every 1-3 months.",
        },
        {
          label: "Moderate-Volume Kitchens",
          detail:
            "Casual dining, cafeterias, and mid-size operations typically need cleaning every 3-4 months to stay within safe capacity.",
        },
        {
          label: "Low-Volume Establishments",
          detail:
            "Coffee shops, delis, and light-cooking operations should pump their grease trap at least every 6 months.",
        },
        {
          label: "The 25% Rule",
          detail:
            "Industry standard dictates that a grease trap should be cleaned when fats, oils, and grease reach 25% of the trap's total capacity. We can inspect and advise on your specific schedule.",
        },
      ]}
      guarantee={[
        "We perform a complete pump-out, wall scraping, and baffle cleaning -- not just a surface-level pump.",
        "If you are not 100% satisfied with our work, we will return and re-service your grease trap at no extra charge.",
        "We handle all waste disposal in compliance with local and state environmental regulations.",
        "Every service includes a written report with capacity readings and maintenance recommendations for your records.",
        "Flexible scheduling available -- we work around your operating hours so your kitchen never skips a beat.",
      ]}
    />
  )
}
