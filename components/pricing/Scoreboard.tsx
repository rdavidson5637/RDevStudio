import {
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
} from "@/lib/constants";

const ROWS = [
  { name: "Website", price: PRICE_WEBSITE_GBP, note: "from" },
  {
    name: "Care plan",
    price: PRICE_CARE_PLAN_GBP,
    note: "a month",
    detail: "Hosting, security updates, small changes",
  },
  { name: "Social media", price: PRICE_SOCIAL_GBP, note: "a month, from" },
  { name: "Content", price: PRICE_CONTENT_GBP, note: "a project, from" },
] as const;

export function Scoreboard() {
  return (
    <div className="bg-studio-board">
      <ul>
        {ROWS.map((row) => (
          <li key={row.name} className="flex items-start justify-between gap-4 border-b border-studio-line px-5 py-4 last:border-b-0">
            <div>
              <p className="text-studio-text">{row.name}</p>
              {"detail" in row ? <p className="mt-1 max-w-xs text-sm text-studio-muted">{row.detail}</p> : null}
            </div>
            <p className="shrink-0 text-right">
              <span className="font-studio-display text-4xl leading-none text-studio-text">£{row.price}</span>
              <span className="mt-1 block text-sm text-studio-muted">{row.note}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
