import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="Game plan"
          title="How it works"
        />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="rounded-[10px] border border-border bg-raised p-5 sm:p-6"
            >
              <p className="shell-label text-accent">{step.number}</p>
              <h3 className="mt-3 text-lg font-semibold text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
