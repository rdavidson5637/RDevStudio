import Image from "next/image";
import Link from "next/link";
import { EnterWhenVisible } from "@/components/motion/EnterWhenVisible";

export type ShowcaseStudy = {
  slug: string;
  name: string;
  category: string;
  status: string;
  href: string;
  siteUrl?: string;
  image?: string;
  imageAlt?: string;
  challenge: string;
  solution: string;
  result: string;
};

type CaseStudyShowcaseCardProps = {
  study: ShowcaseStudy;
  /** 1-based index for the display number. */
  index: number;
  /** Flip media/copy on large screens for rhythm. */
  reverse?: boolean;
  /** Home teaser uses the in-view entrance; /work stays static. */
  animate?: boolean;
  className?: string;
};

/**
 * Shared case-study showcase panel for home and /work.
 * Flat bordered panel, alternating direction, phone-first stack.
 * Agent-written - treat as unverified until Ryan has checked it.
 */
export function CaseStudyShowcaseCard({
  study,
  index,
  reverse = false,
  animate = false,
  className = "",
}: CaseStudyShowcaseCardProps) {
  const media = (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-studio-line bg-studio-bg">
      {"image" in study && study.image ? (
        <Image
          src={study.image}
          alt={study.imageAlt ?? study.name}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="font-studio-display text-2xl text-studio-text">Preview after sign-off</p>
          <p className="max-w-[28ch] text-sm text-studio-muted">
            Screenshots go up here when the client has approved them.
          </p>
        </div>
      )}
    </div>
  );

  const copy = (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-studio-line pb-3">
        <p className="font-studio-display text-4xl leading-none text-studio-faint tabular-nums">
          {String(index).padStart(2, "0")}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-studio-muted">{study.category}</span>
          <span className="font-bold text-studio-text">{study.status}</span>
        </div>
      </div>

      <h3 className="mt-5 font-studio-display text-3xl text-studio-text md:text-4xl">{study.name}</h3>

      <dl className="mt-5 space-y-4 text-sm sm:text-base">
        <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="font-bold text-studio-text">Challenge</dt>
          <dd className="text-studio-muted">{study.challenge}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="font-bold text-studio-text">Solution</dt>
          <dd className="text-studio-muted">{study.solution}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="font-bold text-studio-text">Status</dt>
          <dd className="text-studio-muted">{study.result}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-studio-line pt-4">
        <Link
          href={study.href}
          className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          Read the case study
        </Link>
        {study.siteUrl ? (
          <a
            href={study.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-sm text-studio-muted underline decoration-studio-line underline-offset-4 transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            Open live preview
          </a>
        ) : null}
      </div>
    </div>
  );

  const body = (
    <div
      className={[
        "case-study-card grid gap-8 border border-studio-border bg-studio-surface p-6 transition-colors duration-normal ease-out md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10",
        reverse ? "lg:[&>*:first-child]:order-2" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {media}
      {copy}
    </div>
  );

  if (!animate) {
    return <article>{body}</article>;
  }

  return (
    <EnterWhenVisible as="article" delayMs={(index - 1) * 70} className="block">
      {body}
    </EnterWhenVisible>
  );
}
