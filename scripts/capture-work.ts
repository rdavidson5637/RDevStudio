import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { clientWork } from "../lib/content/products";

const jobs = clientWork.filter((job) => job.siteUrl && job.slug !== "assisi");

async function dismissBanners(page: import("playwright").Page) {
  const names = [/accept/i, /agree/i, /got it/i, /allow all/i, /okay/i];
  for (const name of names) {
    const button = page.getByRole("button", { name }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 1500 }).catch(() => undefined);
    }
  }
}

async function main() {
  await mkdir("public/work", { recursive: true });
  const browser = await chromium.launch();

  for (const job of jobs) {
    if (!job.siteUrl) continue;
    for (const spec of [
      { width: 1440, height: 900, name: "desktop" },
      { width: 390, height: 844, name: "mobile" },
    ]) {
      const context = await browser.newContext({
        viewport: { width: spec.width, height: spec.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      await page.goto(job.siteUrl, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1000);
      await dismissBanners(page);
      const file = `public/work/${job.slug}-${spec.name}.webp`;
      await page.screenshot({ path: file, type: "webp", quality: 80 });
      console.log(file);
      await context.close();
    }
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
