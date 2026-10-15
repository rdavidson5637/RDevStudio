import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";

function pngToIco(png: Buffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

async function shot(size: number) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const stroke = Math.max(1, Math.round(size * 0.05));
  await page.setContent(`<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;background:#112F2C;display:flex;align-items:center;justify-content:center"><svg width="${size}" height="${size}" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="none" stroke="#FBE6A0" stroke-width="${(stroke / size) * 32}"/><circle cx="16" cy="16" r="2.2" fill="#F48067"/></svg></body></html>`);
  const png = await page.screenshot({ type: "png" });
  await browser.close();
  return png;
}

async function main() {
  const apple = await shot(180);
  const fav = await shot(32);
  await writeFile("app/apple-icon.png", apple);
  await writeFile("public/apple-icon.png", apple);
  await writeFile("public/favicon.ico", pngToIco(fav));
  await writeFile("app/favicon.ico", pngToIco(fav));
  await writeFile("public/icon.svg", await (await import("node:fs/promises")).readFile("app/icon.svg"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
