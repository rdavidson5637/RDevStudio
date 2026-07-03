"use client";
import type { ReactNode } from "react";

interface Props {
  onClose: () => void;
}

interface Section {
  title: string;
  icon: string;
  content: ReactNode;
}

const SECTIONS: Section[] = [
  {
    title: "The Basics",
    icon: "⚽",
    content: (
      <>
        <p>
          Champions Draft is a football squad builder. You spin random iconic
          squads, pick one player per spin, and build an 11-man team. Then you
          simulate matches and see how far you can go.
        </p>
        <p className="mt-3">
          Every run follows the same flow: <strong>pick a mode</strong> →{" "}
          <strong>choose a formation</strong> → <strong>draft your XI</strong> →{" "}
          <strong>compete</strong>. You can quit anytime from the top-left and
          return to the main menu.
        </p>
      </>
    ),
  },
  {
    title: "The Draft",
    icon: "🎯",
    content: (
      <>
        <ul className="space-y-2 list-disc pl-4">
          <li>
            Tap <strong>Spin Squad</strong> to land on a random club from the
            pool of 50 iconic European squads (plus international squads in
            World Cup mode).
          </li>
          <li>
            You&apos;ll see eligible players who fit your open positions. Pick
            exactly <strong>one</strong> — they fill the next empty slot on your
            pitch.
          </li>
          <li>
            In standard modes, each squad can only be spun <strong>once</strong>{" "}
            per draft. Plan your picks around the positions you still need.
          </li>
          <li>
            When all 11 slots are filled, you&apos;ll see your team ratings
            (Attack, Midfield, Defence, GK) and can start your competition.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "League Season",
    icon: "🏆",
    content: (
      <>
        <p>
          Pick a league (Premier League, La Liga, Serie A, etc.) and your XI
          plays a full season against real club opponents from that league.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>Every team plays each other home and away.</li>
          <li>Home matches give a small advantage. Away days are tougher.</li>
          <li>
            Watch your matches one by one, or use <strong>fast</strong> /{" "}
            <strong>skip</strong> speed modes to blast through.
          </li>
          <li>
            At the end you get a final table, top scorer, player of the season,
            and a share card to challenge friends.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Champions League",
    icon: "⭐",
    content: (
      <>
        <p>
          Skip league pick — go straight to formation and draft. Your XI enters
          a 36-team league phase.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>You play 8 league-phase matches against drawn opponents.</li>
          <li>
            <strong>Top 8</strong> qualify directly for the Round of 16.
          </li>
          <li>
            <strong>9th–24th</strong> enter a knockout playoff for the remaining
            spots.
          </li>
          <li>
            <strong>25th or below</strong> — eliminated. Share your result and
            try again.
          </li>
          <li>
            Knockouts run through Round of 16, Quarter-Finals, Semi-Finals, and
            the Final. Ties cannot end in a draw — a winner is decided on the
            scoreline.
          </li>
          <li>
            You only see your own knockout tie before each round — the full
            bracket is revealed after you play.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "World Cup",
    icon: "🌍",
    content: (
      <>
        <p>Choose a nation, then pick how you want to draft:</p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>
            <strong>National Squad</strong> — only players from your nation
            appear in spins. Squads can be re-spun; individual players can only
            be picked once.
          </li>
          <li>
            <strong>Dream Team</strong> — draft any legends from the full pool.
            Your nation is still shown on the kit, but there&apos;s no
            nationality filter.
          </li>
        </ul>
        <p className="mt-3">
          The tournament has a group stage (8 groups, top 2 qualify), then Round
          of 16 through to the Final. All World Cup matches are played at
          neutral venues — no home advantage. Knockout ties never end in a draw.
        </p>
      </>
    ),
  },
  {
    title: "Matches & Ratings",
    icon: "📊",
    content: (
      <>
        <p>
          Matches are simulated from your team&apos;s Attack, Midfield, Defence,
          and Goalkeeper ratings — built from the overall ratings of the players
          you drafted into each line.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>
            Higher-rated XIs generally perform better, but upsets can happen.
          </li>
          <li>
            Use <strong>normal</strong>, <strong>fast</strong>, or{" "}
            <strong>skip</strong> before a round to control match speed.
          </li>
          <li>
            Goal scorers are tracked from your drafted attackers — check top
            scorer stats at the end of a run.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Sharing Your Result",
    icon: "📤",
    content: (
      <>
        <p>
          When a run ends — whether you win the league, lift the trophy, or get
          knocked out — you&apos;ll see a share card with your final position
          and full drafted XI.
        </p>
        <p className="mt-3">
          Tap <strong>Share</strong> to send it via your phone&apos;s share
          sheet, or <strong>Copy</strong> to paste the text anywhere. Challenge
          your mates: &ldquo;Think you can beat my XI?&rdquo;
        </p>
      </>
    ),
  },
  {
    title: "Tips",
    icon: "💡",
    content: (
      <ul className="space-y-2 list-disc pl-4">
        <li>
          Balance your squad — a stacked attack means little if your defence is
          weak.
        </li>
        <li>
          In National Squad World Cup mode, smaller nations have fewer eligible
          players. Dream Team is easier for those nations.
        </li>
        <li>
          Don&apos;t burn spins on positions you&apos;ve already filled — watch
          the highlighted slot on the pitch.
        </li>
        <li>
          Try all three modes. League builds your club story; Champions League
          and World Cup are knockout thrillers.
        </li>
      </ul>
    ),
  },
];

export default function HowToPlayModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-[#0e0e18] border border-white/10 sm:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0e0e18]/95 backdrop-blur sticky top-0 z-10">
          <div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Guide
            </p>
            <h2 className="text-white font-black text-xl uppercase tracking-tight">
              How to Play
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors text-lg"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 space-y-6">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{section.icon}</span>
                <h3 className="text-white font-black text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
              <div className="text-white/55 text-sm leading-relaxed pl-7">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-white/10 bg-[#0e0e18]/95 backdrop-blur sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            Got it — Let&apos;s Play
          </button>
        </div>
      </div>
    </div>
  );
}
