import type { BuildNote } from "./types";

export const draftAnalyserNote: BuildNote = {
  slug: "draft-analyser",
  title: "FPL Draft Analyser",
  kicker: "Data pipeline and models",
  summary:
    "A public, read-only analyser for my Fantasy Premier League Draft league: squad board, availability, projected points, start/sit optimiser, waivers, league odds and a live gameweek.",
  stack: [
    "Next.js 15 App Router",
    "TypeScript",
    "Tailwind CSS",
    "Supabase Postgres + RLS",
    "Vercel Cron",
    "Pusher",
    "Anthropic SDK",
    "Vitest",
  ],
  links: [
    { label: "Open the analyser", href: "/draft" },
    { label: "Model notes", href: "/draft/how-it-works" },
  ],
  facts: [
    { label: "Status", value: "Live" },
    { label: "Tables", value: "13 fpl_ tables" },
    { label: "Crons", value: "2 daily jobs, 4 cron routes" },
    { label: "Tests", value: "45 passing" },
  ],
  tldr: {
    problem:
      "The league's data sits behind two undocumented FPL APIs that block browser requests, and official injury flags lag behind what clubs are saying.",
    built:
      "A daily cron that pulls both APIs into Postgres, pages that only read Postgres, two explainable models, a news layer that stays labelled as reported, and a live page.",
    hardPart:
      "Payload shapes that change without warning, news that must never pass for official data, and live scores on a platform that lets me schedule a job once a day.",
  },
  context: [
    "I play in an FPL Draft league with friends. Draft has no prices and no transfer market, so each week the questions are who's fit, who starts, and who's on the wire.",
    "It's read-only. It never logs in and never touches a team. Even the deadline alert says \"Change it in the FPL app - this site is read-only.\"",
    "It runs on Vercel Hobby, which gives me two daily cron jobs, and Supabase. Neither FPL API is documented, so I found the real shapes by running the sync against our league, and a few of my types were wrong first time.",
  ],
  goals: [
    "Availability, projected points and fixtures for my squad and every free agent in one place.",
    "Never call FPL from the browser. Pages read Postgres and nothing else.",
    "Keep official FPL fields a clean mirror and label everything else as reported.",
    "Keep working when an API key or an upstream endpoint is missing.",
  ],
  nonGoals: [
    "Making moves for anyone. There are no FPL credentials in the code.",
    "Multiple leagues. The league and entry come from two env vars.",
    "Trained models. Both scores are hand-weighted formulas I can explain line by line.",
  ],
  architecture: {
    summary:
      "Only server code talks to FPL. A nightly sync writes to Postgres with the service-role key, and server components read it back with the anon key through tagged unstable_cache calls. Both Supabase clients force cache: \"no-store\" so Next.js can't serve a pre-sync snapshot, and the sync revalidates the tags when it finishes clean.",
    parts: [
      {
        name: "lib/fpl/client.ts",
        role: "Server-only client with a 10s timeout, three attempts with backoff on 5xx, a fast fail on 4xx, and a 5-second memo.",
      },
      {
        name: "Vercel Cron + /api/cron/sync",
        role: "Daily at 06:00 UTC: chunked upserts, change snapshots, projections, then news, a live snapshot and the deadline check.",
      },
      {
        name: "Supabase Postgres",
        role: "13 fpl_ tables with RLS on, SELECT-only policies for anon, and no write policies at all.",
      },
      {
        name: "News layer",
        role: "BBC and Guardian RSS, one forced Claude tool call per club, stored in fpl_news_items.",
      },
      {
        name: "Pusher channel draft-live",
        role: "Pushes the rebuilt live board to open tabs.",
      },
      {
        name: "Client components",
        role: "The start/sit optimiser runs in the browser, trying every legal formation.",
      },
    ],
    flowTitle: "Nightly sync, then the live page",
    flow: [
      { from: "Vercel Cron", to: "/api/cron/sync", action: "GET with Bearer CRON_SECRET at 06:00 UTC." },
      {
        from: "/api/cron/sync",
        to: "Draft + main FPL APIs",
        action: "Bootstrap, league, ownership, transactions, fixtures, then picks per manager 250ms apart.",
      },
      {
        from: "/api/cron/sync",
        to: "Supabase (service role)",
        action: "200-row upserts, a snapshot only where status, news or chance changed, and my squad's projections.",
      },
      {
        from: "/api/cron/sync",
        to: "Next.js cache",
        action: "revalidateTag on five fpl- tags, only if no step errored.",
      },
      { from: "Browser", to: "/draft pages", action: "Server components read Postgres with the anon key." },
      {
        from: "Live page",
        to: "/api/draft/live/refresh",
        action: "POST on load. The server fetches the live endpoint and upserts fpl_live_stats.",
      },
      {
        from: "/api/draft/live/refresh",
        to: "Pusher",
        action: "Triggers \"board\" on draft-live. Every tab also polls every 60s.",
      },
    ],
  },
  decisions: [
    {
      title: "Ingest into Postgres, never call FPL from the page",
      context: "Both FPL APIs block browsers, have no docs, and keep no history of when a flag changed.",
      decision:
        "One cron route pulls everything into 13 tables. Each step has its own try/catch, so a partial failure returns ok: false with an errors list, not a 500. Snapshots are only written on change.",
      alternatives: "A proxy route calling FPL on every page view.",
      consequences:
        "Pages are only as fresh as the last sync, so the layout shows \"Data as of\". In return pages are fast, FPL gets hit once a day, and the status timeline exists at all.",
    },
    {
      title: "Anon reads, service-role writes",
      context: "The Supabase URL and anon key are NEXT_PUBLIC variables, so assume anyone has them.",
      decision:
        "RLS on every table with SELECT policies only. Writes use a separate service-role client that imports server-only, so pulling it into a client bundle breaks the build.",
      alternatives: "RLS off and hope, or every read behind an API route on the service key.",
      consequences: "The data is public FPL data anyway. A leaked anon key can't write a row.",
    },
    {
      title: "News is reported, never official",
      context: "Press-conference news hits RSS before FPL updates its flags, but headlines are noisy.",
      decision:
        "Extracts get their own table. The availability score adds a bounded term, +8 to -20 times confidence, and caps an injured player at 40 regardless. The UI heads them \"Reported - not confirmed\" with a source link.",
      alternatives: "Write extracted status into fpl_players, or skip news.",
      consequences:
        "Official fields stay a clean mirror. A bad extract moves a score 20 points at most and can't turn an injured player green.",
    },
    {
      title: "A live page on a once-a-day cron",
      context: "My first hourly schedule broke Hobby's cron limit and failed every deploy (ba5c31d).",
      decision:
        "The page renders from a 60-second cache, POSTs a refresh on load (4 a minute per IP, plus a 45-second server throttle) and broadcasts over Pusher. /api/cron/live is ready for a five-minute schedule on Pro.",
      alternatives: "Pay for Pro now, or poll FPL from the browser, which it blocks.",
      consequences:
        "Live data only moves while someone has the page open. Both limits are in memory, so they're per instance.",
    },
  ],
  incidents: [
    {
      title: "One cron route checked its secret differently",
      symptom:
        "Nothing visible, which is the problem. The other three cron routes refused everything if CRON_SECRET was missing; the sync route didn't.",
      cause:
        "The sync route compared the header to `Bearer ${process.env.CRON_SECRET}` inline. With the variable unset, that string is 'Bearer undefined', and a request sending exactly that would have been let in.",
      fix: "It now uses the same unauthorized() helper as the other cron routes, which fails closed when the secret is missing.",
      commit: "e8f6963",
    },
    {
      title: "Live board crashed on a new payload shape",
      symptom: "The live page failed before a single stat was stored.",
      cause: "The live endpoint started returning elements as an object keyed by player id. I called .map on it.",
      fix: "normalizeLiveElements accepts either shape and drops junk rows. Three tests pin it.",
      commit: "4983cc7",
    },
    {
      title: "Overview said \"not synced\" with a full database",
      symptom: "/draft showed its empty state on the live site with fpl_players populated.",
      cause:
        "hasSyncedOnce used a HEAD count. Next.js's fetch wrapper dropped the Content-Range header supabase-js reads the count from.",
      fix: "Select one id with limit(1) and check it exists. A comment stops anyone putting the count back.",
      commit: "4d0518b",
    },
    {
      title: "First real sync fell over three ways",
      symptom: "Running it against the real league wrote no teams, events or players.",
      cause:
        "The teams upsert spread the raw object, and an unknown pulse_id field made PostgREST reject the batch. Teams, events and players shared one try/catch. Classic leagues return no matches array.",
      fix: "Explicit column mapping, one try/catch per upsert, and matches made optional.",
      commit: "0b29033",
    },
  ],
  testing: [
    "npx vitest run lib/fpl lib/draft: 45 tests in 11 files, all passing.",
    "The models are pure functions, tested with no mocks: bands, the injury cap holding against a \"trained\" report, news decay, no NaN from null fields, fixture and home/away direction, components summing to xP.",
    "The optimiser runs against 500 random squads and must never break formation rules. Simulations are seeded, so odds are deterministic.",
    "Parsers too: RSS and Atom, name matching inside one club, both live payload shapes, snapshot diffs and the deadline window.",
    "Nothing tests the route handlers or the Supabase writes. The sync was checked against the real league.",
  ],
  ai: [
    "Claude is only called by the news ingest, server-side, from the 07:00 news cron and the end of the sync.",
    "A regex pre-filter keeps fitness headlines from the last 48 hours, skips stored URLs, and caps it at 8 clubs of 8 items.",
    "The model comes from ANTHROPIC_MODEL, default claude-sonnet-5. tool_choice forces one record_availability_signals call, with signal limited to six values and confidence to 0-1.",
    "Rows are dropped if the signal isn't in the enum or sourceUrl isn't a link I sent. Confidence is clamped, quotes are cut to 280 characters, and names match within that club. With no ANTHROPIC_API_KEY it stores nothing and availability runs on official fields alone.",
  ],
  gaps: [
    "No per-match minutes history, so the availability minutes-trend term is always zero.",
    "No five-minute in-play cron on Hobby.",
    "fpl_projections only covers my squad. Waiver and league projections are worked out at read time on the fallback scoring table, not the bootstrap's.",
    "Clean-sheet odds are a lookup on fixture difficulty, not a team xGC model.",
    "Ownership refreshes delete-then-insert, since PostgREST has no multi-statement transactions, so it's briefly empty once a day.",
  ],
  codeLinks: [
    { label: "Sync pipeline", path: "app/api/cron/sync/route.ts" },
    { label: "Schema and RLS policies", path: "supabase/migrations/0001_draft_analyser.sql" },
    { label: "Server-only FPL client", path: "lib/fpl/client.ts" },
    { label: "Availability model", path: "lib/draft/availability.ts" },
    { label: "Projected points model", path: "lib/draft/projection.ts" },
    { label: "Claude news extraction", path: "lib/draft/news/extract.ts" },
    { label: "Live board, persist and broadcast", path: "lib/draft/live.ts" },
    { label: "Start/sit optimiser", path: "lib/draft/optimise.ts" },
  ],
};
