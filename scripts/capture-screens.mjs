#!/usr/bin/env node
/**
 * Clean, consistent screenshots of the sites shown on the Work page.
 *
 *   npm run capture:screens            capture every site
 *   npm run capture:screens -- rvs-cold-brew   capture one by slug
 *
 * Uses the Playwright command line through npx, so nothing is added to
 * package.json. The first run downloads Chromium (about 150 MB).
 *
 * Output goes to public/images/work/captures/<slug>-desktop.png and
 * <slug>-mobile.png. The Work page picks them up automatically once the files
 * are committed. Both shots are taken at the top of the page, so a sticky
 * header never ends up overlapping content.
 *
 * Only add a site here when it is fine to show it publicly. Assisi's new site is
 * waiting on their sign-off: capture it for your own review, but do not commit
 * its files until they have said yes.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITES = [
  { slug: "rvs-cold-brew", url: "https://rvscoldbrew.vercel.app" },
  { slug: "assisi", url: "https://assisi-new.vercel.app" },
  { slug: "crosskennan", url: "https://crosskennan.vercel.app" },
];

const DESKTOP = "1440,900";
const MOBILE = "390,844";
const SETTLE_MS = "3000"; // fonts, hero video poster, first paint

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "work", "captures");
mkdirSync(outDir, { recursive: true });

const only = process.argv[2];
const targets = only ? SITES.filter((site) => site.slug === only) : SITES;
if (targets.length === 0) {
  console.error(`No site called "${only}". Options: ${SITES.map((s) => s.slug).join(", ")}`);
  process.exit(1);
}

function run(args) {
  const result = spawnSync("npx", ["--yes", "playwright@latest", ...args], {
    stdio: "inherit",
    cwd: root,
  });
  if (result.status !== 0) {
    console.error(`Failed: playwright ${args.join(" ")}`);
    process.exit(result.status ?? 1);
  }
}

console.log("Making sure Chromium is installed...");
run(["install", "chromium"]);

for (const site of targets) {
  for (const [device, size] of [
    ["desktop", DESKTOP],
    ["mobile", MOBILE],
  ]) {
    const file = path.join(outDir, `${site.slug}-${device}.png`);
    console.log(`${site.slug} ${device} -> ${path.relative(root, file)}`);
    run([
      "screenshot",
      "--browser",
      "chromium",
      "--viewport-size",
      size,
      "--wait-for-timeout",
      SETTLE_MS,
      "--color-scheme",
      "light",
      site.url,
      file,
    ]);
  }
}

console.log("Done. Look at the files in public/images/work/captures/ before you commit them.");
