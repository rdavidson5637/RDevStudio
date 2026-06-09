import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";

export function ComingSoonHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center px-6 pb-16 pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <ComingSoonFadeIn y={20} duration={0.6}>
          <span className="inline-block rounded-full border border-[rgba(245,158,11,0.4)] px-3 py-1 text-xs text-[#F59E0B]">
            Currently in development
          </span>
        </ComingSoonFadeIn>

        <ComingSoonFadeIn y={20} duration={0.6} delay={0.05}>
          <h1
            className="mt-6 max-w-[820px] font-bold leading-[1.15] text-[#F9FAFB]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Building Interactive Web Apps People Actually Use
          </h1>
        </ComingSoonFadeIn>

        <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-[#9CA3AF]">
          From decision-making tools to learning platforms and games, RDev Studio
          is creating fast, useful and fun web apps.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 min-[480px]:max-w-none min-[480px]:flex-row">
          <a
            href="#footer"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#F59E0B] px-7 py-3 text-sm font-semibold text-[#0A0A0F] transition-colors hover:bg-[#D97706] min-[480px]:w-auto"
          >
            Join the Waitlist
          </a>
          <a
            href="#footer"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#374151] bg-transparent px-7 py-3 text-sm font-semibold text-[#D1D5DB] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B] min-[480px]:w-auto"
          >
            Get Early Access Updates
          </a>
        </div>

        <div className="coming-soon-chevron-bounce mt-14 text-[#9CA3AF]" aria-hidden="true">
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
