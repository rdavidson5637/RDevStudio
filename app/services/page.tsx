import { PageHeader } from "@/components/ui/PageHeader";
import { PricingCard } from "@/components/services/PricingCard";
import { ServicePricingCard } from "@/components/services/ServicePricingCard";
import { SupportSection } from "@/components/services/SupportSection";
import { FAQ } from "@/components/services/FAQ";
import {
  CONTENT_CREATION_FEATURES,
  SOCIAL_MEDIA_FEATURES,
} from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Website design from £650, social media management from £150/month, and content creation from £200/project. Based in Carrickfergus, serving businesses across Northern Ireland.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <PageHeader
          title="Services & Pricing"
          subtitle="Websites, social media, and content — clear pricing, no hidden fees."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <PricingCard />
          <ServicePricingCard
            label="Social Media Management"
            price="From £150/month"
            priceNote="Monthly retainer · Cancel anytime"
            description="Strategy, scheduling, and content — your social channels handled properly so you can focus on running your business."
            features={SOCIAL_MEDIA_FEATURES}
            ctaLabel="Get in touch"
          />
          <ServicePricingCard
            label="Content Creation"
            price="From £200/project"
            priceNote="Per project · Scoped to your needs"
            description="Posts, copy, graphics, and branded visuals that sound and look like you — created to be used across your site and socials."
            features={CONTENT_CREATION_FEATURES}
            ctaLabel="Get in touch"
          />
        </div>
        <SupportSection />
        <FAQ />
      </div>
    </div>
  );
}
