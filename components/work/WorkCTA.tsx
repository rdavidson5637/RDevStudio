import Link from "next/link";

export function WorkCTA() {
  return (
    <section className="mt-16 border border-border bg-raised px-8 py-12 text-center sm:px-12">
      <h2 className="heading-display text-2xl sm:text-3xl">
        Your business could be next
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-secondary">
        Whether you need a website, social presence, or content — we&apos;ll
        build something that works as hard as you do.
      </p>
      <Link href="/contact" className="btn-primary mt-8">
        Start a project
      </Link>
    </section>
  );
}
