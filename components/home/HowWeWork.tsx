import { HOW_WE_WORK } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowWeWork() {
  return (
    <section id="process" className="section-padding border-t border-border bg-base">
      <div className="container-wide">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="Process"
          title="How it works"
        />

        <ol className="divide-y divide-border border-t border-border">
          {HOW_WE_WORK.map((step, index) => (
            <li
              key={step.title}
              className="group grid gap-2 py-6 transition-colors duration-normal ease-out hover:bg-overlay/40 sm:grid-cols-12 sm:gap-8 sm:px-4 sm:py-10"
            >
              <span className="font-display text-sm font-bold text-secondary transition-colors duration-normal group-hover:text-accent sm:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="heading-display text-lg sm:col-span-3 sm:text-2xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary sm:col-span-8 sm:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
