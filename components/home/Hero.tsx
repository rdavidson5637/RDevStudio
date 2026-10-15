import Link from "next/link";
import { ProductCover } from "@/components/covers";
import { StatusDot } from "@/components/motion/StatusDot";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { liveProducts, productBySlug } from "@/lib/content/products";
import { PRICE_WEBSITE_GBP } from "@/lib/constants";

const FAN = ["champions-draft", "longest-word", "stout-finder"] as const;

function Underline({ children }: { children: string }) {
  return <span className="border-b border-amber">{children}</span>;
}

export function Hero() {
  const fan = FAN.map((slug) => productBySlug(slug)).filter((product) => product !== undefined);

  return (
    <section className="noise relative overflow-hidden bg-bg text-studio-text">
      <div className="hero-glow pointer-events-none absolute -right-10 -top-24 h-[32rem] w-[32rem]" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pt-8 pb-0 md:pt-12 md:pb-2 lg:pt-16 lg:pb-4">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-8">
          <Stagger>
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
            <p className="mt-6 font-studio-mono text-sm text-zinc-400">
              Websites from £{PRICE_WEBSITE_GBP} · You own the code · Free for registered charities
            </p>
          </Stagger>

          <div className="fan-stage group relative hidden lg:block">
            {fan.map((product, index) => (
              <Link
                key={product.slug}
                href={product.href}
                className="fan-card absolute left-1/2 top-0 block w-80 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                style={{ ["--i" as string]: index, zIndex: index + 1 }}
                {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="block overflow-hidden rounded-2xl border border-studio-line bg-studio-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <ProductCover slug={product.cover} />
                  <span className="fan-label flex items-center justify-between gap-3 px-3 py-3">
                    <span className="font-studio-display text-lg text-studio-text">{product.name}</span>
                    <StatusDot status={product.status} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="scrollbar-none -mx-6 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 lg:hidden">
          {liveProducts.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="w-36 shrink-0 snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="block overflow-hidden rounded-xl border border-studio-line">
                <ProductCover slug={product.cover} />
              </span>
              <span className="mt-2 block text-sm text-studio-text">{product.name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
