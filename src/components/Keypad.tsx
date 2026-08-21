import { brailleNumericKeys } from "../domain/braille";

type KeypadProps = {
  disabled: boolean;
  onDigit: (digit: number) => void;
};

export function Keypad({ disabled, onDigit }: KeypadProps) {
  return (
    <section
      aria-label="Teclado numérico"
      className="flex w-full flex-row flex-wrap items-center justify-center gap-x-keypad-gap gap-y-keypad-gap p-0 tablet:max-h-keypad-height tablet:max-w-keypad-width tablet:p-keypad-padding"
    >
      {brailleNumericKeys.map((key) => (
        <button
          key={key.digit}
          type="button"
          disabled={disabled}
          aria-label={`Tecla ${key.digit}`}
          aria-keyshortcuts={String(key.digit)}
          onClick={() => onDigit(key.digit)}
          className="bg-keypad-surface text-keypad-ink shadow-keypad-key h-keypad-key-height-compact w-keypad-key-width-compact flex flex-col justify-center rounded-control pb-keypad-key-block ps-keypad-key-inline transition-all active:pb-keypad-key-block-pressed active:ps-keypad-key-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset tablet:h-keypad-key-height tablet:w-keypad-key-width"
        >
          <span className="text-2xl tablet:text-lg">{key.digit}</span>
          <span aria-hidden="true" className="text-xs leading-none">
            {key.symbol}
          </span>
        </button>
      ))}
    </section>
  );
}
