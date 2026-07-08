# 09 - Wardrobe AI: what's built + finishing steps

Wardrobe AI has been integrated into this repo directly (not just as prompts). This file lists what was added and the steps only you can do (install, Supabase, env, deploy). It supersedes the build steps in `08-wardrobe-ai.md` (keep 08 for reference).

## What was added (all additive - no existing routes touched)

New files:
- `lib/wardrobe/` - types, generate-outfits, validate-item, supabase, storage, background, tagging, scoring, admin, rate-limit (ported from the standalone app, TypeScript).
- `app/api/wardrobe/` - route handlers:
  - `GET  /api/wardrobe/items` (public list)
  - `POST /api/wardrobe/items` (admin only: upload + ghost-clothing + AI tag)
  - `DELETE /api/wardrobe/items/[id]` (admin only)
  - `GET  /api/wardrobe/generate` (public: build line-ups)
  - `POST /api/wardrobe/score` (public, rate-limited 20 / 10 min / IP: AI verdict)
  - `GET  /api/wardrobe/admin/check`
- `app/(site)/wardrobe-ai/page.tsx` + `components/wardrobe-ai/WardrobeAI.tsx` + `wardrobe.module.css` - the page, built with the site's design classes.

Edited files:
- `package.json` - added `@anthropic-ai/sdk` and `@supabase/supabase-js`.
- `.env.example` - added the Wardrobe AI vars.
- `app/sitemap.ts` - added `/wardrobe-ai`.

Security model: admin token (`WARDROBE_ADMIN_TOKEN`) required via `x-admin-token` header for all writes; the Supabase service role key and Anthropic key are server-side only (never `NEXT_PUBLIC`). The AI verdict is rate-limited.

## Coming-soon vs live

`/wardrobe-ai` shows a **coming-soon teaser** by default (`components/wardrobe-ai/WardrobeAIComingSoon.tsx`) - static, no Supabase needed, safe to deploy immediately. When you're ready to launch (Supabase set up, wardrobe uploaded), set `WARDROBE_LIVE=true` in your env (local + Vercel) and the same route swaps to the live app. No code change needed to flip it.

## Steps only you can do

1. Install the new deps:
   ```
   npm install
   ```
2. Supabase: in your project, run `../capsule-wardrobe/db/schema.sql` in the SQL editor (items + outfits tables), and create a public Storage bucket named `garments`.
3. Fill `.env.local` (copy the new keys from `.env.example`):
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET=garments`
   - `ANTHROPIC_API_KEY` (you already have this for the quiz), `ANTHROPIC_MODEL=claude-sonnet-5`
   - `WARDROBE_ADMIN_TOKEN` (a long random string only you know)
   - `REMOVE_BG_API_KEY` (optional, for ghost clothing)
4. Verify locally:
   ```
   npm run build   # must pass with no type/lint errors
   npm run dev      # then open http://localhost:3000/wardrobe-ai
   ```
5. Add the same env vars in Vercel (Production + Preview), then deploy.
6. On the live page: click Admin, enter your token, upload your wardrobe. Test as a visitor: generate line-ups and get a verdict.

## Optional - add a nav / listing link (run in Cursor)

I left this out to avoid touching your nav and interactive-tools catalog blind. Run this when ready:

```
Add a link to the new /wardrobe-ai page in the site, matching how existing pages are linked. It lives at its own route /wardrobe-ai (not under /interactive). Add it wherever fits best - the main nav, the interactive tools landing, or the toolkit index - using the site's existing link styles and dry copy. Suggested blurb: "Generate outfits from a real wardrobe. AI-tagged clothes, every valid line-up, an honest verdict." Do not change the /interactive/[slug] routing or the games nav.
```

## Note on verification

The full `next build` (type + lint) was not run in the environment that generated these files, so run step 4 before deploying. The pure logic (`generate-outfits`, `validate-item`) was type-checked and passes; the rest follows standard Next 15 route-handler and Anthropic/Supabase SDK patterns.
