import Image from "next/image";
import type { MockBProject } from "@/components/mock-b/data";

function PlainFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-frame">
      <div className="mb-frame-chrome">
        <span className="truncate">{label}</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Renders either a real repo screenshot (ShelterLink) or a flat, plain CSS
 * interface panel built with live brand tokens for projects without screenshots.
 * Strictly avoids invented stats, fake client testimonials, doodles, or stock imagery.
 */
export function ProjectPreview({
  project,
  size = "compact",
}: {
  project: MockBProject;
  size?: "compact" | "featured";
}) {
  if (project.screenshot) {
    return (
      <figure className="mb-frame">
        <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--mb-bg)]">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes={
              size === "featured"
                ? "(max-width: 768px) 100vw, 720px"
                : "(max-width: 768px) 100vw, 520px"
            }
            className="h-full w-full object-cover object-top"
            priority={size === "featured"}
          />
        </div>
        <figcaption className="mb-caption">
          {project.screenshot.alt}
        </figcaption>
      </figure>
    );
  }

  if (project.id === "assisi") {
    return (
      <PlainFrame label="rdevstudio.co.uk/work/assisi">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--mb-bg)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Assisi Animal Sanctuary
            </span>
            <span className="mb-caption font-medium">
              Preview held for sign-off
            </span>
          </div>

          <div className="grid gap-6 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-8">
            <div className="min-w-0 space-y-2">
              <span className="block h-1 w-10 bg-[var(--mb-accent)]" aria-hidden="true" />
              <p className="mb-display text-sm leading-snug text-[var(--mb-ink)] sm:text-base">
                Website &amp; brand rebuild
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--mb-muted)]">
                Clear pathways for adopters, donors, and supporters on mobile and desktop.
              </p>
            </div>
            <ul className="divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-[11px] font-medium text-[var(--mb-ink)]">
              <li className="py-2">Adopt</li>
              <li className="py-2">Donate</li>
              <li className="py-2">Volunteer</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1 border-t border-[var(--mb-line)] pt-3 text-[10px] font-medium text-[var(--mb-muted)]">
            <span>Public screens publish after sanctuary approval</span>
            <span className="font-semibold text-[var(--mb-link)]">Charity build</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <PlainFrame label="crosskennan.vercel.app">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--mb-bg)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Crosskennan
            </span>
            <span className="mb-caption font-medium">Charity web preview</span>
          </div>

          <div className="space-y-3 py-5" aria-hidden="true">
            <div className="h-2.5 w-4/5 bg-[var(--mb-ink)]" />
            <div className="h-2 w-3/5 bg-[var(--mb-line-strong)]" />
            <div className="h-2 w-2/5 bg-[var(--mb-line)]" />
            <div className="flex gap-3 pt-2">
              <span className="inline-block h-2 w-16 bg-[var(--mb-accent)]" />
              <span className="inline-block h-2 w-14 bg-[var(--mb-line-strong)]" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-[10px] font-medium text-[var(--mb-muted)]">
            <span>Phone-first layout</span>
            <span className="font-semibold text-[var(--mb-link)]">Live on Vercel</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  if (project.id === "rondo") {
    return (
      <PlainFrame label="rondo (studio preview)">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--mb-bg)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Rondo
            </span>
            <span className="mb-caption font-medium">In-house web app</span>
          </div>

          <div className="space-y-3 py-5" aria-hidden="true">
            <div className="h-2 w-1/2 bg-[var(--mb-ink)]" />
            <div className="h-1.5 w-4/5 bg-[var(--mb-line-strong)]" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[var(--mb-line)] pt-4">
              <div className="h-8 border-b border-[var(--mb-line)]" />
              <div className="h-8 border-b border-[var(--mb-line)]" />
              <div className="h-8 border-b border-[var(--mb-line)]" />
              <div className="h-8 border-b border-[var(--mb-accent)]" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-[10px] font-medium text-[var(--mb-muted)]">
            <span>RDev Studio application build</span>
            <span className="font-semibold text-[var(--mb-ink)]">Link pending</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  // MGSL Hub
  return (
    <PlainFrame label="mgsl-hq-black.vercel.app">
      <div className="flex min-h-[210px] flex-col justify-between bg-[var(--mb-bg)] p-4 sm:aspect-[16/10] sm:p-5">
        <div className="flex items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
          <span className="mb-display text-sm text-[var(--mb-ink)]">
            MGSL Hub
          </span>
          <span className="mb-caption font-medium">Web hub</span>
        </div>

        <div className="space-y-0 py-4" aria-hidden="true">
          <div className="mb-3 h-2 w-2/3 bg-[var(--mb-accent)]" />
          <div className="flex items-center justify-between border-y border-[var(--mb-line)] py-2.5">
            <span className="h-1.5 w-16 bg-[var(--mb-muted)]" />
            <span className="h-1.5 w-8 bg-[var(--mb-accent-muted)]" />
          </div>
          <div className="flex items-center justify-between border-b border-[var(--mb-line)] py-2.5">
            <span className="h-1.5 w-20 bg-[var(--mb-muted)]" />
            <span className="h-1.5 w-6 bg-[var(--mb-line-strong)]" />
          </div>
          <div className="flex items-center justify-between border-b border-[var(--mb-line)] py-2.5">
            <span className="h-1.5 w-14 bg-[var(--mb-muted)]" />
            <span className="h-1.5 w-10 bg-[var(--mb-line)]" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-[10px] font-medium text-[var(--mb-muted)]">
          <span>Custom web hub UI</span>
          <span className="font-semibold text-[var(--mb-link)]">Live on Vercel</span>
        </div>
      </div>
    </PlainFrame>
  );
}
