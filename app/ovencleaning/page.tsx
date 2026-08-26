import type { Metadata } from "next"
import { Flame } from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "Commercial Oven Cleaning | Dirty Dawgz Michigan",
  description:
    "Dirty Dawgz provides professional commercial oven cleaning for restaurants and pizza shops across Michigan. Deep cleaning for conveyor ovens and commercial kitchen equipment.",
}

export default function OvenCleaningPage() {
  return (
    <ServicePageLayout
      title="Commercial Conveyor Oven Cleaning"
      subtitle="Oven Cleaning Experts"
      icon={Flame}
      schemaServiceName="Commercial Oven Cleaning"
      schemaDescription="Professional commercial oven cleaning in Michigan for conveyor ovens, pizza ovens, and commercial cooking equipment, including deep cleaning of belts, chambers, and heating elements."
      heroDescription="Conveyor ovens are the backbone of high-volume commercial kitchens. When grease, carbon, and food debris build up, your oven works harder, cooks unevenly, and becomes a serious fire hazard. The Dirty Dawgz bring your oven back to factory-clean condition so your kitchen runs at peak performance."
      whyTitle="Why Regular Oven Cleaning Is Critical"
      whyPoints={[
        {
          heading: "Fire Prevention",
          text: "Grease and carbon buildup inside conveyor ovens is one of the leading causes of commercial kitchen fires. Regular professional cleaning dramatically reduces this risk, protecting your employees, customers, and investment.",
        },
        {
          heading: "Food Quality & Consistency",
          text: "A dirty oven produces inconsistent heat distribution, leading to unevenly cooked food. Customers notice the difference. Clean ovens mean consistent, high-quality results every time.",
        },
        {
          heading: "Energy Efficiency",
          text: "Buildup forces your oven to work harder and consume more energy to reach the same temperatures. A professionally cleaned oven operates more efficiently, which means lower utility bills month after month.",
        },
        {
          heading: "Equipment Longevity",
          text: "Commercial conveyor ovens are a major capital investment. Routine deep cleaning prevents corrosion and wear caused by baked-on grease, extending the lifespan of your equipment and avoiding costly early replacements.",
        },
        {
          heading: "Health Code Compliance",
          text: "Health inspectors pay close attention to oven cleanliness. Failing an inspection can mean fines, closures, or damage to your reputation. Stay ahead of inspections with scheduled professional cleanings.",
        },
        {
          heading: "Reduced Downtime",
          text: "A well-maintained oven breaks down less often. By preventing buildup-related mechanical issues, you avoid unexpected downtime that costs you money and frustrates your team.",
        },
      ]}
      processTitle="Factory-Clean, Piece by Piece"
      process={[
        {
          step: "Disassembly",
          detail:
            "Conveyor belts, crumb trays, fingers, and access panels removed so nothing gets cleaned 'around.'",
        },
        {
          step: "Deep Clean",
          detail:
            "Baked-on carbon and grease stripped from chambers, belts, and components with commercial-grade degreasers and tooling.",
        },
        {
          step: "Reassembly & Check",
          detail:
            "Everything reassembled and checked so your oven is ready for the next shift, not sitting in pieces.",
        },
        {
          step: "Walkthrough & Photos",
          detail:
            "A before/after walkthrough with photo documentation, so you see exactly what was done.",
        },
      ]}
      faq={[
        {
          question: "What types of commercial ovens do you clean?",
          answer:
            "We clean conveyor ovens -- including XLT, Middleby Marshall, and similar brands -- along with pizza ovens, deck ovens, and other commercial cooking equipment used in restaurants, pizza shops, and commercial kitchens across Michigan.",
        },
        {
          question: "How long does a commercial oven cleaning take?",
          answer:
            "Most conveyor oven deep cleanings are completed in a single visit, scheduled during your off-hours so the oven is cool to start and back in production for your next shift. Timing depends on oven size and buildup, and we confirm it in your quote.",
        },
        {
          question: "Will cleaning interrupt my kitchen's schedule?",
          answer:
            "No. We work nights, early mornings, and off-days around your operating hours. The goal is that the only difference your crew notices is an oven that looks and runs like new.",
        },
        {
          question: "Why does a clean conveyor oven matter for food quality?",
          answer:
            "Carbon buildup changes how heat moves through the chamber, which causes uneven bakes and off flavors. A clean oven restores even heat distribution and consistent cook times, and it uses less energy doing it.",
        },
        {
          question: "Do you offer recurring oven cleaning schedules?",
          answer:
            "Yes -- most of our oven customers are on a recurring plan. We track your interval based on your volume and contact you when a cleaning is due, so the oven never gets back to 'never been cleaned' condition.",
        },
      ]}
      frequencyTitle="How Often Should You Clean Your Conveyor Oven?"
      frequencyDescription="The right cleaning frequency depends on how heavily your oven is used. Here are our recommendations based on years of experience servicing Michigan commercial kitchens."
      frequencyItems={[
        {
          label: "High-Volume Operations",
          detail:
            "Pizza chains, sub shops, and bakeries running ovens 12+ hours daily should schedule professional deep cleaning every 1-2 months.",
        },
        {
          label: "Moderate-Volume Kitchens",
          detail:
            "Restaurants and cafeterias with steady daily use should have their conveyor ovens professionally cleaned every 3-4 months.",
        },
        {
          label: "Light-Use Environments",
          detail:
            "Catering operations or kitchens with intermittent conveyor oven use should schedule cleaning at least every 6 months.",
        },
        {
          label: "After Any Grease Event",
          detail:
            "If you notice smoke, unusual odors, or a grease flare-up, schedule an immediate deep cleaning regardless of your regular schedule.",
        },
      ]}
      guarantee={[
        "We clean every component of your conveyor oven -- belts, chambers, heating elements, exterior panels, and everything in between.",
        "If you are not 100% satisfied with the results, we will come back and re-clean at no additional cost.",
        "We work around your schedule -- evenings, weekends, and off-hours -- so you never lose a minute of production.",
        "Every job includes a detailed before-and-after walkthrough so you can see exactly what we did.",
        "Our technicians are fully trained, insured, and committed to treating your kitchen with the respect it deserves.",
      ]}
    />
  )
}
