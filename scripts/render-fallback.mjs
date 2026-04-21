import puppeteer from "puppeteer";
import fs from "node:fs/promises";

const URL = process.env.URL ?? "http://localhost:3000";

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2500));

  const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  await fs.writeFile("public/hero-fallback@2x.png", buf);

  await page.setViewport({ width: 960, height: 540, deviceScaleFactor: 1 });
  const buf1 = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 960, height: 540 } });
  await fs.writeFile("public/hero-fallback@1x.png", buf1);

  await browser.close();
  console.log("Rendered hero-fallback @1x and @2x");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
