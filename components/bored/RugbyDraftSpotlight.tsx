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
      className={`group relative block overflow-hidden rounded-2xl border border-sky-400/30 bg-gradient-to-br from-[#0f1820] via-[#0f172a] to-[#081018] transition-all duration-normal ease-out hover:border-sky-400/50 hover:shadow-[0_24px_48px_-12px_rgb(56_189_248/0.15)] ${
        isHero ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(56_189_248/0.12)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgb(16_185_129/0.08)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <div
        className={`relative flex flex-col gap-8 ${
          isHero ? "lg:flex-row lg:items-center lg:gap-12" : "sm:flex-row sm:items-center"
        }`}
      >
        <div
          className={`flex shrink-0 justify-center ${
            isHero ? "lg:w-56" : "sm:w-32"
          }`}
        >
          <div
            className={`relative flex items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/15 ${
              isHero ? "h-40 w-40 sm:h-48 sm:w-48 lg:h-52 lg:w-52" : "h-28 w-28 sm:h-32 sm:w-32"
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-2xl" />
            <span
              className={`relative select-none ${
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
            <span className="rounded-full border border-sky-400/50 bg-sky-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {RUGBY_DRAFT.badge}
            </span>
            <span className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              New
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Featured game
          </p>
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
            className={`mt-3 font-medium text-secondary ${
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
            className={`mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-400 font-bold uppercase tracking-widest text-black transition-colors group-hover:bg-sky-300 ${
              isHero ? "px-8 py-3.5 text-sm" : "px-6 py-3 text-xs"
            }`}
          >
            Play now
            <span
              className="transition-transform duration-normal ease-out group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
