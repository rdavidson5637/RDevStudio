import { describe, expect, it } from "vitest";
import { deriveConfidence, formatLastSeen } from "./confidence";

const NOW = Date.parse("2026-09-18T12:00:00Z");
const DAY = 24 * 60 * 60 * 1000;

function iso(ms: number): string {
  return new Date(ms).toISOString();
}

describe("deriveConfidence", () => {
  it("returns unknown when both timestamps are null", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: null,
          lastDeniedAt: null,
          yesCount: 0,
          noCount: 0,
        },
        NOW,
      ),
    ).toBe("unknown");
  });

  it("returns unlikely when a denial is newer than a confirmation", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 10 * DAY),
          lastDeniedAt: iso(NOW - 1 * DAY),
          yesCount: 8,
          noCount: 1,
        },
        NOW,
      ),
    ).toBe("unlikely");
  });

  it("returns unlikely when there is a denial and no confirmation", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: null,
          lastDeniedAt: iso(NOW - 2 * DAY),
          yesCount: 0,
          noCount: 1,
        },
        NOW,
      ),
    ).toBe("unlikely");
  });

  it("returns confirmed at exactly 90 days", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 90 * DAY),
          lastDeniedAt: null,
          yesCount: 1,
          noCount: 0,
        },
        NOW,
      ),
    ).toBe("confirmed");
  });

  it("returns likely just after 90 days", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 90 * DAY - 1),
          lastDeniedAt: null,
          yesCount: 1,
          noCount: 0,
        },
        NOW,
      ),
    ).toBe("likely");
  });

  it("returns likely at exactly 365 days", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 365 * DAY),
          lastDeniedAt: null,
          yesCount: 1,
          noCount: 0,
        },
        NOW,
      ),
    ).toBe("likely");
  });

  it("returns stale just after 365 days", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 365 * DAY - 1),
          lastDeniedAt: null,
          yesCount: 1,
          noCount: 0,
        },
        NOW,
      ),
    ).toBe("stale");
  });

  it("lets a newer confirmation beat an older denial", () => {
    expect(
      deriveConfidence(
        {
          lastConfirmedAt: iso(NOW - 3 * DAY),
          lastDeniedAt: iso(NOW - 40 * DAY),
          yesCount: 1,
          noCount: 12,
        },
        NOW,
      ),
    ).toBe("confirmed");
  });
});

describe("formatLastSeen", () => {
  it("returns today, days, months, and over a year ago", () => {
    expect(formatLastSeen(iso(NOW), NOW)).toBe("today");
    expect(formatLastSeen(iso(NOW - 3 * DAY), NOW)).toBe("3 days ago");
    expect(formatLastSeen(iso(NOW - 60 * DAY), NOW)).toBe("2 months ago");
    expect(formatLastSeen(iso(NOW - 400 * DAY), NOW)).toBe("over a year ago");
    expect(formatLastSeen(null, NOW)).toBe("never");
  });
});
