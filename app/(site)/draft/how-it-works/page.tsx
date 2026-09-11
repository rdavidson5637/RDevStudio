import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/draft/SectionHeading";

export const metadata = createPageMetadata({
  title: "How It's Built",
  description: "The data flow, the availability and projection models, and the trade-offs behind the draft analyser.",
  path: "/draft/how-it-works",
});

export default function HowItsBuiltPage() {
  return (
    <div className="space-y-8">
      <SectionHeading kicker="Under the hood">How it&apos;s built</SectionHeading>
      <p className="max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
        The full write-up — data sources, the sync architecture, and the
        availability and projection models with every term shown, not hidden
        behind a black box — lands here once the models themselves are built.
      </p>
      <div className="rounded-lg border border-border bg-raised p-5">
        <p className="shell-label mb-2 text-accent">So far</p>
        <ul className="space-y-1.5 text-sm text-secondary">
          <li>Hourly sync from the FPL Draft + main APIs into Supabase, server-side only — both APIs block browser requests.</li>
          <li>Every table is RLS-locked to public read; all writes go through a service-role cron route guarded by a bearer secret.</li>
          <li>An append-only snapshot table captures every status change, which is what will power the timeline feature.</li>
        </ul>
      </div>
    </div>
  );
}
