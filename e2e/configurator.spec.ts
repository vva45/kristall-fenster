import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const width of [320, 360, 390]) {
  test(`configurador sin desbordamiento a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/configurator");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
}

test("no tiene infracciones axe de impacto serio o crítico", async ({ page }) => {
  await page.goto("/configurator");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});

test("permite recorrer y accionar la navegación solo con teclado", async ({ page }) => {
  await page.goto("/configurator");
  await page.keyboard.press("Tab");
  for (let attempts = 0; attempts < 20; attempts += 1) {
    const label = await page.locator(":focus").getAttribute("aria-label");
    if (label?.includes("English")) break;
    await page.keyboard.press("Tab");
  }
  await expect(page.locator(":focus")).toHaveAttribute("aria-label", /English/);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Configure your window" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
});
