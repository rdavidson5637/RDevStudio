import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RevealRoot } from "@/components/mock-a/RevealRoot";
import { MockActionBar, MockFooter, MockHeader } from "@/components/mock-a/Shell";
import s from "@/components/mock-a/mockA.module.css";

// MOCK A: experimental redesign for side-by-side comparison. Not linked from the live nav,
// not in app/sitemap.ts, and not indexed.
export const metadata: Metadata = {
  title: { absolute: "Mock A | RDev Studio" },
  description: "Mock A: a bold and modern redesign concept for RDev Studio. Not the live site.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function MockALayout({ children }: { children: ReactNode }) {
  return (
    <RevealRoot className={s.root}>
      <a href="#main" className={s.skip}>
        Skip to content
      </a>
      <MockHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <MockFooter />
      <MockActionBar />
    </RevealRoot>
  );
}
