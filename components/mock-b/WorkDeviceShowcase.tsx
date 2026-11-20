import Image from "next/image";
import type { MockBProject } from "@/components/mock-b/data";

function DesktopFrame({
  url,
  tone,
  children,
}: {
  url: string;
  tone: "seaglass" | "terracotta" | "butter";
  children: React.ReactNode;
}) {
  const bar = {
    seaglass: "bg-[#dcefeb] text-[#144740] border-[#b7dad2]",
    terracotta: "bg-[#f9e4db] text-[#822e19] border-[#ecc6b7]",
    butter: "bg-[#fbf1d4] text-[#574d42] border-[#e7d4a0]",
  }[tone];

  return (
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-[var(--mb-line-strong)] bg-[var(--mb-paper)] shadow-[0_4px_0_var(--mb-line)]">
      <div
        className={`flex items-center justify-between gap-2 border-b px-3.5 py-2 text-[11px] font-semibold ${bar}`}
      >
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#b84a2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8a136]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#1e6058]/70" />
        </span>
        <span className="truncate font-mono">{url}</span>
        <span className="w-8 shrink-0" aria-hidden="true" />
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
    <div className="mx-auto flex w-full max-w-[240px] flex-col overflow-hidden rounded-[22px] border-2 border-[var(--mb-ink)]/80 bg-[var(--mb-paper)] p-2 shadow-[0_4px_0_var(--mb-line)] md:max-w-none">
      <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-[var(--mb-line-strong)]" aria-hidden="true" />
      <div className="flex-1 overflow-hidden rounded-[14px] border border-[var(--mb-line)] bg-[var(--mb-cream)]">
        {children}
      </div>
      <p className="mt-1.5 text-center text-[10px] font-semibold text-[var(--mb-ink-soft)]">
        {label}
      </p>
    </div>
  );
}

/**
 * Richer visual showcase panel for /mock-b/work.
 * Uses real repo screenshots for ShelterLink and bespoke CSS/SVG desktop + mobile
 * mockups for Assisi, Crosskennan, Rondo, and MGSL Hub (strictly facts-only).
 */
export function WorkDeviceShowcase({ project }: { project: MockBProject }) {
  if (project.id === "shelterlink" && project.screenshot) {
    return (
      <div className="space-y-4">
        <DesktopFrame url="shelterlink.online" tone="seaglass">
          <div className="aspect-[16/10] w-full bg-[#f5f3ef]">
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              width={project.screenshot.width}
              height={project.screenshot.height}
              sizes="(max-width: 768px) 100vw, 880px"
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
        </DesktopFrame>

        {project.extraScreenshots && project.extraScreenshots.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.extraScreenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-2xl border border-[var(--mb-line-strong)] bg-[var(--mb-paper)]"
              >
                <div className="aspect-[16/10] w-full bg-[#f5f3ef]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 100vw, 430px"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="border-t border-[var(--mb-line)] bg-[var(--mb-cream)] px-3.5 py-2 text-xs font-medium text-[var(--mb-ink-soft)]">
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
        <DesktopFrame url="rdevstudio.co.uk/work/assisi" tone="terracotta">
          <div className="flex min-h-[240px] flex-col justify-between bg-[#fff9f2] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#211d18]">
                <span className="h-3 w-3 rounded-full bg-[#b84a2e]" />
                Assisi Animal Sanctuary
              </span>
              <span className="rounded-full border border-[#ecc6b7] bg-[#f9e4db] px-3 py-1 text-[11px] font-semibold text-[#822e19]">
                Preview held until sanctuary sign-off
              </span>
            </div>

            <div className="my-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#dfd4c2] bg-[#fffdf9] p-3.5 sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#822e19]">
                  Public site rebuild
                </p>
                <p className="mb-display mt-1 text-lg font-semibold text-[#211d18]">
                  Calm, clear navigation for adopters and donors
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#574d42]">
                  Structured so people looking to adopt, donate, or volunteer reach the right page without digging through menus.
                </p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-[#dfd4c2] bg-[#f2e9da] p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#574d42]">
                  Core paths
                </span>
                <div className="mt-2 space-y-1.5 text-xs font-semibold text-[#211d18]">
                  <div className="rounded-lg bg-[#fffdf9] px-2.5 py-1.5">Find animals</div>
                  <div className="rounded-lg bg-[#fffdf9] px-2.5 py-1.5">Ways to donate</div>
                  <div className="rounded-lg bg-[#fffdf9] px-2.5 py-1.5">Volunteer info</div>
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-[#574d42]">
              Full public screenshots and live link will publish once Assisi approves them.
            </p>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Phone-first structure">
          <div className="flex h-full min-h-[210px] flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-14 rounded-full bg-[#211d18]/75" />
              <span className="h-4 w-4 rounded-full bg-[#b84a2e]/25" />
            </div>
            <div className="my-3 space-y-2">
              <div className="rounded-xl bg-[#f9e4db] p-2.5">
                <p className="text-[10px] font-bold text-[#822e19]">Refreshed brand</p>
                <div className="mt-1.5 h-2 w-4/5 rounded-full bg-[#211d18]/25" />
              </div>
              <div className="rounded-xl border border-[#dfd4c2] bg-[#fffdf9] p-2.5">
                <p className="text-[10px] font-bold text-[#211d18]">Clear tap actions</p>
                <div className="mt-1.5 h-5 w-full rounded-full bg-[#b84a2e]" />
              </div>
            </div>
            <div className="h-2 w-2/3 rounded-full bg-[#dfd4c2]" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="crosskennan.vercel.app" tone="butter">
          <div className="flex min-h-[240px] flex-col justify-between bg-[#fdfaf2] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="mb-display text-base font-semibold text-[#211d18]">
                Crosskennan
              </span>
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2 w-10 rounded-full bg-[#dfd4c2]" />
                <span className="h-2 w-10 rounded-full bg-[#dfd4c2]" />
                <span className="h-5 w-16 rounded-full bg-[#1e6058]" />
              </div>
            </div>

            <div className="my-5 grid gap-3 sm:grid-cols-12">
              <div className="rounded-2xl border border-[#e7d4a0] bg-[#fbf1d4]/70 p-4 sm:col-span-7">
                <span className="inline-block rounded-full bg-[#fffdf9] px-2.5 py-0.5 text-[10px] font-semibold text-[#574d42]">
                  Charity web build
                </span>
                <div className="mt-3 space-y-2" aria-hidden="true">
                  <div className="h-3 w-5/6 rounded-full bg-[#211d18]/80" />
                  <div className="h-3 w-3/5 rounded-full bg-[#211d18]/50" />
                  <div className="h-2 w-4/5 rounded-full bg-[#574d42]/30" />
                </div>
                <div className="mt-4 flex gap-2" aria-hidden="true">
                  <span className="h-6 w-20 rounded-full bg-[#1e6058]" />
                  <span className="h-6 w-16 rounded-full border border-[#211d18]/30 bg-[#fffdf9]" />
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-[#dfd4c2] bg-[#fffdf9] p-3.5 sm:col-span-5">
                <div className="h-16 rounded-xl bg-[#dcefeb]" aria-hidden="true" />
                <div className="mt-2.5 space-y-1.5" aria-hidden="true">
                  <div className="h-2 w-3/4 rounded-full bg-[#211d18]/40" />
                  <div className="h-2 w-1/2 rounded-full bg-[#574d42]/25" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-[#574d42]">
              <span>Straightforward charity layout</span>
              <span className="font-semibold text-[#144740]">Hosted preview online</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="Mobile layout">
          <div className="flex h-full min-h-[210px] flex-col justify-between p-3" aria-hidden="true">
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-16 rounded-full bg-[#211d18]/75" />
              <span className="h-3.5 w-3.5 rounded-md bg-[#1e6058]/30" />
            </div>
            <div className="my-3 space-y-2">
              <div className="h-14 rounded-xl bg-[#fbf1d4]" />
              <div className="h-2.5 w-4/5 rounded-full bg-[#211d18]/50" />
              <div className="h-2 w-3/5 rounded-full bg-[#574d42]/30" />
            </div>
            <div className="h-6 w-full rounded-full bg-[#1e6058]" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (project.id === "rondo") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
        <DesktopFrame url="rondo (in-site studio showcase)" tone="terracotta">
          <div className="flex min-h-[240px] flex-col justify-between bg-[#fbf5ec] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#211d18]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#b84a2e] text-[10px] text-[#fffdf9]">
                  R
                </span>
                Rondo
              </span>
              <span className="rounded-full border border-[#dfd4c2] bg-[#f2e9da] px-3 py-1 text-[11px] font-semibold text-[#574d42]">
                Live link to be confirmed by studio
              </span>
            </div>

            <div className="my-5 flex items-center justify-center rounded-2xl border border-[#dfd4c2] bg-[#dcefeb]/60 p-4">
              <svg
                viewBox="0 0 340 112"
                fill="none"
                aria-hidden="true"
                className="h-auto w-full max-w-sm"
              >
                <rect
                  x="10"
                  y="10"
                  width="320"
                  height="92"
                  rx="14"
                  stroke="#1e6058"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                />
                <circle cx="170" cy="56" r="30" stroke="#1e6058" strokeWidth="1.8" />
                <circle cx="90" cy="56" r="8" fill="#b84a2e" />
                <circle cx="170" cy="26" r="8" fill="#1e6058" />
                <circle cx="250" cy="56" r="8" fill="#b84a2e" />
                <circle cx="170" cy="86" r="8" fill="#1e6058" />
                <path
                  d="M99 52L161 29M179 29L241 52M241 60L179 83M161 83L99 60"
                  stroke="#211d18"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-[#574d42]">
              <span>In-house RDev Studio web app</span>
              <span className="font-semibold text-[#822e19]">Studio project</span>
            </div>
          </div>
        </DesktopFrame>

        <PhoneFrame label="App companion view">
          <div className="flex h-full min-h-[210px] flex-col justify-between p-3" aria-hidden="true">
            <div className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-[#b84a2e]" />
              <span className="h-2.5 w-12 rounded-full bg-[#211d18]/75" />
            </div>
            <div className="my-3 flex flex-1 items-center justify-center rounded-xl bg-[#dcefeb]/70 p-2">
              <div className="h-14 w-14 rounded-full border-2 border-dashed border-[#1e6058]" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <span className="h-5 rounded-lg bg-[#fffdf9] border border-[#dfd4c2]" />
              <span className="h-5 rounded-lg bg-[#b84a2e]" />
            </div>
          </div>
        </PhoneFrame>
      </div>
    );
  }

  // MGSL Hub
  return (
    <div className="grid gap-4 md:grid-cols-[1.45fr_0.55fr]">
      <DesktopFrame url="mgsl-hq-black.vercel.app" tone="seaglass">
        <div className="flex min-h-[240px] flex-col justify-between bg-[#f6f9f8] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="mb-display text-base font-semibold text-[#211d18]">
              MGSL Hub
            </span>
            <span className="rounded-full bg-[#dcefeb] px-3 py-1 text-[11px] font-semibold text-[#144740]">
              Web hub preview
            </span>
          </div>

          <div className="my-5 grid gap-3 sm:grid-cols-12" aria-hidden="true">
            <div className="space-y-2.5 rounded-2xl border border-[#b7dad2] bg-[#fffdf9] p-4 sm:col-span-8">
              <div className="h-2.5 w-1/2 rounded-full bg-[#1e6058]/80" />
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between rounded-xl bg-[#f2e9da]/70 px-3 py-2">
                  <span className="h-2 w-24 rounded-full bg-[#211d18]/45" />
                  <span className="h-2 w-10 rounded-full bg-[#1e6058]/50" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f2e9da]/70 px-3 py-2">
                  <span className="h-2 w-28 rounded-full bg-[#211d18]/45" />
                  <span className="h-2 w-8 rounded-full bg-[#b84a2e]/50" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f2e9da]/70 px-3 py-2">
                  <span className="h-2 w-20 rounded-full bg-[#211d18]/45" />
                  <span className="h-2 w-12 rounded-full bg-[#1e6058]/50" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-[#dfd4c2] bg-[#fbf1d4]/70 p-4 sm:col-span-4">
              <div className="h-2.5 w-14 rounded-full bg-[#574d42]/50" />
              <div className="space-y-2">
                <div className="h-6 rounded-lg border border-[#dfd4c2] bg-[#fffdf9]" />
                <div className="h-6 rounded-lg bg-[#1e6058]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[#574d42]">
            <span>Dedicated hub UI</span>
            <span className="font-semibold text-[#144740]">Live on Vercel</span>
          </div>
        </div>
      </DesktopFrame>

      <PhoneFrame label="Mobile hub">
        <div className="flex h-full min-h-[210px] flex-col justify-between p-3" aria-hidden="true">
          <div className="h-2.5 w-16 rounded-full bg-[#1e6058]/80" />
          <div className="my-3 space-y-2">
            <div className="h-8 rounded-lg bg-[#fffdf9] border border-[#dfd4c2]" />
            <div className="h-8 rounded-lg bg-[#fffdf9] border border-[#dfd4c2]" />
            <div className="h-8 rounded-lg bg-[#dcefeb]" />
          </div>
          <div className="h-5 w-full rounded-full bg-[#1e6058]" />
        </div>
      </PhoneFrame>
    </div>
  );
}
