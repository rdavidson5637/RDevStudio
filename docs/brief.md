# Brief - RDev Studio (rdevstudio.co.uk) - 25 Nov 2026

Assembled from Ryan's answers in chat on 25 Nov 2026. Anything marked BLANK is Ryan's to write. Nothing gets built from a BLANK.

## The business in one paragraph
RDev Studio is Ryan Davidson, one person in Carrickfergus, Co. Antrim. Designs and builds websites and web apps for NI small businesses, charities and rescues. Built and runs his own live product, Stout Finder (stoutfinder.com). Built ShelterLink for Assisi Animal Sanctuary (started as his MSc at Queen's, graduated with Commendation), Rondo for grassroots football (pilot: Grove United 3rds), and the Crosskennan Lane sanctuary site. Registered charities get their site free. No prices on the site; every job gets a fixed written quote.
What's true about him that isn't true of the competition: BLANK (Ryan, one or two sentences in your own words).

## Audience and the one job
- Primary visitor: an NI small-business owner or charity volunteer who has been sent the link or found it locally.
- The one action: send a quote request (Formspree form) or WhatsApp.
- What they're worried about: will it be a real person who finishes the job, will I own it, can I see something he's actually built.

## Subject material
- Physical stuff: Carrickfergus, Ryan's own builds (the pint glasses and map from Stout Finder, rotas from ShelterLink, the pitch from Rondo), Rudi.
- Words Ryan actually uses: BLANK (paste a few lines from your WhatsApps or Instagram).

## Brand inputs
- Grenadine (see grenadine-palette.md): slate #112F2C ground ~70%, Naples #FBE6A0 type ~25%, grenadine #F48067 main action only ~5%, ochre #E2B540 for alerts.
- Display: Big Shoulders Display 800 (kept from the Floodlights work; decided 25 Nov 2026 over DM Serif Display because the serif plus grenadine reads as Claude's default look). Body: Atkinson Hyperlegible 400/700.
- Explicitly NOT: cream ground + serif + coral accent. Near-black + one neon accent. One italic or coloured word in a headline. Arrows on links. Fade-up on every section. Lists of three by reflex.

## References
1. https://mikekus.com - take: work on the first screen, before any introduction; project pages say exactly what was delivered.
2. https://gilhuybrecht.com - take: tall full-page screenshots carry the portfolio. On mobile they stack vertically, never a sideways strip.

## Hero headline (Ryan's pick)
"Stout Finder, ShelterLink and Rondo were all built in Carrickfergus."

## Design check scope
Studio pages only for now (homepage, components/studio, studio.css). Games and tools get checked later on their own branch.

## The one memorable thing
Stout Finder as the hero: a big, real screenshot of stoutfinder.com, one plain line about it, a button to open it. Everything else on the page stays quiet.

## Page plan (homepage)
```
[1 hero]       headline naming the work (left) | Stout Finder screenshot, big (right / below on mobile)
               one line, "Open Stout Finder", "Get a quote"
[2 client work] one row per project, alternating sides, tall screenshot + name + problem line + live link
               ShelterLink, Rondo, Crosskennan, RV's Cold Brew, Assisi, MGSL hub (password protected)
[3 games]      plain list of the games with small real thumbnails, one line each, no cards
[4 how it runs] four real steps (it is a sequence) + "What you own at launch" handover block beside it
[5 me + Rudi]  photos, short About in first person, what to expect, quote form + WhatsApp (the one Naples section)
```
Services move off the homepage to /services (linked from the nav).

## Assets checklist
- [x] Stout Finder screenshots (public/images/stout-finder)
- [x] Project screenshots for ShelterLink, RV's Cold Brew
- [ ] Screenshots for Rondo, Crosskennan (code-drawn covers used until then)
- [ ] MGSL hub: Ryan to take screenshots. Row shows PHOTO NEEDED boxes and no link until then
- [x] Photos: Ryan's Queen's graduation photo and Rudi in the Arsenal scarf (confirmed 25 Nov 2026)
- [ ] Real testimonials (name + permission): none yet, so none on the site
- [ ] Availability: not stated on the site

## Motion
One moment: none planned beyond the existing code-drawn cover hover. Everything else: state changes on interactive elements only. Remove fade-up on scroll.

## Definition of done
- Zero hits on the "Never" list, design check passes
- Screenshots at 390px and 1440px reviewed by Ryan
- Every headline passes the swap test
- Formspree form, WhatsApp link, metadata + OG, sitemap, contrast, alt text, Lighthouse pass
- Vercel preview approved before merge
