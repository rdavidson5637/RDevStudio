import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

function Underline({ children }: { children: string }) {
  return (
    <span className="underline decoration-amber decoration-[3px] underline-offset-[0.14em] [text-decoration-skip-ink:none]">
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-bg text-studio-text">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-70"
      />
      <div
        aria-hidden="true"
        className="glow-amber pointer-events-none absolute left-1/2 top-[-6rem] -z-10 h-[26rem] w-[44rem] max-w-[140%] -translate-x-1/2 opacity-40 blur-3xl"
      />
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="type-label text-studio-muted">Carrickfergus, Northern Ireland</p>
        </Reveal>
        <h1 className="display-xl mt-6 max-w-4xl text-balance text-studio-text">
          <Reveal as="span" className="block">
            <Underline>Websites</Underline> for local businesses.
          </Reveal>
          <Reveal as="span" className="mt-2 block" delay={80}>
            <Underline>Games</Underline> for everyone else.
          </Reveal>
        </h1>
        <Reveal delay={160}>
          <p className="type-body mt-8 max-w-xl text-studio-muted">
            I design and build websites for Northern Ireland small businesses and charities. I also make the games and apps below, and they are all live.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/contact">Start a project</Button>
            <Button href="#live" variant="secondary">
              Play something
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
