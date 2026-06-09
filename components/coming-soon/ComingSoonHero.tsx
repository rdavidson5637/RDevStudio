import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";

export function ComingSoonHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center justify-center section-padding pt-28 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgb(245 158 11 / 0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-wide flex-col items-center text-center">
        <ComingSoonFadeIn y={20} duration={0.6}>
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Currently in development
          </span>
        </ComingSoonFadeIn>

        <ComingSoonFadeIn y={20} duration={0.6} delay={0.05}>
          <h1 className="heading-display mt-6 max-w-3xl text-balance text-3xl sm:text-4xl lg:text-5xl">
            Building Interactive Web Apps People Actually Use
          </h1>
        </ComingSoonFadeIn>

        <p className="lead-text mt-5 max-w-xl text-balance">
          From decision-making tools to learning platforms and games, RDev Studio
          is creating fast, useful and fun web apps.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 min-[480px]:max-w-none min-[480px]:flex-row">
          <a href="#footer" className="btn-primary">
            Join the Waitlist
          </a>
          <a href="#footer" className="btn-secondary">
            Get Early Access Updates
          </a>
        </div>

        <div className="coming-soon-chevron-bounce mt-14 text-tertiary" aria-hidden="true">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
