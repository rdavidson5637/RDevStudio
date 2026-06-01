import { PageHeader } from "@/components/ui/PageHeader";
import { PricingCard } from "@/components/services/PricingCard";
import { SupportSection } from "@/components/services/SupportSection";
import { FAQ } from "@/components/services/FAQ";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Simple, transparent pricing for local business websites. £650 for a 5-page site with hosting setup. Optional £30/month support in Northern Ireland.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <PageHeader
          title="Simple, Transparent Pricing"
          subtitle="No hidden fees. No confusing packages. Just a clean, fast website for your business."
        />
        <PricingCard />
        <SupportSection />
        <FAQ />
      </div>
    </div>
  );
}
