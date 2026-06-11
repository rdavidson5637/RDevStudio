import { NextRequest, NextResponse } from "next/server";

import { generateQuestionsForRound } from "@/lib/quiz/questions";
import { createDefaultRound } from "@/lib/quiz/rounds";
import { Difficulty, QuizCategory, RoundFormat } from "@/lib/quiz/types";

function isValidCategory(value: string): value is QuizCategory {
  return Object.values(QuizCategory).includes(value as QuizCategory);
}

function isValidFormat(value: string): value is RoundFormat {
  return Object.values(RoundFormat).includes(value as RoundFormat);
}

function isValidDifficulty(value: string): value is Difficulty {
  return Object.values(Difficulty).includes(value as Difficulty);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const countParam = searchParams.get("count");
  const formatParam = searchParams.get("format") ?? RoundFormat.STANDARD;
  const difficultyParam = searchParams.get("difficulty");

  if (!categoryParam || !isValidCategory(categoryParam)) {
    return NextResponse.json(
      { error: "Valid category query param is required" },
      { status: 400 }
    );
  }

  const count = countParam ? Number.parseInt(countParam, 10) : 3;
  const format = isValidFormat(formatParam)
    ? formatParam
    : RoundFormat.STANDARD;

  if (!Number.isInteger(count) || count < 1 || count > 20) {
    return NextResponse.json(
      { error: "count must be an integer between 1 and 20" },
      { status: 400 }
    );
  }

  try {
    const round = {
      ...createDefaultRound(1, categoryParam),
      format,
      questionCount: count,
      difficulty:
        difficultyParam && isValidDifficulty(difficultyParam)
          ? difficultyParam
          : Difficulty.MIXED,
    };

    const questions = await generateQuestionsForRound(round, "preview");

    const isDev = process.env.NODE_ENV === "development";

    const responseQuestions = questions.map((question) => {
      if (isDev) {
        return question;
      }

      const { correctAnswer: _, ...publicQuestion } = question;
      return publicQuestion;
    });

    return NextResponse.json({ questions: responseQuestions });
  } catch (error) {
    console.error("generate-preview failed:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
