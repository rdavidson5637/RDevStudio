import { Fragment } from "react";
import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";
import { COMING_SOON_ROADMAP } from "@/lib/coming-soon-roadmap";

function PhaseCircle({ number, active }: { number: number; active?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-raised text-sm font-semibold ${
        active
          ? "border-accent text-accent shadow-[0_0_12px_rgb(245_158_11_/_0.3)]"
          : "border-border text-tertiary"
      }`}
    >
      {number}
    </div>
  );
}

function PhaseLabels({ name, sublabel }: { name: string; sublabel: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-secondary">{name}</p>
      <p className="text-sm text-tertiary">{sublabel}</p>
    </div>
  );
}

export function ComingSoonRoadmap() {
  return (
    <section id="roadmap" className="section-padding">
      <div className="container-narrow">
        <p className="section-label">The Plan</p>
        <h2 className="section-heading mt-3 text-2xl sm:text-3xl lg:text-4xl">
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
                    <p className="text-sm font-medium text-secondary">
                      {phase.name}
                    </p>
                    <p className="mt-0.5 text-sm text-tertiary">
                      {phase.sublabel}
                    </p>
                  </div>
                </div>
              </ComingSoonFadeIn>

              {index < COMING_SOON_ROADMAP.length - 1 && (
                <div
                  className="mt-5 min-w-4 flex-1 border-t border-dashed border-border"
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
                  className="ml-5 h-10 w-px border-l border-dashed border-border"
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
