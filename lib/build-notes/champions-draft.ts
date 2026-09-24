import type { BuildNote } from "./types";

export const championsDraftNote: BuildNote = {
  slug: "champions-draft",
  title: "Champions Draft",
  kicker: "Browser-only game engine",
  summary:
    "A spin-and-pick football draft game my mates play: build an XI one random classic squad at a time, then take it through a league, a Champions League or a World Cup.",
  stack: [
    "Next.js 15 App Router",
    "TypeScript",
    "React 18",
    "Tailwind CSS",
    "html-to-image",
    "Formspree",
  ],
  links: [
    { label: "Play Champions Draft", href: "/champions-draft" },
    { label: "Play Rugby Draft", href: "/rugby-draft" },
  ],
  facts: [
    { label: "Status", value: "Live" },
    { label: "Draft pool", value: "900 players from 50 classic squads" },
    { label: "Modes", value: "3 tournaments, 5 formations" },
    { label: "Follow-on", value: "Rugby Draft, 15 positions, 3 modes" },
  ],
  tldr: {
    problem:
      "A draft game has to feel fair and quick. Every spin should offer someone who fits, and results should follow squad strength without being a foregone conclusion.",
    built:
      "A client-only game: static squad data, a phase machine in one React state object, a small Poisson match model in plain TypeScript, and a result card that exports as a PNG. Rugby Draft is a fork of it.",
    hardPart:
      "Tournament structure more than the maths: a 36-team league phase with 8 games each, split 4 home and 4 away, and never offering a squad with nobody for your open slots.",
  },
  context: [
    "You pick a mode and a formation, then spin. The game draws a random classic squad, say Arsenal 2003-04, and you take one player who fits an open position. Eleven spins, then your XI plays a tournament.",
    "It lives on the studio site in its own route group, so the game gets the full screen. It came into this repo as one commit (9bc364e), and Rugby Draft followed the next day (c7b2ba0). No accounts, no backend, no live multiplayer.",
  ],
  goals: [
    "Keep a run short: eleven spins, then a tournament you can watch, speed up or skip.",
    "Make positions matter without making the draft impossible, so a right-back can cover right wing-back.",
    "Results that follow team ratings but still throw up upsets.",
    "A result worth sharing as an image, with no server to run.",
  ],
  nonGoals: [
    "Live drafting against mates. There's no Pusher and no rooms.",
    "Accounts, saved runs or leaderboards.",
    "Realism. Each player is one overall number and the model is a handful of tuned constants.",
  ],
  architecture: {
    summary:
      "The page is a server component that sets metadata and renders a client GameShell. Squads are static JSON, split into pools at module load in lib/champions-draft/data.ts. GameShell holds one GameState in useState and switches on its phase. Each tournament component keeps its own fixtures and tables. The match maths is plain TypeScript with no React in it.",
    parts: [
      {
        name: "GameShell",
        role: "Owns the GameState and routes each phase, from mode select to the tournament.",
      },
      {
        name: "DraftEngine",
        role: "Spins an unused squad with at least one player for an open slot, then drops the pick into the first compatible slot.",
      },
      {
        name: "lib/champions-draft/utils.ts",
        role: "Formations, the position compatibility map, team ratings and the single-match model.",
      },
      {
        name: "lib/champions-draft/matchEngine.ts",
        role: "League seasons, the Champions League league phase and knockouts, World Cup groups.",
      },
      {
        name: "MatchAnimation",
        role: "Replays a result that's already decided, at normal, fast or skip speed.",
      },
      {
        name: "Share card",
        role: "html-to-image renders the card to a PNG for the Web Share API, with download and text fallbacks.",
      },
    ],
    flowTitle: "One run, from spin to share card",
    flow: [
      {
        from: "Player",
        to: "GameShell",
        action: "Pick mode, league or nation, and formation. The formation builds 11 empty slots.",
      },
      {
        from: "DraftEngine",
        to: "data.ts",
        action: "Shuffle the pool, drop used squads, return the first with a player for an open slot.",
      },
      {
        from: "Player",
        to: "DraftEngine",
        action: "Take one player. After the 11th, calculateTeamRatings produces attack, midfield, defence and keeper.",
      },
      {
        from: "Tournament",
        to: "matchEngine.ts",
        action: "Simulate the whole stage in one pass and sort the table.",
      },
      {
        from: "MatchAnimation",
        to: "Player",
        action: "Replay your games, placing goals at random minutes that add up to the final score.",
      },
      {
        from: "Share card",
        to: "Web Share API",
        action: "toBlob at 2x, share as a file where canShare allows it, otherwise download.",
      },
    ],
  },
  decisions: [
    {
      title: "Everything runs in the browser",
      context:
        "It's single-player. Squad data never changes mid-run and there's nothing to sync.",
      decision:
        "Ship the squads as static JSON and keep all state in React. No API routes, no database, no Pusher.",
      alternatives:
        "Supabase tables for squads and saved runs, or a Pusher room so mates could draft live against each other.",
      consequences:
        "Nothing to host, and a whole season simulates instantly on a phone. The browser downloads the full dataset up front, about 440 KB minified for the four football files, roughly 75 KB gzipped. A refresh loses the run.",
    },
    {
      title: "Rate teams by position group",
      context:
        "I wanted ratings you can read at a glance, and one model for a drafted XI and every opponent.",
      decision:
        "calculateTeamRatings averages overall within four groups by each player's own position. Team overall is the mean of the four. Goals are Poisson draws off the rating gap plus attack against defence, with +2 rating at home, a cap on the winning margin and a maximum of 4.",
      alternatives:
        "Use the six face stats (PAC, SHO and the rest) per slot, or simulate events player by player.",
      consequences:
        "Cheap and easy to explain. Two equal sides average about 2 goals a game. The trade-offs are plain: the keeper alone is a quarter of the rating, and the face stats on the cards never touch a result. Opponents are rated off their whole 18-man squad, bench included.",
    },
    {
      title: "Simulate first, animate second",
      context: "Watching results tick in is half the fun, but a 40-game season has to be skippable.",
      decision:
        "Simulate each stage in one pass, then let MatchAnimation replay your games from the finished results.",
      alternatives: "Drive the simulation from the animation clock, minute by minute.",
      consequences:
        "Speed is presentation only: 3.5 seconds a match on normal, 1.2 on fast, instant on skip, and none can change a score. Rugby's World Cup and Champions Cup went the other way and simulate each fixture just before it plays, so pool tables update live.",
    },
    {
      title: "Fork the engine for rugby",
      context:
        "Rugby needed 15 fixed positions, tries and conversions instead of goals, 4 points for a win plus try and losing bonus points, and pools feeding fixed quarter-final brackets.",
      decision:
        "Copy the structure into lib/rugby-draft and components/rugby-draft with their own types and change what differs. Nothing in rugby imports from Champions Draft. Forwards are rated on strength and tackling, backs on handling and speed.",
      alternatives: "One shared engine parameterised by positions, ratings and scoring rules.",
      consequences:
        "Rugby shipped in one commit without touching the live football code. The cost is duplication: shareCardImage.ts is identical in both. The copies are drifting too. Rugby's Play Again does a full reset through exitDraft, while the football end screens build partial resets by hand.",
    },
  ],
  incidents: [
    {
      title: "The fifth draft stalled at six picks",
      symptom:
        "Play a few drafts in a row without quitting or refreshing, and the fifth one got stuck part way: the spin had no squads left to offer.",
      cause:
        "Every New Draft button reset the phase but kept usedSquadIds and usedPlayerIds. Each draft outside National Squad mode takes 11 of the 50 classic squads, so the pool ran out on the fifth go.",
      fix: "Going back to mode select now resets GameShell to its initial state in one place (keeping the speed setting), instead of each button clearing its own list of fields.",
      commit: "e8f6963",
    },
    {
      title: "Back link sat on top of the Quit button",
      symptom:
        "A fixed \"RDev Studio\" pill showed on every game screen, and on the draft it landed right over the Quit Draft button.",
      cause:
        "It lived in app/(game)/layout.tsx as fixed top-4 left-4 z-50, so it wrapped every phase. A tap mid-draft would leave the page, and the run only exists in React state.",
      fix: "Took it out of the layout and put it in ModeSelect, so it only shows on the main menu.",
      commit: "5b37ee4",
    },
    {
      title: "Share sent a link, not the card",
      symptom:
        "Share on the result card sent a line of text and a URL. The card itself couldn't be shared as a picture.",
      cause:
        "ShareCardActions only called navigator.share with title, text and url, falling back to the clipboard. Nothing turned the card into an image.",
      fix: "Added html-to-image. The card renders to a PNG at 2x and goes to the share sheet as a file when navigator.canShare accepts it, otherwise it downloads. If capture fails it falls back to text, then clipboard.",
      commit: "fdc5bff",
    },
  ],
  testing: [
    "No automated tests cover either game. Nothing under lib/champions-draft or lib/rugby-draft has a test file.",
    "The repo already runs Vitest and the engines are pure TypeScript, so they'd slot straight in.",
    "The engines call Math.random directly with no seed, so tests would have to check distributions rather than exact scores.",
    "The feedback loop is an in-game bug report button (62a9656) that sends the current phase, mode and formation through Formspree. The scheduler numbers below come from running the engine functions directly with tsx, 10,000 times.",
  ],
  gaps: [
    "No tests. The match model, the Champions League scheduler and the spin logic need them first.",
    "buildCLLeaguePhase schedules greedily with no backtracking. Over 10,000 runs, about 7 in 10 left at least one club short of 8 games, and about 4 in 100 left your own XI short.",
    "Goals aren't tracked per player. The top scorer is the first forward or wide player in slot order, credited with 35% of the team's league goals.",
    "League coverage is uneven: 20 modern squads each for the Premier League and La Liga, 4 for Serie A, 3 for the Bundesliga, 2 for Ligue 1. A Ligue 1 season is four matches.",
  ],
  codeLinks: [
    { label: "Formations, ratings and match model", path: "lib/champions-draft/utils.ts" },
    { label: "Seasons, Champions League and World Cup", path: "lib/champions-draft/matchEngine.ts" },
    { label: "Spin and pick", path: "components/champions-draft/DraftEngine.tsx" },
    { label: "Phase machine", path: "components/champions-draft/GameShell.tsx" },
    { label: "Match replay", path: "components/champions-draft/MatchAnimation.tsx" },
    { label: "Share card to PNG", path: "components/champions-draft/shareCardImage.ts" },
    { label: "Rugby positions and bonus points", path: "lib/rugby-draft/utils.ts" },
    { label: "Rugby tries to points", path: "lib/rugby-draft/matchEngine.ts" },
  ],
};
