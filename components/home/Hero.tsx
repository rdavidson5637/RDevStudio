import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

function Underline({ children }: { children: string }) {
  return <span className="border-b border-amber">{children}</span>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg text-studio-text">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="glow-amber pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 opacity-70"
        aria-hidden="true"
      />
      <Container className="relative py-24 md:py-32">
        <p className="type-label text-studio-muted">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-status-live align-middle" aria-hidden="true" />
          RDev Studio - Carrickfergus, Northern Ireland
        </p>
        <h1 className="display-xl mt-6 max-w-4xl text-balance text-studio-text">
          <Reveal as="span" className="block">
            <Underline>Websites</Underline> for local businesses.
          </Reveal>
          <Reveal as="span" delay={80} className="mt-2 block">
            <Underline>Games</Underline> for everyone else.
          </Reveal>
        </h1>
        <Reveal delay={160}>
          <p className="type-body mt-8 max-w-xl text-studio-muted">
            I design and build websites for Northern Ireland small businesses and charities. I also make the games and apps below, and they are all live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
