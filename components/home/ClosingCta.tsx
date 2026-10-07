import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ClosingCta() {
  return (
    <section className="relative bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <div className="relative">
          <div className="glow-amber pointer-events-none absolute -inset-8 -z-10 opacity-80" aria-hidden="true" />
          <div className="studio-card rounded-studio border border-studio-border bg-studio-surface px-6 py-12 md:px-12 md:py-16">
            <h2 className="display-lg max-w-3xl text-balance text-studio-text">
              Need a site, help with posting, or something that does not fit a package?
            </h2>
            <p className="type-body mt-4 max-w-xl text-studio-muted">
              Send a note and I will come back with next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Start a project</Button>
              <Button href="https://wa.me/447378420418" variant="secondary">
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
