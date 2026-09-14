function ToolCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-strong bg-raised p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-border" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-border" />
      </div>
      <div className="h-6 w-3/4 animate-pulse rounded bg-border" />
      <div className="mt-2 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-border" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-border" />
      </div>
      <div className="mt-4 h-3 w-20 animate-pulse rounded bg-border" />
    </div>
  );
}

export default function ToolkitLoading() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="h-3 w-24 animate-pulse rounded bg-border" />
          <div className="mt-3 h-16 w-56 animate-pulse rounded bg-border sm:h-20 sm:w-72" />
          <div className="mt-5 h-5 w-full max-w-2xl animate-pulse rounded bg-border" />
        </header>

        <section className="py-10">
          <div className="mb-8 flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 animate-pulse rounded-full bg-border"
              />
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ToolCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
