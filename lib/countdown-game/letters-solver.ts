/**
 * Countdown letters-round helpers. Given a rack of letters and a word list,
 * find the best (longest) words that can be spelled from the rack, and validate
 * a player's word. Pure and testable.
 *
 * The word list is injected so you can start with the bundled STARTER_WORDS and
 * later swap in a full dictionary (see words.ts) without touching this logic.
 */

function letterCounts(word: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const ch of word.toLowerCase()) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  return counts;
}

/** Can `word` be spelled using only the letters in `rack` (respecting counts)? */
export function canFormFromRack(word: string, rack: string): boolean {
  const rackCounts = letterCounts(rack);
  const wordCounts = letterCounts(word);
  for (const [ch, need] of wordCounts) {
    if ((rackCounts.get(ch) ?? 0) < need) return false;
  }
  return true;
}

/** A player's word is valid if it's in the dictionary and fits the rack. */
export function isValidWord(word: string, rack: string, words: Iterable<string>): boolean {
  const w = word.trim().toLowerCase();
  if (w.length < 2) return false;
  if (!canFormFromRack(w, rack)) return false;
  const set = words instanceof Set ? words : new Set(words);
  return set.has(w);
}

/** Best words the solver can find in the rack, longest first. */
export function bestWords(rack: string, words: Iterable<string>, limit = 5): string[] {
  const results: string[] = [];
  for (const raw of words) {
    const word = raw.toLowerCase();
    if (word.length < 3 || word.length > rack.length) continue;
    if (canFormFromRack(word, rack)) results.push(word);
  }
  results.sort((a, b) => b.length - a.length || a.localeCompare(b));
  return results.slice(0, limit);
}

const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvwxyz";

/** Draw a rack of 9 letters given a chosen number of vowels (Countdown: pick 3-9 vowels). */
export function drawLetters(vowelCount: number): string {
  const v = Math.max(3, Math.min(9, vowelCount));
  const pickWeighted = (pool: string) =>
    pool[Math.floor(Math.random() * pool.length)];
  const letters: string[] = [];
  for (let i = 0; i < v; i += 1) letters.push(pickWeighted(VOWELS));
  for (let i = 0; i < 9 - v; i += 1) letters.push(pickWeighted(CONSONANTS));
  // Shuffle
  for (let i = letters.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}
