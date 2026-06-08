import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { WhyWorkWithUs } from "@/components/home/WhyWorkWithUs";
import { AboutClose } from "@/components/home/AboutClose";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsRow />
      <SelectedWork />
      <ServicesTrio />
      <WhyWorkWithUs />
      <AboutClose />
      <HomeContact />
    </>
  );
}
