import { Fragment } from "react";
import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";
import { COMING_SOON_ROADMAP } from "@/lib/coming-soon-roadmap";

function PhaseCircle({ number, active }: { number: number; active?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-[#111118] text-sm font-semibold ${
        active
          ? "border-[#F59E0B] text-[#F59E0B]"
          : "border-[#1F1F2E] text-[#9CA3AF]"
      }`}
      style={
        active
          ? { boxShadow: "0 0 12px rgba(245,158,11,0.3)" }
          : undefined
      }
    >
      {number}
    </div>
  );
}

function PhaseLabels({ name, sublabel }: { name: string; sublabel: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-[#D1D5DB]">{name}</p>
      <p className="text-[0.8rem] text-[#9CA3AF]">{sublabel}</p>
    </div>
  );
}

export function ComingSoonRoadmap() {
  return (
    <section id="roadmap" className="px-6 py-20">
      <div className="mx-auto w-full max-w-[960px]">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#F59E0B]">
          The Plan
        </p>
        <h2
          className="mt-3 font-bold text-[#F9FAFB]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          RDev Studio Roadmap
        </h2>

        <div className="mt-12 hidden w-full min-w-0 items-start sm:flex">
          {COMING_SOON_ROADMAP.map((phase, index) => (
            <Fragment key={phase.number}>
              <ComingSoonFadeIn
                fadeOnly
                duration={0.6}
                delay={index * 0.08}
                className="w-[11rem] shrink-0"
              >
                <div className="flex flex-col items-center text-center">
                  <PhaseCircle number={phase.number} active={phase.active} />
                  <div className="mt-3">
                    <p className="text-sm font-medium text-[#D1D5DB]">
                      {phase.name}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] text-[#9CA3AF]">
                      {phase.sublabel}
                    </p>
                  </div>
                </div>
              </ComingSoonFadeIn>

              {index < COMING_SOON_ROADMAP.length - 1 && (
                <div
                  className="mt-5 min-w-4 flex-1 border-t border-dashed border-[#1F1F2E]"
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:hidden">
          {COMING_SOON_ROADMAP.map((phase, index) => (
            <Fragment key={phase.number}>
              <ComingSoonFadeIn
                fadeOnly
                duration={0.6}
                delay={index * 0.08}
              >
                <div className="flex items-center gap-4">
                  <PhaseCircle number={phase.number} active={phase.active} />
                  <PhaseLabels name={phase.name} sublabel={phase.sublabel} />
                </div>
              </ComingSoonFadeIn>

              {index < COMING_SOON_ROADMAP.length - 1 && (
                <div
                  className="ml-5 h-10 w-px border-l border-dashed border-[#1F1F2E]"
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
