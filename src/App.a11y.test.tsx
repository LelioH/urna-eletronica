import axe from "axe-core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

async function expectNoAccessibilityViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      // JSDOM does not calculate rendered colors. The browser E2E suite runs
      // this rule against the actual styles in Chromium, Firefox, and WebKit.
      "color-contrast": { enabled: false },
    },
  });

  expect(results.violations).toEqual([]);
}

describe("interface accessibility", () => {
  it("has no detectable violations on the entry screen", async () => {
    const { container } = render(<App />);

    await expectNoAccessibilityViolations(container);
  });

  it("has no detectable violations while reviewing a candidate", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    for (const digit of "12000") {
      await user.click(screen.getByRole("button", { name: `Tecla ${digit}` }));
    }

    await expectNoAccessibilityViolations(container);
  });
});
