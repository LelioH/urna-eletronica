export function BlankVote() {
  return (
    <article className="state-message state-message--blank">
      <div className="state-message__symbol" aria-hidden="true">
        ○
      </div>
      <div>
        <p className="state-message__eyebrow">REVISÃO DO VOTO</p>
        <h2>VOTO EM BRANCO</h2>
        <p className="state-message__lead">Nenhuma candidatura será selecionada nesta etapa.</p>
        <p className="state-message__instruction">
          Pressione <strong>CONFIRMA</strong> para concluir ou <strong>CORRIGE</strong> para voltar.
        </p>
      </div>
    </article>
  );
}
