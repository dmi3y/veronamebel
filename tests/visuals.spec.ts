import { test, expect, type Page } from "@playwright/test";

async function scrollPageDownUp(page: Page) {
  const isScrolled = async () =>
    await page.evaluate(() => {
      const browserHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      const scrollPosition = document.scrollingElement?.scrollTop || 0;

      return {
        isOnBottom: scrollPosition + browserHeight >= pageHeight,
        isOnTop: scrollPosition === 0,
        isInside: scrollPosition > 0 && scrollPosition < pageHeight,
      };
    });

  let isOnBottom = false;
  let isOnTop = false;

  while (!isOnBottom) {
    await page.keyboard.down("PageDown");
    await page.waitForTimeout(500);
    await page.keyboard.up("PageDown");
    ({ isOnBottom } = await isScrolled());
  }

  while (!isOnTop) {
    await page.keyboard.down("PageUp");
    await page.waitForTimeout(500);
    await page.keyboard.up("PageUp");
    ({ isOnTop } = await isScrolled());
  }
}

test("home", async ({ page }) => {
  await page.goto("./", { waitUntil: "load" });
  await scrollPageDownUp(page);
  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
    fullPage: true,
  });
});
