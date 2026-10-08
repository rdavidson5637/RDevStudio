# DESIGN.md

## Concept
rdevstudio.co.uk is a dark, product-studio style site (Linear/Vercel feel). It sells websites to NI small businesses and charities, shows the live games and apps, and carries a bit of dry NI personality in small places. Sports vernacular survives in section labels ("Kick-off", "Fixtures", "Full time") and the footer. Case study copy stays clean and plain.

## Palette (CSS variables in app/tokens.css, Tailwind `studio-*` tokens)
- Background: #0A0A0F (`bg-bg`)
- Surface: #101018, Surface 2: #15151F
- Border: rgba(255,255,255,0.08), Border strong: rgba(255,255,255,0.14)
- Text: #F4F4F5, Muted: #A1A1AA, Faint: #71717A
- Amber: #F59E0B - the single strong accent. Used for primary buttons, underlines, hover states and one highlight per section. Not for paragraphs.
- Status: live #22C55E, soon #F59E0B
- Client accents (RV's teal and cream and similar) only inside that client's card, and lightly.

## Typography
- Display: DM Serif Display (`font-studio-display`) for headings and brand.
- Body and UI: Geist Sans.
- Labels and status: Geist Mono, 11px, uppercase, wide tracking (`type-label`).
- Type utilities: `display-xl`, `display-lg`, `type-body`, `type-label`.

## Layout
- Max width via `Container` (`max-w-studio`), 24px mobile padding.
- Homepage sections use `py-14 md:py-20`. No big dead bands between sections.
- Cards: `Card` primitive, surface background, 1px border, `rounded-studio`, no heavy shadows. Image-led cards use a 16/10 image with a dark bottom gradient.
- Backdrops: `bg-grid` and `glow-amber` (app/globals.css) behind the hero only. Subtle, faded at the edges.
- Fallback card when a project has no image: dark surface, big initial in DM Serif Display, soft amber glow.

## Motion
- `Reveal` for scroll fade-up, once, staggered. Hover lifts of 2px and image scale 1.03 on cards.
- Everything respects prefers-reduced-motion.

## Homepage order
Hero, Live now, Client work, Work with me, How it works, Questions, Coming soon, Closing CTA.

## Voice
- Sentence case. Plain, dry NI English. Buttons are verbs.
- No em dashes. Banned words: passionate, journey, seamless, leverage, synergy, "crafting digital experiences".
- Never claim more than is true: Assisi rebrand is "Built - awaiting sign-off", ShelterLink is "Ready for live use", RV's Cold Brew is "Live site - nearly finished". No invented numbers, quotes or results. No numbers in the live strip.

## Nav and footer
- Nav tabs: Games, Projects, Tools, Work with me, plus an amber "Start a project" button. /hire and /work and /about live in the footer.
- Footer keeps "RDev Studio - designed and built in Carrickfergus. No template, no page builder, occasional dog supervision." and the "FULL TIME" line.
