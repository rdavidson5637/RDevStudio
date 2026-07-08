# 08 - Wardrobe AI integration

Port the standalone "Wardrobe AI" app (built in `../capsule-wardrobe`, Express + Supabase + vanilla JS) into this Next.js site as a live feature at `/wardrobe-ai`.

What it does: visitors browse Ryan's actual wardrobe (photos with backgrounds removed), generate every valid outfit combination, and get an honest AI styling verdict. Only Ryan (admin) can upload and manage pieces.

Guardrails for every prompt below:
- Do not touch the games routes, quiz, or drafts. This is additive only.
- Stack: Next.js App Router, TypeScript, Tailwind, Supabase, Anthropic SDK. No new UI frameworks.
- Match the design system in `DESIGN.md` / `app/tokens.css`: Paper/Ink/Pitch palette, Anton + Archivo + Space Mono. White cards, 1px line borders, 10px radius, no shadows. Space Mono section labels.
- No em dashes in copy. Dry, plain voice. Banned words: passionate, journey, seamless, leverage.
- Secrets (Supabase service role key, Anthropic key, admin token) are server-side only. Never `NEXT_PUBLIC_*`, never in a client component.

Reference implementation lives in `../capsule-wardrobe`. Reuse its logic; only the framing changes (Express routes become route handlers, vanilla JS becomes a client component).

Run these in order. Stop and review after each.

---

## 08.1 - Dependencies, env, Supabase client, config

```
We're adding a feature called Wardrobe AI to this Next.js site. First, the plumbing. Do not build UI yet.

1. Install if missing: @supabase/supabase-js and @anthropic-ai/sdk.

2. Add these server-only env vars to .env.example and .env.local (leave real values for me to fill):
   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET=garments,
   ANTHROPIC_API_KEY, ANTHROPIC_MODEL=claude-sonnet-5,
   WARDROBE_ADMIN_TOKEN, REMOVE_BG_API_KEY (optional).
   None of these may be prefixed NEXT_PUBLIC. They are read only in route handlers / server code.

3. Create lib/wardrobe/supabase.ts exporting a server-side Supabase client built from SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (auth: { persistSession: false }), plus a BUCKET constant. Guard against being imported in client components.

4. In next.config.mjs, add images.remotePatterns for the Supabase Storage public URL host (https://<project-ref>.supabase.co, path /storage/v1/object/public/**) so garment images can render. Keep all existing redirects and headers unchanged.

Show me the diffs. No UI, no routes yet.
```

---

## 08.2 - Port the pure logic (no I/O)

```
Port two pure modules from ../capsule-wardrobe into TypeScript under lib/wardrobe/, unchanged in behaviour:

1. lib/wardrobe/generate-outfits.ts - the deterministic combo engine from ../capsule-wardrobe/lib/generateOutfits.js. Type the item shape and the options. Keep the rules identical: exactly one base, one bottom, one footwear, optional mid and outer, never two of the same layer, and the formality rule (formal footwear not paired with casual bottoms unless allowFormalityMismatch is true).

2. lib/wardrobe/validate-item.ts - from ../capsule-wardrobe/lib/validateItem.js. Same enums (formality, layer) and validation.

Add a colocated test for the combo engine (Vitest or node:test, whichever this repo already uses). Port the 7 cases from ../capsule-wardrobe/test/generateOutfits.test.js. These must be pure: no DB, no network. Show me the files and the passing test output.
```

---

## 08.3 - Server helpers: storage, background removal, tagging, scoring

```
Create these server-only modules under lib/wardrobe/, porting from ../capsule-wardrobe/lib. Each imports the Supabase client or Anthropic SDK and must never be imported by a client component.

1. storage.ts - uploadGarmentImage(buffer, mimeType) -> object key in the garments bucket; publicUrl(key); removeGarmentImage(key). Port from storage.js.

2. background.ts - removeBackground(buffer, mimeType) using REMOVE_BG_API_KEY (remove.bg). If no key, return the original unchanged with removed:false. Port from background.js. This is the "ghost clothing" step.

3. tagging.ts - tagGarmentFromBuffer(buffer, mimeType) -> validated tags via Claude vision using tool-use (model from ANTHROPIC_MODEL). Retry once, throw on failure. Also export PLACEHOLDER_TAGS. Port from tagging.js.

4. scoring.ts - scoreOutfit(items) -> { score, feedback } via Claude, tags only never images, honest-critic system prompt. Port from scoring.js.

5. admin.ts - isAdmin(req: Request) comparing the x-admin-token header to WARDROBE_ADMIN_TOKEN (false if token unset).

6. rate-limit.ts - a small in-memory limiter keyed by IP (port rateLimit.js), for the scoring route.

Keep the Supabase schema the same as ../capsule-wardrobe/db/schema.sql (items + outfits tables). Show me the files.
```

---

## 08.4 - API route handlers

```
Add route handlers under app/api/wardrobe/, following this repo's conventions (export const runtime = "nodejs"; export const dynamic = "force-dynamic"; NextResponse.json; @/lib imports). Mirror the Express routes from ../capsule-wardrobe/routes.

- GET  app/api/wardrobe/items/route.ts        -> list items (public), each with image_url from publicUrl().
- POST app/api/wardrobe/items/route.ts        -> admin only (isAdmin). Parse multipart form (request.formData()), read the image file, run removeBackground, upload to storage, then use manual tags if supplied else tagGarmentFromBuffer, falling back to PLACEHOLDER_TAGS + needs_review. Validate all tags before insert. 400 on bad upload (type/size: jpeg/png/webp, 8MB cap).
- DELETE app/api/wardrobe/items/[id]/route.ts -> admin only. Delete row, then removeGarmentImage.
- GET  app/api/wardrobe/generate/route.ts     -> load items, run generateOutfits (respect ?allowFormalityMismatch=true), return { count, outfits, items }.
- POST app/api/wardrobe/score/route.ts        -> rate-limited (20 per 10 min per IP, 429 on exceed). Body { item_ids }. Fetch items, scoreOutfit, return { score, feedback }. On Anthropic auth error return 502 with a friendly message.
- GET  app/api/wardrobe/admin/check/route.ts  -> { admin: isAdmin(req) } so the client can reveal the admin UI.

Every route: validate input, handle errors, never leak stack traces. Show me the files.
```

---

## 08.5 - The page and client component

```
Build the Wardrobe AI page at app/(site)/wardrobe-ai/page.tsx (server component for metadata + shell) plus a "use client" component for the interactive parts. Match DESIGN.md and app/tokens.css exactly - this must look native to the site, not like a separate app.

Layout (mobile-first, max content width as per the rest of the site):
- Hero: Space Mono eyebrow "RDEV STUDIO // WARDROBE AI", Anton headline, a short plain lede, a scoreboard strip (Space Mono, like the homepage signature element) showing pieces count / possible line-ups / "Claude on styling", and a primary "Generate line-ups" button.
- Squad section (Space Mono label "THE SQUAD"): grid of white cards, each a garment image floating on a subtle off-white tile (object-fit: contain so the background-removed PNGs read as ghost clothing), with Space Mono tags (layer / colour / formality).
- Line-ups section (label "THE LINE-UPS"): generated outfit cards, pieces shown side by side, a "Get the gaffer's verdict" button that calls /api/wardrobe/score and shows the score (Anton number) + feedback, and a "Shortlist" button that stores picks in localStorage (per visitor, no DB writes).
- Admin: a small "Admin" control that prompts for the token, verifies via /api/wardrobe/admin/check with the x-admin-token header, and on success reveals an upload panel (file + optional manual tags) and Remove buttons on squad cards. Store the token in sessionStorage; send it as x-admin-token on POST/DELETE. Public users never see upload or remove.

Use the reference UX in ../capsule-wardrobe/public/app.js and the styling intent in ../capsule-wardrobe/public/styles.css, but implement with this site's Tailwind + tokens, not that CSS file. Loading and empty states throughout. Respect prefers-reduced-motion. Show me the page and component.
```

---

## 08.6 - Wire it into the site (nav, listing, SEO)

```
Make Wardrobe AI discoverable, matching how existing tools are wired:

1. Add it to the relevant listing (it fits the interactive tools / toolkit section - put it wherever the audit tools and generators are listed) with a short Space Mono-styled description.
2. Add a nav or section link where appropriate. Do not disturb the games nav.
3. Add generateMetadata to the page (title, description, opengraph) consistent with other pages, and add /wardrobe-ai to app/sitemap.ts.
4. Keep the copy dry and plain. Suggested blurb: "Generate outfits from a real wardrobe. AI-tagged clothes, every valid line-up, an honest verdict."

Show me the diffs.
```

---

## 08.7 - Supabase + deploy checklist (do this yourself, not in Cursor)

1. Supabase: run `../capsule-wardrobe/db/schema.sql` in the SQL editor (items + outfits tables, RLS on). Create a public Storage bucket named `garments`.
2. `.env.local`: fill SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, WARDROBE_ADMIN_TOKEN (a long random string only you know), and REMOVE_BG_API_KEY if using ghost clothing.
3. Add the same vars in Vercel project settings (Production + Preview). None prefixed NEXT_PUBLIC.
4. Deploy. Visit /wardrobe-ai, click Admin, enter your token, upload your wardrobe. Then test as a normal visitor: generate line-ups and get a verdict.
5. Cost note: the AI verdict calls Claude per click. The rate limiter caps public usage; watch your Anthropic usage after launch and tighten the cap in lib/wardrobe/rate-limit.ts if needed.
