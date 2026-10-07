import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
    <section className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader tone="studio" label="How it works" heading="Four steps, no surprises." />
        <div className="relative mt-12">
          <span
            className="absolute left-0 right-0 top-3 hidden h-px bg-amber md:block"
            aria-hidden="true"
          />
          <ol className="grid gap-10 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 80}>
                <span className="relative z-10 inline-flex h-7 min-w-7 items-center justify-center bg-bg px-1 type-label text-amber">
                  {step.number}
                </span>
                <h3 className="type-h3 mt-4 text-studio-text">{step.title}</h3>
                <p className="type-body mt-2 text-studio-muted">{step.copy}</p>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
