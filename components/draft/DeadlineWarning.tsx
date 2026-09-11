export function DeadlineWarning({ flags }: { flags: string[] }) {
  if (flags.length === 0) return null;

  return (
    <div className="mt-4 rounded-lg border border-warning/40 bg-raised px-4 py-3 text-sm text-secondary">
      Deadline check: your XI currently has {flags.join(", ")}. Change it in the FPL app — this site is read-only.
    </div>
  );
}
