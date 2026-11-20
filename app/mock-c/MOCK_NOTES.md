# MOCK-C - Quiet Index

An editorial studio index with a warm paper ground, measured typography and restrained clay accent.
The first screen pairs a direct studio statement with local time, availability and two contact routes.
Projects read as a calm list; work detail stays deliberately factual and marks gaps for Ryan to complete.
For the real site, consider the spacious type scale, indexed project rows and a clear project enquiry close.

The mock now includes dedicated Work, Services and Contact pages. Services keep the scope factual and price-free; the contact page reuses the shared Formspree form and its inline validation, sending, success and configuration-error states. A small IntersectionObserver adds section reveals where motion is allowed, with reduced-motion and print styles keeping the content available.

Palette: ink `#20221f`, paper `#f5f4f0`, soft line `#d8d8d0`, clay `#a8795c`.
Fonts: Instrument Sans and DM Serif Display (local repository WOFF files), with Arial and Georgia fallbacks.

Case studies live at `/mock-c/work/[slug]` (shelterlink, assisi, rondo, crosskennan, mgsl-hub), driven by `app/mock-c/work/projects.ts`. Each page covers problem, what was built, stack, status and links, with framed screenshots where the repo has them. Any fact not in the repo shows a dashed "TODO for Ryan" marker on the page instead of made-up copy. Unknown slugs return the mock-c 404.

## What to steal for the real site

- The indexed project rows and the case page meta strip (type, role, year, status).
- The visible TODO marker pattern for drafts, so gaps stay obvious until they are filled.

## Ryan to confirm

- Confirm WhatsApp destination and the `NEXT_PUBLIC_FORMSPREE_ID` configuration for the quote form.
- Supply Rondo's real public URL, project type, year and factual description.
- Confirm Crosskennan and MGSL hub project descriptions, role and year.
- Review all copy and styling; this is agent-written work and remains unverified until Ryan checks it.
- Check the dedicated `/mock-c/contact`, `/mock-c/services` and `/mock-c/work` routes and the mock-only 404 page.
- Print styling and narrow 360px/390px layouts were checked locally; no external-device or assistive-technology testing was available.
- Case studies: fill every "TODO for Ryan" marker on `/mock-c/work/rondo`, `/crosskennan`, `/mgsl-hub` (all details), `/assisi` (role, year, stack, problem, screenshots) and the year on `/shelterlink`. Results and quotes are TODO on every case page; nothing is recorded in the repo.
- The ShelterLink screenshots come from `public/images/work/` and show `localhost:3000` in the browser bar and test data ("test case"). Consider fresh captures.
- The "How I use what you send" link inside the shared `ContactForm` is under 44px tall. That component is outside this mock's scope, so it was left alone.
- Em dashes were removed from mock titles and eyebrows, and the work index heading no longer uses the banned phrase from the copy rules.
