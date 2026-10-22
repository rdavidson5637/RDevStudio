import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Grenadine palette. Keep in step with --color-studio-* in app/tokens.css.
const BASE = "#112F2C";
const TEXT = "#FBE6A0";
const MUTED = "#CFC7A3";
const ACCENT = "#F48067";

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export async function studioOgImage(headline: string, kicker = "RDev Studio") {
  const display = await readFile(join(process.cwd(), "lib/og/dm-serif-display-latin-400-normal.woff"));
  const label = await readFile(join(process.cwd(), "lib/og/instrument-sans-latin-600-normal.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BASE,
          color: TEXT,
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Instrument Sans", fontWeight: 600, fontSize: 32, color: MUTED }}>
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "DM Serif Display",
              fontWeight: 400,
              fontSize: 92,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 32 }}>
            <div style={{ width: 220, height: 2, backgroundColor: "rgba(251,230,160,0.5)" }} />
            <div style={{ width: 16, height: 16, borderRadius: 16, backgroundColor: ACCENT, marginLeft: 16 }} />
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Instrument Sans", fontWeight: 600, fontSize: 28, color: MUTED }}>
          {new URL(SITE_URL).host}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "DM Serif Display", data: toArrayBuffer(display), style: "normal", weight: 400 },
        { name: "Instrument Sans", data: toArrayBuffer(label), style: "normal", weight: 600 },
      ],
    },
  );
}
