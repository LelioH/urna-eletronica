type KeypadProps = {
  disabled: boolean;
  onDigit: (digit: number) => void;
};

const numericKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function Keypad({ disabled, onDigit }: KeypadProps) {
  return (
    <section aria-label="Teclado numérico" className="keypad">
      {numericKeys.map((digit) => (
        <button
          key={digit}
          type="button"
          disabled={disabled}
          aria-label={`Tecla ${digit}`}
          aria-keyshortcuts={String(digit)}
          onClick={() => onDigit(digit)}
          className={`keypad-key ${digit === 0 ? "keypad-key--zero" : ""}`}
        >
          <span>{digit}</span>
        </button>
      ))}
    </section>
  );
}
