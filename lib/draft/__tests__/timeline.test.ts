import { describe, expect, it } from "vitest";
import { isStatusChange } from "../timeline";

describe("isStatusChange", () => {
  it("ignores the first time a player is seen", () => {
    expect(
      isStatusChange(undefined, { availability_score: 100, status: "a" }),
    ).toBe(false);
  });

  it("ignores a row whose previous score is null", () => {
    expect(
      isStatusChange(
        { availability_score: null, status: null },
        { availability_score: 100, status: "a" },
      ),
    ).toBe(false);
  });

  it("keeps a real score or status change", () => {
    expect(
      isStatusChange(
        { availability_score: 100, status: "a" },
        { availability_score: 55, status: "d" },
      ),
    ).toBe(true);
  });

  it("skips a repeat of the same score and status", () => {
    expect(
      isStatusChange(
        { availability_score: 100, status: "a" },
        { availability_score: 100, status: "a" },
      ),
    ).toBe(false);
  });
});
