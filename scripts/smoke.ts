import { chromium, type Page } from "playwright";

const BASE = process.env.SMOKE_BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/games",
  "/projects",
  "/work",
  "/work/shelterlink",
  "/work/rvs-cold-brew",
  "/services",
  "/toolkit",
  "/contact",
  "/about",
  "/hire",
  "/champions-draft",
  "/rugby-draft",
  "/pub-quiz",
  "/games/longest-word",
  "/draft",
  "/wardrobe-ai",
  "/gig-radar",
  "/guitar-lab",
];

async function check(page: Page, route: string) {
  const errors: string[] = [];
  const ignore = (text: string) =>
    text.includes("_vercel/insights") ||
    text.includes("Failed to load resource") ||
    text.includes("Refused to execute script");
  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");
  page.removeAllListeners("response");
  page.on("console", (message) => {
    if (message.type() === "error" && !ignore(message.text())) errors.push(message.text());
  });
  page.on("pageerror", (error) => {
    if (!ignore(error.message)) errors.push(error.message);
  });
  page.on("response", (response) => {
    const url = response.url();
    if (response.status() >= 400 && !ignore(url) && url.startsWith(BASE)) {
      errors.push(`${response.status()} ${url}`);
    }
  });

  const response = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  const status = response?.status() ?? 0;
  const heading = await page.locator("h1").first().textContent().catch(() => "");
  if (status !== 200) {
    throw new Error(`${route} returned ${status}`);
  }
  if (errors.length > 0) {
    throw new Error(`${route} console errors:\n${errors.join("\n")}`);
  }
  console.log(`200 ${route} ${heading?.trim() ?? ""}`);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const route of ROUTES) {
    await check(page, route);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
