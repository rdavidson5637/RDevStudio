import Link from "next/link";

export function WorkCTA() {
  return (
    <section className="mt-16 border border-border bg-raised px-8 py-12 text-center sm:px-12">
      <h2 className="heading-display text-2xl sm:text-3xl">
        Like what you see?
      </h2>
      <p className="lead-text mx-auto mt-4 max-w-xl">
        I&apos;m always open to new projects, collaborations, or a conversation
        about what you&apos;re building.
      </p>
      <Link href="/contact" className="btn-primary mt-8">
        Get in touch
      </Link>
    </section>
  );
}
