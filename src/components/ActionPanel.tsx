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
      className="mb-action-panel-bottom-compact flex flex-row items-end gap-x-action-panel-gap-compact px-action-panel-inline-compact py-action-panel-block pt-0 tablet:mb-action-panel-bottom-tablet tablet:flex-col tablet:items-stretch tablet:gap-x-0 tablet:gap-y-action-panel-gap tablet:px-action-panel-inline tablet:pt-action-panel-block desktop:mb-action-panel-bottom"
    >
      <button
        type="button"
        disabled={blankDisabled}
        aria-label="Votar em branco"
        aria-keyshortcuts="B"
        onClick={onBlank}
        className="bg-action-blank shadow-action-blank h-action-height-compact w-action-width-compact rounded-control pb-action-block ps-action-inline text-left transition-all active:pb-0 active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset tablet:h-action-height tablet:w-action-width"
      >
        <span className="text-ink text-sm leading-none">BRANCO</span>
      </button>
      <button
        type="button"
        disabled={correctDisabled}
        aria-label="Corrigir voto"
        aria-keyshortcuts="Backspace Escape R"
        onClick={onCorrect}
        className="bg-action-correct shadow-action-correct h-action-height-compact w-action-width-compact rounded-control pb-action-block ps-action-inline text-left transition-all active:pb-0 active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset tablet:h-action-height tablet:w-action-width"
      >
        <span className="text-ink text-sm leading-none">CORRIGE</span>
      </button>
      <button
        type="button"
        disabled={confirmDisabled}
        aria-label="Confirmar voto"
        aria-keyshortcuts="Enter C"
        onClick={onConfirm}
        className="bg-action-confirm shadow-action-confirm h-action-confirm-height-compact w-action-width-compact rounded-control pb-action-confirm-block-compact ps-action-inline text-left transition-all active:pb-action-confirm-block-pressed-compact active:ps-action-inline-pressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset tablet:h-action-confirm-height tablet:w-action-width tablet:pb-action-confirm-block tablet:active:pb-action-confirm-block-pressed"
      >
        <span className="text-ink text-sm leading-none">CONFIRMA</span>
      </button>
    </section>
  );
}
