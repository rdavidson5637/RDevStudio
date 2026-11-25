import {
  CONTENT_CREATION_FEATURES,
  PRICING_FEATURES,
  SOCIAL_MEDIA_FEATURES,
} from "@/lib/constants";

const PACKAGES = [
  {
    id: "website",
    title: "Website build",
    note: "One-off build",
    features: PRICING_FEATURES,
  },
  {
    id: "social",
    title: "Social media management",
    note: "Monthly calendar and scheduling",
    features: SOCIAL_MEDIA_FEATURES,
  },
  {
    id: "content",
    title: "Content creation",
    note: "One-off batch, no retainer",
    features: CONTENT_CREATION_FEATURES,
  },
] as const;

/** Ruled package rows used on the local business and charity pages. No prices. */
export function PackageList({ tag }: { tag?: string }) {
  return (
    <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
      {PACKAGES.map((pkg, index) => (
        <li key={pkg.id} className="py-7">
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
            <div className="min-w-0">
              <div className="mb-meta">
                <span className="tabular-nums font-semibold text-[var(--mb-link)]">
                  0{index + 1}
                </span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span className="text-[var(--mb-tertiary)]">{tag ?? pkg.note}</span>
              </div>
              <h3 className="mb-h3 mt-2 text-[var(--mb-ink)]">{pkg.title}</h3>
            </div>
            <ul className="mb-dash-list border-t border-[var(--mb-line)] pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {pkg.features.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" data-mb-dash>
                    -
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
