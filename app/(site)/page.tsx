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
    "The portfolio of Ryan Davidson - websites, web apps, and free games including Champions Draft and Rugby Draft from RDev Studio.",
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
