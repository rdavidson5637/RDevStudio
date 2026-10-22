import { ClientWork } from "@/components/home/ClientWork";
import { HomeFaq } from "@/components/home/HomeFaq";
import { OfferBand } from "@/components/home/OfferBand";
import { MoreBuilds } from "@/components/home/MoreBuilds";
import { Process } from "@/components/home/Process";
import { StoutFinderHero } from "@/components/home/StoutFinderHero";
import { StoutFinderHonest } from "@/components/home/StoutFinderHonest";
import { TellMe } from "@/components/home/TellMe";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Web design for NI businesses and charities",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and charities. Clear packages, straight prices, based in Carrickfergus.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <StoutFinderHero />
      <OfferBand />
      <ClientWork />
      <StoutFinderHonest />
      <Process />
      <MoreBuilds />
      <HomeFaq />
      <TellMe />
    </div>
  );
}
