import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

      <div className="container-narrow relative section-padding pb-16 lg:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-4 py-2 text-sm font-medium text-accent shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Carrickfergus · Northern Ireland
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Modern Websites for{" "}
            <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
              Local Businesses
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-text sm:text-xl">
            We build fast, affordable websites for restaurants, tradespeople,
            and salons across Northern Ireland. Live in 7 days or less.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/work" className="btn-primary w-full sm:w-auto">
              See Our Work
            </Link>
            <Link href="/contact" className="btn-secondary w-full sm:w-auto">
              Get a Free Quote
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-10 sm:grid-cols-4">
            {[
              { label: "Starting from", value: "£500" },
              { label: "Typical delivery", value: "7 days" },
              { label: "Pages included", value: "5" },
              { label: "Based in", value: "NI" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-navy">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
