import { QuizCategory } from "./types";

export const CATEGORY_OPTIONS: Array<{
  value: QuizCategory;
  label: string;
  icon: string;
}> = [
  { value: QuizCategory.GENERAL, label: "General Knowledge", icon: "🧠" },
  { value: QuizCategory.SPORT, label: "Sport", icon: "⚽" },
  { value: QuizCategory.MUSIC, label: "Music", icon: "🎵" },
  { value: QuizCategory.FILM_TV, label: "Film & TV", icon: "🎬" },
  { value: QuizCategory.GEOGRAPHY, label: "Geography", icon: "🌍" },
  { value: QuizCategory.GAMING, label: "Gaming", icon: "🎮" },
  { value: QuizCategory.HISTORY, label: "History", icon: "📜" },
  { value: QuizCategory.SCIENCE, label: "Science", icon: "🔬" },
  { value: QuizCategory.FOOD_DRINK, label: "Food & Drink", icon: "🍺" },
  { value: QuizCategory.POP_CULTURE, label: "Pop Culture", icon: "✨" },
];
