# Prompt 03 - Clean up duplicate " 2" files (carefully)

## Problem
The repo is littered with Finder/iCloud duplicate files ending in " 2"
(e.g. `sitemap 2.ts`, `ContactForm 2.tsx`, `games-catalog 2.ts`, `cv 2.pdf`).
Some are risky and must not be blind-deleted:

- `lib/games-catalog 2.ts` DIFFERS from `lib/games-catalog.ts`.
- `lib/coming-soon-projects 2.ts` and `lib/coming-soon-roadmap 2.ts` have NO
  non-" 2" original - so a " 2" file may be the only real version.
- `.git/refs/heads/main 2.lock` is a stale git lock that can block git ops.

## Task (do the checks before deleting anything)

1. List every offender (ignore `.next`, which is build cache):
   ```bash
   find . -path ./node_modules -prune -o -path ./.next -prune -o -name "* 2.*" -print
   ```

2. For each " 2" file, check whether anything imports the base name and whether
   the base file exists:
   - If a clean, non-" 2" original exists AND `diff` shows them identical ->
     delete the " 2" copy.
   - If they DIFFER -> open both, decide which is current, keep one, delete the
     other, and fix imports.
   - If ONLY the " 2" file exists (no original) -> rename it to the proper name
     (drop the " 2") and update any imports. Check `lib/coming-soon-projects` and
     `lib/coming-soon-roadmap` are actually imported somewhere; if not, they may
     be dead - confirm before removing.

3. Duplicate route/page files (`page 2.tsx`, `robots 2.ts`, `sitemap 2.ts`) are
   NOT recognised by Next's router (only exact `page.tsx` / `sitemap.ts` are).
   They're dead weight - delete after confirming the real file is correct.

4. Delete `.git/refs/heads/main 2.lock` (stale lock), `public/cv 2.pdf`,
   `public/images/**/*slot 2.svg`, and the duplicate contact components once
   confirmed unused.

5. Add a `.gitignore` guard and consider disabling iCloud "Optimise Mac Storage"
   on this folder to stop the duplicates regenerating.

6. `npm run build` + `npm run lint` to confirm nothing broke.

## Acceptance
- `find . -path ./node_modules -prune -o -path ./.next -prune -o -name "* 2.*" -print`
  returns nothing.
- Build and lint pass.
