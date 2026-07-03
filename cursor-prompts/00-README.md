# RDev Studio - Cursor prompt pack

Sequenced prompts to fix issues and add features. Run in order in Cursor.

## Analysis summary

Strong, mature site: Next 15, App Router with `(site)` and `(game)` groups,
a clean `createPageMetadata` helper, Formspree, Vercel Analytics, sitemap and
robots already in place. It hosts the games (Champions Draft, Rugby Draft,
Pub Quiz) as first-class routes. The bones are good.

Issues found:

1. **OG image is an SVG** (`public/images/og/og-image-slot.svg`). LinkedIn,
   Facebook and X do not render SVG Open Graph images, so shared links show no
   preview. For a site aimed at recruiters and clients this is a real miss.
   -> Prompt 01.
2. **No structured data.** A portfolio aimed at hiring managers should expose
   `Person` + `WebSite` JSON-LD so Google can build a knowledge panel and
   understand who Ryan is. -> Prompt 02.
3. **Duplicate " 2" files everywhere** (Finder/iCloud artifacts), some risky:
   `lib/games-catalog 2.ts` differs from the original, `coming-soon-projects 2.ts`
   and `coming-soon-roadmap 2.ts` have NO non-" 2" original, and there's a stale
   `.git/refs/heads/main 2.lock`. Needs careful cleanup, not blind deletion.
   -> Prompt 03.
4. **Small copy issues fixed directly (already done):** em dashes removed from
   the home + contact copy and the metadata title template, per the no-em-dash
   rule. Also note: `lib/metadata.ts` OG alt text says "in Belfast" but the
   contact page says "Carrickfergus" - pick one. -> covered in Prompt 04.

## Order

1. `01-fix-og-image.md` - real PNG OG image so link previews work.
2. `02-person-structured-data.md` - JSON-LD for SEO / recruiter discovery.
3. `03-cleanup-duplicate-files.md` - remove the " 2" cruft safely.
4. `04-improvements-and-new-features.md` - feature backlog, pick what you want.
