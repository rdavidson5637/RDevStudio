import { Hero } from "@/components/home/Hero";
import { LiveStrip } from "@/components/home/LiveStrip";
import { ClientWork } from "@/components/home/ClientWork";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { HowItWorks } from "@/components/home/HowItWorks";
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
      <LiveStrip />
      <ClientWork />
      <ServicesTrio />
      <HowItWorks />
      <PortfolioPlay />
      <HomeContact />
    </>
  );
}
