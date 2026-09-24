import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import { PUB_QUIZ } from "@/lib/pub-quiz-feature";

// The landing page is a client component, so its metadata lives here. Game
// rooms override robots and canonical in [gameId]/layout.tsx.
export const metadata = createPageMetadata({
  title: PUB_QUIZ.title,
  description: PUB_QUIZ.description,
  path: PUB_QUIZ.href,
});

export default function PubQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="quiz-page min-h-screen">
      <header className="absolute left-0 top-0 z-10 flex items-center gap-4 p-5 sm:p-6">
        <Link
          href="/"
          className="text-sm font-medium text-quiz-muted transition-colors hover:text-quiz-amber"
        >
          RDev Studio
        </Link>
        <span className="text-quiz-border" aria-hidden="true">
          /
        </span>
        <Link
          href={PUB_QUIZ.href}
          className="text-sm font-medium text-quiz-amber"
        >
          {PUB_QUIZ.title}
        </Link>
      </header>
      {children}
    </div>
  );
}
