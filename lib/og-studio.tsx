import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const NIGHT = "#0F2219";
const CHALK = "#EEF2EA";
const CHALK_FAINT = "#B7C6BC";
const KIT = "#E5402F";

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export async function studioOgImage(headline: string, kicker = "RDev Studio") {
  const display = await readFile(join(process.cwd(), "app/fonts/BigShoulders-800.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NIGHT,
          color: CHALK,
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Big Shoulders", fontWeight: 800, fontSize: 36, color: CHALK_FAINT }}>
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Big Shoulders",
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 32 }}>
            <div style={{ width: 220, height: 2, backgroundColor: "rgba(238,242,234,0.5)" }} />
            <div style={{ width: 16, height: 16, borderRadius: 16, backgroundColor: KIT, marginLeft: 16 }} />
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Big Shoulders", fontWeight: 800, fontSize: 28, color: CHALK_FAINT }}>
          rdevstudio.co.uk
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Big Shoulders", data: toArrayBuffer(display), style: "normal", weight: 800 }],
    },
  );
}
