# RDev Studio — EPAM-inspired redesign (Claude Code / Antigravity paste)

Repo: `rdavidson5637/RDevStudio`  
Branch: `concept/epam-redesign` off **main** (concept / Vercel preview only — **no production / no main merge** without Ryan).

Instagram everywhere: **@mgsldavi** (not @rdevstudio_).

## Locked product decisions
- Nav: Work / Services / Charities / About / Contact
- Homepage: Stout Finder demoted to **Lab** (not hero case study)
- Primary CTA voice: **Get a fixed quote**
- Case studies: challenge → solution → result
- Draft copy OK; no invented client metrics
- Open PRs: keep #12 mobile polish; keep #13 improvements; **#15 homepage rework** — reconcile with this IA (do not blindly merge #15 if it fights the new nav/order). Prefer implementing the new IA on this concept branch rather than stacking on #15.
- No client emails/DMs/posts

## Build
1. Create `concept/epam-redesign` from latest `main`.
2. Restructure IA/pages to match nav above; enterprise/agency hierarchy inspired by epam.com (clear services, work, proof, CTA) — not a visual clone.
3. Homepage: hero + primary CTA, featured work (ShelterLink / Assisi / Crosskennan concept as appropriate), services strip, charities/good-causes band, Lab (Stout Finder + experiments).
4. Keep mobile quality from #12 patterns where useful.
5. Deploy **Vercel preview** for the concept branch. Do not promote to production.
6. When done: open a **draft** PR titled like `concept: EPAM-inspired IA (preview only)` with the preview URL in the body.

## Done when
- Preview URL works on phone + desktop
- Nav + CTA + Lab demotion visible
- Draft PR + preview link posted
- `post_update` on rdev-coord project `RDev Studio / ops` with preview URL
- Release claim `epam-redesign` / note status if Antigravity held it

Investigate the repo yourself. Prefer small commits.

## Already in progress on this machine
You are in `/Users/ryandavidson/Projects/rdev-studio/rdevstudio` on branch `concept/epam-redesign` with many uncommitted changes (new Hero, Lab, ServicesGrid, nav edits, etc.). Finish what is started — do not reset or discard. Commit in small logical commits, push the branch, open a **draft** PR, and get a Vercel preview URL. No production deploy. When done, write the PR URL and preview URL to `/Users/ryandavidson/otis-dispatch/rdev-epam-result.txt`.
