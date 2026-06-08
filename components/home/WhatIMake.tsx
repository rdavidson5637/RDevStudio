import Link from "next/link";
import { PORTFOLIO_AREAS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ACCENT_STYLES = {
  amber: {
    card: "border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-base/80 to-base/60 hover:border-amber-500/40 hover:from-amber-500/15",
    label: "text-amber-400",
    cta: "text-amber-400 group-hover:text-amber-300",
    glow: "bg-[radial-gradient(ellipse_at_0%_100%,rgb(245_158_11/0.12)_0%,transparent_60%)]",
  },
  emerald: {
    card: "border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-base/80 to-base/60 hover:border-emerald-500/40 hover:from-emerald-500/15",
    label: "text-emerald-400",
    cta: "text-emerald-400 group-hover:text-emerald-300",
    glow: "bg-[radial-gradient(ellipse_at_0%_100%,rgb(16_185_129/0.12)_0%,transparent_60%)]",
  },
  violet: {
    card: "border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-base/80 to-base/60 hover:border-violet-500/40 hover:from-violet-500/15",
    label: "text-violet-400",
    cta: "text-violet-400 group-hover:text-violet-300",
    glow: "bg-[radial-gradient(ellipse_at_0%_100%,rgb(139_92_246/0.12)_0%,transparent_60%)]",
  },
} as const;

export function WhatIMake() {
  return (
    <section className="section-padding relative overflow-hidden border-t border-border bg-base">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(245_158_11/0.04)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <div className="container-wide relative px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="Explore"
          title="What you'll find here"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PORTFOLIO_AREAS.map((area, index) => {
            const styles = ACCENT_STYLES[area.accent];

            return (
              <Link
                key={area.title}
                href={area.href}
                className={`group relative flex flex-col overflow-hidden rounded-xl border p-6 transition-all duration-normal ease-out sm:p-8 ${styles.card}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 ${styles.glow}`}
                  aria-hidden="true"
                />

                <span
                  className={`relative font-display text-sm font-semibold tracking-widest uppercase ${styles.label}`}
                >
                  0{index + 1}
                </span>

                <h3 className="relative mt-4 font-display text-xl font-bold text-primary sm:text-2xl">
                  {area.title}
                </h3>

                <p className="relative lead-text mt-3 flex-1 text-base">
                  {area.description}
                </p>

                <span
                  className={`relative mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors ${styles.cta}`}
                >
                  {area.cta}
                  <span
                    className="transition-transform duration-normal ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
