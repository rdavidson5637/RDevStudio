import { describe, expect, it } from "vitest";
import { diffConsecutiveSnapshots, type SnapshotRow } from "../changes";

function snapshot(overrides: Partial<SnapshotRow> & { captured_at: string }): SnapshotRow {
  return {
    player_id: 1,
    status: "a",
    news: "",
    chance_of_playing_this_round: null,
    chance_of_playing_next_round: null,
    ...overrides,
  };
}

describe("diffConsecutiveSnapshots", () => {
  it("returns no changes for no snapshots", () => {
    expect(diffConsecutiveSnapshots(1, [])).toEqual([]);
  });

  it("returns no changes for a single snapshot", () => {
    const snapshots = [snapshot({ captured_at: "2026-08-01T00:00:00Z" })];
    expect(diffConsecutiveSnapshots(1, snapshots)).toEqual([]);
  });

  it("returns no changes for an unchanged player", () => {
    const snapshots = [
      snapshot({ captured_at: "2026-08-01T00:00:00Z" }),
      snapshot({ captured_at: "2026-08-02T00:00:00Z" }),
    ];
    expect(diffConsecutiveSnapshots(1, snapshots)).toEqual([]);
  });

  it("produces one event for a status flip from a to d", () => {
    const snapshots = [
      snapshot({ status: "a", captured_at: "2026-08-01T00:00:00Z" }),
      snapshot({ status: "d", captured_at: "2026-08-02T00:00:00Z" }),
    ];
    const events = diffConsecutiveSnapshots(1, snapshots);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      playerId: 1,
      field: "status",
      from: "a",
      to: "d",
      at: "2026-08-02T00:00:00Z",
    });
  });

  it("produces one event with from null for a chance_of_playing move from null to 75", () => {
    const snapshots = [
      snapshot({ chance_of_playing_next_round: null, captured_at: "2026-08-01T00:00:00Z" }),
      snapshot({ chance_of_playing_next_round: 75, captured_at: "2026-08-02T00:00:00Z" }),
    ];
    const events = diffConsecutiveSnapshots(1, snapshots);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      playerId: 1,
      field: "chance_next",
      from: null,
      to: 75,
      at: "2026-08-02T00:00:00Z",
    });
  });

  it("produces one event per changed field, not a combined event", () => {
    const snapshots = [
      snapshot({ status: "a", news: "", captured_at: "2026-08-01T00:00:00Z" }),
      snapshot({ status: "i", news: "Ruptured ACL", captured_at: "2026-08-02T00:00:00Z" }),
    ];
    const events = diffConsecutiveSnapshots(1, snapshots);
    expect(events).toHaveLength(2);
    expect(events.map((e) => e.field).sort()).toEqual(["news", "status"]);
  });
});
