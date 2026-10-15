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
    <ol className="mt-12 border-t border-studio-line">
      {STEPS.map((step) => (
        <li
          key={step.number}
          className="grid gap-2 border-b border-studio-line py-5 sm:grid-cols-[4rem_11rem_1fr] sm:items-baseline sm:gap-6"
        >
          <span className="font-studio-display text-2xl text-studio-text">{step.number}</span>
          <h3 className="font-studio-display text-2xl text-studio-text">{step.title}</h3>
          <p className="type-body text-studio-muted">{step.copy}</p>
        </li>
      ))}
    </ol>
  );
}
