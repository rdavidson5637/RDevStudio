import { Hero } from "@/components/home/Hero";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { SelectedWork } from "@/components/home/SelectedWork";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { PortfolioPlay } from "@/components/home/PortfolioPlay";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and charities",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and charities. Clear packages, straight prices, based in Carrickfergus.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesTrio />
      <SelectedWork />
      <HowItWorks />
      <SocialProofBar />
      <PortfolioPlay />
      <HomeContact />
    </>
  );
}
