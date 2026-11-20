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
    <div className="mb-frame">
      <div className="mb-frame-chrome">
        <span className="truncate">{url}</span>
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
    <div className="mx-auto flex w-full max-w-[230px] flex-col border border-[var(--mb-line-strong)] bg-[var(--mb-bg)] md:max-w-none">
      <div className="mb-caption border-b border-[var(--mb-line)] px-2.5 py-1.5 font-medium">
        Phone
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
      <p className="mb-caption border-t border-[var(--mb-line)] px-2.5 py-2 text-center font-medium">
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
      <div className="space-y-5">
        <figure className="mb-frame">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--mb-bg)]">
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              width={project.screenshot.width}
              height={project.screenshot.height}
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="mb-caption">
            {project.screenshot.alt}
          </figcaption>
        </figure>

        {project.extraScreenshots && project.extraScreenshots.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {project.extraScreenshots.map((shot) => (
              <figure key={shot.src} className="mb-frame">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--mb-bg)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 100vw, 540px"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="mb-caption">
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
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--mb-bg)] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
              <span className="mb-display text-sm text-[var(--mb-ink)]">
                Assisi Animal Sanctuary
              </span>
              <span className="mb-caption max-w-[18ch] text-right font-medium sm:max-w-none">
                Preview held until sanctuary sign-off
              </span>
            </div>

            <div className="my-5 grid gap-6 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] sm:gap-10">
              <div className="min-w-0 space-y-2">
                <p className="mb-kicker">
                  Public site rebuild
                </p>
                <p className="mb-display text-lg text-[var(--mb-ink)]">
                  Calm, clear navigation for adopters and donors
                </p>
                <p className="text-xs leading-relaxed text-[var(--mb-muted)]">
                  Structured so people looking to adopt, donate, or volunteer reach the right page without digging through menus.
                </p>
              </div>
              <div>
                <span className="mb-caption font-medium">Core paths</span>
                <div className="mt-2 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-xs font-medium text-[var(--mb-ink)]">
                  <div className="py-2">Find animals</div>
                  <div className="py-2">Ways to donate</div>
                  <div className="py-2">Volunteer info</div>
                </div>
              </div>
            </div>

            <p className="border-t border-[var(--mb-line)] pt-3 text-xs font-medium text-[var(--mb-muted)]">
              Full public screenshots and live link will publish once Assisi approves them.
            </p>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Phone-first structure">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3">
            <div className="flex items-center justify-between border-b border-[var(--mb-line)] pb-2">
              <span className="h-2 w-14 bg-[var(--mb-ink)]" aria-hidden="true" />
              <span className="h-2 w-2 bg-[var(--mb-accent)]" aria-hidden="true" />
            </div>
            <div className="my-3 space-y-3">
              <div className="border-b border-[var(--mb-line)] pb-2">
                <p className="mb-caption font-semibold text-[var(--mb-ink)]">Refreshed brand</p>
                <div className="mt-1.5 h-1.5 w-4/5 bg-[var(--mb-line-strong)]" aria-hidden="true" />
              </div>
              <div>
                <p className="mb-caption font-semibold text-[var(--mb-ink)]">Clear tap actions</p>
                <div className="mt-1.5 h-2 w-full bg-[var(--mb-accent)]" aria-hidden="true" />
              </div>
            </div>
            <div className="h-1.5 w-2/3 bg-[var(--mb-line-strong)]" aria-hidden="true" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="crosskennan.vercel.app">
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--mb-bg)] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[var(--mb-line)] pb-3">
              <span className="mb-display text-base text-[var(--mb-ink)]">
                Crosskennan
              </span>
              <span className="mb-caption font-medium">Charity web build</span>
            </div>

            <div className="my-5 space-y-3" aria-hidden="true">
              <div className="h-2.5 w-5/6 bg-[var(--mb-ink)]" />
              <div className="h-2.5 w-3/5 bg-[var(--mb-muted)]" />
              <div className="h-1.5 w-4/5 bg-[var(--mb-line-strong)]" />
              <div className="flex gap-3 border-t border-[var(--mb-line)] pt-4">
                <span className="h-2 w-20 bg-[var(--mb-accent)]" />
                <span className="h-2 w-16 bg-[var(--mb-line-strong)]" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-xs font-medium text-[var(--mb-muted)]">
              <span>Straightforward charity layout</span>
              <span className="font-semibold text-[var(--mb-link)]">Hosted preview online</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Mobile layout">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
            <div className="flex items-center justify-between border-b border-[var(--mb-line)] pb-2">
              <span className="h-2 w-16 bg-[var(--mb-ink)]" />
              <span className="h-2 w-2 bg-[var(--mb-line-strong)]" />
            </div>
            <div className="my-3 space-y-2">
              <div className="h-10 border-b border-[var(--mb-line)]" />
              <div className="h-2 w-4/5 bg-[var(--mb-muted)]" />
              <div className="h-1.5 w-3/5 bg-[var(--mb-line-strong)]" />
            </div>
            <div className="h-2 w-full bg-[var(--mb-accent)]" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "rondo") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="rondo (in-site studio showcase)">
          <div className="flex min-h-[230px] flex-col justify-between bg-[var(--mb-bg)] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--mb-line)] pb-3">
              <span className="mb-display text-base text-[var(--mb-ink)]">
                Rondo
              </span>
              <span className="mb-caption max-w-[18ch] text-right font-medium sm:max-w-none">
                Live link to be confirmed by studio
              </span>
            </div>

            <div className="my-5 space-y-3" aria-hidden="true">
              <div className="h-2 w-1/3 bg-[var(--mb-ink)]" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-y border-[var(--mb-line)] py-4">
                <div className="h-8 border-b border-[var(--mb-line)]" />
                <div className="h-8 border-b border-[var(--mb-line)]" />
                <div className="h-8 border-b border-[var(--mb-line)]" />
                <div className="h-8 border-b border-[var(--mb-accent)]" />
              </div>
              <div className="h-1.5 w-3/4 bg-[var(--mb-line-strong)]" />
            </div>

            <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-xs font-medium text-[var(--mb-muted)]">
              <span>In-house RDev Studio web app</span>
              <span className="font-semibold text-[var(--mb-ink)]">Studio project</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="App companion view">
          <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
            <div className="h-2 w-14 bg-[var(--mb-ink)]" />
            <div className="my-3 space-y-2 border-y border-[var(--mb-line)] py-3">
              <div className="h-8 border-b border-[var(--mb-accent)]" />
              <div className="h-6 border-b border-[var(--mb-line)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <span className="h-2 bg-[var(--mb-line-strong)]" />
              <span className="h-2 bg-[var(--mb-accent)]" />
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
        <div className="flex min-h-[230px] flex-col justify-between bg-[var(--mb-bg)] p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-[var(--mb-line)] pb-3">
            <span className="mb-display text-base text-[var(--mb-ink)]">
              MGSL Hub
            </span>
            <span className="mb-caption font-medium">Web hub preview</span>
          </div>

          <div className="my-5 space-y-0" aria-hidden="true">
            <div className="mb-3 h-2 w-1/2 bg-[var(--mb-accent)]" />
            <div className="divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              <div className="flex items-center justify-between py-2.5">
                <span className="h-1.5 w-24 bg-[var(--mb-muted)]" />
                <span className="h-1.5 w-10 bg-[var(--mb-accent-muted)]" />
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="h-1.5 w-28 bg-[var(--mb-muted)]" />
                <span className="h-1.5 w-8 bg-[var(--mb-line-strong)]" />
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="h-1.5 w-20 bg-[var(--mb-muted)]" />
                <span className="h-1.5 w-12 bg-[var(--mb-accent-muted)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--mb-line)] pt-3 text-xs font-medium text-[var(--mb-muted)]">
            <span>Dedicated hub UI</span>
            <span className="font-semibold text-[var(--mb-link)]">Live on Vercel</span>
          </div>
        </div>
      </DesktopFrame>

      <PhoneFrame label="Mobile hub">
        <div className="flex h-full min-h-[200px] flex-col justify-between p-3" aria-hidden="true">
          <div className="h-2 w-16 bg-[var(--mb-accent)]" />
          <div className="my-3 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            <div className="h-7" />
            <div className="h-7" />
            <div className="h-7" />
          </div>
          <div className="h-2 w-full bg-[var(--mb-accent)]" />
        </div>
      </PhoneFrame>
    </div>
  );
}
