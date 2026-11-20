# Mock B Notes: Warm, Friendly & Local (Carrickfergus)

> Agent-written experimental mock for side-by-side comparison. Unverified until Ryan reviews the Vercel preview and copy. Do not merge PR #32 into `main`.

## The design idea (4 lines)

Mock B reimagines RDev Studio as a sunlit, approachable Northern Ireland studio rooted along Belfast Lough in Carrickfergus. Rather than a dark agency vibe or a personal bio site, it pairs a calm melon.studio-inspired single-page rhythm with warm paper surfaces, rounded tactile cards, and bespoke hand-drawn coastal SVG touches (a sketched Carrickfergus Castle vignette, wave dividers, and subtle sticker labels). Every section speaks in plain English as "RDev Studio" with zero prices shown and two clear actions always within reach: request a quote or message on WhatsApp.

## Routes

- `/mock-b` - Single long studio home page (hero + local time/status chips, five projects, services/skills, how a project runs, studio-only about block, quote form + WhatsApp close).
- `/mock-b/work` - Dedicated five-project showcase with jump links, ShelterLink's three real screenshots from `public/images/work/`, and paired desktop + phone CSS/SVG device mockups for the remaining four projects.
- Both routes set `robots: { index: false, follow: false }` and are excluded from `app/sitemap.ts` and the live navigation.

## Palette

Scoped strictly under `.mock-b-root` in `app/mock-b/mock-b.css` (no edits to `app/globals.css` or `tailwind.config.ts`). Every foreground/background pairing meets WCAG AA (most meet AAA):

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--mb-cream` | `#FAF6EE` | Sunlit warm linen page background |
| `--mb-cream-deep` | `#F2E9DA` | Secondary warm sand bands and footer |
| `--mb-paper` | `#FFFDF9` | Tactile card and form surface |
| `--mb-ink` | `#211D18` | Primary espresso ink (~15.4:1 on cream) |
| `--mb-ink-soft` | `#574D42` | Secondary warm peat text (~7.3:1 on cream) |
| `--mb-terracotta` | `#B84A2E` | Primary "Start a quote" CTA (~5.2:1 with `#FFFDF9`) |
| `--mb-terracotta-soft` / `-ink` | `#F9E4DB` / `#822E19` | Clay tint sticker surface and text (~6.6:1) |
| `--mb-seaglass` | `#1E6058` | Belfast Lough sea-green WhatsApp CTA (~7.3:1 with `#FFFDF9`) |
| `--mb-seaglass-soft` / `-ink` | `#DCEFEB` / `#144740` | Seafoam status chip surface and text (~7.9:1) |
| `--mb-butter` / `-soft` | `#F3DCA1` / `#FBF1D4` | Coastal gorse highlight stickers (paired only with `#211D18`) |
| `--mb-line` / `-strong` | `#DFD4C2` / `#C4B49B` | Tactile borders and subtle card ledge shadows |

## Fonts

Loaded via built-in `next/font/google` in `app/mock-b/layout.tsx` (zero new npm packages, self-hosted by Next.js at build time, `display: "swap"`):

- **Display:** `Fraunces` (weights 500, 600, 700; soft optical serif with `SOFT 80, WONK 1` for warmth; fallback `Georgia, serif`).
- **Body / UI:** `Plus Jakarta Sans` (weights 400, 500, 600, 700; open, friendly humanist sans; fallback `system-ui, sans-serif`).

## What to steal for the real site

1. **Above-the-fold dual action rhythm:** Pairing a warm primary **Start a quote** button with a distinct sea-green **Message on WhatsApp** button in both the sticky header and the hero makes contacting the studio obvious on 360px phones without needing to scroll.
2. **Local time + availability chips:** Showing `Carrickfergus, NI / HH:MM local` next to an `Open to new projects` pill immediately signals "real local studio, open for work" without needing a personal bio or photo.
3. **Bespoke inline SVG coastal craft:** The lightweight Carrickfergus Castle + Belfast Lough sketch and wavy dividers add strong local character with zero image requests, zero stock photography, and minimal byte weight.
4. **Honest preview frames for pre-launch or sign-off work:** Framing Assisi's held-for-sign-off rebuild and Rondo's studio build inside clean CSS/SVG browser and phone mockups lets all five projects look cohesive without inventing fake screenshots or stats.
5. **Compact client JS:** Only two tiny client components (`LocalTimeChip` and `WarmQuoteForm`), keeping `/mock-b` at 3.96 kB route JS and `/mock-b/work` at 176 B route JS.

## Polish & verification summary

- **Tested in headless Playwright** at `360x800`, `390x844`, `768x1024`, and `1280x900` against `next start`:
  - `0px` horizontal overflow across all tested viewports on `/mock-b` and `/mock-b/work`.
  - `0` visible interactive targets under `44px` after tightening the header pills and making the quote-card email link `min-h-[44px]`.
  - Verified clean heading hierarchy (`h1` -> `h2` -> `h3` with no skipped levels), explicit `<label>` elements on all form controls, `noindex, nofollow` robots meta, and `prefers-reduced-motion: reduce` disabling the pulse animation and sticker tilts.
- **What could not be measured locally:**
  - Live Formspree submission end-to-end (local environment intentionally has no `NEXT_PUBLIC_FORMSPREE_ID`, so only the graceful email + WhatsApp fallback path could be confirmed locally).
  - Production Vercel Edge Lighthouse / Core Web Vitals field scores (run PageSpeed Insights against the Vercel preview URL once ready).
  - Note on GitHub Actions `CI/check`: `npm run lint`, `npm test` (64/64), and local `npm run build` + `npx tsc --noEmit` all pass, while GitHub Actions runs `tsc --noEmit` without generating `next-env.d.ts` first, triggering 5 pre-existing `TS2307` static image errors in `app/(site)/**` and `components/home/**` (zero errors in `app/mock-b/**` or `components/mock-b/**`).

## Open TODOs for Ryan

- [ ] **Formspree:** Confirm `NEXT_PUBLIC_FORMSPREE_ID` is set in the `rdev-studio` Vercel project and submit one test quote on the preview to verify delivery.
- [ ] **WhatsApp:** Confirm the pre-filled message text appended to `WHATSAPP_URL` (`components/mock-b/data.ts`).
- [ ] **Rondo:** Add the real live URL (currently linked to in-site section `/mock-b/work#rondo`) and confirmed public summary/stack.
- [ ] **Crosskennan & MGSL Hub:** Confirm exact studio summaries, years, and stack tags for `https://crosskennan.vercel.app` and `https://mgsl-hq-black.vercel.app` (note: MGSL Supabase backend remains paused and is not queried).
- [ ] **Assisi Animal Sanctuary:** Replace the "Preview held for sign-off" CSS mockup with real screenshots once the sanctuary approves public previews.
- [ ] **Copy review:** Check all studio-voice copy across `/mock-b` and `/mock-b/work`, especially the services wording ("Google Business Profile help" and charity note without pricing).
