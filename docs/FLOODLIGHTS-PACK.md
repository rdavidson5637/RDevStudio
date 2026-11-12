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
| F8 | Showcase Stout Finder, ShelterLink and Draft Analyser | F7 |
| F9 | Take the football out of the studio pages | F8 |
| F10 | Move Paintball Wales further down | F8 |
| F11 | Finish the pages the redesign missed | F10 |
| F12 | Client-first nav and a tighter homepage | F11 |
| F13 | Trust: quotes slot, privacy notice, footer, code links | F12 |
| F14 | Audit the tools (report only, nothing deleted) | F11 |

**14 Oct, round 3:** a final tidy-up after comparing the site with real ones: local NI web designers ([Nybbled](https://nybbled.co.uk/), [ProfileTree](https://profiletree.com/services/web-design-belfast/)) and well-regarded one-person sites ([Lynn Fisher](https://lynnandtonic.com/), [Josh Comeau](https://www.joshwcomeau.com/), [Paco Coursey](https://paco.me/)). F11 to F14 go on the same branch, before you merge.

**14 Oct, round 2:** F1 to F7 are done on `design/floodlights` (7a92c88). Your feedback: mostly good, but too football-themed. The showcase should be Stout Finder, ShelterLink and the Draft Analyser, and Paintball Wales should sit further down the site. F8 to F10 handle that, on the same branch and still before merging.

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

## F8 Showcase Stout Finder, ShelterLink and Draft Analyser

```text
RDev Studio, design/floodlights branch. Read .design/brief.md. Homepage only: app/(site)/page.tsx and components/home.

Ryan's feedback on the redesign: the homepage leans too hard on football. The three things to show off are Stout Finder, ShelterLink and the Draft Analyser. Paintball Wales comes off the homepage.

New order: Hero, Things I've built, Client sites, What it costs, Games and side projects, How they're built, Questions people ask, Tell me what you need.

1. Hero (components/home/Hero.tsx):
   - Remove the Champions Draft pitch and its caption.
   - Keep the h1 "Websites for businesses and charities in Northern Ireland".
   - Paragraph: "I'm Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch. I build my own products too, and a few of them are below."
   - Buttons: "Get a quote" (to /contact) and "See what I've built" (text link to #built).
   - Right column: Ryan's photo (/images/ryan-davidson.jpg, moved here from TellMe), captioned "Ryan Davidson, Carrickfergus". next/image with priority, sizes and real alt text. On phones it goes under the text.
2. Things I've built (new component, id built). Three full-width rows alternating screenshot left and right, stacked on phones. Each row has a screenshot, the name as an h3, a line saying what it is, a line or two on how it works (this is for recruiters), the status in bold, and its links. Use this copy exactly:
   - Stout Finder.
     What: "A map of which UK pubs have Beamish, Guinness, Murphy's and the rest on, and when someone last checked."
     How: "Every pub in the UK from OpenStreetMap, a PostGIS nearby search, and reports that fade as they age so the map stays honest. Next.js and Supabase."
     Status: "Live at stoutfinder.com".
     Link: "Open Stout Finder" to https://stoutfinder.com (new tab, rel noopener noreferrer).
     Screenshot: copy ~/stoutfinder/docs/screenshots/pub-1280.png to public/images/work/stout-finder.png. If that path isn't there, take one with playwright from https://stoutfinder.com/pub/ownies-carrickfergus at 1280x800 and say so.
   - ShelterLink.
     What: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary." (as in lib/content/products.ts)
     How: "Started as my MSc dissertation at Queen's. Node.js, Express and MySQL."
     Status: "Ready for live use" (exactly. Never say Assisi uses it.)
     Link: "Read the case study" to /work/shelterlink.
     Screenshot: /images/work/shelterlink-admin-dashboard.png.
   - Draft Analyser.
     What: "FPL Draft squad board, projections and a start/sit optimiser."
     How: "A daily job pulls the FPL Draft API into Supabase, Claude picks injury news out of BBC and Guardian feeds, and Pusher updates the live board during a gameweek." Check each part against app/api/cron/README.md and lib/draft before using it, and drop any part that isn't true.
     Status: "Live".
     Links: "Open it" to /draft and "How it's built" to /draft/how-it-works.
     Screenshot: copy docs/screenshots/draft-1280.png to public/images/work/draft-analyser.png.
   Section heading "Things I've built". No tags, dots or arrows. One accent use at most: the status text stays chalk, not red.
3. Client sites (ClientWork.tsx): only RV's Cold Brew as a panel (screenshot, summary, status label exactly as in lib/content/products.ts), with the Assisi line next to it: "A new site and brand for Assisi Animal Sanctuary. Built - awaiting sign-off." Heading "Client sites". Remove paintball-wales from FEATURED.
4. What it costs: unchanged.
5. Games and side projects (Pitch.tsx: rename the component and file to SideProjects): heading "Games and side projects". Every live product except Stout Finder and Draft Analyser, so Champions Draft, Rugby Draft, Pub Quiz, Longest Word and Wardrobe AI, with their covers. The "Still being built" line stays.
6. How they're built (UnderTheHood.tsx): heading "How they're built". Content unchanged.
7. Tell me what you need (TellMe.tsx): Rudi's photo only (Ryan's moved to the hero), then the existing text and contact links.
8. Delete homepage components nothing renders: SelectedWork, SocialProofBar, PortfolioPlay, StatsRow and any others, but only after grepping that nothing outside components/home imports them. Don't touch anything /hire imports.

Done when: build, lint, typecheck and tests pass, one h1, nothing scrolls sideways at 390px, the three showcase links work, and npm run shots -- after-f8 still matches .shots/before for the live routes.
```

## F9 Take the football out of the studio pages

```text
RDev Studio, design/floodlights branch. Read .design/brief.md. Football belongs to the football games, not to the studio. Keep the colours and fonts. Remove the pitch theme around them.

1. .design/brief.md: describe the palette by colour, not as a pitch at night. Keep the variable names and values. Replace the homepage order with F8's. Add a rule: "Football imagery and wording only appear on the football games themselves (their covers, names and taglines). Never in studio headings, copy, icons or link previews."
2. Copy sweep across studio pages, components/home, components/layout, components/ui and lib/constants.ts (skip game taglines, game routes, /draft, /wardrobe-ai and /hire): grep -i for pitch, on the pitch, kick, kick-off, full time, matchday, half time, squad, line-up, XI, scoreboard, fixture, programme, extra time, transfer. Rewrite each hit plainly. Show old and new for every change.
3. The price panel: keep its look (board colour, big numbers) but rename the component and any "scoreboard" class or comment to PriceList. No sports wording.
4. Icon: replace the centre-circle mark in app/icon.svg and the apple icon with a plain "RD" in Big Shoulders 800, chalk on night, with a small kit-red bar under the D. Make sure it's legible at 16px; if it isn't, use just "R".
5. Link previews (lib/og-studio.tsx): remove the chalk pitch line. Use a plain chalk rule and the kit-red bar from the icon instead.
6. Remove any leftover hero pitch animation and its CSS (the players moving into position), since the hero no longer has a pitch.
7. The football games' own covers stay exactly as they are.

Done when: build, lint, typecheck and tests pass, the grep returns nothing outside game names and taglines (paste the final grep), and every copy change is listed old and new.
```

## F10 Move Paintball Wales further down

```text
RDev Studio, design/floodlights branch. Read .design/brief.md. Ryan doesn't want the Paintball Wales site front and centre. Keep it on the site, lower down. Don't delete its case study or break its URL.

1. Homepage: no Paintball Wales anywhere (F8 removed it from ClientWork. Check nothing else on / renders it).
2. lib/constants.ts: remove paintball-wales from HOME_PROJECT_IDS. Remove it from SOCIAL_PROOF_ITEMS only if something outside /hire renders that list. Leave PROJECTS as it is, because /hire uses it and /hire is off-limits.
3. /work (app/(site)/work/page.tsx): client work in this order: ShelterLink, RV's Cold Brew, Assisi. Then, after the games and experiments, one section headed "Earlier work" with Paintball Wales and the concept builds as compact ruled rows: name, one line, a link to the case study. No big screenshots there.
4. The RV's Cold Brew case study links to /work/paintball-wales as the next case study. Point it at /work/shelterlink instead, and check the other case studies' next links still make a sensible loop.
5. /work/paintball-wales stays live, unchanged except for the shared styling it already has, and stays in the sitemap.
6. Grep for paintball across app/, components/ and lib/ and list every remaining place it appears with a one-word reason (case study, earlier work, hire, sitemap).

Done when: build, lint, typecheck and tests pass, / has no Paintball Wales, /work shows it only under "Earlier work", and its case study URL still returns 200.
```

## F11 Finish the pages the redesign missed

```text
RDev Studio, design/floodlights branch. Read .design/brief.md. Some pages still carry the old matchday programme look or lean on a CSS override layer.

1. app/not-found.tsx is still the old design: paper background, Anton "404", the label "FULL TIME WHISTLE" and "Looks like this page got sent off". Rebuild it in Floodlights: night background, the shared header and footer, h1 "That page isn't here", one line ("It may have moved, or the link was wrong."), a "Back to the homepage" button and links to Work and Contact. No football wording.
2. app/(site)/error.tsx: the same look. h1 "That didn't load", a "Try again" button calling reset() and a link home.
3. app/(site)/about/page.tsx has a section headed "Off the pitch". Rename it plainly (e.g. "Away from the desk") and show old and new.
4. Old tokens: the case studies (work/*), about, error and the (site) layout still use the old paper classes (text-primary, text-secondary, bg-raised, border-border, shell-label, font-display) and only look right because of the .studio-page overrides in app/globals.css (around lines 898 to 960). Replace those classes in every studio page with the studio tokens directly (text-studio-text, text-studio-muted, bg-studio-surface, border-studio-line and so on), then delete the override block. The (site) layout wrapper should use bg-studio-bg, not bg-paper. Don't touch the game routes, /hire, /draft or /wardrobe-ai, which may still use the paper tokens. Check with a grep that nothing outside those uses them.
5. Page titles: the homepage title should say what and where: "Web design for NI businesses and charities | RDev Studio, Carrickfergus". /services is titled "Work with me": change it to "Prices and services". Keep the template "%s | RDev Studio" everywhere else. Every page keeps its own meta description, and the homepage one names Carrickfergus and Northern Ireland.

Done when: build, lint, typecheck and tests pass, a made-up URL shows the new 404 with a 404 status, the override block is gone, and every studio page looks the same as before at 390px and 1280px (compare with npm run shots plus the studio pages you add to it).
```

## F12 Client-first nav and a tighter homepage

```text
RDev Studio, design/floodlights branch. Read .design/brief.md.

The best one-person sites are short and every section has one job. Ours has eight homepage sections and a nav that leads with Games.

1. Header nav (SHELL_NAV_LINKS in lib/constants.ts): Work, Prices, About, Projects, then the "Get a quote" button. Games and Tools come out of the main nav (Games stays reachable from the homepage section and /projects, Tools from the footer). Change labels and links only. Every URL keeps working.
2. Footer: three short groups. The studio (Work, Prices, About, Contact), Things I've made (Projects, Games, Tools, Stout Finder), and Get in touch (email, WhatsApp, GitHub). One line underneath: "RDev Studio is Ryan Davidson, Carrickfergus, Northern Ireland." No monospace, no capitals.
3. Homepage: move "How they're built" off the homepage into /projects, under the project list. The homepage then runs: Hero, Things I've built, Client sites, What it costs, Games and side projects, Questions people ask, Tell me what you need.
4. FAQ: keep it to the five questions a business owner asks most: cost, payments, who owns the site, what happens after launch, and whether charities pay. Move any others to /services. Keep the FAQ JSON-LD in sync with what's shown.
5. Check the homepage at 1280px: the hero plus the first showcase row should be visible within about one and a half screen heights. If the hero is taller than one screen, tighten the spacing; don't shrink the type below the brief's scale.

Done when: build, lint, typecheck and tests pass, every old nav URL still returns 200, and the live-route shots match .shots/before.
```

## F13 Trust: quotes slot, privacy notice, footer, code links

```text
RDev Studio, design/floodlights branch. Read .design/brief.md. Local competitors win trust with client quotes, reviews and plain business details. Add the places for those, without inventing anything.

1. Quotes: add lib/content/testimonials.ts exporting an empty array of { quote, name, business, href? }. Add a "What clients said" block to the homepage (after Client sites) and to each matching case study. It renders nothing at all while the array is empty. When it has entries, show the quote as plain text in Atkinson with the name and business underneath. No stars, no photos of people, no invented content. Add a comment in the file saying only real quotes, with permission, go in it.
2. Privacy notice at /privacy, linked from the footer and from under each contact form ("How I use what you send"). Plain English and accurate to what the code actually does. Read the code to confirm each point before writing it:
   - contact and bug report forms go to Formspree and reach Ryan by email
   - Vercel Web Analytics counts page views without cookies (check the @vercel/analytics setup to confirm)
   - the games store only what they need to run (Pusher rooms, Upstash for the quiz, Supabase for the Draft Analyser, localStorage for Longest Word)
   - how to ask for anything to be deleted: email ryan@rdevstudio.co.uk
   Don't add a cookie banner unless the code sets non-essential cookies. If it does, list them and stop.
3. Showcase code links (F8's "Things I've built"): a "Code on GitHub" link for the Draft Analyser to https://github.com/rdavidson5637/RDevStudio/tree/main/lib/draft, since that repo is public. Leave Stout Finder and ShelterLink without code links for now; Ryan will say if those repos go public.
4. Contact page and the homepage's last section: say what happens after someone gets in touch, using only what's already true on the site: "I'll reply myself, ask a few questions about what you need, then send a fixed quote." No response-time promise unless lib/constants.ts has a REPLY_TIME value, which stays unset until Ryan gives one.

Done when: build, lint, typecheck and tests pass, /privacy renders and is in the sitemap, the quotes block is invisible with an empty array (show me a test or a render check), and nothing on the site claims anything the code doesn't do.
```

## F14 Audit the tools (report only, nothing deleted)

```text
RDev Studio, design/floodlights branch. Report only: no code changes in this prompt.

/toolkit has 15 tools and /interactive has 9. A curated handful of good tools helps; two dozen of mixed quality makes a portfolio look padded.

1. For every route under app/(site)/toolkit and app/(site)/interactive: load it on npm run build && npm run start, try its main action once with harmless sample input (don't submit anything that emails Ryan or calls a paid API more than once), and note: works / broken / partly works, any console errors, whether it calls an external or AI API (and which env var it needs), and whether it looks right in Floodlights.
2. Give me a table: tool, route, status, external calls, and your call on each (keep, fix, or hide from the index). Judge it as a small business owner and as a recruiter: does it do something useful and do it properly?
3. Propose what /toolkit and /interactive should list. Hiding means removing a tool from the index and sitemap, not deleting the route.

Done when: I have the table and the proposal. Change nothing until I reply.
```

Then push the branch, check the Vercel preview on your phone, and merge when you're happy.

---

## For you, not Cursor

- **Get two or three real quotes** for F13's slot: a line each from RV's Cold Brew, Tony at Paintball Wales and whoever you deal with at Assisi, with their OK to use their name. Quotes are the biggest thing your local competitors have that you don't.
- **Google Business Profile reviews:** once the profile is set up, ask the same people to leave a review there too.
- **How long a site takes:** if you give a real typical timeline, Cursor can add it to /services. ProfileTree publishes theirs; yours shouldn't be a guess.
- **Stout Finder's repo:** its README is written for recruiters, but the repo is private. If you want it public, check the git history for any committed keys first, then flip it and add a code link.
- **ICO fee:** businesses that handle personal data (contact form messages count) usually need to pay the ICO's data protection fee unless exempt. Check the ICO's self-assessment before the privacy page goes live.
- ~~Merge `polish/v2` first.~~ Done 14 Oct.
- **After F7:** open the Vercel preview on your phone and click through the homepage, a case study, /services and /contact, plus each game, before merging `design/floodlights`.
- **Then regenerate the README screenshots** with `npm run screenshots`, so GitHub shows the new look.
- **Update your Claude project instructions.** The Design system section still says `#0A0A0F`, amber and DM Serif, and the stack says Next.js 14. Replace them with:

  > Design system (Floodlights, Oct 2026): background night #0F2219, panels turf #173528, text chalk #EEF2EA, one accent kit red #E5402F used sparingly. Big Shoulders Display for headings, Atkinson Hyperlegible for body, no monospace. No all-caps labels, middle dots, pill tags, status dots or scroll fades. The full brief is in .design/brief.md in the repo. Stack: Next.js 15 App Router.
