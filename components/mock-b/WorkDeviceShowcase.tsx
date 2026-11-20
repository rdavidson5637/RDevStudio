import Image from "next/image";
import type { MockBProject } from "@/components/mock-b/data";

function DesktopFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-overlay)] px-3.5 py-2 text-[11px] font-medium text-[var(--color-muted)]">
        <span className="truncate font-mono">{url}</span>
      </div>
      {children}
    </div>
  );
}

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[230px] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] p-2.5 md:max-w-none">
      <div className="flex-1 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-paper)]">
        {children}
      </div>
      <p className="mt-2 text-center text-[11px] font-medium text-[var(--color-muted)]">
        {label}
      </p>
    </div>
  );
}

/**
 * Expanded visual showcase panel for /mock-b/work and /mock-b/work/[slug].
 * Uses real repo screenshots for ShelterLink and flat, plain live-token CSS panels
 * for Assisi, Crosskennan, Rondo, and MGSL Hub (strictly facts-only).
 */
export function WorkDeviceShowcase({ project }: { project: MockBProject }) {
  if (project.id === "shelterlink" && project.screenshot) {
    return (
      <div className="space-y-4">
        <figure className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes="(max-width: 768px) 100vw, 960px"
            priority
            className="block h-auto w-full object-cover object-top"
          />
        </figure>

        {project.extraScreenshots && project.extraScreenshots.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.extraScreenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--color-paper)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 100vw, 470px"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-bg-overlay)] px-3.5 py-2 text-xs font-medium text-[var(--color-muted)]">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (project.id === "assisi") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="rdevstudio.co.uk/work/assisi">
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="mb-display text-sm font-semibold text-[var(--color-ink)]">
                Assisi Animal Sanctuary
              </span>
              <span className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-overlay)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-muted)]">
                Preview held until sanctuary sign-off
              </span>
            </div>

            <div className="my-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3.5 sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                  Public site rebuild
                </p>
                <p className="mb-display mt-1 text-lg font-semibold text-[var(--color-ink)]">
                  Calm, clear navigation for adopters and donors
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
                  Structured so people looking to adopt, donate, or volunteer reach the right page without digging through menus.
                </p>
              </div>
              <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  Core paths
                </span>
                <div className="mt-2 divide-y divide-[var(--color-border)] text-xs font-medium text-[var(--color-ink)]">
                  <div className="py-1.5">Find animals</div>
                  <div className="py-1.5">Ways to donate</div>
                  <div className="py-1.5">Volunteer info</div>
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-[var(--color-muted)]">
              Full public screenshots and live link will publish once Assisi approves them.
            </p>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Phone-first structure">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span className="h-2 w-14 bg-[var(--color-ink)]" aria-hidden="true" />
              <span className="h-3 w-3 bg-[var(--color-accent)]" aria-hidden="true" />
            </div>
            <div className="my-3 space-y-2">
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-2.5">
                <p className="text-[10px] font-semibold text-[var(--color-ink)]">Refreshed brand</p>
                <div className="mt-1.5 h-1.5 w-4/5 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-2.5">
                <p className="text-[10px] font-semibold text-[var(--color-ink)]">Clear tap actions</p>
                <div className="mt-1.5 h-5 w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)]" aria-hidden="true" />
              </div>
            </div>
            <div className="h-1.5 w-2/3 bg-[var(--color-border-strong)]" aria-hidden="true" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="crosskennan.vercel.app">
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="mb-display text-base font-semibold text-[var(--color-ink)]">
                Crosskennan
              </span>
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-1.5 w-10 bg-[var(--color-border-strong)]" />
                <span className="h-1.5 w-10 bg-[var(--color-border-strong)]" />
                <span className="h-5 w-16 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
              </div>
            </div>

            <div className="my-5 grid gap-3 sm:grid-cols-12">
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:col-span-7">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                  Charity web build
                </span>
                <div className="mt-3 space-y-2" aria-hidden="true">
                  <div className="h-2.5 w-5/6 bg-[var(--color-ink)]" />
                  <div className="h-2.5 w-3/5 bg-[var(--color-muted)]" />
                  <div className="h-1.5 w-4/5 bg-[var(--color-border-strong)]" />
                </div>
                <div className="mt-4 flex gap-2" aria-hidden="true">
                  <span className="h-5 w-20 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
                  <span className="h-5 w-16 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-paper)]" />
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-3.5 sm:col-span-5">
                <div className="h-16 rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)]" aria-hidden="true" />
                <div className="mt-2.5 space-y-1.5" aria-hidden="true">
                  <div className="h-1.5 w-3/4 bg-[var(--color-muted)]" />
                  <div className="h-1.5 w-1/2 bg-[var(--color-border-strong)]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-[var(--color-muted)]">
              <span>Straightforward charity layout</span>
              <span className="font-semibold text-[var(--color-accent)]">Hosted preview online</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Mobile layout">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
            <div className="flex items-center justify-between">
              <span className="h-2 w-16 bg-[var(--color-ink)]" />
              <span className="h-3 w-3 bg-[var(--color-border-strong)]" />
            </div>
            <div className="my-3 space-y-2">
              <div className="h-14 rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] border border-[var(--color-border)]" />
              <div className="h-2 w-4/5 bg-[var(--color-muted)]" />
              <div className="h-1.5 w-3/5 bg-[var(--color-border-strong)]" />
            </div>
            <div className="h-5 w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "rondo") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="rondo (in-site studio showcase)">
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="mb-display text-base font-semibold text-[var(--color-ink)]">
                Rondo
              </span>
              <span className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-muted)]">
                Live link to be confirmed by studio
              </span>
            </div>

            <div className="my-5 grid gap-3 sm:grid-cols-12" aria-hidden="true">
              <div className="space-y-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:col-span-8">
                <div className="h-2 w-1/3 bg-[var(--color-ink)]" />
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)]" />
                  <div className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)]" />
                </div>
                <div className="h-1.5 w-3/4 bg-[var(--color-border-strong)]" />
              </div>
              <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-4 sm:col-span-4">
                <div className="h-1.5 w-14 bg-[var(--color-muted)]" />
                <div className="space-y-2">
                  <div className="h-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
                  <div className="h-5 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-[var(--color-muted)]">
              <span>In-house RDev Studio web app</span>
              <span className="font-semibold text-[var(--color-ink)]">Studio project</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="App companion view">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
            <div className="h-2 w-14 bg-[var(--color-ink)]" />
            <div className="my-3 space-y-2">
              <div className="h-14 rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)]" />
              <div className="h-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <span className="h-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
              <span className="h-5 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
            </div>
          </div>
        </PhoneFrame>
      </div>
    );
  }

  // MGSL Hub
  return (
    <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
      <DesktopFrame url="mgsl-hq-black.vercel.app">
        <div className="flex min-h-[230px] flex-col justify-between bg-[var(--color-paper)] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="mb-display text-base font-semibold text-[var(--color-ink)]">
              MGSL Hub
            </span>
            <span className="rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)]">
              Web hub preview
            </span>
          </div>

          <div className="my-5 grid gap-3 sm:grid-cols-12" aria-hidden="true">
            <div className="space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:col-span-8">
              <div className="h-2 w-1/2 bg-[var(--color-accent)]" />
              <div className="divide-y divide-[var(--color-border)] pt-1">
                <div className="flex items-center justify-between py-2">
                  <span className="h-1.5 w-24 bg-[var(--color-muted)]" />
                  <span className="h-1.5 w-10 bg-[var(--color-accent-muted)]" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="h-1.5 w-28 bg-[var(--color-muted)]" />
                  <span className="h-1.5 w-8 bg-[var(--color-border-strong)]" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="h-1.5 w-20 bg-[var(--color-muted)]" />
                  <span className="h-1.5 w-12 bg-[var(--color-accent-muted)]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-overlay)] p-4 sm:col-span-4">
              <div className="h-2 w-14 bg-[var(--color-muted)]" />
              <div className="space-y-2">
                <div className="h-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
                <div className="h-5 rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[var(--color-muted)]">
            <span>Dedicated hub UI</span>
            <span className="font-semibold text-[var(--color-accent)]">Live on Vercel</span>
          </div>
        </div>
      </DesktopFrame>

      <PhoneFrame label="Mobile hub">
        <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
          <div className="h-2 w-16 bg-[var(--color-accent)]" />
          <div className="my-3 space-y-2">
            <div className="h-7 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
            <div className="h-7 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]" />
            <div className="h-7 rounded-[var(--radius-sm)] border border-[var(--color-border-accent)] bg-[var(--color-accent-subtle)]" />
          </div>
          <div className="h-5 w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)]" />
        </div>
      </PhoneFrame>
    </div>
  );
}
