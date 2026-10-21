const ROWS = [
  { distance: "0.2 miles", state: "Beamish on", when: "Confirmed today", fade: 1, pint: true },
  { distance: "0.6 miles", state: "Beamish on", when: "Confirmed 3 weeks ago", fade: 0.85, pint: true },
  { distance: "1.1 miles", state: "Probably on", when: "Last confirmed 8 months ago", fade: 0.6, pint: true },
  { distance: "2.4 miles", state: "No reports yet", when: "Tap to say what is on", fade: 0.45, pint: false },
] as const;

function Pint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden="true">
      <path d="M4 6h16l-2.2 21a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L4 6Z" fill="currentColor" />
      <path d="M3 6c0-2.6 2-4.4 4.4-4.4.8-1 2-1.6 3.4-1.6 1.6 0 3 .8 3.7 2 .5-.3 1.1-.4 1.7-.4 2.4 0 4 1.8 4 4.4H3Z" fill="#FBE6A0" />
    </svg>
  );
}

/**
 * A drawn version of the Stout Finder screen. The rows are an illustration,
 * not live data, and the caption says so.
 */
export function StoutFinderMock() {
  return (
    <figure className="mx-auto w-full max-w-[22rem]">
      <div
        aria-hidden="true"
        className="rounded-[2rem] border-2 border-studio-border-strong bg-studio-bg p-4 shadow-none"
      >
        <div className="rounded-[1.4rem] bg-studio-surface p-5">
          <p className="font-studio-display text-3xl leading-tight text-studio-text">Who has Beamish on?</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-studio-accent px-3 py-1 font-semibold text-studio-on-accent">Beamish</span>
            <span className="rounded-full border border-studio-border-strong px-3 py-1 text-studio-muted">Guinness</span>
            <span className="rounded-full border border-studio-border-strong px-3 py-1 text-studio-muted">Murphy&apos;s</span>
          </div>
          <ul className="mt-5 divide-y divide-studio-line">
            {ROWS.map((row, i) => (
              <li
                key={row.distance}
                className="sf-row flex items-center gap-3 py-3"
                style={{ opacity: row.fade, ["--sf-i" as string]: i }}
              >
                {row.pint ? (
                  <Pint className="h-7 w-5 shrink-0 text-studio-accent" />
                ) : (
                  <span className="mx-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-studio-border-strong" />
                )}
                <div className="min-w-0">
                  <p className="text-base font-semibold text-studio-text">
                    {row.state} <span className="font-normal text-studio-muted">- {row.distance}</span>
                  </p>
                  <p className="text-sm text-studio-faint">{row.when}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-sm bg-studio-accent py-3 text-center text-base font-bold text-studio-on-accent">
            Log a pint
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-studio-faint">
        Drawn for this page. Not live data. Older reports fade.
      </figcaption>
    </figure>
  );
}
