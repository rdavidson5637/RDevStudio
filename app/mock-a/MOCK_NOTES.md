# Mock A: bold and modern

Agent-written (Claude Code, lane MOCK-A, 19-20 Nov 2026). Unverified until Ryan checks it. Draft PR #33, do not merge.

Routes: `/mock-a` (home), `/mock-a/work` (project panels), `/mock-a/services` (four services, each ending with both CTAs) `/mock-a/contact` (quote form and WhatsApp; `?type=Website` etc. preselects "What do you need?") and five case study pages at `/mock-a/work/[slug]` (`shelterlink`, `assisi`, `rondo`, `crosskennan`, `mgsl-hub`), linked from each work panel and the home work list. All are `noindex, nofollow`, not in the sitemap, not in the live nav.

## The idea
- A sharp product studio, not a freelancer page. Near-black, one electric lime, one electric blue, oversized tight type.
- Single long home page: statement headline, local time and "open to new projects" chips, a project-name marquee, four services, a "Latest work" list, a short studio block, then a big "Start a project." close.
- The two actions are never more than a tap away: header (both on desktop), hero, a fixed bottom bar on phones, and the contact close.
- Motion is kinetic but cheap: CSS marquee, CSS hover previews on the work list, lifted and lime-shadowed screens on work panel hover, one IntersectionObserver for scroll reveals (lists stagger in), and a lime-to-blue scroll progress line under the header that uses CSS scroll-driven animation (no JS; it simply does not show in browsers without support). All of it stops under `prefers-reduced-motion`.
- Client JS is small: the clock, the mobile menu, the reveal observer and the quote form.

## Palette (local to `components/mock-a/mockA.module.css`, not site tokens)
| Role | Hex | Notes |
| --- | --- | --- |
| Background | `#0A0A0B` | |
| Panel / raised | `#151517` / `#1D1D20` | |
| Text | `#F4F3EE` | 17.8:1 on background |
| Muted / faint | `#A3A29C` / `#8A8984` | 7.7:1 and 5.6:1 on background |
| Lime accent | `#D4FF3A` | 17.1:1 on background; text on lime is `#0A0A0B` |
| Blue accent | `#6F80FF` | 5.9:1 on background; text on blue is `#0A0A0B` (5.9:1) |
| Work section | `#F4F3EE` with `#3B3B3F` / `#4A4A4F` text | 10.0:1 and 7.9:1 |
| Input border | `#76757A` | 4.3:1 on background (3:1 needed for UI) |
| Error | `#FF8A7A` | 8.6:1 on background |

Focus ring is lime on dark surfaces and ink on the cream work section and the blue WhatsApp card.

## Fonts
- No new font files. Display and body both use Instrument Sans 600/400, already self-hosted by `app/layout.tsx` with `display: swap`.
- Labels use the system monospace stack (`ui-monospace, SF Mono, Menlo`).
- Display type: `clamp()` up to 10.5rem, letter-spacing about -0.055em, line-height 0.9.

## Worth stealing for the real site
1. The fixed two-button bar on phones (Get a quote / WhatsApp). It keeps both actions in reach without crowding the hero.
2. The "Latest work" list: name, type and year in a strict grid, with a CSS-only preview on hover and keyboard focus. Cheap, and it scales to more projects.
3. The local time and "open to new projects" chips. Small, honest signals that the studio is real and local.
4. The labelled SVG "screens" for projects without approved screenshots (Assisi until sign-off). Clearly marked as illustrations.
5. The WhatsApp prefill (`WHATSAPP_URL` plus `?text=`) so the first message has context.
6. The quote form's validation: checks a field when you leave it (never mid-typing), clears the error as soon as it is fixed, error text tied to each field with `aria-describedby` and announced through `aria-live`, a summary of what needs fixing on submit, and focus moved to the first bad field, the failure fallback or the success message.
7. Case pages that show gaps openly: anything not in the repo renders as a dashed lime "TODO for Ryan" marker, and each page ends with a list of what is missing. Easy to fill in, and nothing gets invented.
8. Service pages that link to the quote form with the service already chosen (`/mock-a/contact?type=Web%20app`).

## Open TODOs for Ryan
- **Rondo**: no public link in the repo. It points at `/mock-a/work/rondo` (its mock case page) for now. Needs the real URL, a one-line description and a year. The type "Studio product" is based only on Rondo being your own project.
- **Crosskennan** (`crosskennan.vercel.app`) and **MGSL hub** (`mgsl-hq-black.vercel.app`): nothing in the repo describes them. They show name, link and a placeholder type ("Build", "Hub") only. Needs a one-liner, the right type and the year for each.
- **Assisi**: uses an illustration until the sanctuary approves screenshots. The year is not in the repo.
- **Formspree**: the quote form posts to `FORMSPREE_FORM_ID` (`NEXT_PUBLIC_FORMSPREE_ID`). Confirm that env var is set for Preview deployments, or the preview will show the email/WhatsApp fallback. The subject line says "(mock A)" so test sends are easy to spot. Not test-submitted by the agent, to avoid sending you an email.
- **WhatsApp**: confirm `WHATSAPP_URL` in `lib/constants.ts` is the number you want on the new site, and that the prefill text reads right.
- **Copy to check**: hero line ("Websites and web apps, designed and built in NI."), the four service blurbs (especially Google Business Profile, which has no existing service copy in the repo), "Open to new projects", and the studio line "The person you talk to is the person who builds it."
- **Services page** (`/mock-a/services`): all copy is drawn from the existing site drafts (`lib/content/redesign-draft.ts`) and the brief, with no prices. Check the "Good for" lists, which are agent-written. The Google Business Profile section has no source copy in the repo, so confirm what that service covers.
- **Registered charities**: the live site offers free packages for registered charities. Left out of the mock because the brief says no prices. Your call whether to mention it.
- The care plan is mentioned under Websites (hosting, security updates, small edits), without its price. Confirm you still want it mentioned.
- **Case pages** (`/mock-a/work/[slug]`): ShelterLink and Assisi use facts from the live case studies (`app/(site)/work/**`) and `lib/content/redesign-draft.ts`. Rondo, Crosskennan and MGSL hub are almost all TODO markers: the problem, what was built, stack, status, year and link. For every project the case page asks for a quote and any results. None are shown, because none are in the repo.
- **ShelterLink case page**: the status mentions the MSc dissertation at Queen's University Belfast (Commendation), taken from the live case study. The brief says studio brand only, so decide whether that line stays.
- **Assisi case page**: stack and year are TODOs.
- The "Mock note" lines on the home work list, the work panels and the services page are for this review only. Remove them once the copy exists.

## Could not measure
- Lighthouse, real-device and real screen-reader runs were not done. Checks done (production build, `next start`): Playwright at 360, 390 and 768 on all four routes for horizontal scroll, tap targets under 44px, one h1 and no skipped heading levels; 1280 screenshots of services, contact and the work panel hover; a keyboard-only Tab walk through the home page (skip link first, every stop has a visible focus style); reduced motion (reveals and progress line off); reveals after client-side navigation between mock pages.
- The quote form was checked only on the validation path (blur errors, the submit summary, focus moving to the first bad field). It was never submitted with valid data, so Formspree has not been called and you got no email. The success and send-failure states are code-reviewed, not seen in a browser.
- Layout shift was not measured with a tool. By construction, reveals only animate opacity and transform, the clock has a fixed-width slot, and images sit in fixed-aspect frames.
- Dev-only console errors on every route: `icon.svg` and `favicon.ico` return 500 because `public/` and `app/` both define them. This existed before the mock and is not touched here.
- Under `next start` locally, `/_vercel/insights/script.js` 404s (Vercel Analytics from the root layout only exists on Vercel). Not from the mock.

- Case pages (refill 2): production build, Playwright at 360 and 390 on all five, with no horizontal scroll, no tap targets under 44px, one h1 and no skipped heading levels. Also a 1280 screenshot, a keyboard Tab walk on ShelterLink (every stop has a visible outline), and `noindex, nofollow` checked on the built HTML. An unknown slug returns 404 (`dynamicParams = false`).

## Fixed in the refill pass
- The reveal observer lives in the layout, which persists across client-side navigation. Before this pass, moving from `/mock-a` to `/mock-a/work` with a nav link could leave lower sections invisible. It now re-scans on every route change and when new nodes arrive, and shows anything already scrolled past.
