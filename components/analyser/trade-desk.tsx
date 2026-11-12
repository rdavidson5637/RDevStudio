"use client";

import { useMemo, useState } from "react";
import { POS } from "@/components/analyser/bits";
import type { Analyser } from "@/lib/analyser/data/types";

export function TradeDesk({ pool, myEntryId }: { pool: Analyser["tradePool"]; myEntryId: number }) {
  const mine = pool.filter((player) => player.entryId === myEntryId);
  const [outId, setOutId] = useState(mine[0]?.id ?? 0);
  const outgoing = mine.find((player) => player.id === outId) ?? mine[0];
  const incomingPool = pool.filter((player) => player.entryId !== myEntryId && player.position === outgoing?.position);
  const [inId, setInId] = useState(incomingPool[0]?.id ?? 0);
  const incoming = useMemo(
    () => incomingPool.find((player) => player.id === inId) ?? incomingPool[0],
    [incomingPool, inId],
  );
  if (!outgoing || !incoming) return <p className="t-body">No trade to test yet.</p>;
  const net = incoming.xp6 - outgoing.xp6;
  const verdict = net > 2 ? "You gain on the next six gameweeks." : net < -2 ? "You lose on the next six gameweeks." : "The two sides are close over six gameweeks.";

  return (
    <div>
      <div className="controls">
        <label className="t-small">
          You give
          <select value={outgoing.id} onChange={(event) => setOutId(Number(event.target.value))}>
            {mine.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name} ({POS[player.position]})
              </option>
            ))}
          </select>
        </label>
        <label className="t-small">
          You get
          <select value={incoming.id} onChange={(event) => setInId(Number(event.target.value))}>
            {incomingPool.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}, {player.owner}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="t-body measure" style={{ marginTop: "1rem" }}>
        {outgoing.name} projects {outgoing.xp6.toFixed(1)}. {incoming.name} projects {incoming.xp6.toFixed(1)}. Net {net > 0 ? "+" : ""}
        {net.toFixed(1)}. {verdict} Same-position only, so both squads stay at 2, 5, 5, 3. This does not send the trade.
      </p>
    </div>
  );
}
