export type BrailleNumericKey = {
  digit: number;
  symbol: string;
};

/**
 * Grafia Braille para a Língua Portuguesa (MEC/CBB), seção 12:
 * o sinal de número (pontos 3456, ⠼) precede a primeira série (a–j)
 * para representar os algarismos de 1 a 0. Cada tecla é apresentada
 * como um algarismo isolado e, portanto, inclui o sinal de número.
 */
export const brailleNumericKeys: readonly BrailleNumericKey[] = [
  { digit: 1, symbol: "⠼⠁" },
  { digit: 2, symbol: "⠼⠃" },
  { digit: 3, symbol: "⠼⠉" },
  { digit: 4, symbol: "⠼⠙" },
  { digit: 5, symbol: "⠼⠑" },
  { digit: 6, symbol: "⠼⠋" },
  { digit: 7, symbol: "⠼⠛" },
  { digit: 8, symbol: "⠼⠓" },
  { digit: 9, symbol: "⠼⠊" },
  { digit: 0, symbol: "⠼⠚" },
];
