import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesTrio } from "@/components/home/ServicesTrio";
import { HowWeWork } from "@/components/home/HowWeWork";
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
      <SelectedWork />
      <ServicesTrio />
      <HowWeWork />
      <AboutClose />
      <HomeContact />
    </>
  );
}
