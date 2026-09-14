function ProjectCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[10px] border border-border-strong bg-raised">
      <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
        <div className="relative border-b border-border-strong p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="h-56 w-full animate-pulse rounded-md bg-border sm:h-72" />
          <div className="mt-3 h-3 w-24 animate-pulse rounded bg-border" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-5 h-1 w-12 bg-accent" aria-hidden="true" />
          <div className="h-8 w-48 animate-pulse rounded bg-border sm:h-10 sm:w-64" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-border" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-border" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-border" />
          </div>
          <div className="mt-5 h-3 w-32 animate-pulse rounded bg-border" />
          <div className="mt-8 h-12 w-36 animate-pulse rounded-md bg-border" />
        </div>
      </div>
    </article>
  );
}

export default function WorkLoading() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="h-3 w-20 animate-pulse rounded bg-border" />
          <div className="mt-3 h-16 w-48 animate-pulse rounded bg-border sm:h-20 sm:w-64" />
          <div className="mt-5 h-5 w-full max-w-xl animate-pulse rounded bg-border" />
        </header>

        <section className="space-y-10 border-b border-border py-14">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </section>
      </div>
    </div>
  );
}
