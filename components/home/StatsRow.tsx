import Link from "next/link";

const STATS = [
  {
    value: "2 games",
    label: "Play free now",
    href: "/games",
    highlight: true,
  },
  { value: "5+", label: "Projects shipped" },
  { value: "Next.js", label: "Primary stack" },
  { value: "NI", label: "Based in Carrickfergus" },
] as const;

export function StatsRow() {
  return (
    <section
      className="border-y border-border bg-raised/50"
      aria-label="Portfolio highlights"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat) => {
            const content = (
              <>
                <dt
                  className={`font-display text-xl font-bold sm:text-2xl ${
                    "highlight" in stat && stat.highlight
                      ? "text-emerald-400"
                      : "text-primary"
                  }`}
                >
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-sm text-secondary">{stat.label}</dd>
              </>
            );

            return (
              <div
                key={stat.label}
                className="px-4 py-8 text-center sm:px-6 sm:py-10"
              >
                {"href" in stat && stat.href ? (
                  <Link
                    href={stat.href}
                    className="block transition-colors hover:text-emerald-300"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
