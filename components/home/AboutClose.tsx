import Link from "next/link";
import { ABOUT_BLURB } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutClose() {
  return (
    <section id="about" className="section-padding border-t border-border bg-raised">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="About" title="A bit about me" />

          <p className="lead-text mt-8 text-lg sm:text-xl">{ABOUT_BLURB}</p>

          <p className="editorial-note mt-6">
            Open to freelance work — get in touch if something here caught your
            eye.
          </p>

          <Link href="/about" className="link-editorial mt-8 inline-flex items-center gap-2">
            More about me
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
