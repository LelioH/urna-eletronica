export function VoteResult() {
  return (
    <article aria-label="Voto concluído" className="state-message state-message--completed">
      <div className="confirmation-seal" aria-hidden="true">
        <span>✓</span>
      </div>
      <div>
        <p className="state-message__eyebrow">CONFIRMAÇÃO CONCLUÍDA</p>
        <h2>VOTO CONFIRMADO</h2>
        <p className="state-message__lead">Obrigado por participar deste simulador.</p>
        <p className="state-message__instruction">A urna será preparada para a próxima pessoa.</p>
      </div>
    </article>
  );
}
