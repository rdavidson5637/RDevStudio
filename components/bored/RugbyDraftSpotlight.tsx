import Link from "next/link";
import { RUGBY_DRAFT } from "@/lib/rugby-draft-feature";

type RugbyDraftSpotlightProps = {
  variant?: "hero" | "section";
};

export function RugbyDraftSpotlight({
  variant = "section",
}: RugbyDraftSpotlightProps) {
  const isHero = variant === "hero";

  return (
    <Link
      href={RUGBY_DRAFT.href}
      className={`work-card-lift group relative block overflow-hidden rounded-[10px] border border-border bg-raised ${
        isHero ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-sky-800"
        aria-hidden="true"
      />

      <div
        className={`relative flex flex-col gap-8 ${
          isHero
            ? "lg:flex-row lg:items-center lg:gap-12"
            : "sm:flex-row sm:items-center"
        }`}
      >
        <div
          className={`flex shrink-0 justify-center ${
            isHero ? "lg:w-56" : "sm:w-32"
          }`}
        >
          <div
            className={`relative flex items-center justify-center rounded-2xl border border-border-strong bg-base ${
              isHero
                ? "h-40 w-40 sm:h-48 sm:w-48 lg:h-52 lg:w-52"
                : "h-28 w-28 sm:h-32 sm:w-32"
            }`}
          >
            <span
              className={`select-none ${
                isHero ? "text-7xl sm:text-8xl" : "text-5xl sm:text-6xl"
              }`}
              aria-hidden="true"
            >
              🏉
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="rounded-full border border-sky-800/25 bg-base px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-900">
              {RUGBY_DRAFT.badge}
            </span>
            <span className="rounded-full border border-border-strong bg-base px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              New
            </span>
          </div>

          <p className="shell-label text-secondary">Featured game</p>
          <h2
            className={`mt-2 font-display font-bold tracking-tight text-primary ${
              isHero
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-2xl sm:text-3xl"
            }`}
          >
            {RUGBY_DRAFT.title}
          </h2>
          <p
            className={`mt-3 font-medium text-primary ${
              isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {RUGBY_DRAFT.tagline}
          </p>
          <p
            className={`mt-3 leading-relaxed text-secondary ${
              isHero ? "max-w-xl text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {RUGBY_DRAFT.description}
          </p>

          <span
            className={`mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-500 font-bold uppercase tracking-widest text-[#0f172a] ${
              isHero ? "px-8 py-3.5 text-sm" : "px-6 py-3 text-xs"
            }`}
          >
            Play now →
          </span>
        </div>
      </div>
    </Link>
  );
}
