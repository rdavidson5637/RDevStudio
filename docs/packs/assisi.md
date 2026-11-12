# Assisi polish pack

Open `~/assisi-new` (GitHub `rdavidson5637/assisi-new`). It is newer than `~/Desktop/Software Projects/assisi/assisi-website`. One prompt per new Cursor Agent chat, in order.

This is a polish of the rebrand already in the repo. Do not design a second brand. Do not write, on this site or anywhere, that Assisi have signed the rebrand off or adopted it. The site speaks as the sanctuary.

Out of this pack: a staff CMS, domain cutover, a donation platform, Google Business, social post templates, and any link to ShelterLink.

The donate page does not take cards. It sets local state and says online payments are launching soon. Keep that honesty. Sponsorship and membership amounts stay as written.

`src/data/successStories.ts` uses Unsplash URLs and named adopters with no source. Treat that as invented until Ryan supplies real photos and permission. `donate/page.tsx` links an Amazon wishlist at a URL containing `example`, and shows a progress bar at a fixed 2/5. Those are not real figures.

Skills: `~/.claude/skills/redesign-existing-projects/SKILL.md`, `~/.claude/skills/design-taste-frontend/SKILL.md`, `~/.claude/skills/humanizer/SKILL.md`, `~/.claude/skills/web-design-guidelines/SKILL.md`. The project skill wins. No noise, gradients, pill badges, fade-up, or scale-on-hover.

| # | What | Needs first |
| --- | --- | --- |
| A1 | Project skill and audit | - |
| A2 | Type and colour | A1 |
| A3 | Homepage, adopt, volunteer, donate | A2 |
| A4 | Remaining pages and checks | A3 |

---

## A1 Project skill and audit

```text
Assisi site, ~/assisi-new. Read ~/.claude/skills/redesign-existing-projects/SKILL.md and ~/.claude/skills/design-taste-frontend/SKILL.md. No code changes except the skill file and the audit note. No new dependencies.

1. Branch: git checkout -b design/polish

2. Write .cursor/skills/assisi/SKILL.md. Frontmatter name assisi. Description: use for any UI or copy work on this site. Body:

   Polish the existing rebrand. Do not invent a new palette.
   Ink #1a1a1a. Paper #f6f1e6, flat, no gradient. Amber #fbbf24 is the button fill only. Button text is #1a1a1a. Amber is not used as text on paper (it fails contrast). Links are ink with an underline. Amber hover #e0a810.
   Type: Fraunces for h1 and h2, Atkinson Hyperlegible for everything else, both through next/font. No Inter, Roboto, Arial, or the system font.
   One panel style: flat, 1px ink at about 15% opacity, no rounded-2xl shadow cards.
   Copy: plain. No em dashes or en dashes. No new animals, fees, hours, quotes, or adopter names. Amounts already in the pages and in src/data stay. Do not claim card payments work. The donate control does not charge a card.
   Do not link to ShelterLink. Do not say the rebrand has been signed off.
   Happy tails: src/data/successStories.ts is Unsplash plus named people with no source. Do not show it. Do not replace it with new stories.
   Amazon wishlist href that contains "example" stays hidden. The Cat Intake progress bar is a fixed width, not real data. Remove the bar. Keep a sentence only if it does not state a percentage or amount raised.
   No invented testimonials. prefers-reduced-motion. Hover changes colour or underline, not scale. Project skill wins over design-taste.

3. Write docs/polish-audit.md. No component edits. List, with file paths:
   - Inter and any other font
   - linear-gradient and bg-gradient
   - rounded-2xl shadow cards
   - three-up icon or card rows
   - emoji
   - successStories usage
   - the Amazon example URL
   - the fake progress width
   - donate button copy that sounds like a completed payment
   - any ShelterLink link
   - em dashes in visible copy
   Say what you will change in A2 to A4, and what you will leave because it is real content (animals.ts, fees, phone, address).

Done when: the skill and the audit exist, app code is untouched, and this is committed.
```

## A2 Type and colour

```text
Assisi site, design/polish. Read .cursor/skills/assisi/SKILL.md and docs/polish-audit.md. Tokens and type only. Do not rewrite page sections in this prompt.

1. src/app/layout.tsx: remove Inter. Load Fraunces (the optical size next/font offers for headings) and Atkinson_Hyperlegible (400, 700) with next/font/google, display swap. Apply Atkinson on body. Fraunces on h1 and h2 via a class or a heading rule in globals.css. No external font stylesheet.

2. src/app/globals.css: replace the gradient utilities and the Inter comment. Tokens:
   - --ink: #1a1a1a
   - --paper: #f6f1e6
   - --amber: #fbbf24
   - --amber-hover: #e0a810
   - --line: rgba(26,26,26,0.15)
   Page background paper. Text ink. Primary button: amber background, ink text, hover amber-hover. No shadow, no scale. Secondary action: ink text, underline. Focus: 2px solid ink, 3px offset.
   Delete the linear-gradient rules. Map old classes (btn-primary, btn-secondary) onto these so pages do not keep a second button style.

3. themeColor in layout.tsx: #f6f1e6 or #1a1a1a, not a yellow that fails as a browser chrome guess. Pick paper.

4. Contrast check, written in the reply: ink on paper, ink on amber, the current secondary grey if any class still uses text-gray-500 for body copy. Body grey must be at least 4.5:1 on paper and on white. If a Tailwind grey fails, replace it with ink at full strength or a mix you measure. Do not leave text-gray-400 on captions if it fails.

5. npm run build && npm run lint.

Done when: Inter and the gradients are gone (grep and paste the count), build and lint pass, and this is committed.
```

## A3 Homepage, adopt, volunteer, donate

```text
Assisi site, design/polish. Read the assisi skill, the audit, and ~/.claude/skills/humanizer/SKILL.md. These four routes: /, /adopt, /adopt/[id], /volunteer, /donate. Read ~/.claude/skills/design-taste-frontend/SKILL.md for layout only. The skill wins when they conflict.

Real content only. Animals come from src/data/animals.ts. Do not add animals, fees, or hours. Phone and email stay as in src/data/shops.ts.

1. Homepage. One h1, sentence case, saying what the place is and where (the address data is Conlig, Newtownards). One primary action above the fold: adopt, or the existing primary if it is volunteer or donate. Only one filled button in the hero. A second action is an underline link.
   Take the success-stories slideshow off the page. Do not delete src/data/successStories.ts. Leave a TODO in the reply: real adoption photos and permission, or the block stays off.
   No three-icon feature row. Ways to help, if you keep them, are ruled rows: title, one line, a link. Use lines already on the site.
   No stock photos. If a section needs an image and the only file is Unsplash, use a clearly labelled placeholder and list it. next/image for real local photos, with sizes and alt.

2. Adopt. Filters and animal cards can stay, restyled as the flat panel. Fees on the cards stay the numbers already in data. Profile pages: one h1 is the animal's name. Do not invent temperament text. If a field is empty, omit it.

3. Volunteer. Restyle only. Do not add a ShelterLink link, a sign-up form that posts nowhere, or a claim that an app is in use. Keep the existing contact path (phone, email, or the form if it already submits somewhere you can see in the code). If the form has no action, say so and do not pretend it sends.

4. Donate. Keep the amounts, Gift Aid wording (25p, which is the real rule), and the "online card payments are launching soon" message. The button must not read as a completed charge. "Ask about this gift" is fine, then the existing phone and email. Remove the progress bar (the w-2/5 block). Hide the Amazon wishlist link while its href contains "example". Do not invent a wishlist URL. Replace em dashes in the Gift Aid sentence and the appeal line. Do not add Stripe, PayPal, or a new provider.

5. Humanizer on sentences you rewrite. Show old and new. Keep every fact.

6. Look at 375, 768 and 1280. No horizontal scroll. 44px targets. One h1.

Done when: build and lint pass, the slideshow is off the homepage, the fake bar and example wishlist are gone, and this is committed.
```

## A4 Remaining pages and checks

```text
Assisi site, design/polish. Read the assisi skill, ~/.claude/skills/humanizer/SKILL.md, and ~/.claude/skills/web-design-guidelines/SKILL.md. Fetch the guidelines first. Finish the polish. Do not add pages.

Routes still on the old look: /about, /shops, /sponsor, /legacy, /outreach, /membership, /contact, and their layouts.

1. Same tokens, type, and panel. Sponsor tiers stay £6, £12, £20 a month (confirm against the file; do not round or add a tier). Membership stays £15 a year. Legacy and outreach: restyle, no new claims.

2. Shops: addresses and hours only as already written in src/data/shops.ts. If hours are missing, leave them out. Do not invent opening times.

3. Contact: keep the existing fields and where the form posts. If it does not post anywhere, do not wire a new service. Say so in the reply.

4. Header and footer: one primary action for the whole site (match the homepage). Phone or email visible in the header or the footer. Logo: use the file already in public/. Do not generate a new mark.

5. Humanizer on copy you touch. No em dashes. Grep the src tree for "—", "–", Inter, linear-gradient, unsplash, shelterlink, example wishlist. List hits. Unsplash inside successStories.ts may remain because the slideshow is unmounted. A live page must not render it.

6. web-design-guidelines on /, /adopt, /donate, /contact. Fix clear failures. 375, 768, 1280 on those four. Reduced motion: the slideshow is gone; nothing else should loop.

7. npm run build && npm run lint. Do not deploy.

Done when: the grep list is in the reply, build and lint pass, and this is committed.
```

---

## For you, not Cursor

- Real adoption photos, with permission to name the adopter, are the only way the happy-tails block comes back.
- A real Amazon wishlist URL, if you still want that link.
- Card payments stay off until a provider is actually connected.
- Domain cutover and a staff login for animal listings are a later pack.
