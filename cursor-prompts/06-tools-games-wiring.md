# Prompt 06 - Wire up the new tools, game, and lead capture

Everything below has its code already written and type-checked. These steps
just connect it into your catalogs/components (files you were actively editing,
so left for you to place precisely).

## Already in the repo (done + verified)
- **Per-tool OG images** - shared renderer `lib/og-image.tsx` + a thin
  `opengraph-image.tsx` in all 22 live tool folders. Shared tool links now get
  a branded, per-title preview. (No action needed.)
- **Lead-capture component** - `components/toolkit-audit/LeadCaptureCard.tsx`,
  posts to your existing Formspree form. (Wire it in - step 2.)
- **Countdown game** - solvers `lib/countdown-game/{numbers-solver,letters-solver,words}.ts`
  (numbers solver passes the classic 952 puzzle, 11/11 unit tests green),
  UI `components/interactive-tools/countdown-game/CountdownGameApp.tsx`,
  route `app/(site)/interactive/countdown-game/page.tsx`, and its OG image.
  Just needs a catalog entry - step 1.

## 1. Add the Countdown game to the interactive catalog

In `lib/interactive-tools/catalog.ts`, add to `INTERACTIVE_TOOLS`:

```ts
{
  id: "countdown-game",
  slug: "countdown-game",
  title: "Countdown Game",
  description:
    "Play the Countdown letters and numbers rounds solo. Beat the clock, then see the best the solver could find.",
  category: "quizzes",
  href: `${INTERACTIVE_BASE_PATH}/countdown-game`,
  featured: true,
  trending: true,
  badge: "new",
  status: "live",
  keywords: ["countdown", "letters", "numbers", "anagram", "game", "word game"],
},
```

The route and OG image already exist, so it'll light up on the landing grid
immediately. (Consider renaming the existing timer tool from "Countdown" to
"Countdown Timer" so the two don't clash in the list.)

## 2. Drop lead capture under each audit result

For each audit tool, render `<LeadCaptureCard />` at the bottom of the results
view (only once a result exists). Files:
- `components/website-grader/WebsiteGraderApp.tsx`
- `components/audit-tools/SeoCheckerApp.tsx`
- `components/audit-tools/AccessibilityCheckerApp.tsx`
- `components/audit-tools/GbpAuditApp.tsx`

Example (Website Grader):
```tsx
import { LeadCaptureCard } from "@/components/toolkit-audit/LeadCaptureCard";
// ...inside the results block, after the score/checks:
<div className="mt-8">
  <LeadCaptureCard
    toolName="Website Grader"
    context={`${url} scored ${result.score}/100`}
  />
</div>
```
Pass a `context` string that names what they ran (URL + score) so the enquiry
email arrives with useful detail. This is the change that turns tool traffic
into actual £650 leads.

## 3. Optional - full dictionary for the letters round

`lib/countdown-game/words.ts` ships a ~700-word starter list so the game works
now. For a real Countdown-grade solver, replace `STARTER_WORDS` with a full word
list (ENABLE ~170k words, or SOWPODS). Load it from a JSON file in `public/` (or
import a `.ts` array). `letters-solver.ts` takes any `Iterable<string>`, so no
other changes are needed. Consider building a `Set` once for `isValidWord`.

## 4. Verify
```bash
npm run lint
npm run build
```
