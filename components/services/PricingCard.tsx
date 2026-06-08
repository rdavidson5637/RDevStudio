import Link from "next/link";
import { PRICING_FEATURES } from "@/lib/constants";

export function PricingCard() {
  return (
    <article className="card-hover mx-auto max-w-xl overflow-hidden border border-border bg-raised">
      <div className="border-b border-border bg-base px-8 py-10 text-center">
        <p className="label-caps text-tertiary">Website Design & Build</p>
        <p className="mt-2 font-display text-6xl font-extrabold text-primary">£500</p>
        <p className="mt-2 text-sm text-secondary">One-off payment · No hidden fees</p>
      </div>
      <div className="p-8 sm:p-10">
        <ul className="space-y-4">
          {PRICING_FEATURES.map((feature) => (
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
        <Link href="/contact" className="btn-primary mt-10 w-full text-center">
          Get started
        </Link>
      </div>
    </article>
  );
}
