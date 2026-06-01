import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="container-narrow relative section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Carrickfergus · Northern Ireland
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Modern Websites for{" "}
            <span className="text-accent">Local Businesses</span>
          </h1>
          <p className="mt-6 text-lg text-slate-text sm:text-xl">
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
        </div>
      </div>
    </section>
  );
}
