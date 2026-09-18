import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/draft/SectionHeading";

export const metadata = createPageMetadata({
  title: "How It's Built",
  description: "The data flow, the availability and projection models, and the trade-offs behind the draft analyser.",
  path: "/draft/how-it-works",
});

export default function HowItsBuiltPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading kicker="Under the hood">How it&apos;s built</SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
          Both FPL APIs block browsers, so nothing in the page ever calls them. A daily cron
          writes into Supabase; the pages read Postgres. The live gameweek page is the exception
          - Vercel Hobby cannot run every five minutes, so that route hits the live endpoint
          server-side, stores the snapshot, and pushes it over Pusher when credentials exist.
          The tab also polls once a minute.
        </p>
      </div>

      <section className="rounded-lg border border-border bg-raised p-5">
        <p className="shell-label mb-3 text-accent">Availability, 0-100</p>
        <pre className="overflow-x-auto text-xs leading-relaxed text-secondary">
{`base = { a:100, d:55, i:5, s:0, u:0, n:15 }[status]
cop  = chance_next ?? chance_this ?? null
score = cop != null ? 0.55 * base + 0.45 * cop : base
score -= newsPenalty(news, age)          // official FPL text only
score += minutesTrend(last4)             // 0 until per-match minutes exist
score += reportedAbsence(signal)         // RSS/Claude, labelled reported
score  = clamp(0, 100)
if status == i: score = min(score, 40)   // unofficial reports cannot green an injury
green >= 75   amber 40-74   red < 40`}
        </pre>
      </section>

      <section className="rounded-lg border border-border bg-raised p-5">
        <p className="shell-label mb-3 text-accent">Projected points</p>
        <pre className="overflow-x-auto text-xs leading-relaxed text-secondary">
{`pStart = 0.55 * availability/100 + 0.45 * starts_per_90
xP = pStart * (appearance + xG * goalPts + xA * 3
     + CS_prob * csPts + defconProb * 2 + bonus)
fixMult = {1:1.25, 2:1.12, 3:1.00, 4:0.88, 5:0.75}[FDR]
Scoring values come from bootstrap settings, not hardcoded 10s.`}
        </pre>
      </section>

      <section className="rounded-lg border border-border bg-raised p-5">
        <p className="shell-label mb-3 text-accent">News layer</p>
        <p className="text-sm leading-relaxed text-secondary">
          Daily cron pulls BBC/Guardian RSS (feeds and summaries only), keeps items from the last
          48 hours, and asks Claude for a structured availability signal per club. Matches are
          scoped to that club. Stored rows never overwrite official FPL status, news, or chance
          fields. The UI labels every extract <span className="text-primary">reported, not confirmed</span>.
        </p>
      </section>

      <section>
        <p className="shell-label mb-3 text-accent">What is not here yet</p>
        <ul className="space-y-2 text-sm text-secondary">
          <li>
            Per-match minutes history, so the availability minutes-trend term stays at zero.
          </li>
          <li>
            True five-minute in-play cron. Hobby is daily; on Pro set{" "}
            <code className="text-primary">/api/cron/live</code> to{" "}
            <code className="text-primary">*/5 * * * *</code>. Until then the live page refreshes
            itself, with Pusher when configured.
          </li>
        </ul>
      </section>
    </div>
  );
}
