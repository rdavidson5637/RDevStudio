import { Section } from "@/components/ui/Section";
import { ProcessTrack } from "./ProcessTrack";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    copy: "A short call or email. What you need, who it is for, and what done looks like.",
  },
  {
    number: "02",
    title: "Proposal",
    copy: "A clear quote with scope, timeline and price. No surprises.",
  },
  {
    number: "03",
    title: "Build",
    copy: "I make the thing. You see progress and give notes before anything goes live.",
  },
  {
    number: "04",
    title: "Launch",
    copy: "It goes live. I handle the technical setup and check it works on a phone.",
  },
] as const;

export function HomeProcess() {
  return (
    <Section compact eyebrow="HOW IT WORKS" heading="Four steps, no surprises.">
      <div className="relative mt-10">
        <ProcessTrack />
        <ol className="relative grid gap-8 md:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.number} className="relative pl-10 md:pl-0">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-studio-line bg-studio-bg font-studio-mono text-xs text-amber md:static">
                {step.number}
              </span>
              <h3 className="mt-3 font-studio-display text-2xl text-studio-text">{step.title}</h3>
              <p className="type-body mt-2 text-studio-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
