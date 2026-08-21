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
      className="mb-action-panel-bottom flex flex-col gap-y-action-panel-gap px-action-panel-inline py-action-panel-block max-compact:mb-action-panel-bottom-compact max-compact:flex-row max-compact:items-end max-compact:gap-x-action-panel-gap-compact max-compact:pt-0"
    >
      <button
        type="button"
        disabled={blankDisabled}
        aria-label="Votar em branco"
        aria-keyshortcuts="B"
        onClick={onBlank}
        className="bg-action-blank shadow-action-blank h-action-height w-action-width rounded-control pb-action-block ps-action-inline text-left transition-all active:pb-0 active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset max-compact:h-action-height-compact max-compact:w-action-width-compact"
      >
        <span className="text-ink text-sm leading-none">BRANCO</span>
      </button>
      <button
        type="button"
        disabled={correctDisabled}
        aria-label="Corrigir voto"
        aria-keyshortcuts="Backspace Escape R"
        onClick={onCorrect}
        className="bg-action-correct shadow-action-correct h-action-height w-action-width rounded-control pb-action-block ps-action-inline text-left transition-all active:pb-0 active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset max-compact:h-action-height-compact max-compact:w-action-width-compact"
      >
        <span className="text-ink text-sm leading-none">CORRIGE</span>
      </button>
      <button
        type="button"
        disabled={confirmDisabled}
        aria-label="Confirmar voto"
        aria-keyshortcuts="Enter C"
        onClick={onConfirm}
        className="bg-action-confirm shadow-action-confirm h-action-confirm-height w-action-width rounded-control pb-action-confirm-block ps-action-inline text-left transition-all active:pb-action-confirm-block-pressed active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset max-compact:h-action-confirm-height-compact max-compact:w-action-width-compact max-compact:pb-action-confirm-block-compact max-compact:active:pb-action-confirm-block-pressed-compact"
      >
        <span className="text-ink text-sm leading-none">CONFIRMA</span>
      </button>
    </section>
  );
}
