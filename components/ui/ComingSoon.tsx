import Link from "next/link";

type ComingSoonProps = {
  title: string;
  blurb: string;
  points?: readonly string[];
  note?: string;
  link?: { href: string; label: string };
};

export function ComingSoon({
  title,
  blurb,
  points = [],
  note,
  link,
}: ComingSoonProps) {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <h1 className="font-studio-display text-4xl text-studio-text sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            {blurb}
          </p>
        </header>

        {points.length > 0 ? (
          <section className="mt-10 max-w-3xl">
            <p className="font-studio-sans text-sm text-studio-muted">What it will do</p>
            <ul className="mt-4 space-y-3">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-base leading-relaxed text-secondary"
                >
                  <span aria-hidden="true" className="mt-2 h-1 w-4 shrink-0 bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {note ? (
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-tertiary">
            {note}
          </p>
        ) : null}

        {link ? (
          <p className="mt-4">
            <Link
              href={link.href}
              className="text-sm font-semibold text-accent underline underline-offset-2 hover:text-primary"
            >
              {link.label}
            </Link>
          </p>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-10">
          <Link
            href="/projects"
            className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-[#d22b2b]"
          >
            See the other projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-md border border-border-strong px-6 py-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
