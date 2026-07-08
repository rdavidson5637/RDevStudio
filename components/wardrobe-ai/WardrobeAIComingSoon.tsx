import Link from "next/link";

const FEATURES: { label: string; body: string }[] = [
  {
    label: "AI tagging",
    body: "Snap a garment and Claude reads its type, colour, formality and layer. No manual data entry.",
  },
  {
    label: "Ghost clothing",
    body: "Backgrounds are stripped on upload, so every piece floats clean on its own.",
  },
  {
    label: "Every line-up",
    body: "A plain-code engine builds every valid outfit from the pieces. Ten items, dozens of looks.",
  },
  {
    label: "The verdict",
    body: "An honest AI stylist scores each fit out of 100 and tells you exactly why, clashes and all.",
  },
];

const STATS: { value: string; cap: string }[] = [
  { value: "Soon", cap: "Status" },
  { value: "Next + Supabase", cap: "Stack" },
  { value: "Claude", cap: "On styling" },
];

export function WardrobeAIComingSoon() {
  return (
    <div>
      <header className="border-b border-border pb-10">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <p className="section-label m-0 text-accent">RDev Studio // Wardrobe AI</p>
          <span
            className="label-caps rounded-full border border-border-accent px-3 py-1 text-accent"
            style={{ background: "var(--color-accent-subtle)" }}
          >
            Coming soon
          </span>
        </div>
        <h1 className="programme-h1">WARDROBE AI</h1>
        <p className="lead-text mt-5 max-w-3xl">
          A daft-but-real experiment: photograph a wardrobe, let AI tag every piece, then generate
          every outfit it can make. After that, ask an honest AI stylist what it actually thinks.
          Launching with my own wardrobe.
        </p>
      </header>

      {/* Scoreboard strip */}
      <div
        className="mt-8 inline-flex flex-wrap overflow-hidden rounded-lg border"
        style={{ borderColor: "var(--color-ink)", background: "var(--color-ink)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.cap}
            className="px-5 py-3 text-center text-white"
            style={{
              fontFamily: "var(--font-label-family)",
              borderLeft: i === 0 ? "none" : "1px solid #33322a",
            }}
          >
            <span className="block text-2xl leading-none">{s.value}</span>
            <span
              className="mt-1.5 block text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "#b9b6a8" }}
            >
              {s.cap}
            </span>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.label} className="interactive-surface p-5">
            <p className="shell-label text-accent">{f.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{f.body}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-14">
        <p className="section-label text-accent">How it works</p>
        <h2 className="section-heading">Photo in, outfits out</h2>
        <p className="lead-text mt-4 max-w-3xl">
          Each garment is photographed once and tagged automatically. The combination maths is plain,
          deterministic code, never guessed by the AI, so it finds every valid outfit from the pieces.
          The only AI in the loop is reading the photos and giving each finished look an honest verdict.
          Built with Next.js, Supabase and Claude.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          Get in touch
        </Link>
        <a
          href="https://github.com/rdavidson5637/Wardrobe-AI"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          See the build
        </a>
      </div>

      <p className="editorial-note mt-10">Built in Carrickfergus. Live soon.</p>
    </div>
  );
}
