import type { Metadata } from "next"
import { Droplets } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Grease Trap Cleaning Michigan | Restaurant Grease Trap Service | Dirty Dawgz",
  description:
    "Commercial grease trap cleaning in Michigan. Full pump-outs, wall and baffle scraping, compliant disposal, and written service records for restaurants and commercial kitchens. Scheduled grease trap service across the state.",
  keywords: [
    "grease trap cleaning Michigan",
    "restaurant grease trap cleaning",
    "commercial grease trap cleaning",
    "grease trap service Michigan",
    "grease trap cleaning near me",
    "grease trap pumping",
  ],
}

export default function GreaseTrapCleaningPage() {
  return (
    <ServicePageLayout
      title="Commercial Grease Trap Cleaning in Michigan"
      subtitle="Grease Trap Specialists"
      icon={Droplets}
      schemaServiceName="Grease Trap Cleaning"
      schemaDescription="Commercial grease trap cleaning and pumping service for restaurants and commercial kitchens in Michigan, including full pump-outs, scraping, compliant disposal, and service records."
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
      processTitle="A Real Cleaning, Not Just a Pump"
      process={[
        {
          step: "Full Pump-Out",
          detail:
            "The trap is completely evacuated -- fats, oils, grease, and solids -- not skimmed off the top and left to refill.",
        },
        {
          step: "Wall & Baffle Scraping",
          detail:
            "Hardened grease is scraped from the walls, baffles, and inlet/outlet tees so the trap works at full design capacity.",
        },
        {
          step: "Inspection & Flow Check",
          detail:
            "We check baffles, tees, and flow, and flag problems before they become backups or failed inspections.",
        },
        {
          step: "Compliant Disposal & Records",
          detail:
            "Waste is disposed of per state and local regulations, and you receive a written service record with capacity readings for your files.",
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
      faq={[
        {
          question: "How often does a restaurant grease trap need to be cleaned?",
          answer:
            "Most full-service restaurants need grease trap cleaning every one to three months, and the industry-standard 25% rule says a trap should be cleaned whenever fats, oils, and grease reach a quarter of its capacity. Kitchen volume, fryer use, and trap size all matter -- we can inspect your trap and recommend the right interval.",
        },
        {
          question: "What's the difference between pumping and cleaning a grease trap?",
          answer:
            "A pump-only service removes the liquid contents and leaves hardened grease on the walls and baffles, so the trap loses capacity fast. A full cleaning -- what Dirty Dawgz does on every visit -- pumps the trap completely, scrapes the walls, baffles, and tees, and restores the trap to its full design capacity.",
        },
        {
          question: "Do you handle the waste disposal?",
          answer:
            "Yes. All grease trap waste is hauled and disposed of in compliance with Michigan state and local environmental regulations, and your service record documents it.",
        },
        {
          question: "Can grease trap cleaning be put on a recurring schedule?",
          answer:
            "That's the best way to do it. We track your service interval and contact you when your trap is due, so you never miss a cleaning or a compliance deadline. Recurring customers also get consistent records for inspectors.",
        },
        {
          question: "What areas of Michigan do you serve?",
          answer:
            "Dirty Dawgz provides grease trap cleaning throughout Michigan -- restaurants, bars, schools, and franchise kitchens, from single locations to multi-site groups.",
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
