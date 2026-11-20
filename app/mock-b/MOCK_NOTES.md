# Mock B Notes: Editorial Warmth & Grenadine Palette

> Agent-written experimental mock for side-by-side comparison. Unverified until Ryan reviews the Vercel preview and copy. Keep draft PR #32 as a draft and do not merge into `main`.

## Design pass 20 Nov (Grenadine palette)

Ryan asked to drop the live-site pitch-green / cream tokens (`#1e5c3a` on paper) because they read as Assisi's colours, not his. This pass is colour-only: layout, doodle removal, and wording are unchanged. Every colour under `app/mock-b` and `components/mock-b` now comes from CSS variables in `app/mock-b/mock-b.css`. `app/tokens.css` and all live routes are untouched.

The mock is dark-first. Deep Slate Green is the page background, Naples Yellow is body text on dark (and the background of light contrast sections), Grenadine Pink is the accent (primary buttons and highlights), and Yellow Ocher is used for alerts and TODO boxes. Closing bands that were dark ink are now Naples so they still stand out on the slate page. Form inputs are Slate 2 with Naples text and a visible grenadine focus ring (slate ring on light sections).

## Design pass 20 Nov (Ryan feedback)

Ryan picked Mock B's direction but flagged that parts "scream AI" (doodles, uniform rounded cards everywhere, and off-brand colours). This pass removes all decorative illustrations, varies layouts across sections and routes, and (in that earlier pass) locked colours to the live brand tokens in `app/tokens.css`. Those live tokens have since been replaced by the Grenadine pack above:

- **Removed all doodles, decorative SVGs, and off-brand colours:**
  - Deleted `components/mock-b/CoastalDoodles.tsx` (Carrickfergus Castle badge/scene, gulls, boats, waves, sun, flags, wavy dividers, squiggle underlines, and decorative service icons) and moved only functional icons (`WhatsAppIcon`, arrows, external-link, menu/close) into `components/mock-b/icons.tsx`.
  - Removed terracotta, seaglass/teal, butter, radial gradient background blobs, tilted/wobbling sticker pills, chunky solid-offset shadows, hover lifts, and the coastal reading-progress tide track from `app/mock-b/mock-b.css` and `components/mock-b/WarmMotionController.tsx`.
  - Brand mark in the header is now a plain text wordmark (`RDev Studio` / `Carrickfergus, NI`) with no badge.
  - Palette now uses live tokens from `app/tokens.css` only (`--color-paper`, `--color-ink`, `--color-accent` / `--color-pitch`, `--color-accent-hover`, `--color-border`, `--color-border-strong`, `--color-muted`, `--color-text-tertiary`, `--color-bg-raised`, `--color-bg-overlay`, `--color-accent-muted`, `--color-accent-subtle`, `--color-border-accent`, `--color-focus-ring`, `--color-selection-bg`, `--color-text-inverse`). Zero mock-only hex/rgb values remain in `app/mock-b/**` or `components/mock-b/**`.
  - Radii tightened to `var(--radius-sm)` / `var(--radius-md)` (4-6px) or `0`; primary buttons are solid pitch green with white text (`--color-accent` / `--color-accent-hover`), secondary buttons are 1px outline, with visible `--color-focus-ring` focus indicators.
- **What changed per page (copy untouched, all TODOs preserved):**
  - **Layout (`app/mock-b/layout.tsx`, `MockBNav.tsx`, `LocalTimeChip.tsx`):** Plain text wordmark, underlined active nav state (no butter pills), minimal inline location/time + status dot metadata, clean 6px header buttons.
  - **Home (`app/mock-b/page.tsx`):** Open typographic hero (no castle doodle card) with hairlined audience strip; full-bleed ruled project rows on `--color-bg-raised` with real ShelterLink `next/image` screenshot and flat plain preview panels; `--color-bg-overlay` services section using a 2-column ruled list (no boxed cards or icon tiles) and 4-column numbered process steps; two-column About section with ruled definition list; high-contrast `--color-ink` closing quote band paired with a crisp `--color-bg-raised` `WarmQuoteForm` panel.
  - **Work (`app/mock-b/work/page.tsx`):** Ruled horizontal project jump bar; full-width featured ShelterLink showcase displaying all three real screenshots (`shelterlink-admin-dashboard.png`, `shelterlink.png`, `shelterlink-browse-shifts.png` via `next/image`); alternating 7/5 and 5/7 mixed-size editorial grid for Assisi, Crosskennan, Rondo, and MGSL Hub with flat live-token previews (no Rondo SVG diagram, no macOS coloured dots); dark `--color-ink` closing CTA band.
  - **Case studies (`app/mock-b/work/[slug]/page.tsx`):** Plain breadcrumb and metadata line; ruled 4-column facts-at-a-glance strip; unboxed full-width visual showcase; ruled editorial reading column (`01 Context`, `02 Delivery`, `03 Facts & gaps`) with left-accented architecture callout and clean dashed `TODO for Ryan` boxes; ruled sticky sidebar; ruled prev/next bar; dark `--color-ink` closing CTA band.
  - **Services (`app/mock-b/services/page.tsx`):** Ruled horizontal jump bar; full-width ruled service sections (no cards, no icon tiles); `--color-bg-overlay` 4-step numbered process band; ruled 2-column editorial FAQ list; dark `--color-ink` closing CTA band.
  - **Contact (`app/mock-b/contact/page.tsx`):** Open intro with `LocalTimeChip`, crisp `--color-bg-raised` quote form panel paired with a ruled aside (left-accented WhatsApp callout, direct email, plain scope checklist).

## Routes

All nine routes live exclusively under `app/mock-b/**` with scoped styles in `app/mock-b/mock-b.css`, `robots: { index: false, follow: false }`, and zero edits to live site files, `app/sitemap.ts`, or `package.json`:

- `/mock-b` - Studio home page: open editorial hero with local Carrickfergus time + availability status, five real studio projects as full-bleed ruled rows, ruled services list + four-step process, studio-only about block, and dark-band quote form + WhatsApp close.
- `/mock-b/work` - Mixed-size editorial five-project showcase with ruled jump links, ShelterLink's three real screenshots from `public/images/work/`, flat live-token desktop/mobile preview panels for Assisi, Crosskennan, Rondo, and MGSL Hub, and direct links to each `/mock-b/work/[slug]` case study (strictly facts-only).
- `/mock-b/work/[slug]` (5 static SSG pages via `generateStaticParams` + `dynamicParams = false`) - Dedicated facts-only case study pages covering **The problem**, **What was built**, **Stack & focus**, **Project status**, explicit **"TODO for Ryan"** callouts wherever facts are not stored in this repo, prev/next project navigation, and closing Quote (`?topic=...`) + WhatsApp CTAs:
  - `/mock-b/work/shelterlink` - ShelterLink (Assisi Animal Sanctuary volunteer web app)
  - `/mock-b/work/assisi` - Assisi Animal Sanctuary (website & brand rebuild, awaiting sign-off)
  - `/mock-b/work/crosskennan` - Crosskennan (`crosskennan.vercel.app` live preview + TODO markers)
  - `/mock-b/work/rondo` - Rondo (in-house studio build, live URL & details TODO markers)
  - `/mock-b/work/mgsl-hub` - MGSL Hub (`mgsl-hq-black.vercel.app` live preview + TODO markers)
- `/mock-b/services` - Dedicated plain-English services guide covering Websites, Web apps & handy tools, Google Business Profile help, and Charity & small-business builds (zero prices, facts-only, each ending with Quote form `?topic=...` prefill + WhatsApp CTAs, plus process steps and studio FAQs).
- `/mock-b/contact` - Dedicated quote & contact page with the `WarmQuoteForm` (using `FORMSPREE_FORM_ID` with graceful empty-ID email/WhatsApp fallback, blur/submit inline validation, `aria-describedby`, `aria-live`, focus-first-invalid, and sending/error/success states) paired with a WhatsApp callout, direct email, and helpful scope checklist.

## Palette (Ryan's Grenadine pack)

Declared once under `.mock-b-root` in `app/mock-b/mock-b.css`. No edits to `app/tokens.css`, `app/globals.css`, or `tailwind.config.ts`. No live-site tokens and no leftover hex/rgb outside this palette block.

| Token | Value | Role |
| :--- | :--- | :--- |
| `--mb-slate` | `#112F2C` Deep Slate Green | Page background, and text on every light colour (Naples, grenadine, ochre) |
| `--mb-naples` | `#FBE6A0` Naples Yellow | Text on the dark background, plus light section / closing-band backgrounds |
| `--mb-grenadine` | `#F48067` Grenadine Pink | Accent: main buttons and highlights on dark sections |
| `--mb-ochre` | `#E2B540` Yellow Ocher | Alerts, validation messages, and TODO boxes |
| `--mb-slate-2` | `#183E3A` Slate 2 | Panels, cards, form inputs |
| `--mb-slate-3` | `#1E4A45` Slate 3 | Hover states, raised / preview-chrome panels |
| `--mb-naples-muted` | `#CFC7A3` Naples muted | Secondary text on dark |
| `--mb-naples-faint` | `#B9B392` Naples faint | Captions and input placeholders on dark |
| `--mb-grenadine-light` | `#F79A85` Grenadine light | Accent / button hover |
| `--mb-grenadine-deep` | `#D75C42` Grenadine deep | Icons that sit on both dark and light backgrounds |
| `--mb-ochre-ink` | `#2C4A3A` Ochre ink | Muted text on ochre and on Naples light sections |
| `--mb-naples-line` / `--mb-naples-line-strong` | `#FBE6A0` at 18% / 35% | Hairline rules on dark |
| `--mb-slate-line` / `--mb-slate-line-strong` | `#112F2C` at 18% / 35% | Hairline rules on light sections |

Semantic helpers (`--mb-bg`, `--mb-ink`, `--mb-muted`, `--mb-surface`, `--mb-light`, `--mb-accent`, `--mb-link`, `--mb-icon`, `--mb-on-accent`, `--mb-focus-ring`) switch inside `.mb-on-light`, `.mb-on-surface`, and `.mb-todo-box` / `.mb-alert` so text stays readable when a section changes background.

**Contrast:** Naples, muted, and faint text all pass WCAG AA on slate / Slate 2 / Slate 3. Slate text on Naples, grenadine, and ochre passes AA (and is required on those fills). Grenadine text on Naples fails AA (2.08:1), so links and kickers on light sections use Deep Slate (with underline) instead of pink. Naples muted / faint also fail on Naples, so muted copy there uses ochre ink (7.88:1). Grenadine deep icons are 3.75:1 on slate and 3.08:1 on Naples - both meet the 3:1 UI-component bar, but are not used as body text.

## Fonts

Loaded via built-in `next/font/google` in `app/mock-b/layout.tsx` (zero new npm packages, self-hosted by Next.js at build time, `display: "swap"`):

- **Display:** `Big_Shoulders` weight 800 (Google's current family name for Big Shoulders Display; `adjustFontFallback: false`).
- **Body / UI:** `Atkinson_Hyperlegible` weights 400 and 700.

## Pro pass (20 Nov, D-RD lane / `lane/rd-mockb-pro`)

Premium studio finish on Ryan's chosen Mock B direction. Copy and TODOs untouched. Hex values unchanged. Scope: `app/mock-b/**`, `components/mock-b/**`, plus `docs/design-pro/mockb-pro/{before,after}` screenshots.

- **Type:** Big Shoulders 800 + Atkinson Hyperlegible 400/700; fixed scale tokens (`--mb-text-*`), tight display leading, body measure ~67ch, sentence-case kickers (no all-caps eyebrows).
- **Layout:** Wider shell (`max-w-6xl`), asymmetric home hero (type + ruled "Who this is for" column), one primary CTA per hero, WhatsApp demoted to text/icon, numbered sections, hairline rules, 8px rhythm, 2-4px radii.
- **Imagery:** Larger ShelterLink screenshots with 16:9 / 16:10 crops, frame chrome captions, no monospace URL bars, no status dots.
- **Motion / a11y:** Opacity-only reveals (220ms), off under `prefers-reduced-motion`; visible focus rings; 44px targets; AA Grenadine contrast rules kept.
- **Checks:** `npm run lint`, `npx tsc --noEmit`, `npm test` (64/64), `npm run build` all pass. Screenshots at 390 and 1280 in `docs/design-pro/mockb-pro/`.

## Pro pass 2 (20 Nov, refine / same PR #35)

Tighter quality pass on the same Mock B routes. Copy, TODOs, and Grenadine hex values still untouched.

- **Type consistency:** Section titles use `mb-h2` / `mb-h3` instead of ad-hoc `text-3xl sm:text-4xl`; ledes use `mb-lede` / `mb-body`; captions and form labels use `mb-caption` / `mb-label`.
- **Banned AI tells removed:** Dropped single-word grenadine highlights in contact and services headlines (design brief bans accented single headline words).
- **Contact:** Asymmetric form + aside (1.35/0.65), one grenadine primary in the hero (Jump to form); WhatsApp aside demoted to secondary-inverse; helpful notes as ruled rows.
- **Work:** Featured ShelterLink on a surface band with asymmetric title/CTA row and full-width real screenshots; projects 02-05 on page bg for rhythm; shared `mb-meta` / `mb-jump-link` / `mb-back-link` utilities.
- **Spacing:** `mb-page-intro` and `mb-section-pad` for consistent 8px-based section rhythm across routes.
- **QA:** No horizontal overflow at 390; visible interactive targets >= 44px (skip link excluded). Shots in `docs/design-pro/mockb-pro/pass2-before/` and `pass2-after/`.

## Pro pass 3 (20 Nov, refine / same PR #35)

Tighter CTA hierarchy and mobile rhythm. Copy, TODOs, and Grenadine hex values still untouched.

- **One accent action per view:** Demoted WhatsApp / secondary live links from outline buttons to `mb-text-link` wherever a grenadine primary already sat (work featured + closing, services sections + closing, case-study hero / sidebar / closing).
- **No pill clusters:** Project stack tags render as slash-separated `mb-stack` captions on home, work, and case studies.
- **Form:** Inputs use raised fill against Slate 2 panels so fields read clearly; contact form uses `mb-section-pad` and a slightly wider form column.
- **360 / 390:** Header and mobile nav tightened; jump-bar labels truncate on narrow viewports; case visual preview uses a ruled title/caption grid.
- **QA:** Shots in `docs/design-pro/mockb-pro/pass3-before/` and `pass3-after/` (360, 390, 1280).

## Open TODOs for Ryan

- [ ] **Formspree:** Confirm `NEXT_PUBLIC_FORMSPREE_ID` is set in the `rdev-studio` Vercel project and submit one test quote on `/mock-b/contact` in the preview to verify inbox delivery.
- [ ] **WhatsApp:** Confirm the pre-filled message text appended to `WHATSAPP_URL` (`components/mock-b/data.ts`).
- [ ] **ShelterLink (`/mock-b/work/shelterlink`):** Add an approved client quote from Assisi Animal Sanctuary, verified live usage numbers (if any), and exact go-live date beyond `2025-26`.
- [ ] **Assisi Animal Sanctuary (`/mock-b/work/assisi`):** Swap in real screenshots and the live URL once Assisi signs off; confirm technical stack, completion year/date, and any post-launch quote/result.
- [ ] **Crosskennan (`/mock-b/work/crosskennan`):** Add confirmed problem statement, delivered features, exact tech stack beyond Vercel, build year/date, approved screenshots from `crosskennan.vercel.app`, and any verified quote/result.
- [ ] **Rondo (`/mock-b/work/rondo`):** Add the real public URL (currently links in-site to `/mock-b/work/rondo`), confirmed plain-English problem & feature write-up, tech stack, build date, screenshots, and outcomes.
- [ ] **MGSL Hub (`/mock-b/work/mgsl-hub`):** Add confirmed problem & audience summary, delivered features, exact tech stack beyond Vercel (without exposing private infra IDs; Supabase remains paused and unqueried), build date, screenshots from `mgsl-hq-black.vercel.app`, and any verified quote/result.
- [ ] **Copy review:** Check all studio-voice copy across `/mock-b`, `/mock-b/work`, `/mock-b/work/[slug]`, `/mock-b/services`, and `/mock-b/contact`, especially Google Business Profile wording and charity support wording (zero prices shown).
