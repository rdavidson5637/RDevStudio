import { describe, expect, it } from "vitest";
import { bestDrop, type DropPlayer } from "../drop";

function squad(): DropPlayer[] {
  const players: DropPlayer[] = [];
  let id = 1;
  for (let i = 0; i < 2; i++) players.push({ id: id++, webName: `GK${i}`, position: 1, projected6: 20 - i });
  for (let i = 0; i < 5; i++) players.push({ id: id++, webName: `DEF${i}`, position: 2, projected6: 18 - i });
  for (let i = 0; i < 5; i++) players.push({ id: id++, webName: `MID${i}`, position: 3, projected6: 22 - i });
  for (let i = 0; i < 3; i++) players.push({ id: id++, webName: `FWD${i}`, position: 4, projected6: 24 - i });
  return players;
}

describe("bestDrop", () => {
  it("drops the lowest same-position player when the incoming player is a midfielder", () => {
    const incoming: DropPlayer = { id: 99, webName: "FA", position: 3, projected6: 30 };
    const result = bestDrop(squad(), incoming);
    expect(result).not.toBeNull();
    expect(result?.drop.position).toBe(3);
    expect(result?.drop.webName).toBe("MID4");
    expect(result?.netGain).toBeCloseTo(12);
    expect(result?.leavesThin).toBe(true);
  });

  it("refuses an illegal GK drop that would leave one keeper", () => {
    const thin = squad().filter((p) => p.position !== 1).concat({
      id: 1,
      webName: "OnlyGK",
      position: 1,
      projected6: 10,
    });
    const incoming: DropPlayer = { id: 99, webName: "FA MID", position: 3, projected6: 40 };
    const result = bestDrop(thin, incoming);
    expect(result?.drop.position).not.toBe(1);
  });

  it("returns null when the player is already in the squad", () => {
    const current = squad();
    expect(bestDrop(current, current[0])).toBeNull();
  });
});
