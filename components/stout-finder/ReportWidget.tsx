"use client";

import Link from "next/link";
import { CONFIDENCE_LABELS, DRINKS, type Drink, type DrinkStatus } from "@/lib/stout-finder/types";
import { formatLastSeen } from "@/lib/stout-finder/confidence";
import { useAnonymousSession } from "@/hooks/useAnonymousSession";
import { useMemo, useState } from "react";

type Props = {
  pubId: string;
  slug?: string;
  drinks: Record<Drink, DrinkStatus>;
  compact?: boolean;
};

export function ReportWidget({ pubId, slug, drinks, compact = false }: Props) {
  const { ensure, error: sessionError } = useAnonymousSession();
  const [localDrinks, setLocalDrinks] = useState(drinks);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState<Drink | null>(null);
  const [reported, setReported] = useState<Partial<Record<Drink, boolean>>>({});

  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function submit(drink: Drink, available: boolean) {
    setMessage(null);
    const userId = await ensure();
    if (!userId) return;

    const previous = localDrinks[drink];
    setBusy(drink);
    setLocalDrinks((current) => ({
      ...current,
      [drink]: {
        ...current[drink],
        confidence: available ? "confirmed" : "unlikely",
        lastConfirmedAt: available
          ? new Date().toISOString()
          : current[drink].lastConfirmedAt,
        yesCount: current[drink].yesCount + (available ? 1 : 0),
        noCount: current[drink].noCount + (available ? 0 : 1),
      },
    }));

    try {
      const response = await fetch("/api/stout-finder/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubId,
          drink,
          available,
          note: note.trim() ? note.trim() : undefined,
        }),
      });
      const payload = (await response.json()) as { error?: string };

      if (response.status === 409) {
        setReported((current) => ({ ...current, [drink]: true }));
        setLocalDrinks((current) => ({ ...current, [drink]: previous }));
        setMessage("You reported this today.");
        return;
      }
      if (response.status === 429) {
        setLocalDrinks((current) => ({ ...current, [drink]: previous }));
        setMessage("Too many reports this hour. Try again later.");
        return;
      }
      if (!response.ok) {
        setLocalDrinks((current) => ({ ...current, [drink]: previous }));
        setMessage(payload.error || "Could not save that report.");
        return;
      }

      setReported((current) => ({ ...current, [drink]: true }));
      setMessage("Thanks. That is in.");
      setNote("");
    } catch {
      setLocalDrinks((current) => ({ ...current, [drink]: previous }));
      setMessage("Could not save that report.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {DRINKS.map((drink) => {
        const status = localDrinks[drink.id];
        const already = reported[drink.id];
        return (
          <div
            key={drink.id}
            className="rounded-[10px] border border-border bg-raised p-3 sm:p-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-primary">{drink.label}</p>
              <p className="shell-label text-secondary">
                {CONFIDENCE_LABELS[status.confidence]}
                {status.lastConfirmedAt
                  ? ` · ${formatLastSeen(status.lastConfirmedAt)}`
                  : ""}
              </p>
            </div>
            <p className="mt-1 text-sm text-secondary">
              {status.yesCount} yes · {status.noCount} no
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary !w-auto !px-3 !py-2 text-xs"
                disabled={Boolean(already) || busy === drink.id}
                onClick={() => submit(drink.id, true)}
              >
                Yes, they have it
              </button>
              <button
                type="button"
                className="btn-secondary !w-auto !px-3 !py-2 text-xs"
                disabled={Boolean(already) || busy === drink.id}
                onClick={() => submit(drink.id, false)}
              >
                No, not any more
              </button>
            </div>
            {already ? (
              <p className="mt-2 text-xs text-secondary">You reported this today.</p>
            ) : null}
          </div>
        );
      })}

      {compact && slug ? (
        <Link href={`/stout-finder/${slug}`} className="link-editorial text-sm">
          Pub page
        </Link>
      ) : null}

      <div>
        {noteOpen ? (
          <label className="block text-sm text-secondary">
            Note (optional, 280 characters)
            <textarea
              value={note}
              maxLength={280}
              onChange={(event) => setNote(event.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-sm text-primary"
              rows={3}
            />
          </label>
        ) : (
          <button
            type="button"
            className="text-sm text-accent underline-offset-2 hover:underline"
            onClick={() => setNoteOpen(true)}
          >
            add a note
          </button>
        )}
      </div>

      {sessionError ? (
        <p className="text-sm text-destructive">{sessionError}</p>
      ) : null}
      {message ? <p className="text-sm text-secondary">{message}</p> : null}
      <p className="sr-only">Report date key {todayKey}</p>
    </div>
  );
}
