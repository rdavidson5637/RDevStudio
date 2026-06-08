const STATS = [
  { value: "5+", label: "Projects shipped" },
  { value: "Next.js", label: "Primary stack" },
  { value: "Games", label: "Side experiments" },
  { value: "NI", label: "Based in Carrickfergus" },
] as const;

export function StatsRow() {
  return (
    <section className="border-y border-border bg-raised/50" aria-label="Portfolio highlights">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-8 text-center sm:px-6 sm:py-10"
            >
              <dt className="font-display text-xl font-bold text-primary sm:text-2xl">
                {stat.value}
              </dt>
              <dd className="mt-1.5 text-sm text-secondary">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
