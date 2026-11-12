# ShelterLink visual pack

Open `~/Desktop/Software Projects/ShelterLink/shelterlink-main`. One prompt per new Cursor Agent chat, in order.

Do not open `~/Desktop/Projects/ShelterLink/shelterlink cursor`. That folder is an empty git repo.

Stack stays: Express (`server.js`), Postgres (`pg`), static HTML in `frontend/`, CSS in `frontend/public/css/custom.css`, Pico CSS from the CDN link already in the pages. This round is visual only. No auth, SQL, email, rate limiting, GDPR or new features. A migration to Next.js is a different job.

`frontend/public/css/custom.css` already has a light theme: forest green `#1b5e20`, page `#f6f7f6`, white surfaces, near-black text. Keep that accent if the contrast checks pass. Do not paint this in Grenadine. Grenadine is the studio and MGSL.

Do not write that Assisi is using ShelterLink, or that it is live at the sanctuary. The app can still say it was built for them. Status language, if you touch it, stays "ready for live use".

Skills: `~/.claude/skills/redesign-existing-projects/SKILL.md` and `~/.claude/skills/web-design-guidelines/SKILL.md`. Not design-taste. The project skill from S1 wins.

| # | What | Needs first |
| --- | --- | --- |
| S1 | Project skill and a do-not-break inventory | - |
| S2 | Shared CSS | S1 |
| S3 | Main screens, phone first | S2 |
| S4 | The rest, then a behaviour check | S3 |

---

## S1 Project skill and inventory

```text
ShelterLink, ~/Desktop/Software Projects/ShelterLink/shelterlink-main. Read ~/.claude/skills/redesign-existing-projects/SKILL.md. No visual edits in this prompt. No server, route, model, or SQL edits in this whole pack, starting now.

1. Branch: git checkout -b design/polish

2. Write .cursor/skills/shelterlink/SKILL.md. Frontmatter name shelterlink. Description: use for any UI work in this repo. Body:

   Visual only. Do not edit server.js, routes/, controllers/, models/, middleware/, database/, jobs/, or scripts/.
   Do not rename a form field, an input name, an id that JavaScript hooks, a data attribute, or a fetch URL.
   Do not change button types or form actions.
   Light theme stays. Accent is the forest green already in frontend/public/css/custom.css (#1b5e20, hover #14501a) if it passes AA as white text on the button. Page #f6f7f6, surface white, text #1c211e, secondary #55605a.
   One container: flat white panel, 1px border, 8px radius. No gradients, no blur, no shadow stacks, no scale-on-hover.
   Type: Atkinson Hyperlegible for everything, self-hosted. Sentence case. No Inter, Roboto, or the system stack as the brand font.
   Emoji in the nav are decoration. Remove them when you touch that header. Do not add new ones.
   Copy: do not claim Assisi has adopted ShelterLink or that it is live with them. Do not invent volunteer counts, hours, or quotes.
   Phone first. 44px targets. Visible focus. prefers-reduced-motion.
   Project skill wins over the redesign skill.

3. Inventory, written into docs/visual-inventory.md (create docs/ if needed):
   - Every frontend HTML page, grouped: public, volunteer, admin, errors.
   - For each form: action, method, and every input name.
   - Every fetch( or XMLHttpRequest URL in frontend JS.
   - Which element ids the JS files query.
   This file is the contract. Later prompts must not break a row in it.

4. Note the current accent contrast: white on #1b5e20, and #55605a on white. Record the ratios. Do not change CSS yet.

Done when: the skill and the inventory exist, no CSS or HTML was restyled, and this is committed.
```

## S2 Shared CSS

```text
ShelterLink, design/polish. Read .cursor/skills/shelterlink/SKILL.md and docs/visual-inventory.md. Shared CSS and the font only. Do not edit server code. Do not rename fields or ids.

1. Self-host Atkinson Hyperlegible (400 and 700) as woff2 under frontend/public/fonts/, with the license file beside it. @font-face in custom.css. Replace --font-stack. Remove Inter, Roboto, Segoe UI and Arial from that stack. If a woff2 cannot be fetched, stop and say so. Do not fall back to Inter.

2. Keep the tokens in :root. One radius for cards (8px) and one for controls (6px). Stop using 999px pills on nav links and tags. A true status chip can stay a compact label, same 6px radius, not a capsule.

3. Buttons: forest green background, white text, hover #14501a. One property changes on hover (background). Focus ring 2px solid #1b5e20, 3px offset. Min height 44px. Secondary button is text with an underline, or the existing secondary if it is already a bordered button. Do not invent a second filled colour.

4. Tables: header row, row borders using --border, no zebra of a new colour. Tap targets on row actions at least 44px.

5. Panels: white, 1px --border, no --shadow-card on new work. You may leave the existing 1px shadow if removing it shifts layout everywhere. Say which.

6. The dark-mode Pico override in custom.css stays, so OS dark mode does not flip the app to black rows. Do not add a dark theme.

7. Grep frontend HTML for emoji and the character references &#9998; and &#128274; and similar. Remove them from the shared header pattern. If each page copies the header, update every copy the same way. Do not change link hrefs.

8. Check login.html, index.html and pages/volunteer/dashboard.html at 375px and 1280px in a browser. Contrast of the button and of secondary text. If #55605a on white is under 4.5:1, darken --text-secondary toward #1c211e until it passes and record the hex in the skill.

Done when: the pages still post the same field names (diff the inventory against the HTML), build is not required for this static front end, and this is committed. If there is a test script, run npm test and do not "fix" failures by editing the server.
```

## S3 Main screens, phone first

```text
ShelterLink, design/polish. Read the shelterlink skill and docs/visual-inventory.md. Layout and CSS classes only. If a change needs a new wrapper, add a class. Do not rename inputs, ids, or URLs.

Phone first, 375px, then 768 and 1280. No horizontal scroll.

Pages:
- frontend/index.html
- frontend/login.html
- frontend/register.html
- frontend/forgot-password.html
- frontend/reset-password.html
- frontend/pages/volunteer/dashboard.html
- frontend/pages/volunteer/calendar.html
- frontend/pages/volunteer/browse-shifts.html
- frontend/pages/volunteer/log-hours.html
- frontend/pages/volunteer/my-hours.html
- frontend/pages/admin/dashboard.html

1. One h1 per page, sentence case. The public homepage may keep "Volunteer at Assisi Animal Sanctuary" as the product title. Do not add "Assisi uses ShelterLink", "now live", or a volunteer count.

2. Index: the three-column feature grid is the generic pattern. Replace it with a short ruled list (title, one line) under the hero, using copy already on the page. Do not invent features. One primary action: the existing register link. "See open shifts" is a text link, not a second filled button.

3. Login and register: one column, labels visible, errors in the existing element if there is one. No placeholder-only labels.

4. Volunteer dashboard, calendar, shifts, hours: the data tables and cards use the S2 panel. Week calendar must still show the same days and the same buttons. Do not remove a shift action.

5. Admin dashboard: dense is fine. Align the numbers. Do not add charts. Do not add a new green.

6. Diff input names and fetch URLs against docs/visual-inventory.md. Paste any difference. If you caused one, revert it.

Done when: those pages have no horizontal scroll at 375px, the inventory still matches, and this is committed.
```

## S4 Remaining pages and a behaviour check

```text
ShelterLink, design/polish. Read the shelterlink skill, the inventory, and ~/.claude/skills/web-design-guidelines/SKILL.md. Fetch the guidelines before reviewing. Finish the look. Do not add features.

1. Apply the S2 and S3 patterns to every other file under frontend/ that S3 did not touch, including admin pages, foster, transport, waivers, messages, kiosk, offline, privacy, and the error pages. Error pages: one h1, one line, a link back. No joke copy.

2. Kiosk and offline must stay usable at arm's length: 44px targets, the same tokens, no new navigation.

3. web-design-guidelines on login.html, the volunteer dashboard, the admin dashboard, and browse-shifts. Fix clear failures that are CSS or labels. Do not change API calls to satisfy a guideline.

4. Behaviour check, local server (npm run dev or node server.js, whichever RUN.md says). You need the database the project already uses. If it is not running, say so and stop the behaviour check rather than pointing at a new database.
   - Login page renders. Do not guess a password. If env.example has a demo user, try that and say whether it worked.
   - Open shifts page loads.
   - View source or the DOM for the login form and one hours form: same input names as the inventory.
   Do not submit a real application, do not email anyone, do not create an admin.

5. Grep frontend for linear-gradient, blur, box-shadow that is more than the one card hairline, and emoji. List leftovers.

Done when: the reply lists pages still on the old look (should be none), the behaviour check result, the guideline findings, and this is committed. Do not deploy.
```

---

## For you, not Cursor

- Assisi have not sent feedback. Do not start rota, GDPR, or a Next.js port from this pack.
- Hardening (password reset email, backups, rate limits) is later, even where some of it already exists in the repo.
