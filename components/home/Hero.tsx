import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function Underline({ children }: { children: string }) {
  return <span className="border-b border-amber">{children}</span>;
}

export function Hero() {
  return (
    <section className="bg-bg text-studio-text">
      <Container className="py-24 md:py-32">
        <p className="type-label text-studio-muted">Carrickfergus, Northern Ireland</p>
        <h1 className="display-xl mt-6 max-w-4xl text-balance text-studio-text">
          <span className="block">
            <Underline>Websites</Underline> for local businesses.
          </span>
          <span className="mt-2 block">
            <Underline>Games</Underline> for everyone else.
          </span>
        </h1>
        <p className="type-body mt-8 max-w-xl text-studio-muted">
          I design and build websites for Northern Ireland small businesses and charities. I also make the games and apps below, and they are all live.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Start a project</Button>
          <Button href="#live" variant="secondary">
            Play something
          </Button>
        </div>
      </Container>
    </section>
  );
}
