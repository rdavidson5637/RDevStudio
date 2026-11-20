# Mock B Notes: Warm, Friendly & Local (Carrickfergus)

> Agent-written experimental mock for side-by-side comparison. Unverified until Ryan reviews the Vercel preview and copy. Keep draft PR #32 as a draft and do not merge into `main`.

## The design idea (4 lines)

Mock B reimagines RDev Studio as a sunlit, approachable Northern Ireland studio rooted along Belfast Lough in Carrickfergus. Rather than a dark agency vibe or a personal bio site, it pairs a calm melon.studio-inspired rhythm with warm linen paper surfaces, tactile rounded cards, and hand-drawn coastal SVG craft (an animated Carrickfergus Castle & Belfast Lough vignette, hand-drawn wave dividers, and playful tilted sticker labels). Every page speaks in plain English as "RDev Studio" with zero prices shown and two prominent actions always within reach: request a quote or message on WhatsApp.

## Routes

All four routes live exclusively under `app/mock-b/**` with scoped styles in `app/mock-b/mock-b.css`, `robots: { index: false, follow: false }`, and zero edits to live site files, `app/sitemap.ts`, or `package.json`:

- `/mock-b` (`193 B` route JS) — Single long studio home page: hero with local Carrickfergus time + availability chip, animated Carrickfergus Coast SVG vignette, five real studio projects, services & skills summary, four-step process, studio-only about block, and quote form + WhatsApp close.
- `/mock-b/work` (`176 B` route JS) — Expanded five-project showcase with jump links, ShelterLink's three real screenshots from `public/images/work/`, and paired desktop + phone CSS/SVG device mockups for Assisi, Crosskennan, Rondo, and MGSL Hub (strictly facts-only).
- `/mock-b/services` (`182 B` route JS) — Dedicated plain-English services guide covering Websites, Web apps & handy tools, Google Business Profile help, and Charity & small-business builds (zero prices, facts-only, each ending with Quote form `?topic=...` prefill + WhatsApp CTAs, plus process steps and studio FAQs).
- `/mock-b/contact` (`184 B` route JS) — Dedicated quote & contact page with the `WarmQuoteForm` (using `FORMSPREE_FORM_ID` with graceful empty-ID email/WhatsApp fallback, blur/submit inline validation, `aria-describedby`, `aria-live`, focus-first-invalid, and sending/error/success states) paired with a prominent WhatsApp card, direct email, and helpful scope checklist.

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
| `--mb-butter` / `-soft` | `#F3DCA1` / `#FBF1D4` | Coastal gorse highlight stickers & active nav pills (paired only with `#211D18`) |
| `--mb-line` / `-strong` | `#DFD4C2` / `#C4B49B` | Tactile borders and subtle card ledge shadows |

## Fonts

Loaded via built-in `next/font/google` in `app/mock-b/layout.tsx` (zero new npm packages, self-hosted by Next.js at build time, `display: "swap"`):

- **Display:** `Fraunces` (weights 500, 600, 700; soft optical serif with `SOFT 80, WONK 1` for warmth; fallback `Georgia, serif`).
- **Body / UI:** `Plus Jakarta Sans` (weights 400, 500, 600, 700; open, friendly humanist sans; fallback `system-ui, sans-serif`).

## Warm micro-details (zero dependencies, off under `prefers-reduced-motion`)

- **Living Carrickfergus Coast SVG (pure CSS):** Gently fluttering castle pennant, calmly bobbing sailboat on Belfast Lough, drifting gulls, swaying water lines, and a stroke-drawn hero wavy underline.
- **Coastal scroll-settle & tide line (`WarmMotionController`):** One tiny pathname-aware client controller in `app/mock-b/layout.tsx` runs a single `IntersectionObserver` + scroll-sweep for below-the-fold `[data-mb-reveal]` cards and `[data-mb-wave]` dividers (above-the-fold LCP elements are never hidden, and fast scrolls/hash jumps immediately reveal passed items), plus a subtle 3px sea-glass-to-terracotta reading-progress tide ribbon along the sticky header.
- **Active nav pills (`MockBNav`):** Desktop and mobile navigation highlight the active route with a butter-soft pill, terracotta dot, and `aria-current="page"`.
- **Tactile hover polish:** Gentle icon-tile tilt, castle-mark tilt, card ledge lift, and CTA arrow nudge — all disabled immediately under `@media (prefers-reduced-motion: reduce)`.

## What to steal for the real site

1. **Above-the-fold dual action rhythm:** Pairing a warm primary **Start a quote** button with a distinct sea-green **Message on WhatsApp** button in both the sticky header and every key section makes contacting the studio effortless on 360px phones.
2. **Local time + availability chips:** Showing `Carrickfergus, NI / HH:MM local` next to an `Open to new projects` pill immediately signals "real local studio, open for work" without needing a personal bio or photo.
3. **Bespoke inline SVG coastal craft:** The lightweight Carrickfergus Castle + Belfast Lough vignette and hand-drawn wavy dividers give unmistakable local character with zero image requests and zero stock photography.
4. **Service-to-quote `?topic=` handoff:** Each service guide on `/mock-b/services` links straight to `/mock-b/contact?topic=...` so the quote dropdown pre-selects the visitor's project type automatically while keeping every route 100% static.
5. **Accessible inline form validation:** Blur/submit validation with `aria-invalid`, `aria-describedby`, `aria-live`, focus-first-invalid, and graceful empty-ID email/WhatsApp fallback makes `WarmQuoteForm` ready for production once `NEXT_PUBLIC_FORMSPREE_ID` is confirmed.
6. **Minimal client JS:** All four routes stay static Server Components under `200 B` route-specific JS (`106-116 kB` First Load JS including Next.js shared runtime).

## QA & verification summary

- **Build & automated checks (agent-run, unverified by Ryan):**
  - `npm run lint`: passed (0 errors, 0 warnings).
  - `npx tsc --noEmit`: passed (0 errors).
  - `npm test`: passed (17 files, 64/64 tests).
  - `npm run build`: passed (117/117 static pages generated).
- **Playwright real-browser audit against `next start`** across all 4 routes (`/mock-b`, `/mock-b/work`, `/mock-b/services`, `/mock-b/contact`) at `360x800`, `390x844`, `768x1024`, and `1280x900` (16 viewport checks):
  - `0px` horizontal overflow across all 16 checks.
  - `0` visible interactive targets under `44px` across all 16 checks.
  - `0` unlabelled form inputs, `1` `<h1>` per page, `0` skipped heading levels, `0` price strings (`£...`), and `robots: noindex, nofollow` confirmed on all 4 routes.
  - `0` elements stuck hidden after scrolling or after client-side navigation between `/mock-b` -> `/mock-b/work` -> `/mock-b/services` -> `/mock-b/contact?topic=New%20website`.
  - Verified `?topic=` pre-selection from `/mock-b/services` to `/mock-b/contact` and active nav `aria-current="page"` updates on route change.
  - **Keyboard-only walk-through:** First Tab lands on `"Skip to main content"` (`#mock-b-main`) with `2.5px solid` visible focus ring; sequential Tab order verified across header, nav, CTAs, and form; pressing Enter on empty submit focuses first invalid field (`mb-contact-name`), renders `[role="alert"]`, and sets `aria-invalid="true"` + `aria-describedby` on all 4 required fields.
  - **`prefers-reduced-motion: reduce`:** Verified `animationName: "none"` on pulse ring, castle pennant, and boat; coastal tide bar hidden (`display: none`); tilted stickers flattened; `0` pending/hidden reveal elements.
- **What could not be measured locally:**
  - Live Formspree submission end-to-end (intentionally did not submit a real form and local env has no `NEXT_PUBLIC_FORMSPREE_ID`).
  - Vercel Edge Lighthouse / Core Web Vitals field scores (run against the Vercel preview URL).
  - Note on GitHub Actions `CI/check`: fails only on 5 pre-existing `TS2307` static image imports in `app/(site)/**` and `components/home/**` because CI runs `tsc --noEmit` without generating `next-env.d.ts` first (zero errors in `app/mock-b/**` or `components/mock-b/**`).

## Open TODOs for Ryan

- [ ] **Formspree:** Confirm `NEXT_PUBLIC_FORMSPREE_ID` is set in the `rdev-studio` Vercel project and submit one test quote on `/mock-b/contact` in the preview to verify inbox delivery.
- [ ] **WhatsApp:** Confirm the pre-filled message text appended to `WHATSAPP_URL` (`components/mock-b/data.ts`).
- [ ] **Rondo:** Add the real live URL (currently linked to in-site section `/mock-b/work#rondo`) and confirmed public summary/stack.
- [ ] **Crosskennan & MGSL Hub:** Confirm exact studio summaries, years, and stack tags for `https://crosskennan.vercel.app` and `https://mgsl-hq-black.vercel.app` (note: MGSL Supabase backend remains paused and is not queried).
- [ ] **Assisi Animal Sanctuary:** Replace the "Preview held for sign-off" CSS mockup with real screenshots once the sanctuary approves public previews.
- [ ] **Copy review:** Check all studio-voice copy across `/mock-b`, `/mock-b/work`, `/mock-b/services`, and `/mock-b/contact`, especially the Google Business Profile wording and charity support wording (no prices shown).
