import type { BuildNote } from "./types";

export const pubQuizNote: BuildNote = {
  slug: "pub-quiz",
  title: "Pub Quiz",
  kicker: "Real-time multiplayer",
  summary:
    "A live pub quiz for a group of mates: one host, everyone else on their phone, an optional TV view, and questions written by Claude when the game starts.",
  stack: [
    "Next.js 15 App Router",
    "TypeScript",
    "Tailwind CSS",
    "Pusher Channels",
    "Redis over REST (Vercel KV / Upstash)",
    "Claude API",
    "Vercel",
  ],
  links: [{ label: "Play Pub Quiz", href: "/pub-quiz" }],
  facts: [
    { label: "Status", value: "Live" },
    { label: "Started", value: "June 2026" },
    { label: "API routes", value: "16" },
    { label: "Realtime events", value: "17 typed Pusher events" },
    { label: "Round formats", value: "5" },
  ],
  tldr: {
    problem:
      "Run a real-time quiz with a buzzer round on Vercel, where no function lives long enough to hold a socket or run a countdown.",
    built:
      "Route handlers that own the game state in Redis, Pusher to push events to every phone, and a Claude question generator with validation and a hardcoded fallback.",
    hardPart:
      "Deciding who buzzed first and keeping screens in step with no long-running server.",
  },
  context: [
    "The host creates a game, picks up to 4 rounds from 5 formats (standard, picture, music, buzzer, risk) and 10 categories, and shares a 6-character code or QR. Players join on their phones. A presenter view can go on the telly.",
    "It runs on Vercel, so every API route is a short-lived function. Nothing can hold a WebSocket open, and nothing is running when a timer hits zero. That shaped most of what follows.",
  ],
  goals: [
    "Every phone shows the same question, timer and scores without a refresh.",
    "The server marks answers, keeps score and orders buzzes. Correct answers never reach a client before the reveal.",
    "Fresh questions every game, and the game still starts if Claude fails.",
  ],
  nonGoals: [
    "Accounts. A player is a random UUID in sessionStorage.",
    "Anti-cheat. Everyone is at the same table.",
    "History. A game expires from Redis 4 hours after its last write.",
  ],
  architecture: {
    summary:
      "Clients hold no state that matters. Every action is a POST to a route handler that loads the game, checks it, changes it, saves it and publishes an event. Once play starts, clients also poll the state endpoint, so a missed event costs seconds, not the game.",
    parts: [
      {
        name: "Next.js route handlers",
        role: "16 routes under app/api/quiz: load, validate, mutate, save, publish, return.",
      },
      {
        name: "Redis over REST",
        role: "One JSON blob per game with a 4-hour TTL, fronted by a Map cache on globalThis.",
      },
      {
        name: "Pusher Channels",
        role: "One channel per game. The server publishes, clients only listen.",
      },
      {
        name: "Claude API",
        role: "Writes each round's questions as JSON when the host presses start.",
      },
      {
        name: "sessionStorage",
        role: "Holds the player's ID and a lobby snapshot for reloads and recovery.",
      },
      {
        name: "Presenter view",
        role: "Read-only TV page that refetches state when any of 8 events fires.",
      },
    ],
    flowTitle: "One buzzer question",
    flow: [
      {
        from: "Host",
        to: "/api/quiz/next",
        action: "Checks the host secret, advances the question, saves to Redis.",
      },
      {
        from: "/api/quiz/next",
        to: "Pusher",
        action:
          "game:question, answer stripped, with questionStartedAt and the time limit.",
      },
      {
        from: "Players",
        to: "/api/quiz/buzz",
        action: "First request to find no active buzz wins. The rest get a 409.",
      },
      {
        from: "/api/quiz/buzz",
        to: "Pusher",
        action: "game:buzz. Other buzzers lock and every countdown freezes.",
      },
      {
        from: "Host",
        to: "/api/quiz/buzz-answer",
        action:
          "Right: points and a reveal. Wrong: minus 50, lockout, and a shifted start time so clocks resume.",
      },
      {
        from: "Clients",
        to: "/api/quiz/state",
        action: "Poll every 2.5 seconds after the lobby in case an event went missing.",
      },
    ],
  },
  decisions: [
    {
      title: "Pusher for sockets, plain HTTP for everything else",
      context:
        "Vercel functions end when the response goes out, but a buzz has to reach every phone straight away.",
      decision:
        "Every action is a POST. The route updates state, then calls Pusher's HTTP API, which fans out over sockets Pusher holds. Routes await the publish before returning so it isn't lost when the function freezes.",
      alternatives:
        "A Socket.IO server on another host, which is another box to run and pay for. Polling only, which makes a buzzer feel slow.",
      consequences:
        "Every action costs a request plus a publish. Event payloads share one GameEventMap type across server and client.",
    },
    {
      title: "The server owns state, as one Redis blob",
      context:
        "The first version kept games in an in-memory Map, which on serverless belongs to one instance.",
      decision:
        "The whole GameState goes to one Redis key with a Map cache in front. Clients only see toPublicGameState, which strips the answer until the reveal.",
      alternatives:
        "Postgres tables, a lot of schema for something that lives one evening. A Redis hash per game, more commands per request.",
      consequences:
        "One GET or SET per request. No version check, so the last write wins and a warm instance trusts its cache. Fine on one instance, not on two.",
    },
    {
      title: "The host proves it with a secret, not the public player id",
      context:
        "hostId is on every state poll, so any phone in the room could call the host routes and skip, kick, or advance the quiz.",
      decision:
        "Create issues a random host secret, stored on the game and in the host's session only. Host routes check that secret. Public state, the lobby cache, and Pusher payloads leave it out.",
      alternatives:
        "Trust hostId, which is what made the hole. A login, which a pub quiz does not need.",
      consequences:
        "A quiz created before secrets existed cannot be hosted until it is started again. Rehydrate sends the secret back with the lobby snapshot so a refresh still works.",
    },
    {
      title: "Buzz order by arrival, clocks as timestamps",
      context:
        "Phone clocks and Wi-Fi both vary, and nothing on the server is running when time runs out.",
      decision:
        "/api/quiz/buzz checks and sets activeBuzz with no await in between, so on a warm instance two buzzes can't both win. The server stores questionStartedAt and each client counts down from it. In normal rounds a phone submits an empty answer at zero. A wrong buzz moves questionStartedAt forward by the pause.",
      alternatives:
        "Client timestamps, which are unreliable and easy to fake. A scheduled function to fire the reveal, another service for a wait of 90 seconds at most.",
      consequences:
        "Bad signal loses ties. One dropped phone stalls the reveal until the host hits skip-waiting.",
    },
  ],
  incidents: [
    {
      title: "Join codes that could never be joined",
      symptom:
        "Players typing the code off the host's screen, or scanning the QR, got 'Game not found' for most games. The host was fine.",
      cause:
        "Codes were drawn from A-Z, a-z and 0-9. The join form, the ?join= invite link and the presenter route all upper-case the code, and Redis keys are case-sensitive, so any code with a lower-case letter (about 96% of them) pointed at a key that didn't exist.",
      fix: "Codes are now upper case and digits only, with 0/O and 1/I left out so a code read off a pub TV can't be misread.",
      commit: "e8f6963",
    },
    {
      title: "Everyone's answers were in the state poll",
      symptom:
        "Nothing on screen, but the state endpoint every phone polls carried each player's answers, so the rest of the table's picks were readable before the reveal.",
      cause:
        "toPublicGameState stripped the correct answer from the question but sent the players array as it was stored, answers and all.",
      fix: "Players go out with an empty answers list. No client read it anyway, so nothing else changed.",
      commit: "0408cf8",
    },
    {
      title: "Games vanished between instances",
      symptom:
        "A game only existed on the instance that created it. Requests landing elsewhere got 'Game not found', and only a lobby could be rescued, via /api/quiz/rehydrate.",
      cause:
        "game-store.ts was a plain Map with a TODO saying state reset on restart, pinned to globalThis only outside production.",
      fix: "Added kv-store.ts and made the store async write-through to Redis with a 4-hour TTL, pinned the Map in production, and added the 2.5 second state poll.",
      commit: "70d8ed3",
    },
    {
      title: "Fallback questions ran dry",
      symptom:
        "When Claude failed, fallback rounds came back short, and shorter the longer an instance stayed warm.",
      cause:
        "Fallbacks went into the used-question history and the picker only returned unused ones. General had 5 fallbacks for a 10-question round.",
      fix: "Fallback IDs skip the history, the picker reuses the pool when it runs out, and General went to 10.",
      commit: "70d8ed3",
    },
    {
      title: "Music clips failed silently",
      symptom: "If the browser refused a clip, the play button just did nothing.",
      cause:
        "AudioPlayer handled the element's error event but not a rejected play() promise, which is what a blocked playback gives you.",
      fix: "Both play() calls now catch and switch to the 'Audio unavailable' card.",
      commit: "afd47cf",
    },
  ],
  testing: [
    "Vitest checks the two things that went wrong in production: 5,000 generated join codes all survive being upper-cased, and players' answers never make it into what other clients see.",
    "The route handlers themselves have no tests yet. They rely on runtime checks: every route validates body, game status and membership before changing anything.",
  ],
  ai: [
    "ai-generator.ts calls the Messages API with plain fetch, one call per round, all rounds in parallel. The model is hard-coded as claude-sonnet-4-6; the key is ANTHROPIC_API_KEY.",
    "The prompt carries category topics, format rules, difficulty, the game ID as a seed, and the last 40 used questions to avoid.",
    "I strip markdown fences, JSON.parse, and validate each item. Multiple choice needs exactly 4 options including the answer; picture questions need a Wikimedia URL and alt text. Bad items are dropped.",
    "Picture images are fetched with a 2 KB range request before use. Claude never supplies audio; the server attaches Internet Archive clips.",
    "Creating, starting and previewing a quiz are rate limited per IP, counted in Redis so the limit holds across instances.",
    "If the call fails or comes up short, the round tops up from 47 hardcoded questions across 10 categories, or the picture and music pools.",
  ],
  gaps: [
    "The cache is never rechecked against Redis and writes are a plain SET, so two warm instances can drift. The buzz check is only atomic within one process.",
    "The trust model is 'everyone is at the same table'. Host actions are checked against a host ID rather than a signed session, and answer timing is reported by the phone. Both need tightening before it's safe for strangers.",
    "Round boundaries use configured counts, not generated ones, so a short fallback round shifts the rounds after it.",
    "A player who closes the tab mid-game can't rejoin: the session is in sessionStorage and join only accepts lobbies.",
    "No tests on the route handlers or the buzzer ordering yet.",
  ],
  codeLinks: [
    { label: "Cache and Redis write-through", path: "lib/quiz/game-store.ts" },
    { label: "Buzz: first to arrive wins", path: "app/api/quiz/buzz/route.ts" },
    {
      label: "Judging a buzz, resuming the clock",
      path: "app/api/quiz/buzz-answer/route.ts",
    },
    { label: "Claude call and validation", path: "lib/quiz/ai-generator.ts" },
    { label: "Per-round fallback chain", path: "lib/quiz/questions.ts" },
    { label: "What clients can see", path: "lib/quiz/public-state.ts" },
    {
      label: "Client: Pusher, polling, rehydrate",
      path: "app/(game)/pub-quiz/[gameId]/page.tsx",
    },
  ],
};
