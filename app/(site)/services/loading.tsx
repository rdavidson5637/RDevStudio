function ServiceCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-strong bg-raised">
      <div className="border-b border-border p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="h-8 w-8 animate-pulse rounded bg-border" />
            <div className="mt-4 h-3 w-12 animate-pulse rounded bg-border" />
            <div className="mt-2 h-8 w-48 animate-pulse rounded bg-border" />
            <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-border" />
          </div>
          <div className="text-right">
            <div className="h-8 w-24 animate-pulse rounded bg-border" />
            <div className="mt-1 h-3 w-16 animate-pulse rounded bg-border" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 h-3 w-28 animate-pulse rounded bg-border" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-5 w-full animate-pulse rounded bg-border" />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 h-3 w-24 animate-pulse rounded bg-border" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 w-full animate-pulse rounded bg-border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesLoading() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="h-3 w-24 animate-pulse rounded bg-border" />
          <div className="mt-3 h-16 w-64 animate-pulse rounded bg-border sm:h-20" />
          <div className="mt-5 h-5 w-full max-w-2xl animate-pulse rounded bg-border" />
          <div className="mt-8 flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-border" />
            ))}
          </div>
        </header>

        <section className="space-y-8 py-12">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </section>
      </div>
    </div>
  );
}
