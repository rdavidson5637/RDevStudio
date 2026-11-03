import { AboutLabTeaser } from "@/components/home/AboutLabTeaser";
import { CaseStudiesTeaser } from "@/components/home/CaseStudiesTeaser";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { Process } from "@/components/home/Process";
import { ProofStrip } from "@/components/home/ProofStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TellMe } from "@/components/home/TellMe";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and rescues, built in Carrickfergus",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and animal rescues. Clear from-prices, free packages for registered charities, based in Carrickfergus.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Hero />
      <ProofStrip />
      <ServicesGrid />
      <CaseStudiesTeaser />
      <Process />
      <AboutLabTeaser />
      <HomeFaq />
      <TellMe />
    </div>
  );
}
