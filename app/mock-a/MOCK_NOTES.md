# Mock A: bold and modern

Agent-written (Claude Code, lane MOCK-A, 19-20 Nov 2026). Unverified until Ryan checks it. Draft PR #33, do not merge.

Routes: `/mock-a` (home) and `/mock-a/work` (project panels). Both are `noindex, nofollow`, not in the sitemap, not in the live nav.

## The idea
- A sharp product studio, not a freelancer page. Near-black, one electric lime, one electric blue, oversized tight type.
- Single long home page: statement headline, local time and "open to new projects" chips, a project-name marquee, four services, a "Latest work" list, a short studio block, then a big "Start a project." close.
- The two actions are never more than a tap away: header (both on desktop), hero, a fixed bottom bar on phones, and the contact close.
- Motion is kinetic but cheap: CSS marquee, CSS hover previews on the work list, one IntersectionObserver for scroll reveals. All of it stops under `prefers-reduced-motion`.

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

## Open TODOs for Ryan
- **Rondo**: no public link in the repo. It points at `/mock-a/work#rondo` for now. Needs the real URL, a one-line description and a year. The type "Studio product" is based only on Rondo being your own project.
- **Crosskennan** (`crosskennan.vercel.app`) and **MGSL hub** (`mgsl-hq-black.vercel.app`): nothing in the repo describes them. They show name, link and a placeholder type ("Build", "Hub") only. Needs a one-liner, the right type and the year for each.
- **Assisi**: uses an illustration until the sanctuary approves screenshots. The year is not in the repo.
- **Formspree**: the quote form posts to `FORMSPREE_FORM_ID` (`NEXT_PUBLIC_FORMSPREE_ID`). Confirm that env var is set for Preview deployments, or the preview will show the email/WhatsApp fallback. The subject line says "(mock A)" so test sends are easy to spot. Not test-submitted by the agent, to avoid sending you an email.
- **WhatsApp**: confirm `WHATSAPP_URL` in `lib/constants.ts` is the number you want on the new site, and that the prefill text reads right.
- **Copy to check**: hero line ("Websites and web apps, designed and built in NI."), the four service blurbs (especially Google Business Profile, which has no existing service copy in the repo), "Open to new projects", and the studio line "The person you talk to is the person who builds it."
- The "Mock note" lines on the home work list and the work panels are for this review only. Remove them once the copy exists.

## Could not measure
- Lighthouse, real-device and real screen-reader runs were not done. Checks done: Playwright at 360, 375, 390, 768 and 1280 for horizontal scroll and tap targets under 44px, heading order, keyboard focus, reduced motion, and form validation.
- Layout shift was not measured with a tool. By construction, reveals only animate opacity and transform, the clock has a fixed-width slot, and images sit in fixed-aspect frames.
- Dev-only console errors on every route: `icon.svg` and `favicon.ico` return 500 because `public/` and `app/` both define them. This existed before the mock and is not touched here.
