import { describe, expect, it } from "vitest";
import { deadlineFlags } from "../checklist";

describe("deadlineFlags", () => {
  it("stays quiet when the saved XI is fit and has fixtures", () => {
    expect(
      deadlineFlags({
        savedXi: [{ name: "Sels", availability: 90, blank: false }],
        thin: [],
      }),
    ).toEqual([]);
  });

  it("flags a red starter, a blank, and a thin line", () => {
    const flags = deadlineFlags({
      savedXi: [{ name: "Semenyo", availability: 0, blank: true }],
      thin: ["FWD"],
    });
    expect(flags.map((flag) => flag.tone)).toEqual(["bad", "warn", "bad"]);
    expect(flags[0].text).toContain("Semenyo");
    expect(flags[1].text).toContain("blank");
    expect(flags[2].text).toContain("FWD");
  });
});
