import type { Metadata } from "next";
import { ComingSoonFooter } from "@/components/coming-soon/ComingSoonFooter";
import { ComingSoonHero } from "@/components/coming-soon/ComingSoonHero";
import { ComingSoonProjects } from "@/components/coming-soon/ComingSoonProjects";
import { ComingSoonRoadmap } from "@/components/coming-soon/ComingSoonRoadmap";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Coming Soon",
  description:
    "RDev Studio is building interactive web apps. Join the waitlist for early access.",
  path: "/coming-soon",
});

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoonHero />
      <ComingSoonProjects />
      <ComingSoonRoadmap />
      <ComingSoonFooter />
    </>
  );
}
