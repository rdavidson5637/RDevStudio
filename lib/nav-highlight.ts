export type NavHighlightColor = "emerald" | "sky" | "amber";

export function getNavHighlightColor(href: string): NavHighlightColor {
  if (href === "/rugby-draft") {
    return "sky";
  }

  if (href === "/pub-quiz") {
    return "amber";
  }

  return "emerald";
}

export function getNavHighlightTextClass(
  href: string,
  active: boolean,
): string {
  const color = getNavHighlightColor(href);

  if (color === "sky") {
    return active ? "text-sky-400" : "text-sky-400/90";
  }

  if (color === "amber") {
    return active ? "text-amber-400" : "text-amber-400/90";
  }

  return active ? "text-emerald-400" : "text-emerald-400/90";
}
