# Prompt 07 - Full tool audit + wiring the real analyser

## Tool-by-tool status (what actually works)

**Working now - real, client-side (no backend needed):**
- Interactive: Countdown timer, Countdown game, Tier List (has mobile tap-to-rank),
  Random Wheel (winner maths is correct), Bracket Builder, Tournament Builder,
  Bingo Card Generator, Quiz Builder (links to the real multiplayer Pub Quiz).
- Toolkit generators: QR Code, Colour Palette, Gradient, Favicon, Invoice,
  Sitemap, Robots.txt, Business Name. All do genuine in-browser work.

**Was showing SAMPLE data (the "backend analysis is not connected yet" notice).**
These all run through `useUrlAuditFlow` -> `simulateScan` -> `config.getResult()`,
which returns canned results:
- Website Grader, SEO Checker  -> **now fixable for real** (steps below)
- Accessibility Checker         -> partly (basics only; deep checks need headless Chrome)
- Google Business Profile Audit -> needs the Google Places API (external key)
- AI Landing Page Auditor       -> needs an LLM API key
- Logo Roast                    -> needs a vision/LLM API key

## Already built + verified (in the repo)
- `lib/audit-tools/analyze.ts` - real server-side analysis: fetches the URL,
  reads headers + HTML, and returns your exact `UrlAuditResult` shape via two
  builders:
  - `buildGraderResult` -> **5 categories matching the Website Grader UI**:
    `seo, accessibility, performance, security, best-practices`.
  - `buildSeoResult` -> SEO Checker shape: `meta, headings, technical`.
- `app/api/audit/route.ts` - `GET /api/audit?url=...` (Node runtime), with basic
  SSRF guards (blocks localhost/private ranges). Add `&tool=seo` for the SEO
  Checker shape; default is the grader shape.

Verification: checked with an out-of-repo script (not a committed test) - a
fully-good signal set scores 100 and returns all 5 grader categories, a fully-
bad set scores 0. There is no test runner in `package.json` yet; if you want a
committed test, add Vitest and I'll drop in `analyze.test.ts`. (The earlier
"unit-tested" wording was optimistic - this is the accurate picture.)

Note: the category **shape mismatch** the review flagged is resolved - the API
now returns the grader's 5 categories directly, so no mapping layer is needed.

## Wire it up (2 small changes)

### 1. Let the audit flow run async
`config.getResult` is currently synchronous. Allow it to return a promise.

- In `types/url-audit-tool.ts`, change:
  ```ts
  getResult: (url: string) => UrlAuditResult | Promise<UrlAuditResult>;
  ```
- In `hooks/useUrlAuditFlow.ts` the generic already flows through `simulateScan`.
  In `lib/toolkit-audit/utils.ts`, make `simulateScan` await the result callback:
  ```ts
  const result = await getResultFn(); // was: const result = getResultFn();
  ```
  (and type the callback as `() => T | Promise<T>`). Everything downstream
  already `await`s `simulateScan`, so no other changes.

### 2. Point the fetch-checkable tools at the real endpoint
**SEO Checker** - in `lib/audit-tools/configs.ts`, replace the sample `getResult`
and delete its `placeholderNotice`:
```ts
getResult: async (url: string): Promise<UrlAuditResult> => {
  const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}&tool=seo`);
  if (!res.ok) throw new Error((await res.json()).error ?? "Audit failed");
  return res.json();
},
```
**Website Grader** - `WebsiteGraderApp.tsx` builds its own
`getPlaceholderGraderResult`. Replace that with the same fetch (no `&tool=seo`,
so it gets the 5-category grader shape) and remove the hardcoded
`<PlaceholderNotice />`:
```ts
const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
if (!res.ok) throw new Error((await res.json()).error ?? "Audit failed");
const result: UrlAuditResult = await res.json();
```

Leave the `placeholderNotice` on Accessibility / GBP / AI Landing / Logo Roast
until their external services are wired (below) - it's honest and sets
expectations.

### 2b. PlaceholderNotice should be conditional
`UrlAuditToolApp` currently always renders `<PlaceholderNotice />`. Guard it so
it only shows when the config actually sets a notice:
```tsx
{config.placeholderNotice ? (
  <PlaceholderNotice message={config.placeholderNotice} />
) : null}
```
Then remove `placeholderNotice` from the SEO Checker config (and the hardcoded
one from `WebsiteGraderApp`) so live tools don't claim "sample data".

### 2c. Add an error state (the flow has none today)
A real fetch can reject (bad URL, 502, unreachable site). `useUrlAuditFlow` only
has input/loading/results. Add an `"error"` phase:
- In the hook, wrap the `simulateScan` call in try/catch; on catch set
  `phase = "error"` and store `error.message`.
- In `UrlAuditToolApp` / `WebsiteGraderApp`, render the message with a "try
  again" button when `phase === "error"`.
Without this, a failed scan just spins or shows nothing.

## To make the remaining three real (optional, each needs a key/service)
- **Accessibility Checker**: for real depth, run `@axe-core/playwright` against a
  headless browser in a serverless function, or a service like the WAVE API.
  Quick win: reuse `/api/audit` for the basics it already covers (viewport,
  lang, alt text) and label the rest "manual review recommended".
- **GBP Audit**: Google Places Details API (needs `GOOGLE_PLACES_API_KEY`).
- **AI Landing Auditor / Logo Roast**: call an LLM (Anthropic/OpenAI) from a
  server route with the fetched page text / uploaded image. Add the API key as
  a server env var - never client-side.

## The two bugs you reported - already fixed in the code
- **Random wheel winner**: `lib/random-wheel.ts` `getWheelWinnerIndex` uses the
  correct top-pointer angle (3π/2) and relative-angle maths. Correct now.
- **Tier list on mobile**: `TierListBuilderApp` has a tap-to-rank flow ("tap an
  item, then tap a tier") plus `touch-manipulation`. Works without drag.

If they still look wrong in your browser, it's a stale build - `npm run build`
and redeploy.

## Verify
```bash
npm run lint && npm run build
# then locally: open /toolkit/website-grader, scan a real URL, confirm live results
```
