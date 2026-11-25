#!/usr/bin/env bash
# Design check for the studio pages (see docs/brief.md and the anti-AI look rules).
# Scope: homepage, studio components and studio.css only. Games and tools get their own pass later.
# Allow a line on purpose by adding the comment: design-ok
set -u

FILES=(
  "app/(site)/page.tsx"
  "app/(site)/studio.css"
  components/studio
  components/home
)

PATTERN='(bg|text|border|from|via|to|ring|shadow|fill|stroke)-\[#|indigo|violet|purple|bg-clip-text|backdrop-blur|rounded-(2xl|3xl)|tracking-widest|uppercase|text-transform: *uppercase|gray-[0-9]|zinc-|neutral-|stone-|delay: *i(ndex)? *\*|unsplash|data-mb-reveal|ArrowRightIcon|linear-gradient|radial-gradient|—'

hits=$(grep -rnE "$PATTERN" "${FILES[@]}" 2>/dev/null | grep -v "design-ok")

if [ -n "$hits" ]; then
  echo "$hits"
  echo
  echo "Design check failed: $(echo "$hits" | wc -l | tr -d ' ') hit(s)"
  exit 1
fi

echo "Design check passed"
