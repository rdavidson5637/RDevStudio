import Link from "next/link";

export function MoreBuilds() {
  return (
    <section className="border-t border-studio-line bg-studio-bg">
      <div className="mx-auto max-w-studio px-6 md:px-8">
        <Link
          href="/projects"
          className="group flex min-h-11 items-center justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          <span>
            <span className="block font-studio-display text-2xl text-studio-text">
              More things I&apos;ve built
            </span>
            <span className="type-body mt-1 block text-studio-muted">
              Games, draft tools and the other projects that are not client work.
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-2xl text-studio-text transition-colors group-hover:text-studio-accent"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
