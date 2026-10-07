import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = {
  title: "Design primitives",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  return (
    <div className="noise min-h-screen bg-bg text-studio-text">
      <div className="bg-grid">
        <Container className="py-20">
          <p className="type-label text-amber">Preview</p>
          <h1 className="display-xl mt-4 max-w-3xl">Primitives for the studio site.</h1>
          <p className="type-body mt-6 max-w-xl text-studio-muted">
            Temporary page. Not linked, and not for indexing.
          </p>

          <section className="mt-16">
            <SectionHeader
              tone="studio"
              label="Type"
              heading="Display, heading, body, label."
            />
            <div className="mt-8 space-y-4">
              <p className="display-lg">A quieter display line.</p>
              <p className="type-h3">A section subheading in Geist.</p>
              <p className="type-body max-w-xl text-studio-muted">
                Body copy sits on Geist, around seventy characters wide, with room to breathe.
              </p>
              <p className="type-label text-studio-faint">Mono label</p>
            </div>
          </section>

          <section className="mt-16">
            <SectionHeader
              tone="studio"
              label="Actions"
              heading="Buttons"
              href="/contact"
              linkLabel="Contact"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Start a project</Button>
              <Button href="/games" variant="secondary">
                Play something
              </Button>
              <Button href="/work" variant="ghost">
                See the work
              </Button>
              <Button size="sm">Small primary</Button>
            </div>
          </section>

          <section className="mt-16">
            <SectionHeader tone="studio" label="Status" heading="Badges" />
            <div className="mt-8 flex flex-wrap gap-3">
              <StatusBadge variant="live">Live</StatusBadge>
              <StatusBadge variant="soon">Soon</StatusBadge>
              <StatusBadge variant="note">Built - awaiting sign-off</StatusBadge>
            </div>
          </section>

          <section className="mt-16">
            <SectionHeader tone="studio" label="Surfaces" heading="Cards" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Reveal>
                <Card>
                  <p className="type-h3">Default padding</p>
                  <p className="type-body mt-2 text-studio-muted">
                    Hover lifts the border and shows an amber edge.
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={80}>
                <Card padding="lg">
                  <p className="type-h3">Loose padding</p>
                </Card>
              </Reveal>
              <Reveal delay={160}>
                <Card padding="sm">
                  <p className="type-h3">Tight padding</p>
                </Card>
              </Reveal>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}
