import { Section } from "@/components/ui/Section";

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
    <Section heading="How it works">
      <div className="relative mt-10">
        <ol className="relative grid gap-8 md:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.number} className="relative">
              <span className="font-studio-display text-2xl text-studio-text">{step.number}</span>
              <h3 className="mt-3 font-studio-display text-2xl text-studio-text">{step.title}</h3>
              <p className="type-body mt-2 text-studio-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
