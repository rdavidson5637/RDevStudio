import { Hero } from "@/components/home/Hero";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { ServicePreview } from "@/components/home/ServicePreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "RDev Studio builds modern, affordable websites for local businesses in Northern Ireland. Restaurants, tradespeople, and salons — live in 7 days from £650.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <ServicePreview />
      <HowItWorks />
    </>
  );
}
