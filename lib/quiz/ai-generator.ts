import {
  buildRoundSystemPrompt,
  buildRoundUserPrompt,
  type RoundPromptOptions,
} from "./prompts/round-prompts";
import { filterUnusedQuestions, markQuestionsAsUsed } from "./question-history";
import { QuestionType, RoundFormat, QuizCategory, type Question } from "./types";
import {
  isValidWikimediaImageUrl,
  normalizeWikimediaImageUrl,
} from "./wikimedia";

interface RawAIQuestion {
  id?: string;
  text?: string;
  type?: string;
  options?: string[] | null;
  correctAnswer?: string;
  category?: string;
  explanation?: string;
  imageUrl?: string;
  imageAlt?: string;
  audioUrl?: string | null;
  /** @deprecated legacy field from older prompts */
  mediaUrl?: string;
  /** @deprecated legacy field from older prompts */
  mediaAlt?: string;
}

function stripMarkdownFences(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function parseQuestionType(
  type: string,
  format: RoundFormat
): QuestionType | null {
  const normalized = type.toLowerCase().replace(/-/g, "_");

  if (normalized === "multiple_choice") {
    return QuestionType.MULTIPLE_CHOICE;
  }
  if (normalized === "text") {
    return QuestionType.TEXT;
  }
  if (normalized === "picture") {
    return QuestionType.PICTURE;
  }
  if (normalized === "music") {
    return QuestionType.MUSIC;
  }

  if (format === RoundFormat.PICTURE) {
    return QuestionType.PICTURE;
  }
  if (format === RoundFormat.MUSIC) {
    return QuestionType.MUSIC;
  }

  return null;
}

function isValidCategory(value: string): value is QuizCategory {
  return Object.values(QuizCategory).includes(value as QuizCategory);
}

function resolveImageUrl(raw: RawAIQuestion): string | undefined {
  const candidate = raw.imageUrl?.trim() || raw.mediaUrl?.trim();

  if (!candidate || !isValidWikimediaImageUrl(candidate)) {
    return undefined;
  }

  return normalizeWikimediaImageUrl(candidate);
}

function resolveImageAlt(raw: RawAIQuestion): string | undefined {
  return raw.imageAlt?.trim() || raw.mediaAlt?.trim() || undefined;
}

function validateQuestion(
  raw: RawAIQuestion,
  expectedCategory: QuizCategory,
  format: RoundFormat
): Question | null {
  if (!raw.id?.trim() || !raw.text?.trim() || !raw.type || !raw.correctAnswer?.trim()) {
    return null;
  }

  const type = parseQuestionType(raw.type, format);
  if (!type) {
    return null;
  }

  const category =
    raw.category && isValidCategory(raw.category) ? raw.category : expectedCategory;

  const imageUrl = resolveImageUrl(raw);
  const imageAlt = resolveImageAlt(raw);

  if (type === QuestionType.PICTURE || format === RoundFormat.PICTURE) {
    if (!imageUrl || !imageAlt) {
      return null;
    }
  }

  const audioUrl =
    raw.audioUrl && typeof raw.audioUrl === "string" && raw.audioUrl.trim()
      ? raw.audioUrl.trim()
      : undefined;

  if (type === QuestionType.MULTIPLE_CHOICE || type === QuestionType.PICTURE || type === QuestionType.MUSIC) {
    if (!Array.isArray(raw.options) || raw.options.length !== 4) {
      if (type === QuestionType.PICTURE || type === QuestionType.MUSIC) {
        if (raw.options !== null && raw.options !== undefined) {
          return null;
        }
      } else {
        return null;
      }
    }

    if (Array.isArray(raw.options)) {
      const options = raw.options.map((option) => String(option).trim());
      if (options.some((option) => !option)) {
        return null;
      }

      if (!options.includes(raw.correctAnswer.trim())) {
        return null;
      }

      return {
        id: raw.id.trim(),
        text: raw.text.trim(),
        type,
        options,
        correctAnswer: raw.correctAnswer.trim(),
        category,
        explanation: raw.explanation?.trim() || undefined,
        imageUrl,
        imageAlt,
        audioUrl,
      };
    }
  }

  return {
    id: raw.id.trim(),
    text: raw.text.trim(),
    type: type === QuestionType.PICTURE || type === QuestionType.MUSIC ? type : QuestionType.TEXT,
    options: null,
    correctAnswer: raw.correctAnswer.trim(),
    category,
    explanation: raw.explanation?.trim() || undefined,
    imageUrl,
    imageAlt,
    audioUrl,
  };
}

function filterPictureQuestions(questions: Question[]): Question[] {
  const valid: Question[] = [];

  for (const question of questions) {
    if (!question.imageUrl || !isValidWikimediaImageUrl(question.imageUrl)) {
      console.warn(
        `Filtered picture question "${question.id}" — invalid imageUrl: ${question.imageUrl ?? "missing"}`
      );
      continue;
    }

    valid.push(question);
  }

  return valid;
}

export async function generateQuestionsFromAI(
  options: RoundPromptOptions
): Promise<Question[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: buildRoundSystemPrompt(options.format),
      messages: [
        {
          role: "user",
          content: buildRoundUserPrompt(options),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  const rawText = data.content?.find((block) => block.type === "text")?.text;

  if (!rawText) {
    throw new Error("Anthropic API returned no text content");
  }

  const parsed = JSON.parse(stripMarkdownFences(rawText)) as RawAIQuestion[];

  if (!Array.isArray(parsed)) {
    throw new Error("Anthropic API response was not a JSON array");
  }

  let questions = parsed
    .map((item) => validateQuestion(item, options.category, options.format))
    .filter((item): item is Question => item !== null);

  if (options.format === RoundFormat.PICTURE) {
    questions = filterPictureQuestions(questions);
  }

  const unique = filterUnusedQuestions(questions);

  if (unique.length < options.count) {
    console.warn(
      `AI returned ${unique.length} unique questions for ${options.roundName}, requested ${options.count}`
    );
  }

  return unique;
}

export function finalizeGeneratedQuestions(questions: Question[]): Question[] {
  markQuestionsAsUsed(questions);
  return questions;
}
