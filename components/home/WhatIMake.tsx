import Link from "next/link";
import { PORTFOLIO_AREAS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhatIMake() {
  return (
    <section className="section-padding border-t border-border bg-raised">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="Explore"
          title="What you'll find here"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PORTFOLIO_AREAS.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="group flex flex-col rounded-xl border border-border bg-base/60 p-6 transition-all hover:border-accent/30 hover:bg-base sm:p-8"
            >
              <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">
                {area.title}
              </h3>
              <p className="lead-text mt-3 flex-1 text-base">{area.description}</p>
              <span className="link-editorial mt-6 inline-flex items-center gap-2 text-sm">
                {area.cta}
                <span
                  className="transition-transform duration-normal ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
