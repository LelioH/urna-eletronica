type ActionPanelProps = {
  blankDisabled: boolean;
  correctDisabled: boolean;
  confirmDisabled: boolean;
  onBlank: () => void;
  onCorrect: () => void;
  onConfirm: () => void;
};

export function ActionPanel({
  blankDisabled,
  correctDisabled,
  confirmDisabled,
  onBlank,
  onCorrect,
  onConfirm,
}: ActionPanelProps) {
  return (
    <section
      aria-label="Ações de votação"
      className="flex flex-col gap-y-4 py-3 mb-24 px-9 sm:flex-row sm:mb-4 sm:gap-x-2 sm:items-end sm:pt-0"
    >
      <button
        type="button"
        disabled={blankDisabled}
        aria-label="Votar em branco"
        aria-keyshortcuts="B"
        onClick={onBlank}
        className="bg-white w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-[84px] sm:h-12 sm:pl-2 sm:active:pl-3"
      >
        <span className="text-black text-sm font-inter leading-none">BRANCO</span>
      </button>
      <button
        type="button"
        disabled={correctDisabled}
        aria-label="Corrigir voto"
        aria-keyshortcuts="Backspace Escape R"
        onClick={onCorrect}
        className="bg-red-400 w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-correct transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-[84px] sm:h-12 sm:pl-2 sm:active:pl-3"
      >
        <span className="text-black text-sm font-inter leading-none">CORRIGE</span>
      </button>
      <button
        type="button"
        disabled={confirmDisabled}
        aria-label="Confirmar voto"
        aria-keyshortcuts="Enter C"
        onClick={onConfirm}
        className="bg-green-400 w-24 h-24 rounded-lg text-left justify-center pb-14 pl-2 active:pb-12 active:pl-3 btn-shadow-confirm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:h-20 sm:pb-10 sm:active:pb-8"
      >
        <span className="text-black text-sm font-inter leading-none">CONFIRMA</span>
      </button>
    </section>
  );
}
