import Link from "next/link";
import { CHAMPIONS_DRAFT } from "@/lib/champions-draft-feature";
import { RUGBY_DRAFT } from "@/lib/rugby-draft-feature";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-base pb-20 pt-28 md:pb-28 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(245_158_11/0.08)_0%,transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgb(16_185_129/0.06)_0%,transparent_45%)]"
        aria-hidden="true"
      />

      <span className="hero-bg-type hidden md:block" aria-hidden="true">
        RDEV
      </span>

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label mb-4 font-medium">Ryan Davidson</p>

          <h1 className="hero-heading mb-6 text-balance font-display text-5xl leading-[1.05] tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">
            I design and build things for the web.
          </h1>

          <p className="hero-sub lead-text mb-10 max-w-xl">
            A personal portfolio of websites, apps, and side projects — plus{" "}
            <Link
              href={CHAMPIONS_DRAFT.href}
              className="font-medium text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 transition-colors hover:text-emerald-300"
            >
              Champions Draft
            </Link>{" "}
            and{" "}
            <Link
              href={RUGBY_DRAFT.href}
              className="font-medium text-sky-400 underline decoration-sky-400/30 underline-offset-4 transition-colors hover:text-sky-300"
            >
              Rugby Draft
            </Link>
            , two free squad builder games.
          </p>

          <div className="hero-ctas flex flex-wrap gap-4">
            <Link
              href="/bored"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              Play free games
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
            >
              View my work
            </Link>
            <Link
              href="/bored"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-white/50 hover:bg-white/5"
            >
              More games
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
