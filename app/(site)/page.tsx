import { ClientWork } from "@/components/home/ClientWork";
import { Costs } from "@/components/home/Costs";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { Pitch } from "@/components/home/Pitch";
import { TellMe } from "@/components/home/TellMe";
import { UnderTheHood } from "@/components/home/UnderTheHood";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and charities",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and charities. Clear packages, straight prices, based in Carrickfergus.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Hero />
      <Pitch />
      <UnderTheHood />
      <Costs />
      <ClientWork />
      <HomeFaq />
      <TellMe />
    </div>
  );
}
