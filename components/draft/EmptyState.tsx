type Props = {
  title?: string;
  children?: React.ReactNode;
};

/** Shown wherever a page needs data that the sync cron hasn't produced yet.
 * A short, honest panel instead of a spinner that never resolves. */
export function EmptyState({ title = "Waiting for first sync", children }: Props) {
  return (
    <div className="rounded-lg border border-dashed border-border-strong bg-raised px-6 py-10 text-center">
      <p className="shell-label mb-2 text-accent">Draft analyser</p>
      <h3 className="font-display text-xl uppercase tracking-tight text-primary">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-secondary">
        {children ?? "This page fills in once the daily sync has pulled data from the FPL APIs. Check back shortly."}
      </p>
    </div>
  );
}
