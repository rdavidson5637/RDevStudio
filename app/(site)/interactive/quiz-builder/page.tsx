import { QuizBuilderApp } from "@/components/interactive-tools/quiz-builder/QuizBuilderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Quiz Builder",
  description: "Draft quiz questions and host with Pub Quiz.",
  path: "/interactive/quiz-builder",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <QuizBuilderApp />
      </div>
    </div>
  );
}
