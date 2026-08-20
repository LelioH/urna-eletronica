import { brailleNumericKeys } from "../domain/braille";

type KeypadProps = {
  disabled: boolean;
  onDigit: (digit: number) => void;
};

export function Keypad({ disabled, onDigit }: KeypadProps) {
  return (
    <section
      aria-label="Teclado numérico"
      className="max-w-[270px] max-h-[224px] flex flex-wrap flex-row items-center justify-center gap-x-3 gap-y-3 p-2 sm:w-full sm:p-0"
    >
      {brailleNumericKeys.map((key) => (
        <button
          key={key.digit}
          type="button"
          disabled={disabled}
          aria-label={`Tecla ${key.digit}`}
          aria-keyshortcuts={String(key.digit)}
          onClick={() => onDigit(key.digit)}
          className="bg-dialer-button text-white flex flex-col justify-center w-14 h-9 rounded-lg pb-2 pl-1 active:pb-1 active:pl-1.5 button-shadow transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-20 sm:h-12 sm:pl-2 sm:active:pl-3"
        >
          <span className="text-lg font-[Inter] sm:text-2xl">{key.digit}</span>
          <span aria-hidden="true" className="text-xs leading-none">
            {key.symbol}
          </span>
        </button>
      ))}
    </section>
  );
}
