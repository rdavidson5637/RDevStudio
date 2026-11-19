export function CastleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 18V9h2.5v2H9V7h2v2h2V7h2v4h2.5V9H20v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 18v-3.2a2.2 2.2 0 0 1 4.4 0V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M2.5 20.5c1.8-1.1 3.4-1.1 5.2 0 1.8 1.1 3.4 1.1 5.2 0 1.8-1.1 3.4-1.1 5.2 0 1.1.7 2.2.9 3.4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.55 13.3L3.3 20.7l4.35-1.1A8.8 8.8 0 1 0 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 9.1c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c-.1.2-.2.3 0 .6.4.8 1.2 1.6 2 2 .3.1.4.1.6 0l.6-.5c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.4.5-2.3.2-1.8-.5-4.3-2.9-4.9-4.8-.3-.9-.2-1.7.2-2.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WavyUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 9.5C28 3.5 52 12.5 78 7.5C104 2.5 130 12 158 7C182 2.8 200 9.5 217 6.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WaveRule() {
  return (
    <svg
      viewBox="0 0 600 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="mb-wave-divider"
    >
      <path
        d="M0 9C25 3 50 15 75 9C100 3 125 15 150 9C175 3 200 15 225 9C250 3 275 15 300 9C325 3 350 15 375 9C400 3 425 15 450 9C475 3 500 15 525 9C550 3 575 15 600 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn coastal Carrickfergus vignette:
 * Castle keep silhouette on rock pier + Belfast Lough waves + sunlit sky + two gulls.
 */
export function CarrickCoastIllustration() {
  return (
    <figure className="mb-card mb-paper-dots relative overflow-hidden p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--mb-butter-soft)] px-3 py-1 text-xs font-semibold text-[var(--mb-ink)] border border-[var(--mb-line)]">
          By Belfast Lough
        </span>
        <span className="text-xs font-medium text-[var(--mb-ink-soft)]">
          54.71° N, 5.81° W
        </span>
      </div>

      <svg
        viewBox="0 0 420 205"
        fill="none"
        role="img"
        aria-label="Illustrated sketch of Carrickfergus Castle overlooking the waves of Belfast Lough"
        className="h-auto w-full rounded-2xl border border-[var(--mb-line)] bg-[#fbf5e8]"
      >
        {/* Soft coastal sky wash */}
        <rect width="420" height="205" fill="#fbf5e8" />
        <ellipse cx="330" cy="52" rx="34" ry="34" fill="#f3dca1" />
        <circle cx="330" cy="52" r="22" fill="#e9bd62" fillOpacity="0.55" />

        {/* Distant hills across the lough */}
        <path
          d="M0 132C44 114 96 116 146 126C205 138 258 112 318 116C358 119 390 126 420 120V152H0V132Z"
          fill="#dcefeb"
        />

        {/* Gulls */}
        <path
          d="M242 54c4-5 10-5 14 0 4-5 10-5 14 0"
          stroke="#574d42"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M276 74c3-3.5 7.5-3.5 10.5 0 3-3.5 7.5-3.5 10.5 0"
          stroke="#574d42"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Harbour wall & rock headland */}
        <path
          d="M24 150L52 134L194 134L224 148L244 152H24Z"
          fill="#dfd4c2"
          stroke="#211d18"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Carrickfergus Castle keep & curtain wall */}
        <path
          d="M66 134V94H78V101H90V94H102V134"
          fill="#f2e9da"
          stroke="#211d18"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M102 134V62H114V70H126V62H138V70H150V62H162V134"
          fill="#fffdf9"
          stroke="#211d18"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M162 134V98H174V105H186V98H198V134"
          fill="#f2e9da"
          stroke="#211d18"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />

        {/* Castle arched gate & slit windows */}
        <path
          d="M123 134V115a9 9 0 0 1 18 0v19"
          fill="#b84a2e"
          stroke="#211d18"
          strokeWidth="1.8"
        />
        <rect x="116" y="81" width="6" height="14" rx="3" fill="#211d18" />
        <rect x="142" y="81" width="6" height="14" rx="3" fill="#211d18" />
        <rect x="81" y="110" width="5" height="10" rx="2.5" fill="#211d18" />
        <rect x="177" y="112" width="5" height="10" rx="2.5" fill="#211d18" />

        {/* Small pennant flag */}
        <path d="M132 62V43" stroke="#211d18" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M132 44L153 49L132 54Z"
          fill="#b84a2e"
          stroke="#211d18"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Little boat on the lough */}
        <path
          d="M312 138H352L345 147H319L312 138Z"
          fill="#b84a2e"
          stroke="#211d18"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M332 138V114" stroke="#211d18" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M332 115L347 134H332V115Z"
          fill="#fffdf9"
          stroke="#211d18"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Belfast Lough sea & wave lines */}
        <rect y="148" width="420" height="57" fill="#1e6058" fillOpacity="0.16" />
        <path
          d="M-6 154C16 146 38 162 60 154C82 146 104 162 126 154C148 146 170 162 192 154C214 146 236 162 258 154C280 146 302 162 324 154C346 146 368 162 390 154C406 148 416 153 426 154"
          stroke="#1e6058"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M16 172C36 166 56 178 76 172C96 166 116 178 136 172C156 166 176 178 196 172"
          stroke="#1e6058"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M238 176C258 170 278 182 298 176C318 170 338 182 358 176C374 171 388 177 402 175"
          stroke="#1e6058"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M84 190C106 184 128 196 150 190C172 184 194 196 216 190C238 184 260 196 282 190"
          stroke="#1e6058"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      </svg>

      <figcaption className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--mb-ink-soft)]">
        <span>Built from Carrickfergus for businesses &amp; charities across NI.</span>
        <span className="font-semibold text-[var(--mb-terracotta-ink)]">
          Straight talk, zero templates
        </span>
      </figcaption>
    </figure>
  );
}

export function ServiceIcon({
  kind,
}: {
  kind: "website" | "webapp" | "gbp" | "charity";
}) {
  if (kind === "website") {
    return (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className="h-6 w-6">
        <rect
          x="3"
          y="5"
          width="22"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M3 10.5h22" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="7.8" r="1" fill="currentColor" />
        <circle cx="10.2" cy="7.8" r="1" fill="currentColor" />
        <path
          d="M8 15h6M8 18.5h11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "webapp") {
    return (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className="h-6 w-6">
        <rect
          x="4"
          y="4"
          width="9"
          height="9"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="15"
          y="4"
          width="9"
          height="9"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="4"
          y="15"
          width="20"
          height="9"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
        <path
          d="M14 19.5h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "gbp") {
    return (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className="h-6 w-6">
        <path
          d="M14 24s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle
          cx="14"
          cy="12"
          r="2.6"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M14 23.5s-8.5-5.1-8.5-11.2A4.8 4.8 0 0 1 14 9.1a4.8 4.8 0 0 1 8.5 3.2c0 6.1-8.5 11.2-8.5 11.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
