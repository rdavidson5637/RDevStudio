import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about RDev Studio — a creative studio based in Carrickfergus, Northern Ireland.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 inline-block border border-border-accent px-4 py-1.5 label-caps">
            Coming Soon
          </p>
          <h1 className="heading-display text-3xl sm:text-4xl">
            About RDev Studio
          </h1>
          <p className="mt-4 text-lg text-secondary">
            We&apos;re putting together our story. In the meantime, get to know
            us through our work or drop us a message.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/work" className="btn-primary">
              View our work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
