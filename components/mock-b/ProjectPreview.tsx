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
        <figcaption className="border-t border-[var(--mb-line)] bg-[var(--mb-raised)] px-3.5 py-2.5 text-xs text-[var(--mb-muted)]">
          {project.screenshot.alt}
        </figcaption>
      </figure>
    );
  }

  if (project.id === "assisi") {
    return (
      <PlainFrame label="rdevstudio.co.uk/work/assisi">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--mb-bg)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Assisi Animal Sanctuary
            </span>
            <span className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-raised)] px-2 py-0.5 text-[10px] font-semibold text-[var(--mb-muted)]">
              Preview held for sign-off
            </span>
          </div>

          <div className="my-auto grid grid-cols-12 gap-3 py-3">
            <div className="col-span-7 flex flex-col justify-center space-y-2 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-surface)] p-3">
              <span className="h-1 w-10 bg-[var(--mb-accent)]" />
              <p className="mb-display text-sm leading-snug text-[var(--mb-ink)] sm:text-base">
                Website &amp; brand rebuild
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--mb-muted)]">
                Clear pathways for adopters, donors, and supporters on mobile and desktop.
              </p>
            </div>
            <div className="col-span-5 flex flex-col justify-between rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)] p-2.5">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold text-[var(--mb-muted)]">
                  Key routes
                </span>
                <span className="block border-b border-[var(--mb-line)] py-1 text-[11px] font-medium text-[var(--mb-ink)]">
                  Adopt
                </span>
                <span className="block border-b border-[var(--mb-line)] py-1 text-[11px] font-medium text-[var(--mb-ink)]">
                  Donate
                </span>
                <span className="block py-1 text-[11px] font-medium text-[var(--mb-ink)]">
                  Volunteer
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-medium text-[var(--mb-muted)]">
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
          <div className="flex items-center justify-between gap-2">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Crosskennan
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-8 bg-[var(--mb-line-strong)]" />
              <span className="h-1.5 w-8 bg-[var(--mb-line-strong)]" />
              <span className="h-1.5 w-10 bg-[var(--mb-accent)]" />
            </div>
          </div>

          <div className="grid grid-cols-12 items-stretch gap-3 py-3">
            <div className="col-span-8 space-y-2 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-surface)] p-3.5">
              <span className="inline-block text-[10px] font-bold text-[var(--mb-link)]">
                Charity web preview
              </span>
              <div className="h-2.5 w-4/5 bg-[var(--mb-ink)]" aria-hidden="true" />
              <div className="h-2 w-3/5 bg-[var(--mb-line-strong)]" aria-hidden="true" />
              <div className="flex gap-2 pt-2" aria-hidden="true">
                <span className="inline-block h-5 w-16 rounded-[var(--mb-radius-sm)] bg-[var(--mb-accent)]" />
                <span className="inline-block h-5 w-14 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-bg)]" />
              </div>
            </div>
            <div className="col-span-4 flex flex-col justify-between rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)] p-2.5">
              <span className="text-[9px] font-bold text-[var(--mb-muted)]">
                Mobile view
              </span>
              <div className="space-y-1.5 py-2" aria-hidden="true">
                <div className="h-7 rounded-[var(--mb-radius-sm)] bg-[var(--mb-accent-subtle)]" />
                <div className="h-1.5 w-4/5 bg-[var(--mb-line-strong)]" />
                <div className="h-1.5 w-3/5 bg-[var(--mb-line)]" />
              </div>
              <span className="h-3.5 w-full rounded-[var(--mb-radius-sm)] bg-[var(--mb-accent)]" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--mb-muted)]">
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
          <div className="flex items-center justify-between gap-2">
            <span className="mb-display text-sm text-[var(--mb-ink)]">
              Rondo
            </span>
            <span className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)] px-2 py-0.5 text-[10px] font-semibold text-[var(--mb-muted)]">
              In-house web app
            </span>
          </div>

          <div className="my-3 grid grid-cols-3 gap-2.5" aria-hidden="true">
            <div className="col-span-2 space-y-2 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-surface)] p-3">
              <div className="h-2 w-1/2 bg-[var(--mb-ink)]" />
              <div className="h-1.5 w-4/5 bg-[var(--mb-line-strong)]" />
              <div className="mt-2 grid grid-cols-2 gap-2 pt-1">
                <div className="h-10 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)]" />
                <div className="h-10 rounded-[var(--mb-radius-sm)] border border-[var(--mb-border-accent)] bg-[var(--mb-accent-subtle)]" />
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)] p-3">
              <div className="h-1.5 w-3/4 bg-[var(--mb-line-strong)]" />
              <div className="space-y-1.5">
                <div className="h-4 rounded-[var(--mb-radius-sm)] bg-[var(--mb-surface)] border border-[var(--mb-line)]" />
                <div className="h-4 rounded-[var(--mb-radius-sm)] bg-[var(--mb-accent)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--mb-muted)]">
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
        <div className="flex items-center justify-between gap-2">
          <span className="mb-display text-sm text-[var(--mb-ink)]">
            MGSL Hub
          </span>
          <span className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-border-accent)] bg-[var(--mb-accent-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--mb-link)]">
            Web hub
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 py-3" aria-hidden="true">
          <div className="col-span-2 space-y-2 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-surface)] p-3">
            <div className="h-2 w-2/3 bg-[var(--mb-accent)]" />
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between border-b border-[var(--mb-line)] py-1.5">
                <span className="h-1.5 w-16 bg-[var(--mb-muted)]" />
                <span className="h-1.5 w-8 bg-[var(--mb-accent-muted)]" />
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="h-1.5 w-20 bg-[var(--mb-muted)]" />
                <span className="h-1.5 w-6 bg-[var(--mb-line-strong)]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-raised)] p-3">
            <div className="h-1.5 w-10 bg-[var(--mb-line-strong)]" />
            <div className="space-y-1.5">
              <div className="h-5 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-surface)]" />
              <div className="h-5 rounded-[var(--mb-radius-sm)] bg-[var(--mb-accent)]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-medium text-[var(--mb-muted)]">
          <span>Custom web hub UI</span>
          <span className="font-semibold text-[var(--mb-link)]">Live on Vercel</span>
        </div>
      </div>
    </PlainFrame>
  );
}
