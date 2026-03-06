import type { Metadata } from "next"
import { Wind } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Hood Vent Cleaning | Dirty Dawgz Oven Cleaning LLC",
  description:
    "Professional hood vent and exhaust cleaning services across Michigan. Learn about NFPA 96 compliance, recommended cleaning schedules, and our service guarantee.",
}

export default function HoodCleaningPage() {
  return (
    <ServicePageLayout
      title="Hood Vent Cleaning"
      subtitle="Hood & Exhaust Experts"
      icon={Wind}
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
