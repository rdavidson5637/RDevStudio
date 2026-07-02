import Link from "next/link";
import { PRICING_FEATURES } from "@/lib/constants";

export function ServicePreview() {
  const previewFeatures = PRICING_FEATURES.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            Everything you need to get online
          </h2>
          <p className="mt-3 text-slate-text">
            One clear package — no surprises, no upsells.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <article className="card-hover overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            <div className="bg-navy px-8 py-6 text-center text-white">
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                Get Online
              </p>
              <p className="mt-2 text-5xl font-bold">
                £650
                <span className="text-lg font-normal text-white/70">
                  {" "}
                  one-off
                </span>
              </p>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                {previewFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-slate-text"
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
                <li className="text-sm text-slate-muted">
                  + {PRICING_FEATURES.length - 4} more included
                </li>
              </ul>
              <Link
                href="/services"
                className="btn-outline-accent mt-8 w-full text-center"
              >
                See Full Details
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
