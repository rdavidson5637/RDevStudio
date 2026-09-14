import { SOCIAL_PROOF_ITEMS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SocialProofBar() {
  return (
    <section
      className="section-padding border-t border-border bg-base"
      aria-label="Recent work"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="The record"
          title="Recent jobs"
        />

        <p className="lead-text -mt-6 mb-10 max-w-2xl sm:-mt-4">
          No made-up testimonials. These are the live jobs.
        </p>

        <ul className="grid gap-5 md:grid-cols-3">
          {SOCIAL_PROOF_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-[10px] border border-border bg-raised p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
