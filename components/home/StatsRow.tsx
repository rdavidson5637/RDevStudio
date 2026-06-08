const STATS = [
  { value: "5+", label: "Sites live" },
  { value: "7 days", label: "Average delivery" },
  { value: "£650", label: "Website price" },
  { value: "NI-based", label: "Carrickfergus" },
] as const;

export function StatsRow() {
  return (
    <section className="border-y border-border bg-base" aria-label="Studio highlights">
      <div className="container-wide">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-8 text-center sm:px-6 sm:py-10"
            >
              <dt className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-secondary">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
