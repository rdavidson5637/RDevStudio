import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about RDev Studio — a local web design agency based in Carrickfergus, Northern Ireland.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Coming Soon
          </p>
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">
            About RDev Studio
          </h1>
          <p className="mt-4 text-lg text-slate-text">
            We&apos;re putting together our story. In the meantime, get to know
            us through our work or drop us a message.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/work" className="btn-primary">
              View Our Work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
