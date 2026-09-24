import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

/**
 * Shared Open Graph image renderer. Every link preview on the site goes
 * through here: the site-wide card (app/opengraph-image.tsx), the per-page
 * dynamic route (app/og/route.tsx) and the file-based tool images. One design,
 * one set of fonts.
 *
 * Fonts are bundled in lib/og (OFL) and read from disk on the Node runtime.
 * next.config.mjs traces lib/og/** into the serverless bundles that need it.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#F7F5F0";
const INK = "#16150F";
const PITCH = "#1E5C3A";
const MUTED = "#3D3B35";

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | undefined;

function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    const dir = join(process.cwd(), "lib", "og");
    fontsPromise = Promise.all([
      readFile(join(dir, "anton-latin-400-normal.woff")),
      readFile(join(dir, "space-mono-latin-400-normal.woff")),
      readFile(join(dir, "space-mono-latin-700-normal.woff")),
    ])
      .then(([anton, mono, monoBold]): OgFont[] => [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Space Mono", data: mono, weight: 400, style: "normal" },
        { name: "Space Mono", data: monoBold, weight: 700, style: "normal" },
      ])
      .catch((error: unknown) => {
        fontsPromise = undefined;
        throw error;
      });
  }
  return fontsPromise;
}

function titleSize(title: string): number {
  const length = title.length;
  if (length <= 14) return 132;
  if (length <= 24) return 112;
  if (length <= 40) return 92;
  if (length <= 60) return 76;
  return 64;
}

export type OgCard = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
};

export async function renderOgImage({
  title,
  eyebrow = SITE_NAME,
  subtitle,
}: OgCard): Promise<ImageResponse> {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: PAPER,
          color: INK,
          borderTop: `10px solid ${PITCH}`,
          fontFamily: "Space Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: PITCH,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontFamily: "Anton",
            fontSize: titleSize(title),
            lineHeight: 1.02,
            textTransform: "uppercase",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 30,
              color: MUTED,
            }}
          >
            {subtitle}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 16,
              background: PITCH,
              marginRight: 16,
            }}
          />
          {eyebrow === SITE_NAME
            ? "rdevstudio.co.uk"
            : `${SITE_NAME} · rdevstudio.co.uk`}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Kept for the file-based tool images (opengraph-image.tsx per tool). */
export function toolOgImage(title: string, eyebrow: string) {
  return renderOgImage({ title, eyebrow });
}
