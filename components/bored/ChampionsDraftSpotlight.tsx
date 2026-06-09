import Image from "next/image";
import Link from "next/link";
import { CHAMPIONS_DRAFT } from "@/lib/champions-draft-feature";

type ChampionsDraftSpotlightProps = {
  variant?: "hero" | "section";
};

export function ChampionsDraftSpotlight({
  variant = "section",
}: ChampionsDraftSpotlightProps) {
  const isHero = variant === "hero";

  return (
    <Link
      href={CHAMPIONS_DRAFT.href}
      className={`group relative block overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-[#0f1f18] via-[#0f172a] to-[#1a1508] transition-all duration-normal ease-out hover:border-emerald-400/50 hover:shadow-[0_24px_48px_-12px_rgb(16_185_129/0.15)] ${
        isHero ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(16_185_129/0.12)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgb(245_158_11/0.08)_0%,transparent_50%)]"
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
            className={`relative ${
              isHero ? "h-40 w-40 sm:h-48 sm:w-48 lg:h-52 lg:w-52" : "h-28 w-28 sm:h-32 sm:w-32"
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl" />
            <Image
              src={CHAMPIONS_DRAFT.logo}
              alt=""
              width={208}
              height={208}
              className="relative h-full w-full object-contain drop-shadow-[0_8px_32px_rgba(251,191,36,0.2)] transition-transform duration-normal ease-out group-hover:scale-105"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {CHAMPIONS_DRAFT.badge}
            </span>
            <span className="rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
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
            {CHAMPIONS_DRAFT.title}
          </h2>
          <p
            className={`mt-3 font-medium text-secondary ${
              isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {CHAMPIONS_DRAFT.tagline}
          </p>
          <p
            className={`mt-3 leading-relaxed text-secondary ${
              isHero ? "max-w-xl text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {CHAMPIONS_DRAFT.description}
          </p>

          <span
            className={`mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-400 font-bold uppercase tracking-widest text-black transition-colors group-hover:bg-emerald-300 ${
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
