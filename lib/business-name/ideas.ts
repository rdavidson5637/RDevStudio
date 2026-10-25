const PREFIXES = [
  "North",
  "Bright",
  "True",
  "Peak",
  "Urban",
  "Green",
  "Blue",
  "Carrick",
];

const SUFFIXES = [
  "Works",
  "Co",
  "Studio",
  "Labs",
  "Collective",
  "Digital",
  "Group",
  "HQ",
];

function capitalise(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** Word mixer. Industry is included whenever keywords are present. */
export function buildNameIdeas(
  keywords: string,
  industry: string,
  random: () => number = Math.random,
): string[] {
  const keywordList = keywords
    .split(/[,\s]+/)
    .map((word) => word.trim())
    .filter(Boolean);
  const trade = industry.trim();
  const bases = keywordList.length ? keywordList : trade ? [trade] : ["brand"];
  const names = new Set<string>();

  if (trade && keywordList.length) {
    for (const base of keywordList) {
      names.add(`${capitalise(base)} ${capitalise(trade)}`);
    }
  }

  let guard = 0;
  while (names.size < 12 && guard < 80) {
    guard += 1;
    const base = capitalise(bases[Math.floor(random() * bases.length)] ?? "brand");
    const prefix = PREFIXES[Math.floor(random() * PREFIXES.length)] ?? "North";
    const suffix = SUFFIXES[Math.floor(random() * SUFFIXES.length)] ?? "Co";
    const style = Math.floor(random() * 3);
    if (style === 0) names.add(`${prefix} ${base}`);
    else if (style === 1) names.add(`${base} ${suffix}`);
    else names.add(`${base}${suffix}`);
  }

  return [...names];
}
