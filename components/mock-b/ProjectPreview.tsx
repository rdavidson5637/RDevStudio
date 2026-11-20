import Image from "next/image";
import type { MockBProject } from "@/components/mock-b/data";

function BrowserChrome({
  label,
  children,
  tone = "cream",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "cream" | "seaglass" | "terracotta" | "butter";
}) {
  const barTone = {
    cream: "bg-[#f2e9da] text-[#574d42] border-[#dfd4c2]",
    seaglass: "bg-[#dcefeb] text-[#144740] border-[#b7dad2]",
    terracotta: "bg-[#f9e4db] text-[#822e19] border-[#ecc6b7]",
    butter: "bg-[#fbf1d4] text-[#574d42] border-[#e7d4a0]",
  }[tone];

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--mb-line-strong)] bg-[var(--mb-paper)]">
      <div
        className={`flex items-center justify-between gap-2 border-b px-3.5 py-2 text-[11px] font-semibold ${barTone}`}
      >
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#b84a2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8a136]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#1e6058]/70" />
        </span>
        <span className="truncate font-mono text-[11px] tracking-tight">
          {label}
        </span>
        <span className="w-8 shrink-0" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

/**
 * Renders either a real repo screenshot (ShelterLink) or a bespoke CSS/SVG
 * interface screen built specifically for the other four projects.
 * Strictly avoids invented stats, fake client testimonials, or stock imagery.
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
      <BrowserChrome label="shelterlink.online" tone="seaglass">
        <div
          className={`relative w-full bg-[#f5f3ef] ${
            size === "featured" ? "aspect-[16/10]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            sizes={
              size === "featured"
                ? "(max-width: 768px) 100vw, 680px"
                : "(max-width: 768px) 100vw, 420px"
            }
            className="h-full w-full object-cover object-top"
          />
        </div>
      </BrowserChrome>
    );
  }

  if (project.id === "assisi") {
    return (
      <BrowserChrome label="rdevstudio.co.uk/work/assisi" tone="terracotta">
        <div className="flex min-h-[215px] flex-col justify-between bg-[#fff9f2] p-3.5 sm:aspect-[16/10] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#211d18]">
              <span className="inline-block h-3 w-3 shrink-0 rounded-full bg-[#b84a2e]" />
              Assisi Animal Sanctuary
            </span>
            <span className="rounded-full border border-[#ecc6b7] bg-[#f9e4db] px-2.5 py-0.5 text-[10px] font-semibold text-[#822e19]">
              Preview held for sign-off
            </span>
          </div>

          <div className="my-auto grid grid-cols-12 gap-2.5 py-2.5 sm:gap-3 sm:py-3">
            <div className="col-span-7 flex flex-col justify-center space-y-2 rounded-xl border border-[#dfd4c2] bg-[#fffdf9] p-3 sm:p-3.5">
              <span className="h-2 w-14 rounded-full bg-[#b84a2e]/35" />
              <p className="mb-display text-sm leading-snug text-[#211d18] sm:text-lg">
                Website &amp; brand rebuild
              </p>
              <p className="text-[11px] leading-relaxed text-[#574d42]">
                Clear pathways for adopters, donors, and supporters on mobile and desktop.
              </p>
            </div>
            <div className="col-span-5 flex flex-col justify-between rounded-xl border border-[#dfd4c2] bg-[#f2e9da] p-2.5 sm:p-3">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-[#574d42]">
                  Key routes
                </span>
                <span className="block rounded-lg bg-[#fffdf9] px-2 py-1 text-[10px] font-semibold text-[#211d18]">
                  Adopt
                </span>
                <span className="block rounded-lg bg-[#fffdf9] px-2 py-1 text-[10px] font-semibold text-[#211d18]">
                  Donate
                </span>
                <span className="block rounded-lg bg-[#fffdf9] px-2 py-1 text-[10px] font-semibold text-[#211d18]">
                  Volunteer
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-medium text-[#574d42]">
            <span>Public screens publish after sanctuary approval</span>
            <span className="font-semibold text-[#822e19]">Charity build</span>
          </div>
        </div>
      </BrowserChrome>
    );
  }

  if (project.id === "crosskennan") {
    return (
      <BrowserChrome label="crosskennan.vercel.app" tone="butter">
        <div className="flex aspect-[16/10] flex-col justify-between bg-[#fdfaf2] p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="mb-display text-sm font-semibold text-[#211d18]">
              Crosskennan
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-9 rounded-full bg-[#dfd4c2]" />
              <span className="h-2 w-9 rounded-full bg-[#dfd4c2]" />
              <span className="h-2 w-11 rounded-full bg-[#1e6058]/40" />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-3 py-2">
            <div className="col-span-8 space-y-2 rounded-xl border border-[#e7d4a0] bg-[#fbf1d4]/60 p-3.5">
              <span className="inline-block rounded-full bg-[#fffdf9] px-2 py-0.5 text-[10px] font-semibold text-[#574d42]">
                Charity web preview
              </span>
              <div className="h-2.5 w-4/5 rounded-full bg-[#211d18]/80" />
              <div className="h-2 w-3/5 rounded-full bg-[#574d42]/35" />
              <div className="pt-1 flex gap-2">
                <span className="inline-block h-5 w-16 rounded-full bg-[#1e6058]" />
                <span className="inline-block h-5 w-14 rounded-full border border-[#211d18]/30 bg-[#fffdf9]" />
              </div>
            </div>
            <div className="col-span-4 flex h-full flex-col justify-between rounded-xl border border-[#dfd4c2] bg-[#fffdf9] p-2.5">
              <span className="text-[9px] font-bold uppercase tracking-wide text-[#574d42]">
                Mobile view
              </span>
              <div className="space-y-1.5 py-1" aria-hidden="true">
                <div className="h-7 rounded-lg bg-[#dcefeb]" />
                <div className="h-2 w-4/5 rounded-full bg-[#211d18]/25" />
                <div className="h-2 w-3/5 rounded-full bg-[#211d18]/15" />
              </div>
              <span className="h-3.5 w-full rounded-full bg-[#b84a2e]/85" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[#574d42]">
            <span>Phone-first layout</span>
            <span className="font-semibold text-[#144740]">Live on Vercel</span>
          </div>
        </div>
      </BrowserChrome>
    );
  }

  if (project.id === "rondo") {
    return (
      <BrowserChrome label="rondo (studio preview)" tone="terracotta">
        <div className="flex aspect-[16/10] flex-col justify-between bg-[#fbf5ec] p-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#211d18]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#b84a2e] text-[10px] text-[#fffdf9]">
                R
              </span>
              Rondo
            </span>
            <span className="rounded-full bg-[#f2e9da] px-2.5 py-0.5 text-[10px] font-semibold text-[#574d42]">
              In-house web app
            </span>
          </div>

          {/* Clean geometric pitch/studio rhythm diagram without inventing coaching rules */}
          <div className="relative my-2 flex flex-1 items-center justify-center rounded-xl border border-[#dfd4c2] bg-[#dcefeb]/55 p-3">
            <svg
              viewBox="0 0 260 96"
              fill="none"
              aria-hidden="true"
              className="h-full max-h-24 w-full"
            >
              <rect
                x="8"
                y="8"
                width="244"
                height="80"
                rx="12"
                stroke="#1e6058"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="130" cy="48" r="24" stroke="#1e6058" strokeWidth="1.5" />
              <circle cx="72" cy="48" r="7" fill="#b84a2e" />
              <circle cx="130" cy="24" r="7" fill="#1e6058" />
              <circle cx="188" cy="48" r="7" fill="#b84a2e" />
              <circle cx="130" cy="72" r="7" fill="#1e6058" />
              <path
                d="M79 44L122 27M138 27L181 44M181 52L138 69"
                stroke="#211d18"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-[#574d42]">
            <span>RDev Studio application build</span>
            <span className="font-semibold text-[#822e19]">Link pending</span>
          </div>
        </div>
      </BrowserChrome>
    );
  }

  // MGSL Hub
  return (
    <BrowserChrome label="mgsl-hq-black.vercel.app" tone="seaglass">
      <div className="flex aspect-[16/10] flex-col justify-between bg-[#f6f9f8] p-5">
        <div className="flex items-center justify-between">
          <span className="mb-display text-sm font-semibold text-[#211d18]">
            MGSL Hub
          </span>
          <span className="rounded-full bg-[#dcefeb] px-2.5 py-0.5 text-[10px] font-semibold text-[#144740]">
            Web hub
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 py-2" aria-hidden="true">
          <div className="col-span-2 space-y-2 rounded-xl border border-[#b7dad2] bg-[#fffdf9] p-3">
            <div className="h-2.5 w-2/3 rounded-full bg-[#1e6058]/80" />
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between rounded-lg bg-[#f2e9da]/70 px-2.5 py-1.5">
                <span className="h-2 w-16 rounded-full bg-[#211d18]/45" />
                <span className="h-2 w-8 rounded-full bg-[#1e6058]/45" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#f2e9da]/70 px-2.5 py-1.5">
                <span className="h-2 w-20 rounded-full bg-[#211d18]/45" />
                <span className="h-2 w-6 rounded-full bg-[#b84a2e]/45" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[#dfd4c2] bg-[#fbf1d4]/65 p-3">
            <div className="h-2 w-10 rounded-full bg-[#574d42]/45" />
            <div className="space-y-1.5">
              <div className="h-5 rounded-md bg-[#fffdf9] border border-[#dfd4c2]" />
              <div className="h-5 rounded-md bg-[#1e6058]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-medium text-[#574d42]">
          <span>Custom web hub UI</span>
          <span className="font-semibold text-[#144740]">Live on Vercel</span>
        </div>
      </div>
    </BrowserChrome>
  );
}
