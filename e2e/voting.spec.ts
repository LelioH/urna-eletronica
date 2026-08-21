import { expect, test, type Page } from "@playwright/test";

async function enterNumber(page: Page, number: string) {
  for (const digit of number) {
    await page.getByRole("button", { name: `Tecla ${digit}` }).click();
  }
}

test.describe("voting flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("confirms a recognized candidate", async ({ page }) => {
    await enterNumber(page, "12000");

    await expect(page.getByText("NOME: LARA OLIVEIRA")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirmar voto" }),
    ).toBeEnabled();

    await page.getByRole("button", { name: "Confirmar voto" }).click();

    await expect(
      page.getByRole("img", { name: "Voto concluído" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirmar voto" }),
    ).toBeDisabled();
  });

  test("blocks an invalid vote until it is corrected", async ({ page }) => {
    await enterNumber(page, "99999");

    await expect(page.getByText("NÚMERO NÃO ENCONTRADO")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirmar voto" }),
    ).toBeDisabled();

    await page.getByRole("button", { name: "Corrigir voto" }).click();

    await expect(
      page.getByRole("textbox", { name: "Dígito 1 de 5" }),
    ).toHaveValue("");
  });

  test("reviews and confirms a blank vote", async ({ page }) => {
    await page.getByRole("button", { name: "Votar em branco" }).click();

    await expect(
      page.getByRole("heading", { name: "VOTO EM BRANCO" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirmar voto" }),
    ).toBeEnabled();

    await page.getByRole("button", { name: "Confirmar voto" }).click();

    await expect(
      page.getByRole("img", { name: "Voto concluído" }),
    ).toBeVisible();
  });
});
