import { Hero } from "@/components/home/Hero";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Founder } from "@/components/home/Founder";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SiteCheck } from "@/components/home/SiteCheck";
import { PortfolioPlay } from "@/components/home/PortfolioPlay";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and charities",
  description:
    "Websites for Northern Ireland small businesses and charities. £650 fixed, live in about a week, designed and built in Carrickfergus. You own the result.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesTrio />
      <SelectedWork />
      <Founder />
      <HowItWorks />
      <SiteCheck />
      <PortfolioPlay />
      <HomeContact />
    </>
  );
}
