"use client";

import { Suspense } from "react";

import { PubQuizLanding } from "@/components/quiz/PubQuizLanding";

export default function PubQuizLandingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-quiz-muted">Loading...</p>
        </main>
      }
    >
      <PubQuizLanding />
    </Suspense>
  );
}
