# RDev Studio (www.rdevstudio.co.uk) — Agent Rules

One-person web studio site for Ryan Davidson, Carrickfergus, NI. Also hosts live games, tools and write-ups. Read `README.md` for the map of the repo.

## Stack (what the repo actually runs)
- Next.js 15.5 App Router (do not downgrade), React 18, TypeScript, Tailwind 3
- Supabase Postgres with RLS, Pusher, Redis over REST, Formspree, Vercel, Vitest
- Server components by default. Client components (`"use client"`) only where interactivity needs them.
- No new npm dependencies unless the task explicitly allows one.

## Commands
- `npm run dev` (`.claude/launch.json` lists port 3001)
- `npm run lint`, `npm test`, `npm run build`
- Run `npm run lint` and `npx tsc --noEmit` (and `npm run build` after UI/route tasks) before saying a change is done.

## Design & Visual Standards (Grenadine)
- **Before changing any UI**, read `.design/brief.md`, `.cursor/rules/design-standards.mdc`, and `.cursor/rules/rdev-polish.mdc`.
- **Palette (Grenadine — Wada 166 + 325)**: Use `--color-studio-*` tokens in `app/tokens.css`, never raw hex or arbitrary pixel values in components.
  - Base `#112F2C` page background, panel `#183E3A` panels/frames, panel-raised `#1E4A45` hover/raised panels.
  - Text `#FBE6A0` (Naples Yellow), text-muted `#CFC7A3`, text-faint `#B9B392`.
  - Rules: `line` `rgba(251,230,160,0.18)`, `line-strong` `rgba(251,230,160,0.35)`, `cover-line` `rgba(251,230,160,0.5)`.
  - Accent: Grenadine `#F48067` (hover `#F79A85`, text on it always `#112F2C`) — primary button, highlighted element in a cover, and at most one highlight per page.
  - Second block colour: Ochre `#E2B540` (text on it `#112F2C`) — price list and at most one other block per page.
- **Typography**: `Big Shoulders Display` 800 for `h1`, `h2` and big numbers (sentence case). `Atkinson Hyperlegible` 400 and 700 for everything else. Two families only. No monospace anywhere on studio pages.
- **Banned UI patterns**: All-caps eyebrows/labels, monospace labels, middle-dot joined strings, pill tech tags, status dots, corner arrows on cards, underlines on single headline words, grid-line/glow backgrounds, noise textures, fade-up on scroll, identical card grids for everything, two-part slogan headings. Keep the code-drawn covers and their hover motion.
- **Protected live routes**: Never change, move or restyle `/champions-draft`, `/rugby-draft`, `/pub-quiz`, `/games/longest-word`, `/draft`, `/wardrobe-ai`, or anything under them. `/stout-finder` redirects to `stoutfinder.com` — leave in place. Keep `/hire` intact (including the hire-meter finale card, Rudi modal, and `FELINE_DISTRACTION_DETECTED` card).

## Copy Rules (`.claude/rules/copy.md`)
- **Voice**: Dry, plain NI English. Confident. No corporate filler, no embellishment. Sentence case. Buttons are verbs.
- **No em dashes (`—`) or en dashes (`–`)**: Use a plain hyphen or rewrite the sentence. Enforced by `.agents/hooks.json`.
- **Banned words and phrases**: `passionate`, `journey`, `seamless`, `leverage`, `synergy`, `elevate`, `unlock`, `crafting digital experiences`, `crafting experiences`, `"I'd love to"`, `"reaching out"`, `"circling back"`, `"we take pride"`, `"look no further"`, `"second to none"`, `"welcome to"`, `"work in progress"`, `"not finished yet"`.
- **Never invent**: Testimonials, reviews, stats, awards, client names, prices, opening hours or results. Flag anything unverifiable or leave it out as a TODO.
- **Never overclaim status**:
  - Assisi rebrand: built, awaiting their sign-off. Never say they have adopted it.
  - ShelterLink: ready for live use. Never say Assisi is using it.
  - RV's Cold Brew: Square is linked, a few details left. Never claim working online ordering or payments.
- **Prices and terms**: Check `lib/constants.ts` and `lib/services.ts` as source of truth (Standard website build: 650 pounds; Care plan: 30 pounds/mo; Social media from 150 pounds/mo; Content creation from 200 pounds/project; 50% upfront, 50% at launch; free for registered charities).

## Database, Secrets & Architecture (`.claude/rules/supabase.md`)
- Never read, print or edit `.env.local` or any real env file (`.env.example` is fine). Secrets live in Vercel. Enforced by `.agents/hooks.json`.
- Supabase Postgres with RLS: never disable or weaken RLS, never add a policy that opens a table to everyone, never use the service role key in client code.
- Schema changes go in `supabase/migrations/` as a new migration file. Never edit an applied migration.
- Cron routes require `CRON_SECRET`. Contact forms go through Formspree (do not swap handler, action, method, or field names).
- Do not touch forms, routes, data fetching, env vars, auth or payment code during a design task unless asked.
- `shadcn` components: use the CLI (`npx shadcn search`, `view`, `add`), not an MCP server.

## Checking UI Work & Docs
- After any visual change, load the page with Playwright and screenshot at `375`, `768` and `1280` wide. Check for horizontal scroll, tap targets under 44px, `prefers-reduced-motion`, WCAG AA contrast, and console errors.
- Use Context7 MCP for current Next.js, Supabase and Tailwind docs before writing against an API you are unsure of (check `package.json` version first).

## Git & Replies
- Work on a branch. Do not merge to `main` (Ryan approves the Vercel preview first).
- `/_to_delete/` is parked work and is gitignored. Do not import from it.
- Replies: say what changed, list files touched, list TODOs and anything you were unsure about. Direct and brief.
