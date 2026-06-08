import Link from "next/link";

type ServicePricingCardProps = {
  label: string;
  price: string;
  priceNote: string;
  description?: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref?: string;
};

export function ServicePricingCard({
  label,
  price,
  priceNote,
  description,
  features,
  ctaLabel,
  ctaHref = "/contact",
}: ServicePricingCardProps) {
  return (
    <article className="card-hover flex h-full flex-col overflow-hidden rounded-md border border-border bg-raised">
      <div className="border-b border-border bg-base px-6 py-8 text-center sm:px-8 sm:py-10">
        <p className="label-caps text-tertiary">{label}</p>
        <p className="mt-2 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          {price}
        </p>
        <p className="mt-2 text-sm text-secondary">{priceNote}</p>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        {description && (
          <p className="mb-6 text-sm leading-relaxed text-secondary sm:text-base">
            {description}
          </p>
        )}
        <ul className="space-y-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-secondary"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link href={ctaHref} className="btn-primary mt-auto pt-10 w-full text-center">
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
