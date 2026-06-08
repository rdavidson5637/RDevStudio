import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-base pb-20 pt-28 md:pb-28 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(245_158_11/0.06)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <span className="hero-bg-type hidden md:block" aria-hidden="true">
        RDEV
      </span>

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <p className="section-label mb-4 font-medium">RDev Studio</p>

          <h1 className="hero-heading mb-6 text-balance font-display text-6xl leading-none tracking-tight text-primary md:text-8xl">
            We build brands that work online.
          </h1>

          <p className="hero-sub mb-3 max-w-xl text-lg text-white/60">
            NI-based. UK-ready. Built to make your business look brilliant
            online.
          </p>

          <p className="hero-trust mb-10 text-sm tracking-wide text-white/35">
            ★ Websites from £650 &nbsp;·&nbsp; Live in 7 days &nbsp;·&nbsp; No
            agency fees
          </p>

          <div className="hero-ctas flex flex-wrap gap-4">
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
    </section>
  );
}
