import type { Metadata } from "next"
import { Wind } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Commercial Hood Cleaning Michigan | NFPA 96 Kitchen Exhaust Cleaning | Dirty Dawgz",
  description:
    "Professional commercial hood cleaning in Michigan. NFPA 96 compliant restaurant hood and kitchen exhaust system cleaning for hoods, filters, ductwork, and rooftop fans, with before & after documentation and a certificate of service.",
  keywords: [
    "commercial hood cleaning Michigan",
    "restaurant hood cleaning Michigan",
    "kitchen hood cleaning Michigan",
    "commercial kitchen exhaust cleaning",
    "NFPA 96 hood cleaning",
    "hood cleaning near me",
    "kitchen exhaust system cleaning",
  ],
  alternates: { canonical: "/hoodcleaning" },
  openGraph: {
    title: "Commercial Hood Cleaning Michigan | Dirty Dawgz",
    description:
      "NFPA 96 compliant restaurant hood and kitchen exhaust cleaning across Michigan for hoods, filters, ductwork, and rooftop fans, fully documented.",
    url: "/hoodcleaning",
    type: "website",
  },
}

export default function HoodCleaningPage() {
  return (
    <ServicePageLayout
      title="Commercial Restaurant Hood Cleaning in Michigan"
      subtitle="Hood & Exhaust Experts"
      icon={Wind}
      path="/hoodcleaning"
      schemaServiceName="Commercial Hood Cleaning"
      schemaDescription="NFPA 96 compliant commercial kitchen hood and exhaust system cleaning in Michigan, including hoods, filters, plenums, ductwork, and rooftop exhaust fans."
      heroDescription="Your exhaust hood system is your kitchen's first line of defense against grease fires. From filters to rooftop fans, grease accumulates in every component over time -- creating a dangerous and code-violating environment. The Dirty Dawgz clean your entire hood system top to bottom, ensuring NFPA 96 compliance and total peace of mind."
      whyTitle="Why Professional Hood Cleaning Is Non-Negotiable"
      whyPoints={[
        {
          heading: "Fire Safety",
          text: "Grease-laden ductwork and hood systems are the number one cause of restaurant fires in the United States. A single spark from your cooking line can ignite accumulated grease in seconds. Professional cleaning is your best defense.",
        },
        {
          heading: "NFPA 96 Compliance",
          text: "The National Fire Protection Association requires commercial kitchens to maintain clean hood systems. Insurance companies and fire marshals enforce these standards strictly. Non-compliance can void your insurance and shut you down.",
        },
        {
          heading: "Insurance Requirements",
          text: "Most commercial kitchen insurance policies require documented, regular hood vent cleanings. Without proof of maintenance, a fire-related claim could be denied entirely -- leaving you on the hook for the full cost of damages.",
        },
        {
          heading: "Improved Air Quality",
          text: "A grease-clogged exhaust system cannot properly ventilate smoke, steam, and cooking fumes. This creates an uncomfortable and potentially hazardous work environment for your staff and can affect the dining experience for customers.",
        },
        {
          heading: "System Performance",
          text: "When grease restricts airflow through your hood system, fans work harder and less efficiently. Clean ductwork means better ventilation, lower energy costs, and less strain on expensive exhaust equipment.",
        },
        {
          heading: "Protect Your Reputation",
          text: "A grease fire or a failed inspection can make local news and permanently damage your reputation. Proactive hood maintenance shows customers, employees, and inspectors that safety is your top priority.",
        },
      ]}
      processTitle="Hood-to-Rooftop, Every Time"
      process={[
        {
          step: "Filters & Hood Interior",
          detail:
            "Baffle filters pulled and degreased, hood canopy and plenum scraped and cleaned down to bare stainless steel.",
        },
        {
          step: "Ductwork",
          detail:
            "Vertical and horizontal duct runs cleaned from access panels, removing the grease buildup that fuels duct fires.",
        },
        {
          step: "Rooftop Exhaust Fans",
          detail:
            "Fan blades, housings, and grease containment cleaned and inspected. We flag worn belts and drainage issues while we're up there.",
        },
        {
          step: "Documentation & Certificate",
          detail:
            "Before/after photos of the full system, a written service report, and an NFPA 96 certificate of completion for your records and insurer.",
        },
      ]}
      frequencyTitle="How Often Should You Clean Your Hood System?"
      frequencyDescription="NFPA 96 provides clear guidelines based on cooking volume and type. Here are the recommended cleaning intervals to keep your kitchen safe and compliant."
      frequencyItems={[
        {
          label: "High-Volume Cooking (Monthly)",
          detail:
            "24-hour operations, charbroiling, wok cooking, and wood/coal-burning operations require monthly hood cleaning per NFPA 96 standards.",
        },
        {
          label: "Moderate-Volume Cooking (Quarterly)",
          detail:
            "Full-service restaurants with standard grills, fryers, and ranges should schedule professional hood cleaning every 3 months.",
        },
        {
          label: "Low-Volume Cooking (Semi-Annually)",
          detail:
            "Churches, day camps, seasonal kitchens, and light-cooking operations should have their hood systems cleaned every 6 months.",
        },
        {
          label: "Minimal Grease (Annually)",
          detail:
            "Steam-only operations, pizza ovens (without charbroiling), and kitchens producing minimal grease-laden vapors may qualify for annual cleaning.",
        },
      ]}
      faq={[
        {
          question: "What does commercial hood cleaning include?",
          answer:
            "A complete NFPA 96 hood cleaning covers the entire kitchen exhaust system: baffle filters, the hood canopy and plenum, accessible ductwork, and the rooftop exhaust fan. Dirty Dawgz cleans the full system on every visit and documents it with before and after photos, a written service report, and a certificate of completion.",
        },
        {
          question: "How often does NFPA 96 require hood cleaning?",
          answer:
            "It depends on your cooking volume: monthly for solid-fuel and 24-hour high-volume cooking, quarterly for most full-service restaurants, semi-annually for low-volume kitchens like churches and seasonal operations, and annually for minimal-grease operations such as steam-only kitchens. Your fire marshal and insurance carrier expect the interval that matches your cooking type.",
        },
        {
          question: "Do you clean rooftop exhaust fans too?",
          answer:
            "Yes. The rooftop fan is where a huge amount of grease ends up, and skipping it leaves the system out of compliance. Our crews are trained and insured for rooftop work, and fan blades, housings, and grease containment are part of every full hood cleaning.",
        },
        {
          question: "Will hood cleaning shut down my kitchen?",
          answer:
            "No. We schedule hood cleanings overnight, early morning, or during whatever window your kitchen is closed, so the system is clean and dry before your next service. Most cleanings are completed in a single visit.",
        },
        {
          question: "Do I get proof of cleaning for my insurance company?",
          answer:
            "Every hood cleaning includes before and after photos, a written report, and an NFPA 96 certificate of completion. That documentation is exactly what insurance carriers and fire inspectors ask to see.",
        },
        {
          question: "What areas of Michigan do you serve?",
          answer:
            "Dirty Dawgz provides commercial hood cleaning across the entire state of Michigan, from the Indiana border to the Upper Peninsula. We serve single-location restaurants and multi-location groups on recurring schedules.",
        },
      ]}
      guarantee={[
        "We clean every inch of your hood system -- filters, ducts, fans, and the hood interior -- from the kitchen to the rooftop.",
        "If any area does not meet our standards or yours, we will re-clean it at absolutely no cost.",
        "Every job is performed to NFPA 96 standards, and we provide a certificate of completion for your records and insurance.",
        "We photograph the before and after condition of your entire system so you have documented proof of service.",
        "Our crew is fully insured and trained to work safely on rooftops, ladders, and in tight mechanical spaces.",
      ]}
    />
  )
}
