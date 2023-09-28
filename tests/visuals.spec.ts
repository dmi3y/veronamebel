import { test, expect, type Page } from "@playwright/test";

async function scrollPage(page: Page) {
  const sizes = await page.evaluate(() => {
    const browserHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;

    return { browserHeight, pageHeight };
  });

  for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    await page.mouse.wheel(0, i);
    await page.waitForTimeout(100);
  }

  for (let i = sizes.pageHeight; i > 0; i -= sizes.browserHeight) {
    await page.mouse.wheel(0, -i);
    await page.waitForTimeout(100);
  }

  await page.mouse.wheel(0, 0);
  await page.waitForTimeout(100);
}

test("home", async ({ page }) => {
  await page.goto("./", { waitUntil: "load" });
  await scrollPage(page);
  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
    fullPage: true,
  });
});
