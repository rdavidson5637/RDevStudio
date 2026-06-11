import { ALLOWED_REACTIONS } from "./types";

export function isAllowedReaction(emoji: string): boolean {
  return (ALLOWED_REACTIONS as readonly string[]).includes(emoji);
}

export function sanitizeChatText(text: string): string {
  return text
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}
