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
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-overlay)] px-3.5 py-2 text-[11px] font-medium text-[var(--color-muted)]">
        <span className="truncate font-mono tracking-tight">{label}</span>
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
      <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]">
        <Image
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          sizes={
            size === "featured"
              ? "(max-width: 768px) 100vw, 640px"
              : "(max-width: 768px) 100vw, 440px"
          }
          className="block h-auto w-full object-cover object-top"
        />
      </div>
    );
  }

  if (project.id === "assisi") {
    return (
      <PlainFrame label="rdevstudio.co.uk/work/assisi">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--color-paper)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="mb-display text-sm font-semibold text-[var(--color-ink)]">
              Assisi Animal Sanctuary
            </span>
            <span className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-overlay)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-muted)]">
              Preview held for sign-off
            </span>
          </div>

          <div className="my-auto grid grid-cols-12 gap-3 py-3">
            <div className="col-span-7 flex flex-col justify-center space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
              <span className="h-1 w-10 bg-[var(--color-accent)]" />
              <p className="mb-display text-sm leading-snug text-[var(--color-ink)] sm:text-base">
                Website &amp; brand rebuild
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--color-muted)]">
                Clear pathways for adopters, donors, and supporters on mobile and desktop.
              </p>
            </div>
            <div className="col-span-5 flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-2.5">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  Key routes
                </span>
                <span className="block border-b border-[var(--color-border)] py-1 text-[11px] font-medium text-[var(--color-ink)]">
                  Adopt
                </span>
                <span className="block border-b border-[var(--color-border)] py-1 text-[11px] font-medium text-[var(--color-ink)]">
                  Donate
                </span>
                <span className="block py-1 text-[11px] font-medium text-[var(--color-ink)]">
                  Volunteer
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-medium text-[var(--color-muted)]">
            <span>Public screens publish after sanctuary approval</span>
            <span className="font-semibold text-[var(--color-accent)]">Charity build</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <PlainFrame label="crosskennan.vercel.app">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--color-paper)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="mb-display text-sm font-semibold text-[var(--color-ink)]">
              Crosskennan
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-8 bg-[var(--color-border-strong)]" />
              <span className="h-1.5 w-8 bg-[var(--color-border-strong)]" />
              <span className="h-1.5 w-10 bg-[var(--color-accent)]" />
            </div>
          </div>

          <div className="grid grid-cols-12 items-stretch gap-3 py-3">
            <div className="col-span-8 space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3.5">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                Charity web preview
              </span>
              <div className="h-2.5 w-4/5 bg-[var(--color-ink)]" aria-hidden="true" />
              <div className="h-2 w-3/5 bg-[var(--color-border-strong)]" aria-hidden="true" />
              <div className="flex gap-2 pt-2" aria-hidden="true">
                <span className="inline-block h-5 w-16 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
                <span className="inline-block h-5 w-14 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-paper)]" />
              </div>
            </div>
            <div className="col-span-4 flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Mobile view
              </span>
              <div className="space-y-1.5 py-2" aria-hidden="true">
                <div className="h-7 rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)]" />
                <div className="h-1.5 w-4/5 bg-[var(--color-border-strong)]" />
                <div className="h-1.5 w-3/5 bg-[var(--color-border)]" />
              </div>
              <span className="h-3.5 w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)]" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--color-muted)]">
            <span>Phone-first layout</span>
            <span className="font-semibold text-[var(--color-accent)]">Live on Vercel</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  if (project.id === "rondo") {
    return (
      <PlainFrame label="rondo (studio preview)">
        <div className="flex min-h-[210px] flex-col justify-between bg-[var(--color-paper)] p-4 sm:aspect-[16/10] sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="mb-display text-sm font-semibold text-[var(--color-ink)]">
              Rondo
            </span>
            <span className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-muted)]">
              In-house web app
            </span>
          </div>

          <div className="my-3 grid grid-cols-3 gap-2.5" aria-hidden="true">
            <div className="col-span-2 space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
              <div className="h-2 w-1/2 bg-[var(--color-ink)]" />
              <div className="h-1.5 w-4/5 bg-[var(--color-border-strong)]" />
              <div className="mt-2 grid grid-cols-2 gap-2 pt-1">
                <div className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)]" />
                <div className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)]" />
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-3">
              <div className="h-1.5 w-3/4 bg-[var(--color-border-strong)]" />
              <div className="space-y-1.5">
                <div className="h-4 rounded-[var(--radius-sm)] bg-[var(--color-bg-raised)] border border-[var(--color-border)]" />
                <div className="h-4 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--color-muted)]">
            <span>RDev Studio application build</span>
            <span className="font-semibold text-[var(--color-ink)]">Link pending</span>
          </div>
        </div>
      </PlainFrame>
    );
  }

  // MGSL Hub
  return (
    <PlainFrame label="mgsl-hq-black.vercel.app">
      <div className="flex min-h-[210px] flex-col justify-between bg-[var(--color-paper)] p-4 sm:aspect-[16/10] sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="mb-display text-sm font-semibold text-[var(--color-ink)]">
            MGSL Hub
          </span>
          <span className="rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-accent)]">
            Web hub
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 py-3" aria-hidden="true">
          <div className="col-span-2 space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
            <div className="h-2 w-2/3 bg-[var(--color-accent)]" />
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-1.5">
                <span className="h-1.5 w-16 bg-[var(--color-muted)]" />
                <span className="h-1.5 w-8 bg-[var(--color-accent-muted)]" />
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="h-1.5 w-20 bg-[var(--color-muted)]" />
                <span className="h-1.5 w-6 bg-[var(--color-border-strong)]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-3">
            <div className="h-1.5 w-10 bg-[var(--color-border-strong)]" />
            <div className="space-y-1.5">
              <div className="h-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
              <div className="h-5 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-medium text-[var(--color-muted)]">
          <span>Custom web hub UI</span>
          <span className="font-semibold text-[var(--color-accent)]">Live on Vercel</span>
        </div>
      </div>
    </PlainFrame>
  );
}
