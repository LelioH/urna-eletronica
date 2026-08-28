import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

async function enterNumber(user: ReturnType<typeof userEvent.setup>, number: string) {
  for (const digit of number) {
    await user.click(screen.getByRole("button", { name: `Tecla ${digit}` }));
  }
}

describe("voting interface", () => {
  it("identifies the experience as an independent, unofficial simulator", () => {
    render(<App />);

    expect(screen.getByText(/Projeto independente e não oficial/)).toBeInTheDocument();
  });

  it("lets a voter review and confirm a recognized candidate", async () => {
    const user = userEvent.setup();
    render(<App />);

    await enterNumber(user, "12000");

    expect(screen.getByText("NOME: LARA OLIVEIRA")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar voto" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Confirmar voto" }));

    expect(screen.getByText("VOTO CONFIRMADO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar voto" })).toBeDisabled();
  });

  it("shows an invalid-vote instruction and requires correction", async () => {
    const user = userEvent.setup();
    render(<App />);

    await enterNumber(user, "99999");

    expect(screen.getByText("NÚMERO NÃO ENCONTRADO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar voto" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Corrigir voto" }));

    expect(screen.queryByText("NÚMERO NÃO ENCONTRADO")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Dígito 1 de 5" })).toHaveValue("");
  });

  it("allows a blank vote to be reviewed and corrected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Votar em branco" }));

    expect(screen.getByText("VOTO EM BRANCO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar voto" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Corrigir voto" }));

    expect(screen.queryByText("VOTO EM BRANCO")).not.toBeInTheDocument();
    expect(screen.getByText("SEU VOTO PARA")).toBeInTheDocument();
  });
});
