import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = "https://www.rdevstudio.co.uk";

const shots = [
  {
    path: "/",
    file: "docs/screenshots/home-390.png",
    width: 390,
    height: 844,
  },
  {
    path: "/draft",
    file: "docs/screenshots/draft-1280.png",
    width: 1280,
    height: 800,
  },
];

async function main() {
  await mkdir("docs/screenshots", { recursive: true });
  const browser = await chromium.launch();

  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
    });
    const page = await context.newPage();
    await page.goto(`${BASE}${shot.path}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.screenshot({ path: shot.file, type: "png" });
    console.log(shot.file);
    await context.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
