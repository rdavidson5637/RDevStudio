---
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "data/**"
---

# Copy rules

Voice: dry, plain NI English. Confident. No corporate filler, no embellishment. Sentence case. Buttons are verbs.

## Never use
- Em dashes. Use a hyphen or rewrite.
- Banned words and phrases: passionate, journey, seamless, leverage, synergy, elevate, unlock, crafting digital experiences, crafting experiences, "I'd love to", "reaching out", "circling back", "we take pride", "look no further", "second to none", "welcome to", "work in progress", "not finished yet".

## Never write
- Invented testimonials, reviews, stats, awards, client names, prices, opening hours or results.
- Claims that something is live, adopted or working (online ordering, booking, a client "using" a platform) unless Ryan has said so.

If the content does not exist, leave it out and list it as a TODO in your reply.

## Prices and terms (client-facing)
- Standard website build: 650 pounds. Optional care plan: 30 pounds a month.
- Social media management from 150 pounds a month. Content creation from 200 pounds a project.
- 50% upfront, 50% at launch. Client owns domain, content and code.
- Free for registered charities. Other rescues: tell them to get in touch, no price set.
Check lib/constants.ts and lib/services.ts before changing any price. Those files are the source of truth for the site.

## Demos
Speculative demos for prospects are fine. Never present a demo as the client's live site and never invent endorsements from them.
