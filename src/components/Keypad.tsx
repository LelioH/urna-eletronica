const keys = [
  { value: 1, braille: "⠃" },
  { value: 2, braille: "⠉" },
  { value: 3, braille: "⠙" },
  { value: 4, braille: "⠑" },
  { value: 5, braille: "⠋" },
  { value: 6, braille: "⠛" },
  { value: 7, braille: "⠓" },
  { value: 8, braille: "⠊" },
  { value: 9, braille: "⠚" },
  { value: 0, braille: "⠁" },
];

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
      {keys.map((key) => (
        <button
          key={key.value}
          type="button"
          disabled={disabled}
          aria-label={`Digitar ${key.value}`}
          onClick={() => onDigit(key.value)}
          className="bg-dialer-button text-white flex flex-col justify-center w-14 h-9 rounded-lg pb-2 pl-1 active:pb-1 active:pl-1.5 button-shadow transition-all sm:w-20 sm:h-12 sm:pl-2 sm:active:pl-3"
        >
          <span className="text-xl font-[Inter] sm:text-3xl">{key.value}</span>
          <span className="sr-only">Braille {key.braille}</span>
        </button>
      ))}
    </section>
  );
}
