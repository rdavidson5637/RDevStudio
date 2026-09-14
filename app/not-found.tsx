import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page Not Found - RDev Studio",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Header />
      <main className="section-padding flex min-h-[60vh] items-center justify-center pt-28">
        <div className="container-wide max-w-2xl px-6 text-center">
          <p className="shell-label text-accent">FULL TIME WHISTLE</p>

          <h1 className="mt-4 font-display text-[8rem] uppercase leading-none tracking-tight text-primary sm:text-[12rem]">
            404
          </h1>

          <div className="mx-auto mt-2 flex max-w-xs items-center justify-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <p className="shell-label text-secondary">PAGE NOT FOUND</p>
            <span className="h-px flex-1 bg-border" />
          </div>

          <p className="mt-8 text-base leading-relaxed text-secondary sm:text-lg">
            Looks like this page got sent off. It either doesn&apos;t exist or
            has been moved to a different URL.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/work" className="btn-secondary">
              View my work
            </Link>
          </div>

          <div className="mt-16 rounded-lg border border-border bg-raised p-6">
            <p className="shell-label mb-3 text-secondary">MATCH STATS</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-primary">0</p>
                <p className="shell-label text-secondary">PAGES</p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary">404</p>
                <p className="shell-label text-secondary">ERROR</p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary">1</p>
                <p className="shell-label text-secondary">RED CARD</p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-sm text-tertiary">
            If you followed a link here, it might be broken. Feel free to{" "}
            <Link href="/contact" className="text-accent hover:underline">
              let me know
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
