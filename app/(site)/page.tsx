import { Hero } from "@/components/home/Hero";
import { LiveStrip } from "@/components/home/LiveStrip";
import { ClientWork } from "@/components/home/ClientWork";
import { WorkWithMe } from "@/components/home/WorkWithMe";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeFaq } from "@/components/home/HomeFaq";
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
      <WorkWithMe />
      <HomeProcess />
      <HomeFaq />
      <PortfolioPlay />
      <HomeContact />
    </>
  );
}
