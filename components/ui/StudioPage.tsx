import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type StudioPageProps = {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function StudioPage({ label, title, intro, children }: StudioPageProps) {
  return (
    <div className="bg-grid bg-bg text-studio-text">
      <Container className="py-20 md:py-28">
        <p className="type-label text-studio-muted">{label}</p>
        <h1 className="display-lg mt-4 max-w-3xl text-balance text-studio-text">{title}</h1>
        <p className="type-body mt-5 max-w-xl text-studio-muted">{intro}</p>
        <div className="mt-14">{children}</div>
      </Container>
    </div>
  );
}
