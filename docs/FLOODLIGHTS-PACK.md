# RDev Studio: Floodlights redesign pack - 14 Oct 2026

You picked direction C from the mockups: night-pitch green, chalk lines, one kit red and stadium type. The game covers stay. The mockup is the "RDev Studio, less AI" canvas in Claude, artboard "C. Floodlights".

**Before you start:** merge `polish/v2` into main and pull. Those commits fix the contact forms and must ship first. Then run these in `~/dev/rdevstudio`, one prompt per new Cursor Agent chat, in order, committing before each. You can also tell Cursor "run F3 from docs/FLOODLIGHTS-PACK.md".

Everything happens on a `design/floodlights` branch, and nothing is merged until you've checked the Vercel preview on your phone.

| # | What | Needs first |
| --- | --- | --- |
| F1 | Brief, rules and "before" shots of the live games | polish/v2 merged |
| F2 | New palette and fonts | F1 |
| F3 | Strip out the AI furniture | F2 |
| F4 | Covers in chalk | F2 |
| F5 | Homepage rebuild | F3, F4 |
| F6 | Inner pages | F5 |
| F7 | Link previews, icon and final checks | F6 |

---

## F1 Brief, rules and "before" shots of the live games

```text
RDev Studio. Start of the Floodlights redesign. No UI changes in this prompt.

Ryan picked a new look for the studio pages from three mockups. It's called Floodlights: night-pitch green, chalk lines, one kit red and stadium type. The aim is a site that reads as made by a person, not generated.

1. Branch: git checkout main && git pull && git checkout -b design/floodlights
2. Write .design/brief.md (design-standards.mdc already tells Cursor to read it first). Contents:
   Palette, as CSS variables, values exact:
   - night #0F2219: page background
   - turf #173528: panels and image frames
   - turf-raised #1D4031: hover and raised panels
   - board #0A1912: the price scoreboard only
   - chalk #EEF2EA: text and pitch lines
   - chalk-soft #C9D6CD: secondary text
   - chalk-faint #B7C6BC: captions
   - line rgba(238,242,234,0.18) for rules, line-strong rgba(238,242,234,0.35), cover-line rgba(238,242,234,0.5)
   - kit #E5402F: the one accent. Primary button, the highlighted player or ball in a cover, one highlight per page. kit-hover #C9321F
   Type: Big Shoulders Display 800 for h1, h2 and big numbers, sentence case. Atkinson Hyperlegible 400 and 700 for everything else. Two families only. No monospace anywhere on studio pages.
   Homepage order: hero (headline, one paragraph, Get a quote, the Champions Draft pitch drawing), Sites I've built, What it costs (the scoreboard) and the four steps, On the pitch (the games), How the games work, Questions people ask, Tell me what you need (photos of Ryan and Rudi, contact).
   Banned, because they're why the old site read as AI: all-caps labels or eyebrows above headings, monospace labels, strings joined with middle dots, pill tech tags, status dots, corner arrows on cards, underlines on single headline words, grid-line or glow backgrounds, noise textures, fade-up on scroll, identical card grids for everything, two-part slogan headings ("Four steps, no surprises.").
   Keep: the code-drawn covers and their hover motion. They're the best thing on the site.
3. Update .cursor/rules/rdev-polish.mdc: replace the Design line with the Floodlights palette and fonts above, and allow those two fonts and those tokens (its current "no new fonts or colour tokens" line would block this redesign). Keep every other rule exactly. Replace DESIGN.md's old matchday programme content with a short pointer to .design/brief.md.
4. Add scripts/route-shots.ts (playwright is already a dev dependency). It screenshots /champions-draft, /rugby-draft, /pub-quiz, /games/longest-word, /draft, /wardrobe-ai and /hire at 390x844 and 1280x800, against SHOTS_BASE (default http://localhost:3000), into .shots/<label>/, where label is a CLI argument. Add .shots/ to .gitignore and an npm script "shots".
5. npm run build && npm run start, then npm run shots -- before. Later prompts compare against these so the live games don't change.

Done when: lint, typecheck and tests pass, .shots/before holds 14 images, and the brief and rules are committed.
```

## F2 New palette and fonts

```text
RDev Studio, design/floodlights branch. Read .design/brief.md first. Swap the studio palette and fonts.

Where things live: the studio colours are --color-studio-* in app/tokens.css, used through tailwind.config.ts (studio.*, amber.*, and the studio-display, studio-sans and studio-mono font families) and app/globals.css. Fonts load in app/layout.tsx through next/font/google: DM_Serif_Display, Geist and Geist_Mono as --font-studio-display, sans and mono. Anton and Space_Mono are older and may still be used by game pages.

1. Change the --color-studio-* values to the brief: bg night, surface turf, surface-2 turf-raised, text chalk, muted chalk-soft, faint chalk-faint, line, line-strong, border and border-strong from the brief's line values, amber to kit, amber-hover to kit-hover, amber-soft rgba(229,64,47,0.14). Add --color-studio-board and --color-studio-cover-line. Rename the amber Tailwind keys to accent (studio.accent, accent.hover, accent.soft) and update every usage, so nothing called amber is red. Remove amber-glow and the amber-glow shadow.
2. Fonts: load Big_Shoulders_Display (700, 800) and Atkinson_Hyperlegible (400, 700) with next/font/google as --font-studio-display and --font-studio-sans. Stop using DM Serif Display, Geist and Geist Mono on studio pages. Before removing any font import, grep for its variable. If a game route or lib/og-studio.tsx still uses it, leave it and say so (F7 redoes the link previews). Point studio-mono at the sans, so nothing on a studio page renders in monospace.
3. globals.css: remove the grid-line background, the glow and the noise texture from studio pages. Focus ring 2px solid chalk with a 3px offset. ::selection kit at 35% with chalk text. html and body background night.
4. Work out the contrast with the real values and list the ratios: chalk, chalk-soft and chalk-faint on night and on turf, and chalk on kit for the button (at least 3:1 at 18px bold, 4.5:1 below that, so set the button text size to match).
5. Live routes: npm run build && npm run start && npm run shots -- after-f2, then compare with .shots/before. The body of every live route must look the same; the shared header and footer may change. If a game route's background or text changed because it relied on the old body colours, pin its old values on that route's own wrapper. Never edit the game's own components to do it.

Done when: build, lint, typecheck and tests pass, the contrast list is in your reply, and you've listed each live route as "unchanged" or said what you pinned.
```

## F3 Strip out the AI furniture

```text
RDev Studio, design/floodlights. Read .design/brief.md. Shared studio components first, then every studio page that uses them. Don't touch the game routes, /draft, /wardrobe-ai, /hire or anything only they import. Check a shared component's imports before editing it.

1. components/ui/Section.tsx, SectionHeader, SectionHeading and PageHeader: stop rendering eyebrows, then remove the eyebrow prop from every caller. Headings in Big Shoulders, sentence case.
2. StatusBadge: no dot, no capitals, no monospace. Plain words in chalk-soft, using client status labels exactly as written.
3. Card, ProjectCard and the product card: remove pill tech tags and corner arrows. The whole card is the link. Turf panel, 6px radius, no border glow, no shadow. Hover changes the panel to turf-raised and nothing else.
4. The reveal, stagger and status motion primitives: remove the fade-up on scroll everywhere. Keep the covers' own hover motion, plus at most one hero moment (the pitch players moving into position once on load), with prefers-reduced-motion respected.
5. Copy furniture on studio pages: replace middle-dot strings with a sentence or separate lines, remove underlines on single headline words, and replace slogan headings with plain ones. Use these: "Sites I've built", "What it costs", "How it works", "On the pitch", "How the games work", "Questions people ask", "Tell me what you need". For any other heading or label you change, show old and new.
6. Header: "RDev Studio" in Big Shoulders 800, links in Atkinson with no capitals or monospace, one kit-red "Get a quote" button. Footer: the same fonts, no monospace line.
7. Grep the studio pages and components for: uppercase, tracking-wide, tracking-wider, tracking-widest, font-studio-mono, " · ", "→", "↗", rounded-full pill classes and animate-. Fix what's left. Report the counts before and after.

Done when: build, lint, typecheck and tests pass, npm run shots -- after-f3 matches before for every live route, and you've given me the grep counts and every heading and label change, old and new.
```

## F4 Covers in chalk

```text
RDev Studio, components/covers. Read .design/brief.md. Keep every cover's drawing and hover motion. This is a recolour plus two fixes.

1. CoverFrame: turf background, no noise class, lines in cover-line (chalk at 50%), faint marks in chalk at 30%, the hot element in kit red. Keep the 16/10 aspect and aria-hidden.
2. Player dots and letters in chalk. The one highlighted player, ball, answer bar, word path or line in kit red. Exactly one red thing per cover.
3. StoutFinderCover draws its map pins as hearts. Replace them with small pint glasses (a tapered glass outline), keeping the same positions. The hot one is filled kit red with a chalk head and keeps its ripple.
4. LongestWordCover and PubQuizCover draw letters in the mono font. Switch them to Big Shoulders 800.
5. Check every cover at 390px and 1280px on /, /games and /projects, and again with reduced motion on.

Done when: build and lint pass and you've described each cover after the change.
```

## F5 Homepage rebuild

```text
RDev Studio, app/(site)/page.tsx and components/home. Read .design/brief.md. Rebuild the homepage to match the Floodlights mockup. Content stays real: client names, summaries and status labels exactly as in lib/content/products.ts, prices from lib/constants.ts and WorkWithMe.tsx.

The page renders today: Hero, LiveStrip, ClientWork, UnderTheHood, WorkWithMe, HomeProcess, HomeFaq, ClosingCta. The new order puts client work before the games; Ryan approved the mockup with this order.

1. Hero, two columns, stacked on phones.
   - h1: "Websites for businesses and charities in Northern Ireland"
   - Paragraph: "I'm Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch. The games I make for my mates are on the pitch."
   - "Get a quote" (kit-red button to /contact) and "Pick a game" (text link to #games)
   - Right: the Champions Draft pitch as a large drawing. Reuse ChampionsDraftCover's geometry at hero size, with full pitch markings including the six-yard boxes, ten chalk players and one red. Caption "Champions Draft. Spin squads, draft your XI." linking to /champions-draft.
2. Sites I've built: RV's Cold Brew, Paintball Wales and ShelterLink as three turf panels, each with its screenshot (the images are already referenced in lib/content/products.ts), name, summary and its status label in bold. Under the row, one line: "Also: a new site and brand for Assisi Animal Sanctuary. Built - awaiting sign-off."
3. What it costs, two columns, stacked on phones.
   - Left, the scoreboard: a board-coloured panel with ruled rows for Website (£650, "from"), Care plan (£30, "a month", with "Hosting, security updates, small changes" under the name), Social media (£150, "a month, from") and Content (£200, "a project, from"). Prices in Big Shoulders 800 at about 44px, the small words in Atkinson. Make it a shared component; F6 reuses it on /services.
   - Right: the h2, "Half up front, half when it goes live. The domain, the content and the code are yours.", then a line with a 3px kit-red left rule: "Registered charities get every package free. Say you're registered when you get in touch."
   - Under both: HomeProcess's four steps as a short ruled list with its existing copy. They really are a sequence, so step numbers are fine here.
4. On the pitch (id games): a three-column grid (one column on phones) of every live product in lib/content/products.ts, each with its cover, name and tagline. No tags, dots or arrows. "Soon" products go in one plain line underneath, not as cards.
5. How the games work: keep UnderTheHood's technical content (it's for recruiters), as ruled rows: a title, two lines, and which product it's in. No monospace.
6. Questions people ask: HomeFaq's existing content and its JSON-LD, as ruled rows using native details and summary.
7. Tell me what you need (id contact), replacing ClosingCta:
   - Ryan's photo, /images/ryan-davidson.jpg, captioned "Me. MSc Software Development, Queen's."
   - Rudi in the Arsenal scarf, captioned "Rudi, from Assisi Animal Sanctuary." The source is public/images/rudi/IMG_3177-*.png, which has black bars top and bottom from a phone screenshot. Make a cropped copy without them at public/images/rudi/rudi-scarf.jpg, using sharp if it's in node_modules; if it isn't, say so and use object-position instead.
   - The heading, then "A site, help with posting, or something that doesn't fit a package. I reply myself.", a "Get a quote" button to /contact, a WhatsApp link and the email.
   - next/image with sizes and real alt text for both photos.
8. Delete homepage components that are no longer rendered (LiveStrip and anything else), but only after grepping that nothing else imports them.

Done when: build, lint, typecheck and tests pass, the page has one h1, nothing scrolls sideways at 390px, and npm run shots -- after-f5 still matches before for every live route.
```

## F6 Inner pages

```text
RDev Studio. Read .design/brief.md. Bring the other studio pages into Floodlights: /services, /work and every case study under it, /about, /contact, /projects, the /games hub page, and the /toolkit and /interactive index pages. Not /hire, not the game routes, not /draft or /wardrobe-ai.

1. The same header and footer, one section spacing token, Big Shoulders headings, Atkinson body, turf panels, ruled rows for lists.
2. Each page keeps its content. Apply F3's bans, and show old and new for any heading or label you change.
3. Case studies: one full-bleed screenshot section each, captions in chalk-faint, and the client status label exactly as written.
4. /services: prices use the shared scoreboard component from F5.
5. /contact: the form is unchanged (Formspree action, method and field names), restyled only. WhatsApp and email visible.
6. Toolkit and interactive tools: restyle the index pages only. If a tool page breaks visually because it relied on the old tokens, pin its old look on its own wrapper and list it. Don't redesign it.

Done when: build, lint, typecheck and tests pass, scripts/smoke.ts passes against the local build, no listed page scrolls sideways at 390px, and the live-route shots still match before.
```

## F7 Link previews, icon and final checks

```text
RDev Studio. Read .design/brief.md. Finish the Floodlights redesign.

1. lib/og-studio.tsx and every opengraph-image.tsx: night background, chalk text in Big Shoulders 800, one kit-red mark, a chalk pitch line. Load the TTFs locally the way the current DM Serif and Geist Mono files in app/fonts are loaded, replacing them. Delete the old font files if nothing else uses them.
2. app/icon.svg and the apple icon: a chalk mark on night, such as a centre circle and spot. No amber.
3. Remove what's left of the old palette and fonts: grep for f59e0b, 0a0a0f, amber, DM_Serif, Geist, font-studio-mono, noise and glow. List anything left and why it stays.
4. Lighthouse mobile on /, /work, /services, /about and /contact, before (main) and after (this branch). Accessibility 95 or more on every page. Fix whatever it flags.
5. With prefers-reduced-motion on, nothing moves except on hover.
6. npm run shots -- final against the local build, and confirm every live route matches .shots/before.
7. Push the branch so Vercel builds a preview. Don't merge.

Done when: build, lint, typecheck, tests and smoke pass, and you've given me the Lighthouse table, the leftover grep and the live-route check.
```

---

## For you, not Cursor

- **Merge `polish/v2` first.** The forms fix shouldn't wait for a redesign.
- **After F7:** open the Vercel preview on your phone and click through the homepage, a case study, /services and /contact, plus each game, before merging `design/floodlights`.
- **Then regenerate the README screenshots** with `npm run screenshots`, so GitHub shows the new look.
- **Update your Claude project instructions.** The Design system section still says `#0A0A0F`, amber and DM Serif, and the stack says Next.js 14. Replace them with:

  > Design system (Floodlights, Oct 2026): background night #0F2219, panels turf #173528, text chalk #EEF2EA, one accent kit red #E5402F used sparingly. Big Shoulders Display for headings, Atkinson Hyperlegible for body, no monospace. No all-caps labels, middle dots, pill tags, status dots or scroll fades. The full brief is in .design/brief.md in the repo. Stack: Next.js 15 App Router.
