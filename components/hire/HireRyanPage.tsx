"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AchievementNotification } from "@/components/hire/AchievementNotification";
import { ConfettiCelebration } from "@/components/hire/ConfettiCelebration";
import { HireMeter } from "@/components/hire/HireMeter";
import { CatModal } from "@/components/hire/CatModal";
import { RudiModal } from "@/components/hire/RudiModal";
import { useHireExperience } from "@/components/hire/useHireExperience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ACHIEVEMENTS,
  HIRE_ABOUT_POINTS,
  HIRE_CHAOS_TRANSITION,
  HIRE_CV_PATH,
  HIRE_MILESTONES_TITLE,
  HIRE_EXPERIENCE,
  HIRE_PROFILE,
  HIRE_TAGLINE,
  HIRE_FINAL_REASONS,
  HIRE_PROJECTS,
  HIRE_QUALIFICATIONS,
  HIRE_SKILLS,
  HIRE_STATS,
  HIRE_STRENGTHS,
  HIRE_TESTIMONIALS,
  HIRE_WEAKNESSES,
} from "@/lib/hire-data";

export function HireRyanPage() {
  const [rudiModalOpen, setRudiModalOpen] = useState(false);
  const [catModalOpen, setCatModalOpen] = useState(false);

  const {
    chaosStarted,
    finaleReached,
    unlockedAchievements,
    recentAchievement,
    celebrationKey,
    prefersReducedMotion,
    registerSection,
  } = useHireExperience();

  const revealClass = prefersReducedMotion ? "" : "hire-reveal";

  useEffect(() => {
    const openFromUrl =
      window.location.search.includes("rudi") ||
      window.location.hash === "#rudi";

    if (openFromUrl) {
      setRudiModalOpen(true);
    }
  }, []);

  return (
    <div
      className={`relative ${
        prefersReducedMotion ? "" : "transition-[filter] duration-1000"
      } ${chaosStarted && !prefersReducedMotion ? "hire-chaos-active" : ""} ${
        finaleReached && !prefersReducedMotion ? "hire-finale-active" : ""
      }`}
    >
      <ConfettiCelebration
        active={chaosStarted}
        burstKey={celebrationKey}
        intensity={finaleReached ? "finale" : "subtle"}
      />
      <AchievementNotification
        title={recentAchievement}
        prefersReducedMotion={prefersReducedMotion}
      />
      <RudiModal open={rudiModalOpen} onClose={() => setRudiModalOpen(false)} />
      <CatModal open={catModalOpen} onClose={() => setCatModalOpen(false)} />

      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden border-b border-border bg-base pb-16 pt-28 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgb(245_158_11/0.1)_0%,transparent_50%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgb(59_130_246/0.08)_0%,transparent_45%)]"
          aria-hidden="true"
        />
        <span className="hero-bg-type hidden md:block" aria-hidden="true">
          HIRE
        </span>

        <div className="section-padding relative z-10">
          <div className="container-wide max-w-5xl">
            <p className="section-label mb-4 font-medium">Available for hire</p>
            <h1 className="font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
              Hire Ryan
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-medium text-accent sm:text-base">
              Yes, this page is also a portfolio piece.
            </p>
            <p className="lead-text mt-4 max-w-3xl text-xl sm:text-2xl">
              {HIRE_TAGLINE}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Contact Ryan
              </Link>
              <a href={HIRE_CV_PATH} download className="btn-secondary">
                Download CV
              </a>
            </div>

            <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HIRE_STATS.map((stat) => (
                <div key={stat} className="interactive-surface px-5 py-4">
                  <dt className="sr-only">Credential</dt>
                  <dd className="text-sm font-medium text-primary/90">
                    {stat}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-14 text-center text-xs font-medium uppercase tracking-widest text-tertiary opacity-60">
              Scroll to explore
              <span className="mt-2 block text-base" aria-hidden="true">
                ↓
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — About */}
      <section className="section-padding border-b border-border bg-raised">
        <div className="container-wide max-w-4xl">
          <SectionHeader label="Profile" title="About Me" />
          <p className="lead-text mt-8">{HIRE_PROFILE}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HIRE_ABOUT_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-base/60 px-5 py-4"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"
                  aria-hidden="true"
                />
                <span className="text-secondary">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 3 — Qualifications */}
      <section
        ref={registerSection("qualifications")}
        className="section-padding border-b border-border bg-base"
      >
        <div className="container-wide max-w-4xl">
          <SectionHeader label="Education" title="Qualifications" />
          <ol className="relative mt-12 space-y-0 border-l border-border pl-8 sm:pl-10">
            {HIRE_QUALIFICATIONS.map((item, index) => (
              <li key={item.title} className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[2.05rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-500 bg-base sm:-left-[2.35rem]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {item.institution}
                </p>
                <p className="lead-text mt-3 max-w-2xl">{item.detail}</p>
                {index === 0 && (
                  <p className="editorial-note mt-3">
                    Graduating Summer 2026 — completing while working full time
                    in Belfast.
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 4 — Work Experience */}
      <section className="section-padding border-b border-border bg-raised">
        <div className="container-wide max-w-4xl">
          <SectionHeader label="Experience" title="Work Experience" />
          <div
            ref={registerSection("experience")}
            className="h-px w-full"
            aria-hidden="true"
          />
          <div className="mt-10 space-y-6">
            {HIRE_EXPERIENCE.map((role) => (
              <article
                key={role.title}
                className="interactive-surface px-6 py-8 sm:px-8"
              >
                <h3 className="font-display text-2xl font-bold text-primary">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {role.period}
                </p>
                <p className="lead-text mt-3">{role.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Projects */}
      <section className="section-padding border-b border-border bg-base">
        <div className="container-wide">
          <SectionHeader label="Portfolio" title="Featured Projects" />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {HIRE_PROJECTS.map((project) => {
              const hasActionLinks =
                ("links" in project && project.links.length > 0) ||
                ("github" in project && project.github);

              const preview =
                "image" in project && project.image ? (
                  <div
                    className="relative aspect-[16/10] overflow-hidden border-b border-border"
                    style={{
                      backgroundColor:
                        "imageBg" in project ? project.imageBg : undefined,
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`transition-transform duration-slow ease-out group-hover:scale-[1.03] ${
                        "imageFit" in project && project.imageFit === "contain"
                          ? "object-contain p-6"
                          : "object-cover"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  // Replace with screenshot once available
                  <div className="block h-40 w-full rounded-md border-b border-border bg-[#0A0A0A]" />
                );

              const card = (
                <article className="interactive-surface card-hover group h-full overflow-hidden">
                  {preview}
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {project.tag}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-primary">
                      {project.title}
                    </h3>
                    <p className="lead-text mt-3 text-sm">
                      {project.description}
                    </p>
                    <p className="mt-4">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                          "highlightStyle" in project &&
                          project.highlightStyle === "outlined"
                            ? "border border-amber-400 text-amber-400"
                            : "bg-raised text-secondary"
                        }`}
                      >
                        {project.highlight}
                      </span>
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-md bg-raised px-2.5 py-1 text-xs text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {hasActionLinks && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {"links" in project &&
                          project.links?.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target={link.external ? "_blank" : undefined}
                              rel={
                                link.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-sm font-medium text-accent transition-colors hover:text-primary"
                            >
                              {link.label} →
                            </a>
                          ))}
                        {"github" in project && project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );

              if (hasActionLinks) {
                return (
                  <div key={project.id} className="block">
                    {card}
                  </div>
                );
              }

              if ("href" in project && project.href) {
                if ("external" in project && project.external) {
                  return (
                    <a
                      key={project.id}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {card}
                    </a>
                  );
                }

                return (
                  <Link key={project.id} href={project.href} className="block">
                    {card}
                  </Link>
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      {/* Section 6 — Skills */}
      <section className="section-padding border-b border-border bg-raised">
        <div className="container-wide max-w-4xl">
          <SectionHeader label="Toolkit" title="Skills" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {Object.entries(HIRE_SKILLS).map(([category, skills]) => (
              <div key={category} className="interactive-surface px-6 py-7">
                <h3 className="label-caps">{category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-border bg-base/70 px-3 py-2 text-sm font-medium text-primary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Testimonials */}
      <section className="section-padding border-b border-border bg-base">
        <div className="container-wide max-w-4xl">
          <SectionHeader label="References" title="Testimonials" />
          <div className="mt-10 space-y-5">
            {HIRE_TESTIMONIALS.map((item) => {
              const testimonialBody =
                "pending" in item && item.pending ? (
                  <p className="font-display text-lg italic text-secondary sm:text-xl">
                    Awaiting feedback
                  </p>
                ) : (
                  <blockquote className="font-display text-lg leading-relaxed text-primary sm:text-xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                );

              const testimonialCaption = (
                <p className="mt-4 text-sm text-secondary">
                  <span className="font-semibold text-primary">
                    {item.author}
                  </span>
                  <span className="text-tertiary"> — {item.role}</span>
                </p>
              );

              const surfaceClass = `interactive-surface px-6 py-7 ${
                item.real ? "border-blue-500/20" : ""
              }`;

              if ("rudi" in item && item.rudi) {
                return (
                  <button
                    key={`${item.author}-${item.role}`}
                    type="button"
                    onClick={() => setRudiModalOpen(true)}
                    className={`${surfaceClass} block w-full text-left transition-colors hover:border-border-strong`}
                    aria-label="Open Rudi's full review"
                  >
                    {testimonialBody}
                    {testimonialCaption}
                  </button>
                );
              }

              return (
                <figure
                  key={`${item.author}-${item.role}`}
                  className={surfaceClass}
                >
                  {testimonialBody}
                  {testimonialCaption}
                </figure>
              );
            })}
          </div>
        </div>
        <div
          ref={registerSection("testimonials")}
          className="h-px"
          aria-hidden="true"
        />
      </section>

      {chaosStarted && (
        <section className="section-padding border-b border-border bg-base text-center">
          <p className="font-display text-3xl text-primary md:text-4xl">
            {HIRE_CHAOS_TRANSITION}
          </p>
          <hr className="mx-auto mt-8 max-w-md border-amber-400" />
        </section>
      )}

      {/* Section 8 — Achievements (visible once chaos starts) */}
      {chaosStarted && (
        <section
          className={`section-padding border-b border-border bg-raised ${revealClass}`}
        >
          <div className="container-wide max-w-4xl">
            <SectionHeader label="Gamification" title={HIRE_MILESTONES_TITLE} />
            <p className="lead-text mt-4">
              Congratulations. You scrolled through an entire CV. That alone
              should count for something.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedAchievements.includes(achievement.id);

                return (
                  <div
                    key={achievement.id}
                    className={`flex items-start gap-4 rounded-xl px-5 py-4 transition-opacity ${
                      unlocked
                        ? "border border-amber-400 bg-[#111111]"
                        : "border border-[#1F1F1F] bg-[#0A0A0A] opacity-40"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {unlocked ? "🏆" : "🔒"}
                    </span>
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest ${
                          unlocked ? "text-amber-400" : "text-secondary"
                        }`}
                      >
                        {unlocked ? "Achievement Unlocked" : "Locked"}
                      </p>
                      <p
                        className={`mt-1 font-medium ${
                          unlocked ? "text-white" : "text-secondary"
                        }`}
                      >
                        {achievement.title}
                      </p>
                      <p className="mt-1 text-sm text-secondary">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 12 — Weaknesses */}
      {chaosStarted && (
        <section
          className={`section-padding border-b border-border bg-base ${revealClass}`}
        >
          <div className="container-wide max-w-4xl">
            <SectionHeader
              label="Interview prep"
              title="Strengths & Weaknesses"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="interactive-surface px-6 py-7">
                <h3 className="label-caps text-emerald-400">Strengths</h3>
                <ul className="mt-4 space-y-2">
                  {HIRE_STRENGTHS.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-primary"
                    >
                      <span className="text-emerald-400" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="label-caps text-amber-400">Weaknesses</h3>
                {HIRE_WEAKNESSES.map((item) => {
                  const isCatWarning =
                    "id" in item && item.id === "cat-warning";
                  const body = "text" in item ? item.text : item.description;

                  return (
                    <div
                      key={item.code}
                      className={`rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 font-mono text-sm ${
                        isCatWarning ? "cursor-pointer" : ""
                      }`}
                      onClick={
                        isCatWarning ? () => setCatModalOpen(true) : undefined
                      }
                    >
                      <p className="text-amber-400">
                        ⚠ SYSTEM WARNING: {item.code}
                      </p>
                      <p className="mt-1 text-primary/90">{body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final Section */}
      <section
        className={`section-padding bg-raised ${
          chaosStarted && !prefersReducedMotion
            ? "hire-finale-section"
            : "border-t border-border"
        }`}
      >
        <div className="container-wide max-w-4xl text-center">
          <p
            className={`section-label mx-auto mb-4 justify-center ${
              chaosStarted ? "text-accent" : ""
            }`}
          >
            {chaosStarted ? "You made it" : "Get in touch"}
          </p>
          <h2
            className={`font-display font-bold tracking-tight text-primary ${
              chaosStarted
                ? `${prefersReducedMotion ? "" : "hire-finale-heading "}text-5xl sm:text-6xl lg:text-7xl`
                : "heading-display text-4xl sm:text-5xl"
            }`}
          >
            {chaosStarted ? "HIRE RYAN" : "Interested in working together?"}
          </h2>

          {chaosStarted ? (
            <>
              <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left sm:mx-auto sm:max-w-md">
                {HIRE_FINAL_REASONS.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-3 rounded-lg border border-border bg-base/60 px-4 py-3 text-primary"
                  >
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="editorial-note mx-auto mt-6 max-w-lg">
                This developer is genuinely qualified, but also creative,
                memorable, and capable of building fun interactive experiences.
              </p>
            </>
          ) : (
            <p className="lead-text mx-auto mt-6 max-w-2xl">
              Scroll a little further for the full experience — or get in touch
              now if you already know what you need.
            </p>
          )}

          {chaosStarted && (
            <HireMeter prefersReducedMotion={prefersReducedMotion} />
          )}

          <div
            id="final-cta"
            ref={registerSection("final-cta")}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact" className="btn-primary">
              Hire Ryan
            </Link>
            <Link href="/work" className="btn-secondary">
              View Projects
            </Link>
            <Link href="/contact" className="btn-outline-accent">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
