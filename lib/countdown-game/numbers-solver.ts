/**
 * Countdown numbers-round solver. Given up to 6 numbers and a target, it
 * searches every way of combining the numbers with + - x / (Countdown rules:
 * positive integers only, exact division only) and returns the closest
 * reachable value with a worked expression.
 *
 * Pure and deterministic so it can be unit-tested without a browser.
 */

export type NumbersSolution = {
  value: number;
  expression: string;
  exact: boolean;
  offBy: number;
};

type Item = { value: number; expr: string };

function combine(a: Item, b: Item): Item[] {
  const out: Item[] = [];
  // Order a,b so subtraction/division stay positive integers.
  const [hi, lo] = a.value >= b.value ? [a, b] : [b, a];

  out.push({ value: hi.value + lo.value, expr: `(${hi.expr} + ${lo.expr})` });
  out.push({ value: hi.value - lo.value, expr: `(${hi.expr} - ${lo.expr})` });
  // Skip multiplying by 1 - it never helps and bloats the search.
  if (lo.value !== 1) {
    out.push({ value: hi.value * lo.value, expr: `(${hi.expr} x ${lo.expr})` });
  }
  if (lo.value !== 0 && hi.value % lo.value === 0 && lo.value !== 1) {
    out.push({ value: hi.value / lo.value, expr: `(${hi.expr} / ${lo.expr})` });
  }
  return out;
}

export function solveNumbers(numbers: number[], target: number): NumbersSolution {
  const start: Item[] = numbers.map((n) => ({ value: n, expr: String(n) }));

  let best: { value: number; expr: string; diff: number } | null = null;
  const consider = (item: Item) => {
    const diff = Math.abs(item.value - target);
    if (
      best === null ||
      diff < best.diff ||
      (diff === best.diff && item.expr.length < best.expr.length)
    ) {
      best = { value: item.value, expr: item.expr, diff };
    }
  };

  const search = (items: Item[]) => {
    for (let i = 0; i < items.length; i += 1) {
      consider(items[i]);
      for (let j = i + 1; j < items.length; j += 1) {
        const rest = items.filter((_, idx) => idx !== i && idx !== j);
        for (const result of combine(items[i], items[j])) {
          consider(result);
          if (rest.length > 0) search([...rest, result]);
        }
      }
    }
  };

  search(start);

  const found = best as { value: number; expr: string; diff: number } | null;
  if (!found) {
    return { value: 0, expression: "", exact: false, offBy: target };
  }
  // Unwrap the single outer pair of brackets for readability.
  const expr =
    found.expr.startsWith("(") && found.expr.endsWith(")")
      ? found.expr.slice(1, -1)
      : found.expr;
  return {
    value: found.value,
    expression: expr,
    exact: found.diff === 0,
    offBy: found.diff,
  };
}

/** Standard Countdown draw: pick how many of the six are "large" (25/50/75/100). */
export function drawNumbers(largeCount: number): number[] {
  const larges = [25, 50, 75, 100];
  const smalls: number[] = [];
  for (let n = 1; n <= 10; n += 1) smalls.push(n, n); // two of each 1-10

  const clampedLarge = Math.max(0, Math.min(4, largeCount));
  const pick = <T,>(pool: T[], count: number) => {
    const copy = [...pool];
    const chosen: T[] = [];
    for (let k = 0; k < count && copy.length; k += 1) {
      chosen.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return chosen;
  };

  return [...pick(larges, clampedLarge), ...pick(smalls, 6 - clampedLarge)];
}

export function makeTarget(): number {
  return 100 + Math.floor(Math.random() * 900); // 100-999
}
