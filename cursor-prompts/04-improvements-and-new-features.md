# Prompt 04 - Improvements + new feature backlog

Pick the ones you want; each heading is a self-contained Cursor prompt.

## A. Improvements to current features

### A1 - Live game status on the games page
The games page lists Champions Draft, Rugby Draft, Pub Quiz. Add a small "live"
badge and, for Pub Quiz, a count of active games (read from the same store the
quiz API uses). Makes the portfolio feel like real, running products - strong
signal to recruiters.

### A2 - Case-study depth on /work
Each work page currently reads as a summary. Add a consistent case-study
structure: problem, role, stack, key decisions, outcome, and a screenshot or
short screen-capture GIF. Recruiters skim for exactly this. Reuse a
`CaseStudyLayout` component so every project matches.

### A3 - Contact form resilience
The Formspree contact form should have: explicit success + error states, a
disabled/submitting state, a honeypot field, and inline validation. Confirm all
are present in `components/contact/ContactForm.tsx` and add whatever's missing.

### A4 - Accessibility + Lighthouse pass
Run Lighthouse on each route. Fix colour-contrast on muted text against
`#0A0A0F`, ensure every interactive element is keyboard reachable with a visible
focus ring in amber, and add `aria-current` to the active nav item.

## B. New features (the "many new ones")

### B1 - Writing / notes section (`/writing`)
A lightweight MDX blog. Even 3-4 posts ("how I built Champions Draft",
"realtime with Pusher", "shipping a family app on Supabase") turn the site from
brochure into evidence of thinking. Add an index + `[slug]` route reading MDX
from `content/writing`, plus an RSS feed at `app/feed.xml/route.ts`.

### B2 - "/now" page
A single page describing what Ryan is working on this month. Cheap to maintain,
signals momentum, popular with the dev-hiring crowd.

### B3 - Games leaderboard hub
A shared `/games/leaderboards` pulling high scores / recent games across
Champions Draft, Rugby Draft and Pub Quiz. Gives friends a reason to return and
shows off data handling.

### B4 - Testimonials / social proof
A `Testimonials` component on the home and hire pages with 2-3 short client
quotes (NI small businesses). Store them in `lib/testimonials.ts`.

### B5 - Downloadable CV button that tracks
Wire the CV download (there's a `cv.pdf` in public) to a Vercel Analytics custom
event so Ryan can see recruiter interest. Add a prominent "Download CV" button
on the hire + contact pages.

### B6 - Dark/light toggle (optional)
The site is dark-only. A light theme via CSS variables + a toggle is a nice
polish and a small showcase of theming skill. Only if it doesn't dilute the
brand.

### B7 - Project "status" data + uptime
Add a `status` field to the games catalog (live / beta / paused) and show it as
a pill. Optionally a tiny uptime check that pings each game route and shows a
green/red dot.

## Build discipline
After each prompt: `npm run build` and `npm run lint` must pass. Keep server
components as the default; only mark `"use client"` where interactivity needs
it. No em dashes in any copy.
