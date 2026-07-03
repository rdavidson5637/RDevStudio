import { CATEGORY_OPTIONS } from "../categories";
import { getExcludeListForPrompt } from "../question-history";
import { DIFFICULTY_PROMPTS } from "../difficulty";
import { Difficulty, RoundFormat, QuizCategory } from "../types";

const CATEGORY_TOPICS: Record<QuizCategory, string> = {
  [QuizCategory.GENERAL]:
    "science, history, language, food, nature, famous firsts, inventions",
  [QuizCategory.SPORT]:
    "football, rugby, tennis, olympics, athletics, records, F1, cricket",
  [QuizCategory.MUSIC]:
    "artists, albums, lyrics descriptions, chart history, instruments, decades",
  [QuizCategory.FILM_TV]:
    "quotes, directors, release years, awards, characters, actors, TV series",
  [QuizCategory.GEOGRAPHY]:
    "capitals, countries, landmarks, rivers, flags, cities, mountains",
  [QuizCategory.GAMING]:
    "video game characters, release years, franchises, records, consoles, esports",
  [QuizCategory.HISTORY]:
    "world wars, ancient civilisations, monarchs, revolutions, famous dates, explorers",
  [QuizCategory.SCIENCE]:
    "physics, chemistry, biology, space, inventions, Nobel prizes, the human body",
  [QuizCategory.FOOD_DRINK]:
    "cuisine, cocktails, ingredients, breweries, wine regions, famous chefs, brands",
  [QuizCategory.POP_CULTURE]:
    "celebrities, memes, viral moments, reality TV, social media, trends, awards shows",
};

const FORMAT_INSTRUCTIONS: Record<RoundFormat, string> = {
  [RoundFormat.STANDARD]: `Round type: STANDARD trivia.
- Roughly 70% multiple_choice, 30% text questions
- For multiple_choice: exactly 4 plausible options
- For text: short answers (1-3 words)`,

  [RoundFormat.PICTURE]: `Round type: PICTURE round.
- Every question MUST have type "picture"
- Each question MUST include "imageUrl" and "imageAlt"
- imageUrl must be a Wikimedia Commons thumbnail URL
- Questions must be answerable FROM the image
- Use multiple_choice with 4 options when possible`,

  [RoundFormat.MUSIC]: `Round type: MUSIC round.
Generate music pub quiz questions. For each question, choose ONE of these formats:

FORMAT A — Lyric/title style (set audioUrl to null — audio is attached separately):
Questions like 'Which artist is known for this lyric: [first line only]?' or
'Complete the song title: [Artist] - ___' or
'In what year was [well-known song] released?'

FORMAT B — Music trivia (no audio needed):
Questions about chart history, album names, band members, music awards,
famous music facts. These should be genuinely interesting pub quiz questions.

Mix: roughly 40% Format A style (lyric/title questions), 60% trivia.
Focus on: pop, rock, hip-hop, dance, Irish/UK artists,
decades from the 60s to present. Avoid too much obscure indie.
Set audioUrl to null for all questions — never invent audio URLs.`,

  [RoundFormat.BUZZER]: `Round type: BUZZER round.
- Players buzz in and answer out loud — no typed answers
- Make questions where the answer comes to you quickly or not at all
- Favour clear factual recall — avoid trick questions and ambiguous wording
- Prefer short, punchy questions with definitive answers
- Mix multiple_choice style questions shown on screen (players answer verbally)`,

  [RoundFormat.RISK]: `Round type: RISK round (minus points for wrong answers).
- Make questions moderately difficult — players are risking points so questions should reward confident knowledge
- Avoid trick questions or obscure trivia
- Favour questions where a confident player can score but a guesser might lose points
- Mix multiple_choice and text with plausible wrong options`,
};

export const PICTURE_ROUND_SYSTEM_ADDITION = `For picture round questions, you MUST include an imageUrl field pointing to a
real, publicly accessible image on Wikimedia Commons. Use this URL format:
https://upload.wikimedia.org/wikipedia/commons/thumb/[path]/330px-[filename]

The question should be answerable FROM the image — e.g. 'What country does
this flag belong to?', 'Name this landmark', 'Which footballer is this?',
'What animal is pictured?'

Good Wikimedia image categories to use:
- Country flags: /wikipedia/commons/thumb/[country flag paths]
- World landmarks: Eiffel Tower, Colosseum, Sydney Opera House, Big Ben etc.
- Famous footballers (use older/action shots, not portraits)
- Animal species (clear scientific photos)
- World capitals (skyline or iconic building photos)
- Album covers (use only very famous ones with clear Wikimedia availability)

Always use 330px thumbnail width (NOT 400px — Wikimedia rejects 400px for most files).
Always verify the imageUrl is a valid Wikimedia Commons thumbnail URL.
The correctAnswer should be what is shown in the image.`;

export const MUSIC_ROUND_SYSTEM_ADDITION = `Generate music pub quiz questions. The AI cannot provide audio URLs.
Always set audioUrl to null. Audio clips are attached server-side when available.
Focus on genuinely fun pub-quiz music trivia and lyric/title completion questions.`;

function getCategoryLabel(category: QuizCategory): string {
  return (
    CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category
  );
}

export interface RoundPromptOptions {
  category: QuizCategory;
  format: RoundFormat;
  difficulty: Difficulty;
  count: number;
  roundName: string;
  gameId: string;
  excludeQuestions?: string[];
}

export function buildRoundUserPrompt(options: RoundPromptOptions): string {
  const {
    category,
    format,
    difficulty,
    count,
    roundName,
    gameId,
    excludeQuestions = getExcludeListForPrompt(),
  } = options;

  const categoryLabel = getCategoryLabel(category);
  const topics = CATEGORY_TOPICS[category];
  const excludeBlock =
    excludeQuestions.length > 0
      ? `\nDo NOT repeat or closely rephrase any of these previously used questions:\n${excludeQuestions.map((q) => `- ${q}`).join("\n")}\n`
      : "";

  const imageFields =
    format === RoundFormat.PICTURE
      ? `
  "imageUrl": "Wikimedia Commons thumbnail HTTPS URL (required)",
  "imageAlt": "description of the image (required)",`
      : "";

  const audioField =
    format === RoundFormat.MUSIC ? `\n  "audioUrl": null,` : "";

  return `Generate exactly ${count} pub quiz questions for this round.

Round name: ${roundName}
Category: ${categoryLabel} (${category})
Game seed for variety: ${gameId}
${excludeBlock}
${FORMAT_INSTRUCTIONS[format]}

Difficulty: ${difficulty}
${DIFFICULTY_PROMPTS[difficulty]}

Return ONLY a valid JSON array with no preamble, no markdown, no backticks.
Each object must have these fields:
{
  "id": "unique string e.g. q_${category.toLowerCase()}_1",
  "text": "the question text",
  "type": "multiple_choice" | "text" | "picture" | "music",
  "options": ["A", "B", "C", "D"] or null if text-only,
  "correctAnswer": "must exactly match one option if multiple_choice",
  "category": "${category}",
  "explanation": "one sentence (optional but preferred)",${imageFields}${audioField}
}

Focus topics for ${categoryLabel}: ${topics}
Be creative and varied — avoid generic questions that appear in every pub quiz.`;
}

export const ROUND_SYSTEM_PROMPT = `You are a pub quiz question generator for groups of friends. 
Create fun, clear, unambiguous questions with definitive correct answers.
Mix easy, medium, and hard difficulty.
Never repeat questions within a set.`;

export function buildRoundSystemPrompt(format: RoundFormat): string {
  if (format === RoundFormat.PICTURE) {
    return `${ROUND_SYSTEM_PROMPT}\n\n${PICTURE_ROUND_SYSTEM_ADDITION}`;
  }

  if (format === RoundFormat.MUSIC) {
    return `${ROUND_SYSTEM_PROMPT}\n\n${MUSIC_ROUND_SYSTEM_ADDITION}`;
  }

  return ROUND_SYSTEM_PROMPT;
}
