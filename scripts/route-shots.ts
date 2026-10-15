import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.SHOTS_BASE ?? "http://localhost:3000";

const ROUTES = [
  "/champions-draft",
  "/rugby-draft",
  "/pub-quiz",
  "/games/longest-word",
  "/draft",
  "/wardrobe-ai",
  "/hire",
] as const;

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
] as const;

function slug(route: string) {
  return route.replace(/^\//, "").replaceAll("/", "-");
}

async function main() {
  const label = process.argv[2];
  if (!label || label.startsWith("-")) {
    console.error("Usage: npm run shots -- <label>");
    process.exit(1);
  }

  const dir = `.shots/${label}`;
  await mkdir(dir, { recursive: true });

  const browser = await chromium.launch();

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
      const page = await context.newPage();

      for (const route of ROUTES) {
        const file = `${dir}/${slug(route)}-${viewport.width}x${viewport.height}.png`;
        const response = await page.goto(`${BASE}${route}`, {
          waitUntil: "load",
          timeout: 60000,
        });
        if (!response || response.status() >= 400) {
          throw new Error(`${route} returned ${response?.status() ?? "no response"}`);
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(400);
        await page.screenshot({ path: file, type: "png" });
        console.log(file);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
