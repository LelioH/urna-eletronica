import { brailleNumericKeys } from "../domain/braille";

type KeypadProps = {
  disabled: boolean;
  onDigit: (digit: number) => void;
};

export function Keypad({ disabled, onDigit }: KeypadProps) {
  return (
    <section
      aria-label="Teclado numérico"
      className="max-h-keypad-height max-w-keypad-width flex flex-row flex-wrap items-center justify-center gap-x-keypad-gap gap-y-keypad-gap p-keypad-padding max-compact:w-full max-compact:p-0"
    >
      {brailleNumericKeys.map((key) => (
        <button
          key={key.digit}
          type="button"
          disabled={disabled}
          aria-label={`Tecla ${key.digit}`}
          aria-keyshortcuts={String(key.digit)}
          onClick={() => onDigit(key.digit)}
          className="bg-keypad-surface text-keypad-ink shadow-keypad-key h-keypad-key-height w-keypad-key-width flex flex-col justify-center rounded-control pb-keypad-key-block ps-keypad-key-inline transition-all active:pb-keypad-key-block-pressed active:ps-keypad-key-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset max-compact:h-keypad-key-height-compact max-compact:w-keypad-key-width-compact"
        >
          <span className="text-lg max-compact:text-2xl">{key.digit}</span>
          <span aria-hidden="true" className="text-xs leading-none">
            {key.symbol}
          </span>
        </button>
      ))}
    </section>
  );
}
