# Prompt 05 - Interactive/Toolkit cleanup (run in Cursor / terminal)

## Already done for you (in the code, type-checked)
- Added `status?: "live" | "soon"` to `InteractiveTool` (`types/interactive-tools.ts`)
  and `BusinessTool` (`types/business-toolkit.ts`). Omitted = live.
- Both `[slug]` routes now serve ONLY "soon" tools:
  `generateStaticParams` filters to `status === "soon"`, and the page calls
  `notFound()` for anything that isn't a soon tool. Live tools are served by
  their dedicated static pages (which shadow the dynamic route). No more
  redundant placeholder prerendering.
- Removed em dashes from the new interactive/toolkit files (house style).

## 1. Delete the duplicate " 2" files (I couldn't - the sandbox blocks deletes)

These are Finder/iCloud duplicates. Nothing imports them (checked). Run from
the repo root:

```bash
rm -f "app/robots 2.ts" "app/sitemap 2.ts"
rm -f "app/(site)/games/page 2.tsx"
rm -f "app/(site)/work/concept-builds/page 2.tsx"
rm -f "app/(site)/work/rvs-cold-brew/page 2.tsx"
rm -f "app/(site)/work/shelterlink/page 2.tsx"
rm -f "components/contact/ContactForm 2.tsx" "components/contact/FormSuccess 2.tsx"
rm -f "components/contact/ContactDetails 2.tsx" "components/contact/DirectContactOptions 2.tsx"
rm -f "lib/games-catalog 2.ts" "lib/coming-soon-projects 2.ts" "lib/coming-soon-roadmap 2.ts"
rm -f ".git/refs/heads/main 2.lock"
```

Then stop them regenerating: turn off iCloud "Optimise Mac Storage" for this
folder, or move the repo out of iCloud/Desktop sync.

## 2. Tidy formatting

A few tool components have very long single-line JSX (e.g.
`components/interactive-tools/countdown/CountdownApp.tsx`,
`app/(site)/interactive/countdown/page.tsx`). Run Prettier:

```bash
npx prettier --write "app/**/*.{ts,tsx}" "components/**/*.{ts,tsx}" "lib/**/*.{ts,tsx}"
```

## 3. Verify it runs

```bash
npm run lint
npm run build
```

Both should pass. If the build complains about a `[slug]` route, confirm no
tool in either catalog has `status: "soon"` yet without also having a matching
placeholder - by default all tools are live and get their own page.

## 4. Optional - wire the "soon" badge into the cards (forward-looking)

Right now every tool is live. When you add a catalog entry for a tool you
haven't built yet, set `status: "soon"` and `badge: "coming-soon"`, and point
its `href` at the `[slug]` path (e.g. `/toolkit/<slug>`). To make the cards
reflect it:

- In `ToolCard` / `InteractiveToolCard`, when `tool.status === "soon"`, show
  the "Coming soon" badge and render the card as non-clickable (or link to the
  placeholder) instead of a live tool link.
- Optionally add a `getComingSoonTools()` helper to each catalog for a
  "coming soon" strip on the landing pages.

This keeps the catalog as the single source of truth: list a tool early, mark
it `soon`, and it automatically shows a placeholder until you ship its page.
