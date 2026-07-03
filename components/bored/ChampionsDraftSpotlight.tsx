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
      className={`work-card-lift group relative block overflow-hidden rounded-[10px] border border-border bg-raised ${
        isHero ? "p-8 sm:p-10 lg:p-12" : "p-6 sm:p-8"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-emerald-800"
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
            className={`relative rounded-2xl border border-border-strong bg-base p-3 ${
              isHero
                ? "h-40 w-40 sm:h-48 sm:w-48 lg:h-52 lg:w-52"
                : "h-28 w-28 sm:h-32 sm:w-32"
            }`}
          >
            <Image
              src={CHAMPIONS_DRAFT.logo}
              alt="Champions Draft logo"
              width={208}
              height={208}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="rounded-full border border-emerald-800/25 bg-base px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-900">
              {CHAMPIONS_DRAFT.badge}
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
            {CHAMPIONS_DRAFT.title}
          </h2>
          <p
            className={`mt-3 font-medium text-primary ${
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
            className={`mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 font-bold uppercase tracking-widest text-[#0f172a] ${
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
