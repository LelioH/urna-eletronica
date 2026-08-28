import { AxeBuilder } from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function enterNumber(page: Page, number: string) {
  for (const digit of number) {
    await page.getByRole("button", { name: `Tecla ${digit}` }).click();
  }
}

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
}

test.describe("automated accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("has no axe violations on the entry screen", async ({ page }) => {
    await expectNoAccessibilityViolations(page);
  });

  test("has no axe violations in each vote-review state", async ({ page }) => {
    await enterNumber(page, "12000");
    await expectNoAccessibilityViolations(page);

    await page.getByRole("button", { name: "Corrigir voto" }).click();
    await enterNumber(page, "99999");
    await expectNoAccessibilityViolations(page);

    await page.getByRole("button", { name: "Corrigir voto" }).click();
    await page.getByRole("button", { name: "Votar em branco" }).click();
    await expectNoAccessibilityViolations(page);
  });
});
