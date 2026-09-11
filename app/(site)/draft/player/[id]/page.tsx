import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { AvailabilityDot } from "@/components/draft/AvailabilityDot";
import { supabasePublic } from "@/lib/supabase/public";

const POSITION_LABELS: Record<number, string> = { 1: "Goalkeeper", 2: "Defender", 3: "Midfielder", 4: "Forward" };
const STATUS_LABELS: Record<string, string> = {
  a: "Available",
  d: "Doubtful",
  i: "Injured",
  s: "Suspended",
  u: "Unavailable",
  n: "Not in squad",
};
const STATUS_BASE: Record<string, number> = { d: 55, i: 5, s: 0, u: 0, n: 15 };

async function getPlayer(id: number) {
  const { data } = await supabasePublic
    .from("fpl_players")
    .select(
      "id, web_name, first_name, second_name, element_type, status, news, chance_of_playing_next_round, form, total_points, minutes, fpl_teams(name, short_name)",
    )
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const player = await getPlayer(Number(id));
  return createPageMetadata({
    title: player ? player.web_name : "Player",
    description: player
      ? `Availability, form and projections for ${player.web_name}.`
      : "Player detail.",
    path: `/draft/player/${id}`,
  });
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayer(Number(id));

  if (!player) notFound();

  const team = Array.isArray(player.fpl_teams) ? player.fpl_teams[0] : player.fpl_teams;
  // Rough stand-in for the real availabilityScore() from lib/draft/availability.ts
  // (prompt 07, not built yet) - just enough to colour the dot correctly today.
  const scoreEstimate =
    player.status === "a"
      ? 90
      : player.chance_of_playing_next_round ?? STATUS_BASE[player.status] ?? 50;

  return (
    <div className="space-y-8">
      <Link href="/draft/squad" className="shell-label text-accent">
        ← Back to squad
      </Link>

      <header className="flex items-center gap-4 border-b border-border pb-6">
        <AvailabilityDot score={scoreEstimate} className="h-4 w-4" />
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-primary sm:text-4xl">
            {player.web_name}
          </h1>
          <p className="shell-label mt-1 text-secondary">
            {team?.name ?? "Unknown club"} · {POSITION_LABELS[player.element_type] ?? "—"}
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Status</p>
          <p className="mt-1 text-lg text-primary">{STATUS_LABELS[player.status] ?? player.status}</p>
        </div>
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Form</p>
          <p className="mt-1 text-lg tabular-nums text-primary">{player.form ?? "—"}</p>
        </div>
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Total points</p>
          <p className="mt-1 text-lg tabular-nums text-primary">{player.total_points ?? "—"}</p>
        </div>
      </div>

      {player.news ? (
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="shell-label mb-2 text-accent">Official news</p>
          <p className="text-sm text-secondary">{player.news}</p>
        </div>
      ) : null}

      <p className="text-sm text-secondary">
        Projections, fixture-by-fixture history and the availability model
        breakdown land here once the projection engine is built.
      </p>
    </div>
  );
}
