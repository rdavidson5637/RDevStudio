# DESIGN.md

## Concept
This portfolio is styled like a modern matchday programme. Ryan Davidson is a designer/developer in Belfast with a background in football and rugby who builds web apps and free football games. Sports vernacular appears in labels, section headers, and microcopy - but case study content itself stays clean and professional. The tone is dry, plain-spoken Northern Irish humour: confident, never boastful, zero corporate filler, zero hedging ("work in progress", "not finished yet" and similar are banned sitewide).

## Palette
- Paper: #F7F5F0 (page background)
- Ink: #16150F (text, solid fills)
- Pitch: #1E5C3A (structural colour - rules, labels, section markers, hover states)
- Card red: #D22B2B (used extremely sparingly - one or two moments per page max: the "Hire me" button hover, a single highlight)
- Line: #E3DFD4 (hairline borders)
- Muted: #6B685E (secondary text)

## Typography (all free)
- Display: Anton (Google Fonts) - for h1/h2 and jersey-style numbers. Uppercase, tight leading (1.0-1.05), used with restraint.
- Body: Archivo (Google Fonts) - 16-18px, line-height 1.65, weights 400/600 only.
- Data/labels: Space Mono (Google Fonts) - 11-12px uppercase with 0.08em letter-spacing, for eyebrows, tags, stats, timestamps, section markers.
Type scale: h1 clamp(3rem, 8vw, 6.5rem); h2 clamp(1.75rem, 4vw, 3rem); h3 1.25rem Archivo 600 (not Anton).

## Layout rules
- Max content width 1120px, generous padding (min 24px mobile).
- Sections divided by 1px Line-colour rules, each opening with a Space Mono label styled like a programme section ("KICK-OFF", "FIXTURES", "SQUAD", "FULL TIME").
- Cards: white (#FFFFFF) background, 1px Line border, 10px radius, no shadows.
- Pitch-marking motif: occasional thin 2px Pitch-colour rules and a subtle centre-circle arc may be used as section dividers - sparingly, max one decorative use per page.

## Signature element
The scoreboard: a Space Mono strip that appears in the hero styled like a stadium scoreboard, showing real numbers (projects shipped, games built, years, current status). This is the one loud design moment - everything else stays quiet.

## Voice & microcopy
- Sentence case everywhere except Anton headings (uppercase) and Space Mono labels (uppercase).
- Buttons are verbs: "See the work", "Read the case study", "Get in touch".
- Dry humour lives in small places: footer, 404, image captions, one-liners under section labels. Never in case study body copy.
- Banned words: passionate, journey, seamless, leverage, crafting digital experiences.

## Global shell to build now
- Nav: "RDev Studio" wordmark left (Archivo 600). Right: Work, Games, About, Contact in Space Mono uppercase, plus a solid Ink "Hire me" button (red on hover). Sticky, Paper background with bottom hairline. Mobile: hamburger -> full-screen Paper overlay with oversized Anton links.
- Footer: three columns - (1) "RDev Studio - designed and built in Carrickfergus. No template, no page builder, occasional dog supervision." (2) nav links repeated, (3) email + LinkedIn + GitHub. Below, a full-width Space Mono line: "FULL TIME - thanks for reading the programme."
- Load fonts via next/font. Define all colours as CSS variables. Respect prefers-reduced-motion globally.
