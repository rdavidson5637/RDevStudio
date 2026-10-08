import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <section className="bg-bg py-14 text-studio-text md:py-20">
      <Container>
        <SectionHeader tone="studio" label="How it works" heading="Four steps, no surprises." />
        <ol className="mt-10 border-t border-studio-border">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-studio-border py-6 md:grid-cols-[4rem_14rem_1fr] md:items-baseline"
            >
              <span className="type-label text-studio-muted">{step.number}</span>
              <h3 className="font-studio-display text-2xl text-studio-text">{step.title}</h3>
              <p className="type-body col-start-2 text-studio-muted md:col-start-auto">{step.copy}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
