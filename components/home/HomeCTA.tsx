import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center shadow-glow sm:px-16 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Ready to get your business online?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Book a free, no-pressure chat. We&apos;ll talk through what you
              need and give you a clear quote — usually the same day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
