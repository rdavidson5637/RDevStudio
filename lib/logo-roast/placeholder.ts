import type { LogoRoastResult } from "@/types/logo-roast";

export function getPlaceholderRoastResult(fileName: string): LogoRoastResult {
  const shortName = fileName.replace(/\.[^.]+$/, "");

  const categories: LogoRoastResult["categories"] = [
    {
      id: "brand",
      title: "Brand Score",
      score: 74,
      summary: `${shortName} reads as professional, though it doesn’t yet feel unmistakably ownable.`,
      highlights: [
        "Mark feels appropriate for a modern business",
        "No obvious cliché symbols for the sector",
      ],
      issues: [
        "Could be swapped with a competitor mark at small sizes",
        "Personality is safe rather than distinctive",
      ],
    },
    {
      id: "typography",
      title: "Typography",
      score: 68,
      summary:
        "Letterforms are legible, but the wordmark lacks a memorable typographic hook.",
      highlights: [
        "Character spacing is balanced at medium sizes",
        "Weight works on light and dark backgrounds",
      ],
      issues: [
        "Generic sans-serif choice weakens recognition",
        "Kerning tightens awkwardly below 120px width",
      ],
    },
    {
      id: "colour",
      title: "Colour",
      score: 79,
      summary:
        "Palette is cohesive and accessible in primary use, with one redundant accent.",
      highlights: [
        "Primary brand colour has strong contrast on white",
        "Limited palette keeps applications simple",
      ],
      issues: [
        "Gradient may not reproduce consistently in print",
        "Secondary accent is close in hue to the primary",
      ],
    },
    {
      id: "scalability",
      title: "Scalability",
      score: 62,
      summary:
        "Works at presentation size, but fine details will disappear on favicons and social avatars.",
      highlights: [
        "SVG source would scale cleanly if simplified",
        "Core silhouette is still recognisable at 48px",
      ],
      issues: [
        "Tagline becomes illegible below 200px",
        "Thin strokes drop out on mobile app icons",
        "Complex shapes merge when reversed on photos",
      ],
    },
    {
      id: "memorability",
      title: "Memorability",
      score: 71,
      summary:
        "People will remember the general vibe, but not enough detail to sketch it from memory.",
      highlights: [
        "Simple icon element is easy to recall",
        "Colour pairing is distinctive in context",
      ],
      issues: [
        "Layout mirrors common industry templates",
        "No single “ownable” shape or letter treatment",
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility",
      score: 77,
      summary:
        "Passes basic contrast checks in default colours; reversed treatments need care.",
      highlights: [
        "Text and icon meet contrast on white backgrounds",
        "Works in monochrome for single-colour printing",
      ],
      issues: [
        "Light-on-light version fails WCAG for small text",
        "Icon-only lockup lacks text alternative in some uses",
      ],
    },
  ];

  const average = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  );

  return {
    fileName,
    scannedAt: new Date().toISOString(),
    overall: {
      id: "overall",
      title: "Overall Score",
      score: average,
      summary: `A competent logo with solid fundamentals — polish scalability and typographic character to level up.`,
      highlights: [
        "Clean enough for professional use",
        "Colour system is the strongest element",
        "No critical accessibility failures in default form",
      ],
      issues: [
        "Not yet distinctive enough to own a category",
        "Small-size versions need a simplified mark",
        "Wordmark typography is the weakest link",
      ],
    },
    categories,
  };
}
