# RDev Studio

The code behind [rdevstudio.co.uk](https://rdevstudio.co.uk): the shopfront for my one-person web studio in Carrickfergus, Northern Ireland, and the home of the games and tools I build and run.

It is one Next.js app doing three jobs:

1. **Studio site** for NI small businesses and charities: services and prices, case studies, local landing pages, contact.
2. **Live products** people actually use: Pub Quiz (real-time multiplayer), Champions Draft and Rugby Draft, an FPL Draft analyser, Wardrobe AI, and a set of free business tools.
3. **Portfolio** for developer roles, with write-ups of how the bigger builds work.

## How it's built

Write-ups with architecture, decisions, incidents and known gaps:

- [Pub Quiz](https://rdevstudio.co.uk/build/pub-quiz) - route handlers own game state in Redis, Pusher pushes events to every phone, the server decides who buzzed first, Claude writes the questions with a validated fallback.
- [Draft Analyser](https://rdevstudio.co.uk/build/draft-analyser) - daily cron ingestion from the FPL APIs into Supabase Postgres with RLS, availability and projection models, a Claude news layer that never overwrites official data, Vitest suites.
- [Champions Draft](https://rdevstudio.co.uk/build/champions-draft) - a client-side draft game and match engine with league, Champions League and World Cup modes, and a rugby variant.

The content for those pages lives in `lib/build-notes/` and is written against this repo, with commit links.

## Stack

| Layer | What |
| --- | --- |
| Framework | Next.js 15 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, design tokens in `app/tokens.css`, see `DESIGN.md` |
| Data | Supabase Postgres with Row Level Security; Redis over REST for quiz state |
| Real-time | Pusher Channels |
| AI | Anthropic Claude API (quiz questions, FPL news extraction, Wardrobe AI) |
| Forms | Formspree |
| Hosting | Vercel, including cron jobs (`vercel.json`) and Analytics |
| Tests | Vitest |

## Layout

```
app/
  (site)/              # Studio pages, case studies, tools, projects, /build write-ups
  (game)/              # Full-screen games: champions-draft, rugby-draft, pub-quiz
  api/                 # quiz/*, cron/*, draft/*, audit, wardrobe/*
  og/route.tsx         # Per-page link preview images
  sitemap.ts, robots.ts, opengraph-image.tsx, apple-icon.png
components/            # By feature (home, services, quiz, champions-draft, draft, ...)
lib/
  constants.ts         # Site copy, prices, nav, projects, FAQ
  services.ts          # Service pages, terms, care plan, comparison
  locations.ts         # Local landing pages
  seo.ts, metadata.ts  # JSON-LD graph and page metadata
  build-notes/         # "How it's built" content
  quiz/, fpl/, draft/, champions-draft/, rugby-draft/, ...
supabase/migrations/   # Schema and RLS policies
```

## Running it

Node 20 or 22 (see `.nvmrc`).

```bash
npm ci
cp .env.example .env.local   # fill in what you need; most pages run without any keys
npm run dev
```

```bash
npm run lint
npm test          # Vitest
npm run build
```

The studio pages and Champions Draft need no environment variables. Pub Quiz needs Pusher and Redis (and an Anthropic key for generated questions), the Draft Analyser needs Supabase and the FPL league IDs, and the cron routes need `CRON_SECRET`. See `.env.example`.

## Contact

ryan@rdevstudio.co.uk
