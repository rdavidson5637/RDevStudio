import { describe, expect, it } from "vitest";
import { looksLikeAvailabilityNews, matchPlayerId } from "../news/match";

const PLAYERS = [
  { id: 1, web_name: "Saka", first_name: "Bukayo", second_name: "Saka", team_id: 1 },
  { id: 2, web_name: "Ødegaard", first_name: "Martin", second_name: "Ødegaard", team_id: 1 },
  { id: 3, web_name: "Salah", first_name: "Mohamed", second_name: "Salah", team_id: 11 },
];

describe("matchPlayerId", () => {
  it("matches web name and full name on the same club", () => {
    expect(matchPlayerId("Saka", 1, PLAYERS)).toBe(1);
    expect(matchPlayerId("Bukayo Saka", 1, PLAYERS)).toBe(1);
  });

  it("stays inside the named club and does not steal a rival surname", () => {
    expect(matchPlayerId("Salah", 11, PLAYERS)).toBe(3);
    expect(matchPlayerId("Salah", 1, PLAYERS)).toBeNull();
  });

  it("returns null when nothing is close", () => {
    expect(matchPlayerId("a random striker", 1, PLAYERS)).toBeNull();
  });
});

describe("looksLikeAvailabilityNews", () => {
  it("keeps training and injury headlines", () => {
    expect(looksLikeAvailabilityNews("Saka misses Arsenal training")).toBe(true);
    expect(looksLikeAvailabilityNews("Hamstring injury rules Salah out")).toBe(true);
  });

  it("drops transfer rumours", () => {
    expect(looksLikeAvailabilityNews("Arsenal agree club-record deal for striker")).toBe(false);
  });
});
