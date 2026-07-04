import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WhatIMake } from "@/components/home/WhatIMake";
import { PortfolioPlay } from "@/components/home/PortfolioPlay";
import { AboutClose } from "@/components/home/AboutClose";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Ryan Davidson — web designer and developer in Northern Ireland. Portfolio, free business tools, browser games, and client work from RDev Studio.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhatIMake />
      <PortfolioPlay />
      <AboutClose />
      <HomeContact />
    </>
  );
}
