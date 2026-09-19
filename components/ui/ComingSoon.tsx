import Link from "next/link";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  blurb: string;
  points?: readonly string[];
  note?: string;
};

export function ComingSoon({
  eyebrow,
  title,
  blurb,
  points = [],
  note,
}: ComingSoonProps) {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">{eyebrow}</p>
            <span className="rounded-full border border-border-strong bg-raised px-2.5 py-0.5 text-xs font-semibold text-accent">
              Coming soon
            </span>
          </div>
          <h1 className="programme-h1 mt-3">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            {blurb}
          </p>
        </header>

        {points.length > 0 ? (
          <section className="mt-10 max-w-3xl">
            <p className="shell-label text-accent">What it will do</p>
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

        <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-10">
          <Link
            href="/projects"
            className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-[#d22b2b]"
          >
            See the other projects →
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
