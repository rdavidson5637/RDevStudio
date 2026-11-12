# RDev Studio: Grenadine pack

Run these in `~/dev/rdevstudio`, one prompt per new Cursor Agent chat, in order. Branch `design/grenadine` off `design/floodlights` (commit `7a92c88`, the end of F7). Do not start from `main`. That would rebuild work that is already on Floodlights.

Colour changes to Grenadine. Type stays Big Shoulders Display and Atkinson Hyperlegible.

F8 to F14 in `docs/FLOODLIGHTS-PACK.md` were written and not built. R2 to R4 do the parts of that plan this pack still wants. Nav is the exception: keep Games, Projects, Tools, Work with me.

Skills live in `~/.claude/skills`. Read them when a prompt names them. The project skill from R1 wins if a skill disagrees. Do not add noise, gradients, pill badges, fade-up, or scale-on-hover because a skill suggests them.

| # | What | Needs first |
| --- | --- | --- |
| R1 | Project skill, Grenadine tokens, before shots | floodlights branch |
| R2 | Homepage | R1 |
| R3 | Stout Finder and ShelterLink covers | R1 |
| R4 | Inner pages and More work | R2 |
| R5 | Games shell and /hire palette | R1 |
| R6 | Copy pass | R2, R4 |
| R7 | Checks | R3, R5, R6 |

Reference sites for layout ideas only. Do not copy their branding: [Lynn Fisher](https://lynnandtonic.com/), [Josh Comeau](https://www.joshwcomeau.com/), [Paco Coursey](https://paco.me/), [Nybbled](https://nybbled.co.uk/).

---

## R1 Project skill, Grenadine tokens, before shots

```text
RDev Studio. Start of the Grenadine redesign. Read ~/.claude/skills/redesign-existing-projects/SKILL.md and ~/.claude/skills/design-taste-frontend/SKILL.md, then follow this prompt where they disagree. No homepage rebuild in this prompt. No new npm dependencies.

1. Branch: git checkout design/floodlights && git pull && git checkout -b design/grenadine

2. Write .cursor/skills/rdevstudio/SKILL.md with YAML frontmatter name rdevstudio and a description that says to use it for any UI, copy or colour work on this site. Body, kept short:

   Palette, exact:
   - deep slate #112F2C page background, and the text on every light colour
   - naples #FBE6A0 text on the dark background, plus light sections
   - grenadine #F48067 the only accent: primary button, one highlight per page, the hot element in a cover
   - grenadine light #F79A85 accent hover
   - grenadine deep #D75C42 icons that sit on both dark and light
   - ochre #E2B540 price list and alerts
   - ochre ink #2C4A3A muted text on ochre
   - slate 2 #183E3A panels, cards, inputs
   - slate 3 #1E4A45 hover and raised panels
   - naples muted #CFC7A3 secondary text
   - naples faint #B9B392 captions, only if it passes AA on deep slate and on slate 2
   - line rgba(251,230,160,0.18), line-strong rgba(251,230,160,0.35), cover-line rgba(251,230,160,0.50)
   Text on grenadine or ochre is always #112F2C.

   Type: Big Shoulders Display 800 for h1, h2 and big numbers. Atkinson Hyperlegible 400 and 700 for everything else. Two families. No monospace on studio pages.

   Copy: plain NI English. No em dashes or en dashes. Banned: passionate, journey, seamless, leverage, crafting digital experiences, "I'd love to", synergy, elevate, unlock. No invented testimonials, stats, prices, client names or claims. Assisi status stays "Built - awaiting sign-off". ShelterLink status stays "Ready for live use". Never say Assisi uses ShelterLink. Never name Cosskeenan. RV's Cold Brew: do not claim working online ordering or payments.

   Guardrails: do not edit game UIs (/champions-draft, /rugby-draft, /pub-quiz, /games/longest-word, /draft, /wardrobe-ai). /hire is palette only, later. /stout-finder redirect stays. Contact forms stay on Formspree. One primary button. Hover changes colour only. prefers-reduced-motion. Project skill wins over design-taste and redesign-existing-projects. No noise, gradients, glow, pill badges, fade-up, or scale-on-hover.

3. Replace .design/brief.md with the Grenadine palette, the same type, and this homepage order: Hero, Things I've built (Stout Finder, ShelterLink, Draft Analyser), Client sites (RV's Cold Brew, plus the Assisi one-liner), What it costs, Games and side projects, Questions people ask, Tell me what you need. Keep the banned list already in the brief. Add: football wording only on the football games themselves. Nav stays Games, Projects, Tools, Work with me, plus one "Start a project" button. Do not use the F12 nav (Work, Prices, About, Projects).

4. In .cursor/rules/rdev-polish.mdc, replace only the Design bullet with the Grenadine tokens and the same two fonts. Keep every other rule.

5. Swap the studio palette in app/tokens.css. Keep the CSS variable names (--color-studio-bg and the rest) so call sites do not all change. New values:
   - bg #112F2C, bg-80 and bg-20 as that colour at 0.8 and 0.2
   - surface #183E3A, surface-2 #1E4A45
   - text #FBE6A0, muted #CFC7A3, faint #B9B392
   - line and border rgba(251,230,160,0.18); line-strong and border-strong rgba(251,230,160,0.35)
   - accent #F48067, accent-hover #F79A85, accent-soft rgba(244,128,103,0.14)
   - board #E2B540
   - cover-line rgba(251,230,160,0.50)
   Add --color-studio-on-accent #112F2C, --color-studio-ochre-ink #2C4A3A, --color-studio-accent-deep #D75C42.
   Replace --color-studio-live #22c55e with ochre. Do not add a new green.
   Button and anything on accent or board uses on-accent, not naples. Check app/globals.css where studio buttons set color to var(--color-studio-text) and point those at on-accent.
   Price list text is deep slate, muted bits ochre ink.

6. Measure contrast and list the ratios: naples, naples muted and naples faint on deep slate and on slate 2; deep slate on grenadine; deep slate on ochre; ochre ink on ochre. AA is 4.5:1 for body, 3:1 for 18px bold. If faint fails, lighten it toward naples until it passes and record the new hex in the brief and the skill. If deep slate on grenadine is under 4.5:1, set the primary button to at least 18px bold and say so.

7. scripts/route-shots.ts and npm run shots already exist. npm run build && npm run start, then npm run shots -- before. Routes: /champions-draft, /rugby-draft, /pub-quiz, /games/longest-word, /draft, /wardrobe-ai, /hire at 390x844 and 1280x800.

Done when: build, lint, typecheck and tests pass, .shots/before holds the images, the contrast list is in the reply, and this prompt is committed.
```

## R2 Homepage

```text
RDev Studio, design/grenadine. Read .cursor/skills/rdevstudio/SKILL.md and .design/brief.md. Read ~/.claude/skills/design-taste-frontend/SKILL.md for layout judgement only. The skill wins on colour, type and the banned list. Rebuild the homepage. F8 and F12 in docs/FLOODLIGHTS-PACK.md describe the order. They were not built (HEAD of floodlights was F7). Do not change the nav to F12's Work, Prices, About, Projects.

Files: app/(site)/page.tsx and components/home. Content stays real. Status labels from lib/content/products.ts. Prices from lib/constants.ts (PRICE_WEBSITE_GBP 650, PRICE_CARE_PLAN_GBP 30, PRICE_SOCIAL_GBP 150, PRICE_CONTENT_GBP 200).

Order: Hero, Things I've built, Client sites, What it costs, Games and side projects, Questions people ask, Tell me what you need.

1. Hero, two columns, stacked on phones.
   - h1: "Websites for businesses and charities in Northern Ireland"
   - Paragraph: "I'm Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch. I build my own products too, and a few of them are below."
   - One primary button: "Start a project" to /contact. One text link: "See what I've built" to #built. No second button.
   - Right: the graduation photo at public/images/ryan-davidson.jpg (confirm the path; if the file name differs, use the real one). next/image, priority, sizes, alt "Ryan Davidson, graduation photo". Caption "Ryan Davidson, Carrickfergus".
   - No pitch drawing in the hero.

2. Things I've built, id built. Three rows, screenshot and text alternating, stacked on phones. Heading "Things I've built". No tags, dots, arrows or pills. Status in bold naples, not grenadine.
   - Stout Finder. What: "A map of which UK pubs have Beamish, Guinness, Murphy's and the rest on, and when someone last checked." How: "Every pub in the UK from OpenStreetMap, a PostGIS nearby search, and reports that fade as they age so the map stays honest. Next.js and Supabase." Status: "Live at stoutfinder.com". Link: "Open Stout Finder" to https://stoutfinder.com, new tab, rel noopener noreferrer. Screenshot: copy ~/stoutfinder/docs/screenshots/pub-1280.png to public/images/work/stout-finder.png. If that path is missing, take one with playwright from https://stoutfinder.com/pub/ownies-carrickfergus at 1280x800 and say so.
   - ShelterLink. What and status exactly as lib/content/products.ts. Do not say Assisi uses it. How: "Started as my MSc dissertation at Queen's. Node.js, Express and Postgres." Check package.json in the ShelterLink repo before writing the database name. If you cannot check, use the products.ts summary only and skip the how-line. Link: "Read the case study" to /work/shelterlink. Screenshot: /images/work/shelterlink-admin-dashboard.png if it exists.
   - Draft Analyser. What: "FPL Draft squad board, projections and a start/sit optimiser." How: check app/api/cron/README.md and lib/draft. Only write what those files support. Status: "Live". Links: "Open it" to /draft and "How it's built" to /draft/how-it-works if that route exists. Screenshot: copy docs/screenshots/draft-1280.png to public/images/work/draft-analyser.png if the source exists.

3. Client sites. One panel: RV's Cold Brew, screenshot, summary and statusLabel exactly as products.ts. Do not claim online ordering or payments. Beside or under it, one line: "A new site and brand for Assisi Animal Sanctuary. Built - awaiting sign-off." Use the statusLabel string from products.ts if it differs. Heading "Client sites". No Paintball Wales on the homepage. Do not name Cosskeenan.

4. What it costs. Ochre board (#E2B540), text #112F2C, muted #2C4A3A. Big numbers: £650 build, £30 a month care. Under the board, one sentence using the constants: social from £150 a month, content from £200. Heading "What it costs". Do not say scoreboard in the visible copy. No four-card grid.

5. Games and side projects. Heading "Games and side projects". Champions Draft, Rugby Draft, Pub Quiz, Longest Word and Wardrobe AI, with their existing covers. Stout Finder and Draft Analyser stay in Things I've built, not repeated here. Keep any "still being built" line that already exists for Guitar Lab and Gig Radar. Do not invent new tools.

6. Questions people ask. Keep the five a business owner asks: cost, payments, who owns the site, what happens after launch, charities. If more exist, move them to /services. Keep FAQ JSON-LD in sync. Move "How they're built" off the homepage onto /projects, under the list. Do not delete that content.

7. Tell me what you need. Rudi's photo only (Ryan is in the hero). Caption already used: "Rudi, from Assisi Animal Sanctuary." Contact links that already exist. No new promise about reply time.

8. Header: labels from SHELL_NAV_LINKS stay Games, Projects, Tools, Work with me. One grenadine "Start a project" button. No second CTA. Footer: email and WhatsApp stay visible. "CV on request" stays. No monospace.

9. Delete homepage components that nothing renders, only after grepping imports. Do not touch anything /hire imports.

At 1280px the hero plus the first showcase row should sit within about one and a half screen heights. Tighten spacing before shrinking type.

Done when: build, lint, typecheck and tests pass, one h1, no horizontal scroll at 390px, the three showcase links work, npm run shots -- after-r2 matches .shots/before for the live routes, and this is committed.
```

## R3 Stout Finder and ShelterLink covers

```text
RDev Studio, design/grenadine. Read the rdevstudio skill and .design/brief.md. components/covers only, plus the cover map in components/covers/index.tsx.

The pitch-drawing covers stay. CoverFrame already uses turf, cover-line and accent tokens, so the Grenadine swap from R1 recolours them. Do not redraw Champions Draft, Rugby Draft, Pub Quiz, Longest Word, Draft Analyser, Wardrobe, Gig Radar or Guitar Lab.

1. StoutFinderCover already exists (pint glasses, one filled accent, ripple). Read it. If it still draws hearts, or fights CoverFrame, redraw it as a simple map outline with small pint-glass marks. One glass uses the accent. Same 16/10 frame and hover motion as the other covers. prefers-reduced-motion: no ripple.

2. Add ShelterLinkCover. A hand-drawn week grid, seven columns, a few chalk marks for shifts, one cell filled accent. No emoji, no clip-art dog, no photo. Same frame, same hover (one property: the accent cell or a single line). Register slug shelterlink in coverMap.

3. Use the covers on the homepage showcase rows if a row has no screenshot, and on /projects where those products appear. Do not remove a real screenshot to make room for a cover. A cover can sit beside the screenshot, or replace a missing image. Say which you did.

4. Check both covers at 390px and 1280px, and with reduced motion on.

Done when: build and lint pass, you have described both covers, live-route shots still match .shots/before, and this is committed.
```

## R4 Inner pages and More work

```text
RDev Studio, design/grenadine. Read the rdevstudio skill and .design/brief.md. Studio pages only. Do not edit game route components, /draft, /wardrobe-ai, or /hire content.

1. /work: client work in this order: ShelterLink, RV's Cold Brew, Assisi. Status labels exactly as lib/content/products.ts. Then games and experiments that are already listed. Paintball Wales is not in that top group.

2. Add a page at app/(site)/work/more/page.tsx, h1 "More work". Paintball Wales and the older concept builds as ruled rows: name, one line from the existing copy, a link to the existing case study. No big screenshots, no card grid. Link it from /work and from /projects as "More work". Do not delete /work/paintball-wales or change its URL. Sitemap includes /work/more.

3. Case study "next" links: RV's Cold Brew must not point at Paintball Wales as the next featured study. Point it at ShelterLink. Check the other next links still loop. /work/paintball-wales stays live.

4. Pages still on the old paper classes (text-primary, bg-raised, shell-label, font-display) because of the .studio-page override in app/globals.css: case studies, about, error, not-found, the (site) layout. Replace those classes with studio tokens (text-studio-text, text-studio-muted, bg-studio-surface, border-studio-line). Then delete the override block only if nothing outside the game routes, /hire, /draft and /wardrobe-ai still needs it. Grep before deleting.

5. app/not-found.tsx: if it still says "FULL TIME WHISTLE" or uses Anton, rebuild it. Shared header and footer, h1 "That page isn't here", one line "It may have moved, or the link was wrong.", a "Back to the homepage" button, links to Work and Contact. app/(site)/error.tsx: h1 "That didn't load", a Try again button calling reset(), a link home.

6. about: if a heading says "Off the pitch", rename it to "Away from the desk". Graduation photo and "CV on request" stay. Do not add a downloadable CV.

7. /services keeps the four prices from lib/constants.ts, as text, not a four-up card row. Title "Prices and services" if it is still "Work with me" as the document title. The nav label "Work with me" stays.

8. /projects: the project list, then the "How they're built" content moved off the homepage in R2. If R2 did not move it, move it now.

9. Grep paintball, pitch, scoreboard, on the pitch across app/, components/ and lib/. List every remaining hit and why it stays (game name, case study, more work, hire, sitemap). Rewrite studio-page hits that are decoration. Do not rewrite game taglines.

Done when: build, lint, typecheck and tests pass, /work/more returns 200, /work/paintball-wales returns 200, a made-up URL returns 404 with the new page, and this is committed.
```

## R5 Games shell and /hire palette

```text
RDev Studio, design/grenadine. Read the rdevstudio skill. This prompt is the shell and the hire palette. Game screens stay.

Live routes, do not edit their own components: /champions-draft, /rugby-draft, /pub-quiz, /games/longest-word, /draft, /wardrobe-ai. /hire: palette only. Do not change hire copy, the hire-meter finale, the Rudi modal, or the FELINE_DISTRACTION_DETECTED card.

1. Shared header and footer may use Grenadine. Games stay reachable. "Start a project" stays the one primary button on studio pages. On a game page, do not add a second competing CTA in the header.

2. /games listing: same covers and names, Grenadine frame. No new cards, no pills.

3. /hire: it may still use paper tokens. Map those surfaces onto Grenadine (deep slate page, slate 2 panels, naples text, grenadine for the one primary action already there). If the page has its own palette on a wrapper, change the wrapper. Do not restyle the easter-egg cards into a new layout. Do not change their text.

4. npm run build && npm run start && npm run shots -- after-r5. Compare with .shots/before. The body of every live route must match. Header and footer may differ. If a game body changed because it inherited body colours, pin the previous colours on that route's own wrapper. Do not edit the game's components to do it. List each live route as unchanged or say what you pinned.

Done when: build, lint, typecheck and tests pass, the comparison is in the reply, and this is committed.
```

## R6 Copy pass

```text
RDev Studio, design/grenadine. Read the rdevstudio skill and ~/.claude/skills/humanizer/SKILL.md. Copy only. No layout rebuild.

Studio pages, components/home, components/layout, components/ui, lib/constants.ts. Skip game taglines, game routes, /draft, /wardrobe-ai and /hire.

1. Run the humanizer on visible copy. Keep every fact. Do not add clients, prices, timelines, testimonials or tool claims. Show old and new for every sentence you change.

2. No em dashes or en dashes. Replace with a hyphen or a new sentence.

3. Grep studio copy for: passionate, journey, seamless, leverage, elevate, unlock, synergy, welcome to, look no further, second to none. Remove the hits by rewriting the sentence.

4. Grep for " · ", eyebrow labels in all caps, and slogan headings with a comma pivot ("Four steps, no surprises" style). Replace with a plain heading. List old and new.

5. Assisi line stays the products.ts status. ShelterLink never "in use at Assisi". Cosskeenan is not mentioned. If either name was added, take it out.

6. Contact: keep the existing "what happens next" line if R2 or the site already has one that matches the code. Do not invent a reply-time promise. Formspree field names stay.

Done when: build and lint pass, the old/new list is in the reply, and this is committed.
```

## R7 Checks

```text
RDev Studio, design/grenadine. Read the rdevstudio skill and ~/.claude/skills/web-design-guidelines/SKILL.md. Fetch the guidelines the skill points at before reviewing. Fix what you broke. Do not open a new redesign.

1. Studio pages at 375, 768 and 1280: /, /work, /work/more, /projects, /services, /about, /contact, /games. No horizontal scroll. Tap targets at least 44px. One h1 each. Body line length about 65 to 75 characters.

2. Keyboard: header links, Start a project, a contact field, a FAQ question. Focus ring visible (2px solid naples, 3px offset, or whatever globals.css already sets if it meets that).

3. prefers-reduced-motion: cover hovers may change colour, nothing travels on scroll, nothing loops.

4. Grep f59e0b, 0a0a0f, 0F2219, E5402F, kit red leftovers, DM_Serif on studio pages. List anything left and why (game pin, hire, og image).

5. web-design-guidelines on the studio pages you touched. Fix clear failures. Paste the remaining findings.

6. npm run build && npm run lint && npm run shots -- final. Live routes match .shots/before except the shell. Push the branch. Do not merge.

Done when: build, lint, typecheck and tests pass, and the reply has the viewport notes, the grep leftovers, and the guideline findings.
```

---

## For you, not Cursor

- Open the Vercel preview on your phone before merging. Homepage, one case study, /services, /contact, one game, /hire.
- Quotes, Google Business and an ICO check are still the notes at the bottom of docs/FLOODLIGHTS-PACK.md. This pack does not add fake quotes.
- Cosskeenan stays off the site until there is a real engagement you want public.
