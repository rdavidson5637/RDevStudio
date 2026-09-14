import Link from "next/link";

const SCOREBOARD = [
  { label: "Based", value: "NI" },
  { label: "Packages", value: "3" },
  { label: "Status", value: "OPEN" },
  { label: "Years", value: "2" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-base pb-20 pt-28 md:pb-28 md:pt-36">
      <span className="hero-bg-type hidden md:block" aria-hidden="true">
        RDEV
      </span>

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label mb-4 font-medium">Kick-off</p>

          <h1 className="programme-h1 mb-6 text-balance md:text-7xl lg:text-8xl">
            <span className="hero-line block [animation-delay:0ms]">
              Websites for
            </span>
            <span className="hero-line block [animation-delay:60ms]">
              local
            </span>
            <span className="hero-line block [animation-delay:120ms]">
              businesses
            </span>
            <span className="hero-line block [animation-delay:180ms]">
              and charities.
            </span>
          </h1>

          <p className="lead-text mb-10 max-w-xl">
            Sites for Northern Ireland small businesses and charities. Clear
            packages, straight prices, one person from first message to launch.
          </p>

          <dl
            className="mb-10 grid min-h-[120px] grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4"
            aria-label="Studio scoreboard"
          >
            {SCOREBOARD.map((item) => (
              <div key={item.label} className="bg-base px-4 py-3">
                <dt className="shell-label text-secondary">{item.label}</dt>
                <dd className="mt-1 text-2xl font-display text-primary sm:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link href="/work" className="btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
