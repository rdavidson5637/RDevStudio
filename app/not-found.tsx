import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on RDev Studio. It may have moved, or the link was wrong.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-studio-bg font-studio-sans text-studio-text">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-studio px-6 py-16 md:px-8 md:py-24">
          <h1 className="display-lg max-w-[14ch] text-balance">That page isn&apos;t here</h1>
          <p className="type-body mt-5 max-w-prose text-studio-muted">
            It may have moved, or the link was wrong.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/">Back to the homepage</Button>
            <Button href="/work" variant="secondary">
              Work
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
