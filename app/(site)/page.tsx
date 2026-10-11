import { Hero } from "@/components/home/Hero";
import { LiveStrip } from "@/components/home/LiveStrip";
import { ClientWork } from "@/components/home/ClientWork";
import { UnderTheHood } from "@/components/home/UnderTheHood";
import { WorkWithMe } from "@/components/home/WorkWithMe";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ClosingCta } from "@/components/home/ClosingCta";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and charities",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and charities. Clear packages, straight prices, based in Carrickfergus.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-bg">
      <Hero />
      <LiveStrip />
      <ClientWork />
      <UnderTheHood />
      <WorkWithMe />
      <HomeProcess />
      <HomeFaq />
      <ClosingCta />
    </div>
  );
}
