import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { AvailabilityDot } from "@/components/draft/AvailabilityDot";
import { supabasePublic } from "@/lib/supabase/public";
import { availabilityScore, type Status } from "@/lib/draft/availability";
import { getCurrentEvent } from "@/lib/draft/queries";

const POSITION_LABELS: Record<number, string> = { 1: "Goalkeeper", 2: "Defender", 3: "Midfielder", 4: "Forward" };
const STATUS_LABELS: Record<string, string> = {
  a: "Available",
  d: "Doubtful",
  i: "Injured",
  s: "Suspended",
  u: "Unavailable",
  n: "Not in squad",
};

async function getPlayer(id: number) {
  const { data } = await supabasePublic
    .from("fpl_players")
    .select(
      "id, web_name, first_name, second_name, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, form, ep_next, total_points, minutes, fpl_teams(name, short_name)",
    )
    .eq("id", id)
    .maybeSingle();
  return data;
}

async function getProjection(id: number, event: number | null) {
  if (event == null) return null;
  const { data } = await supabasePublic
    .from("fpl_projections")
    .select("projected_points")
    .eq("player_id", id)
    .eq("event", event)
    .maybeSingle();
  return data?.projected_points ?? null;
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
  const [player, event] = await Promise.all([getPlayer(Number(id)), getCurrentEvent()]);

  if (!player) notFound();

  const team = Array.isArray(player.fpl_teams) ? player.fpl_teams[0] : player.fpl_teams;
  const projection = await getProjection(player.id, event?.id ?? null);

  const availability = availabilityScore({
    status: player.status as Status,
    news: player.news,
    newsAdded: player.news_added ? new Date(player.news_added) : null,
    newsReturn: player.news_return ? new Date(player.news_return) : null,
    chanceThisRound: player.chance_of_playing_this_round,
    chanceNextRound: player.chance_of_playing_next_round,
    minutesLast4: [],
    now: new Date(),
  });

  const projectedPoints = projection ?? player.ep_next;

  return (
    <div className="space-y-8">
      <Link href="/draft/squad" className="shell-label text-accent">
        ← Back to squad
      </Link>

      <header className="flex items-center gap-4 border-b border-border pb-6">
        <AvailabilityDot score={availability.score} className="h-4 w-4" />
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-primary sm:text-4xl">
            {player.web_name}
          </h1>
          <p className="shell-label mt-1 text-secondary">
            {team?.name ?? "Unknown club"} · {POSITION_LABELS[player.element_type] ?? "—"}
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Status</p>
          <p className="mt-1 text-lg text-primary">{STATUS_LABELS[player.status] ?? player.status}</p>
        </div>
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Availability</p>
          <p className="mt-1 text-lg tabular-nums text-primary">{availability.score}/100</p>
        </div>
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Form</p>
          <p className="mt-1 text-lg tabular-nums text-primary">{player.form ?? "—"}</p>
        </div>
        <div className="rounded-lg border border-border bg-raised px-4 py-3">
          <p className="shell-label text-secondary">Projected next GW</p>
          <p className="mt-1 text-lg tabular-nums text-primary">
            {projectedPoints != null ? Number(projectedPoints).toFixed(1) : "—"}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-raised p-5">
        <p className="shell-label mb-2 text-accent">Why this score - never a black box</p>
        <p className="mb-3 text-sm text-secondary">{availability.summary}</p>
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
          {Object.entries(availability.components).map(([key, value]) => (
            <div key={key}>
              <dt className="shell-label text-secondary">{key}</dt>
              <dd className="tabular-nums text-primary">
                {value == null ? "—" : Number(value).toFixed(1)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {player.news ? (
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="shell-label mb-2 text-accent">Official news</p>
          <p className="text-sm text-secondary">{player.news}</p>
        </div>
      ) : null}

      <p className="text-sm text-secondary">
        Fixture-by-fixture history and the full projection breakdown land here
        once the waiver wire and fixture ticker are built.
      </p>
    </div>
  );
}
