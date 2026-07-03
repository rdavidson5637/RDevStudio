# Prompt 02 - Add Person + WebSite structured data

## Why
This site's job is partly to get Ryan hired. Adding JSON-LD lets Google
understand who he is, link his profiles, and potentially show a knowledge
panel. Zero visual change, real SEO upside.

## Task

1. Create `components/StructuredData.tsx` - a server component that renders a
   `<script type="application/ld+json">` tag. Accept the JSON object as a prop
   and `JSON.stringify` it.

2. In `app/(site)/layout.tsx` (or the root layout that wraps the site group),
   render two JSON-LD blocks sourced from `lib/constants.ts`
   (`SITE_URL`, `CONTACT_EMAIL`, `GITHUB_URL`, LinkedIn URL - move the LinkedIn
   URL out of the contact page into constants first):

   ```ts
   const person = {
     "@context": "https://schema.org",
     "@type": "Person",
     name: "Ryan Davidson",
     url: SITE_URL,
     email: CONTACT_EMAIL,
     jobTitle: "Web Developer & Product Designer",
     address: {
       "@type": "PostalAddress",
       addressLocality: "Carrickfergus",
       addressRegion: "Northern Ireland",
       addressCountry: "GB",
     },
     sameAs: [GITHUB_URL, LINKEDIN_URL],
     knowsAbout: ["Next.js", "React", "TypeScript", "Web Design", "Supabase"],
   };

   const website = {
     "@context": "https://schema.org",
     "@type": "WebSite",
     name: "RDev Studio",
     url: SITE_URL,
   };
   ```

3. Fix the location inconsistency: `lib/metadata.ts` OG alt text says
   "in Belfast" but the site says Carrickfergus. Make them consistent
   (Carrickfergus, Northern Ireland).

## Acceptance
- View source shows both JSON-LD blocks.
- Passes Google's Rich Results test.
- `npm run build` passes.
