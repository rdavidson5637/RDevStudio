# R3 - Guitar Lab

Build in: **Cursor** for the interface, **Claude Code** for the engine work and the scaffold.
Estimate: a fortnight, and it will run over. It is the biggest of the four.
Depends on: R2 published.

---

## 1. What it actually is

You said it should show all chords and be a very cool tool for finding new chords and progressions. That is three distinct products, so pick the order:

1. **Fretboard viewer.** Scales and modes overlaid on a fretboard, tuning and capo aware. Table stakes, everyone has one, yours has to look better.
2. **Chord finder.** Two directions: name to shapes (give me every playable voicing of Cmaj7), and shapes to name (I am holding these frets, what is this chord). The second direction is rarer and is the one people bookmark.
3. **Progression tool.** Diatonic options in the current key plus borrowed chords, secondary dominants, and voice-leading-aware next-chord suggestions on the fretboard.

Practice mode tied to your curriculum milestones is feature four and should not be in v1. Ship 1 and 2, then decide.

## 2. Stack

- Next.js 14 App Router, TypeScript, Tailwind, in the rdevstudio repo under `app/guitar-lab`.
- `@rdevstudio/theory` from R2 for all note and scale logic. If you catch yourself writing theory maths in this repo, it belongs in the package instead. That discipline is the point of doing R2 first.
- **SVG for the fretboard, not canvas.** You get DOM events per fret dot for free, CSS transitions for free, accessibility for free, and it is crisp at any zoom. Canvas only becomes right above roughly 2,000 animated elements and a fretboard has under 150.
- Audio: **smplr** (danigb) with an acoustic or electric guitar soundfont, loaded lazily on first user interaction. Do not create an AudioContext on mount, browsers will block it and you will get a console full of warnings.
- State: URL as the source of truth. `?tuning=DADGBE&capo=2&key=Bb&scale=dorian&chord=Cmaj7`. Every view is shareable and the back button works. This is a ten-minute decision that makes the whole app feel finished.

## 3. Fretboard rendering

One `<Fretboard>` component, everything else is props.

```ts
type FretboardProps = {
  tuning: string[]          // ['E2','A2','D3','G3','B3','E4'] low to high
  capo: number              // 0-12, shifts the nut
  frets: number             // default 15, 22 for the full neck
  markers: Marker[]         // { string, fret, label, role, emphasis }
  orientation: 'horizontal' | 'vertical'
  handedness: 'right' | 'left'
}
```

Details that separate a good fretboard from a student one:

- **Proportional fret spacing.** Real frets follow the rule of 18, each fret position is `scale_length * (1 - 1/2^(n/12))`. Equal-width frets look wrong to anyone who plays. This is four lines of maths and it is the single biggest visual tell.
- **String gauge.** Low E renders thicker than high E. Vary stroke width from about 2.4 to 1.0.
- **Inlays** at 3, 5, 7, 9, double at 12, 15, 17, 19, double at 24.
- **Capo** renders as a bar and shifts the effective open position. Every marker below the capo is greyed, not hidden, so users understand what changed.
- **Colour by degree, not by note.** Root, third and seventh get the strong colours (amber `#F59E0B` for root, on `#0A0A0F`), the rest sit in a muted ramp. Never colour twelve notes twelve different colours, it is unreadable.
- **Drop D and any alt tuning** are just a different `tuning` array. Do not special-case drop D anywhere in the code.
- Left-handed is a CSS transform on the group plus reversed labels, not a second component.

Performance: memoise the marker calculation on the tuning, capo, key and scale. Do not recompute on hover.

## 4. Chord finder, the interesting half

**Name to shapes.** Generate voicings rather than shipping a hardcoded chord database. A database of 2,000 shapes is a data entry project and it will be missing whatever the user wants. Generation is the better engineering story and it is not hard:

1. Take the chord's pitch classes from R2.
2. For each string, enumerate every fret 0 to 15 whose note is in the chord.
3. Cartesian product across strings, allowing muted strings.
4. Filter by playability: fret span at most 4 (at most 3 below fret 5), no more than four fingered notes unless a barre is detected, no interior muted strings unless the shape is a known skip shape, root in the bass unless the user asked for an inversion.
5. Score and rank: prefer complete chords (root, third, seventh present), then fewer fingers, then lower position, then open strings.
6. Assign fingering with a small greedy solver: lowest fret gets index, then assign in ascending fret order, promote to a barre when two or more notes share the lowest fret on non-adjacent strings.

Return the top 8 to 12 ranked voicings with a difficulty rating. Cap the search, prune early, and it runs in a couple of milliseconds.

**Shapes to name.** User clicks frets on the fretboard, you name what they are holding. Take the sounding pitch classes, try each as root, match against a chord quality table (triads, sixths, sevenths, ninths, elevenths, thirteenths, sus, add, altered dominants), and rank candidates by how well the bass note matches the root and by how few assumed omissions are needed. Return ranked names with the interval spelling shown, for example "Cmaj9, no 5th" or "Am7, second inversion". Show the alternatives, not just the winner. This is the feature guitarists screenshot.

**Chord discovery.** The "find new chords" bit you asked for: given a key, list chords that are diatonic, chords one accidental away, and voicings of the current chord that share two or more fretted notes with the previous chord so the change is physically easy. That last filter, shapes near the shape you are already holding, is the feature nobody else has and it is the one to build first once the basics work.

## 5. Progressions

- Diatonic options in the current key as numerals, from R2.
- Borrowed chords from the parallel mode, labelled with where they came from.
- Secondary dominants, `V/x` for each diatonic target.
- Common progressions preset list, transposed into the current key.
- Next-chord suggestions scored by root motion (down a fifth strongest), shared tones, and fretboard distance from the current shape.
- Playback: strum each chord with smplr, 90 to 120 bpm, slight strum offset per string of 20 to 35 ms. A simultaneous six-note attack sounds like a piano, not a guitar.

## 6. Build order

1. Scaffold, URL state, `@rdevstudio/theory` wired in. **Claude Code.**
2. `<Fretboard>` with proportional spacing, tuning and capo. **Cursor**, this is where you iterate visually.
3. Scale and mode overlay with degree colouring. **Cursor.**
4. Voicing generator plus fingering solver, with unit tests. **Claude Code**, it is pure logic with a test loop.
5. Chord finder UI, both directions. **Cursor.**
6. Audio. **Cursor.**
7. Progression tool. Mixed.
8. Practice mode, only if the first seven are actually finished.

## 7. Prompt batches

**Claude Code, batch 1.** "Scaffold app/guitar-lab in the rdevstudio repo. Next.js App Router, TypeScript, Tailwind, RDev design tokens. Install @rdevstudio/theory. Implement URL-as-state with the params in docs/specs/r3-guitar-lab.md section 2, using nuqs or searchParams. No fretboard yet, just a page that reads and writes the state and renders it as JSON."

**Cursor, then:** build `<Fretboard>` by hand with the agent in composer, iterating visually. Give it section 3 as context and expect to go back and forth on spacing and colour for an hour. That hour is why it is in Cursor.

**Claude Code, batch 2.** "Implement the voicing generator and fingering solver in lib/guitar/voicings.ts per section 4. Pure functions, no React. Write vitest tests covering: open C major returns x32010 in the top three results, Cmaj7 returns at least 8 valid voicings, drop D tuning changes the results, a shape with a 5 fret span is rejected, and F major returns a barre shape with correct finger assignment."

**Claude Code, batch 3.** "Implement chord identification, shapes to name, per section 4. Tests must cover inversions, omitted fifths, sus chords, and at least one genuinely ambiguous shape where two names are both correct and both must be returned."

**Cursor** for everything after that.

## 8. The honest risk

This is the project most likely to stall, because the fretboard is fun to polish and the chord engine is where the value is. Timebox the visual work. If the fretboard has eaten more than two evenings before the voicing generator exists, stop and go build the generator.
