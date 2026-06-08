import Link from "next/link";

const REVEAL_DELAYS = [
  "hero-reveal-delay-1",
  "hero-reveal-delay-2",
  "hero-reveal-delay-3",
  "hero-reveal-delay-4",
  "hero-reveal-delay-5",
] as const;

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
          <p className={`label-caps hero-reveal ${REVEAL_DELAYS[0]}`}>
            RDev Studio
          </p>

          <h1 className="mt-5 text-balance sm:mt-8">
            <span
              className={`block font-display text-hero font-extrabold tracking-tight text-primary hero-reveal ${REVEAL_DELAYS[1]}`}
            >
              We build brands
            </span>
            <span
              className={`block font-display text-hero font-extrabold tracking-tight text-primary hero-reveal ${REVEAL_DELAYS[2]}`}
            >
              that work online.
            </span>
          </h1>

          <span className="hero-accent-line mt-6 sm:mt-8" aria-hidden="true" />

          <p
            className={`mt-5 max-w-xl text-base leading-relaxed text-secondary sm:mt-6 sm:text-lg hero-reveal ${REVEAL_DELAYS[3]}`}
          >
            Website design, social media, and content for small businesses —
            based in Carrickfergus, working with clients anywhere.
          </p>

          <div className={`mt-8 sm:mt-10 hero-reveal ${REVEAL_DELAYS[4]}`}>
            <p className="text-sm text-secondary">
              Websites from £650 · £30/month ongoing support
            </p>
            <div className="mt-5 sm:mt-6">
              <Link href="#work" className="btn-secondary">
                See our work
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 hero-reveal ${REVEAL_DELAYS[4]} lg:block`}
        aria-hidden="true"
      >
        <span className="block h-8 w-px bg-border-strong" />
      </div>
    </section>
  );
}
