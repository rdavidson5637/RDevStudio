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
    icon: "🏉",
    content: (
      <>
        <p>
          Rugby Draft is a rugby squad builder. You spin random club or nation
          squads, pick one player per spin, and build a 15-man team. Then you
          simulate matches and see how far you can go.
        </p>
        <p className="mt-3">
          Every run follows the same flow: <strong>pick a mode</strong> →{" "}
          <strong>choose your club or nation</strong> →{" "}
          <strong>draft your XV</strong> → <strong>compete</strong>. You can
          quit anytime from the top-left and return to the main menu.
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
            Tap <strong>Spin Squad</strong> to land on a random squad from the
            pool — Champions Cup clubs, Six Nations nations, or World Cup
            nations (including legendary sides).
          </li>
          <li>
            You&apos;ll see players from that squad who can still fill an open
            position. Pick exactly <strong>one</strong> — they slot into the
            first compatible empty spot on your pitch.
          </li>
          <li>
            You can spin the same squad again if it still has players who fit
            your open slots — but each player can only be picked once.
          </li>
          <li>
            When all 15 slots are filled, you&apos;ll see your team ratings
            (Forwards, Backs, Overall) and can start your tournament.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Champions Cup",
    icon: "⭐",
    content: (
      <>
        <p>
          Pick a club and draft your XV from the full European club pool — URC,
          Premiership, and Top 14 sides.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>
            Pool stage: four pools of six clubs — round-robin matches against
            drawn opponents.
          </li>
          <li>
            Rugby scoring: 4 points for a win, 2 for a draw, plus bonus points
            for tries and close defeats.
          </li>
          <li>
            Top two in each pool qualify directly; 3rd and 4th enter a Last 16
            play-in round.
          </li>
          <li>
            Knockouts run through the Last 16, quarters, semis, and final. Ties
            cannot end in a draw — a winner is decided on the scoreline.
          </li>
          <li>
            Watch matches one by one, or use <strong>fast</strong> /{" "}
            <strong>skip</strong> speed modes to blast through.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Six Nations",
    icon: "🏴",
    content: (
      <>
        <p>
          Choose a nation to compete as, then draft your XV from the full Six
          Nations pool — players from England, Ireland, France, Scotland, Wales,
          and Italy (including legendary squads).
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>Round-robin format — every nation plays each other once.</li>
          <li>Home matches give a small advantage. Away days are tougher.</li>
          <li>
            Bonus points for four or more tries and losing by seven points or
            fewer.
          </li>
          <li>
            Finish top of the table to win the championship. Share your result
            and try again.
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
        <p>
          Choose a nation to compete as, then draft your XV from the full World
          Cup pool — any country&apos;s players, including legendary
          tournament-winning squads.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>
            Pool stage: top three from each pool qualify for the knockouts.
          </li>
          <li>Knockout rounds from the Quarter-Finals through to the Final.</li>
          <li>
            Pool matches use home advantage; knockout ties from the
            Quarter-Finals onward are at neutral venues.
          </li>
          <li>Knockout ties never end in a draw.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Matches & Ratings",
    icon: "📊",
    content: (
      <>
        <p>
          Matches are simulated from your team&apos;s Forwards, Backs, and
          Overall ratings — built from the stats of the players you drafted into
          each group.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>
            Higher-rated XVs generally perform better, but upsets can happen.
          </li>
          <li>
            Scores are in <strong>points</strong> (tries, conversions, and
            penalties) — not goals.
          </li>
          <li>
            Use <strong>normal</strong>, <strong>fast</strong>, or{" "}
            <strong>skip</strong> before a round to control match speed.
          </li>
          <li>
            Try scorers are tracked from your drafted backs — check top try
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
          When a run ends — whether you win the tournament, lift the trophy, or
          get knocked out — you&apos;ll see a share card with your final
          position and full drafted XV.
        </p>
        <p className="mt-3">
          Tap <strong>Share</strong> to send it via your phone&apos;s share
          sheet, or <strong>Copy</strong> to paste the text anywhere. Challenge
          your mates: &ldquo;Think you can beat my XV?&rdquo;
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
          Balance your squad — a stacked back line means little if your forwards
          are weak.
        </li>
        <li>
          Props and locks are interchangeable within their pairs — use
          compatible positions to fill gaps.
        </li>
        <li>
          Don&apos;t burn spins on positions you&apos;ve already filled — watch
          the highlighted slot on the pitch.
        </li>
        <li>
          Try all three modes. Champions Cup is club rugby; Six Nations and
          World Cup are international thrillers.
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
