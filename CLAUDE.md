# RDev Studio (rdevstudio.co.uk)

One-person web studio site for Ryan Davidson, Carrickfergus, NI. Also hosts live games, tools and write-ups. Read README.md for the map of the repo.

## Stack (what the repo actually runs)
- Next.js 15.5 App Router, React 18, TypeScript, Tailwind 3
- Supabase Postgres with RLS, Pusher, Redis over REST, Formspree, Vercel, Vitest
- Server components by default. Client components only where interactivity needs them.

## Commands
- `npm run dev` (`.claude/launch.json` lists port 3001)
- `npm run lint`, `npm test`, `npm run build`
- Run lint and `npx tsc --noEmit` before saying a change is done.

## Where the rules live
- Visual design for this site: `DESIGN.md` points to `.design/brief.md` (Grenadine palette, Big Shoulders Display and Atkinson Hyperlegible, banned list, page jobs). Also `.cursor/rules/design-standards.mdc` and `.cursor/rules/rdev-polish.mdc`. Follow them. Use the `--color-studio-*` tokens, not raw hex. Do not add fonts or colour tokens without saying so.
- Copy rules: `.claude/rules/copy.md` (loads when you touch app, components or lib).
- Database and secrets: `.claude/rules/supabase.md` (loads when you touch supabase or lib).

## Hard rules
- No em dashes. Use a hyphen or rewrite. A hook checks this on every edit.
- Banned words are listed in `.claude/rules/copy.md`. A hook checks these too.
- Never invent results, testimonials, stats, prices or client names. Flag anything unverifiable.
- Never say a feature is live, adopted or working unless Ryan has said so.
- Contact forms go through Formspree. Do not swap the handler.
- Never read, print or edit `.env.local` or any real env file. `.env.example` is fine. Secrets live in Vercel.
- Do not weaken or bypass RLS.
- Do not touch forms, routes, data fetching, env vars, auth or payment code during a design task unless asked.
- shadcn components: use the CLI (`npx shadcn search`, `view`, `add`), not an MCP server.

## Checking UI work
After any visual change, load the page with the Playwright MCP and screenshot at 375, 768 and 1280 wide. Fix what you see, then screenshot again. Check for horizontal scroll, tap targets under 44px, and console errors. Do not report UI work as done without doing this.

## Docs lookups
Use Context7 for current Next.js, Supabase and Tailwind docs before writing against an API you are not sure of. Check the installed version in package.json first.

## Git
- Work on a branch. Do not merge to main. Ryan approves the Vercel preview first.
- `/_to_delete/` is parked work and is gitignored. Do not import from it.
- `hooks/` at the repo root is React hooks, not Claude Code hooks. Claude Code hooks live in `.claude/hooks/`.

## Replies
Say what changed, list files touched, list TODOs and anything you were unsure about. Direct and brief.
