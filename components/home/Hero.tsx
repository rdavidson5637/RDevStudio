import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] min-h-[100dvh] items-center overflow-hidden bg-base">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(59_130_246/0.08)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <span className="hero-bg-type hidden md:block" aria-hidden="true">
        RDEV
      </span>

      <div className="container-wide relative z-10 w-full pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24">
        <div className="max-w-5xl">
          <p className="section-label">RDev Studio</p>

          <div className="mt-5 sm:mt-8">
            <h1 className="hero-heading text-balance font-display text-6xl leading-none tracking-tight text-primary md:text-8xl">
              We build brands that work online.
            </h1>

            <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
              NI-based. UK-ready. Built to make your business look brilliant
              online.
            </p>

            <p className="hero-trust mt-3 text-sm tracking-wide text-white/40">
              ★ Websites from £650 &nbsp;·&nbsp; Live in 7 days &nbsp;·&nbsp; No
              agency fees
            </p>

            <div className="hero-ctas mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-hover"
              >
                Start a project →
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-white transition-colors hover:border-white/60"
              >
                See our work
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <span className="block h-8 w-px bg-border-strong" />
      </div>
    </section>
  );
}
