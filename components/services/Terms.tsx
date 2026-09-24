import { CARE_PLAN, OWNERSHIP_POINTS, PAYMENT_TERMS } from "@/lib/services";

/** Payment terms, ownership and the care plan, side by side. */
export function Terms({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-5 lg:grid-cols-3 ${className}`}>
      <div className="rounded-[10px] border border-border bg-raised p-5 sm:p-6">
        <p className="shell-label mb-4 text-accent">How you pay</p>
        <dl className="space-y-3">
          {PAYMENT_TERMS.map((term) => (
            <div
              key={term.label}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
            >
              <dt className="shell-label text-secondary">{term.label}</dt>
              <dd className="text-right font-semibold text-primary">
                {term.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-[10px] border border-border bg-raised p-5 sm:p-6">
        <p className="shell-label mb-4 text-accent">Who owns it</p>
        <p className="mb-3 font-semibold text-primary">You do.</p>
        <ul className="space-y-2">
          {OWNERSHIP_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-primary">
              <span className="mt-0.5 text-accent" aria-hidden="true">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div
        id="care-plan"
        className="scroll-mt-24 rounded-[10px] border border-border-accent bg-raised p-5 sm:p-6"
      >
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="shell-label text-accent">{CARE_PLAN.title}</p>
          <p className="font-display text-2xl uppercase text-primary">
            {CARE_PLAN.price}
          </p>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-primary">
          {CARE_PLAN.summary}
        </p>
        <ul className="space-y-2">
          {CARE_PLAN.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-primary">
              <span className="mt-0.5 text-accent" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-secondary">
          {CARE_PLAN.note}
        </p>
      </div>
    </div>
  );
}
