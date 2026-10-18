# Grenadine

Ryan picked Grenadine on 15 Oct 2026, replacing the Floodlights colours. It comes from Sanzo Wada's Dictionary of Color Combinations (combination 166, with the ochre from 325): deep slate green, Naples yellow, grenadine pink and yellow ochre. The same palette is used on stoutfinder.com and on Instagram, so the sites and posts read as one studio. The layout, type and code-drawn covers from the Floodlights work stay.

## Palette

```css
:root {
  --base: #112F2C; /* Deep Slate Green: page background */
  --panel: #183E3A; /* panels and image frames */
  --panel-raised: #1E4A45; /* hover and raised panels */
  --text: #FBE6A0; /* Naples Yellow: text and cover lines */
  --text-muted: #CFC7A3; /* secondary text */
  --text-faint: #B9B392; /* captions */
  --line: rgba(251, 230, 160, 0.18); /* rules */
  --line-strong: rgba(251, 230, 160, 0.35);
  --cover-line: rgba(251, 230, 160, 0.5);
  --accent: #F48067; /* Grenadine Pink: the one accent */
  --accent-hover: #F79A85;
  --on-accent: #112F2C; /* text on the accent */
  --second: #E2B540; /* Yellow Ocher: the price list and one block per page */
  --on-second: #112F2C;
  --on-second-muted: #2C4A3A;
}
```

In code these are the `--color-studio-*` tokens in `app/tokens.css`.

- Grenadine is the primary button, the highlighted element in a cover, and one highlight per page. Text on it is always base green, never cream.
- Ochre is a second block colour: the price list, and at most one other block per page. Text on it is base green.
- Grenadine as text only on the base or on panels (4.5:1 and up), never on raised panels.
- Contrast: text on base 11.5:1, muted 8.4:1, faint 6.8:1, button text 5.5:1, text on ochre 7.4:1.

## Type

- Big Shoulders Display 800 for h1, h2 and big numbers. Sentence case.
- Atkinson Hyperlegible 400 and 700 for everything else.
- Two families only. No monospace anywhere on studio pages.

## Homepage order

1. Hero: headline, one paragraph, Get a quote, client shots and a game cover in the first viewport.
2. Projects: the games and tools.
3. How the games work.
4. What it costs: the scoreboard, then the four steps.
5. Sites I've built.
6. Questions people ask.
7. Tell me what you need: photos of Ryan and Rudi, contact.

## Banned

These are why the old site read as generated:

- All-caps labels or eyebrows above headings.
- Monospace labels.
- Strings joined with middle dots.
- Pill tech tags.
- Status dots.
- Corner arrows on cards.
- Underlines on single headline words.
- Grid-line or glow backgrounds.
- Noise textures.
- Fade-up on scroll.
- Identical card grids for everything.
- Two-part slogan headings ("Four steps, no surprises.").

## Keep

The code-drawn covers and their hover motion. They're the best thing on the site.
