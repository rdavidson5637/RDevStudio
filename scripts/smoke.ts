import { chromium, type Page } from "playwright";

const BASE = process.env.SMOKE_BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/games",
  "/projects",
  "/work",
  "/work/shelterlink",
  "/work/rvs-cold-brew",
  "/work/concept-builds",
  "/work/uc-caseworker-tool",
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
  if (route === "/contact") {
    await assertFormspreeAllowed(page);
  }
  if (errors.length > 0) {
    throw new Error(`${route} console errors:\n${errors.join("\n")}`);
  }
  console.log(`200 ${route} ${heading?.trim() ?? ""}`);
}

async function assertFormspreeAllowed(page: Page) {
  // Passed as a string so tsx does not inject its __name helper into the page.
  const result = await page.evaluate<{ violation: string | null; timedOut: boolean }>(`
    new Promise((resolve) => {
      let violation = null;
      let settled = false;
      document.addEventListener("securitypolicyviolation", (event) => {
        if (String(event.blockedURI).includes("formspree.io")) {
          violation = event.violatedDirective || "connect-src";
        }
      });
      const finish = (timedOut) => {
        if (settled) return;
        settled = true;
        resolve({ violation, timedOut });
      };
      const timer = window.setTimeout(() => finish(true), 8000);
      fetch("https://formspree.io", { method: "HEAD", mode: "no-cors" }).then(
        () => window.setTimeout(() => { window.clearTimeout(timer); finish(false); }, 500),
        () => window.setTimeout(() => { window.clearTimeout(timer); finish(false); }, 500),
      );
    })
  `);

  if (result.violation) {
    throw new Error(`/contact blocked Formspree (${result.violation})`);
  }
  if (result.timedOut) {
    throw new Error("/contact Formspree check timed out");
  }
}

async function checkFormErrorGet(page: Page) {
  const response = await page.request.get(`${BASE}/api/form-error`);
  const status = response.status();
  if (status !== 405) {
    throw new Error(`/api/form-error GET returned ${status}, expected 405`);
  }
  console.log("405 /api/form-error");
}

async function checkStoutFinderRedirect(page: Page) {
  const response = await page.request.get(`${BASE}/stout-finder`, { maxRedirects: 0 });
  const status = response.status();
  const location = response.headers()["location"] ?? "";
  const target = new URL(location, BASE).href.replace(/\/$/, "");
  if (status !== 301 && status !== 308) {
    throw new Error(`/stout-finder returned ${status}, expected 301 or 308`);
  }
  if (target !== "https://stoutfinder.com") {
    throw new Error(`/stout-finder redirected to ${location || "(no Location header)"}`);
  }
  console.log(`${status} /stout-finder -> ${location}`);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await checkStoutFinderRedirect(page);
  await checkFormErrorGet(page);
  for (const route of ROUTES) {
    await check(page, route);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
