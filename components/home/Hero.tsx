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

          <h1 className="programme-h1 mb-6 text-balance md:text-7xl lg:text-8xl">
            <span className="hero-line block [animation-delay:0ms]">
              I design and build
            </span>
            <span className="hero-line block [animation-delay:60ms]">
              things for the web.
            </span>
          </h1>

          <p className="lead-text mb-10 max-w-xl">
            A personal portfolio of websites, apps, and side projects — plus{" "}
            <Link
              href={CHAMPIONS_DRAFT.href}
              className="pitch-link font-medium text-accent"
            >
              Champions Draft
            </Link>{" "}
            and{" "}
            <Link
              href={RUGBY_DRAFT.href}
              className="pitch-link font-medium text-accent"
            >
              Rugby Draft
            </Link>
            , two free squad builder games.
          </p>

          <div className="mb-10 grid min-h-[120px] grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
            <div className="bg-base px-4 py-3">
              <p className="shell-label text-secondary">PROJECTS SHIPPED</p>
              <p className="mt-1 text-2xl font-display text-primary sm:text-3xl">
                12
              </p>
            </div>
            <div className="bg-base px-4 py-3">
              <p className="shell-label text-secondary">GAMES BUILT</p>
              <p className="mt-1 text-2xl font-display text-primary sm:text-3xl">
                3
              </p>
            </div>
            <div className="bg-base px-4 py-3">
              <p className="shell-label text-secondary">YEARS BUILDING</p>
              <p className="mt-1 text-2xl font-display text-primary sm:text-3xl">
                2
              </p>
            </div>
            <div className="bg-base px-4 py-3">
              <p className="shell-label text-secondary">STATUS</p>
              <p className="mt-1 text-2xl font-display text-primary sm:text-3xl">
                LIVE
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/games"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              Play free games
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              View my work
            </Link>
            <Link
              href="/games"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:bg-accent-light"
            >
              More games
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
