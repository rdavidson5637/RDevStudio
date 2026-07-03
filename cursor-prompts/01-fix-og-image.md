# Prompt 01 - Replace the SVG OG image with a real PNG

## Problem
`lib/metadata.ts` points Open Graph and Twitter cards at
`/images/og/og-image-slot.svg`. Social platforms (LinkedIn, Facebook, X,
WhatsApp, iMessage) do not render SVG OG images, so every shared link currently
shows no preview image. OG images must be raster (PNG/JPG), 1200x630.

## Task

1. Create a real 1200x630 OG image at `public/images/og/og-image.png`. Two ways:
   - **Static asset:** design it in Figma/Canva on the dark `#0A0A0F` base with
     the amber `#F59E0B` accent and DM Serif Display wordmark "RDev Studio",
     subtitle "Ryan Davidson - Design & Development, Northern Ireland". Export
     as PNG and drop it in.
   - **Generated (preferred, stays in sync):** add a Next.js dynamic OG route
     at `app/opengraph-image.tsx` using `ImageResponse` from `next/og`, so the
     image is generated from code and matches the brand. Give it
     `size = { width: 1200, height: 630 }` and `contentType = 'image/png'`.

2. Update `lib/metadata.ts`: replace both `ogImage` references (in
   `createPageMetadata` and `rootMetadata`) to use the new PNG path
   (`${SITE_URL}/images/og/og-image.png`), or remove the explicit `images`
   array entirely if you use `app/opengraph-image.tsx` (Next wires it up
   automatically).

3. Delete the now-unused `public/images/og/og-image-slot.svg` (and its
   `og-image-slot 2.svg` duplicate - see prompt 03).

4. Verify with `npm run build`, then test the preview with
   https://www.opengraph.xyz once deployed.

## Acceptance
- Sharing any page URL shows a branded 1200x630 preview image.
- `npm run build` passes.
