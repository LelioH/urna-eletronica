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
    <section aria-label="Ações de votação" className="action-panel">
      <button
        type="button"
        disabled={blankDisabled}
        aria-label="Votar em branco"
        aria-keyshortcuts="B"
        onClick={onBlank}
        className="action-button action-button--blank"
      >
        <span>BRANCO</span>
        <small>tecla B</small>
      </button>
      <button
        type="button"
        disabled={correctDisabled}
        aria-label="Corrigir voto"
        aria-keyshortcuts="Backspace Escape R"
        onClick={onCorrect}
        className="action-button action-button--correct"
      >
        <span>CORRIGE</span>
        <small>esc / R</small>
      </button>
      <button
        type="button"
        disabled={confirmDisabled}
        aria-label="Confirmar voto"
        aria-keyshortcuts="Enter C"
        onClick={onConfirm}
        className="action-button action-button--confirm"
      >
        <span>CONFIRMA</span>
        <small>enter / C</small>
      </button>
    </section>
  );
}
