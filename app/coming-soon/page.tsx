import type { Metadata } from "next";
import { ComingSoonFooter } from "@/components/coming-soon/ComingSoonFooter";
import { ComingSoonHero } from "@/components/coming-soon/ComingSoonHero";
import { ComingSoonProjects } from "@/components/coming-soon/ComingSoonProjects";
import { ComingSoonRoadmap } from "@/components/coming-soon/ComingSoonRoadmap";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: {
    absolute: "Coming Soon | RDev Studio",
  },
  description:
    "RDev Studio is building interactive web apps. Join the waitlist for early access.",
};

export default function ComingSoonPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#0A0A0F] font-sans text-[#f8fafc] antialiased"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <header className="sticky top-0 z-10 flex h-16 items-center border-b border-[#1F1F2E] bg-[#0A0A0F] px-6">
        <Logo dark />
      </header>

      <main>
        <ComingSoonHero />
        <ComingSoonProjects />
        <ComingSoonRoadmap />
        <ComingSoonFooter />
      </main>
    </div>
  );
}
