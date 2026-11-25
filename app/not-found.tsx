import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/studio/SiteChrome";
import "./(site)/studio.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on RDev Studio. It may have moved, or the link was wrong.",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <div className="max-w-2xl pb-16">
          <p className="mb-kicker">404</p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">That page isn&apos;t here</h1>
          <p className="mb-lede mt-5">It may have moved, or the link was wrong.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link href="/" className="mb-btn-primary w-full sm:w-auto">
              Back to the homepage
            </Link>
            <Link href="/work" className="mb-text-link">
              Work
            </Link>
            <Link href="/contact" className="mb-text-link">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
