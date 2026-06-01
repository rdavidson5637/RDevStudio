import Link from "next/link";

export function WorkCTA() {
  return (
    <section className="mt-16 rounded-2xl bg-navy px-8 py-12 text-center text-white sm:px-12">
      <h2 className="text-2xl font-bold sm:text-3xl">
        Your business could be next
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-slate-muted">
        Whether you run a restaurant, salon, or trade business — we&apos;ll
        build a website that works as hard as you do.
      </p>
      <Link href="/contact" className="btn-primary mt-8">
        Start Your Project
      </Link>
    </section>
  );
}
