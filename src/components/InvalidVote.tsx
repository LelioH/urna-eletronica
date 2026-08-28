type InvalidVoteProps = {
  digits: string;
};

export function InvalidVote({ digits }: InvalidVoteProps) {
  return (
    <article aria-label="Número não encontrado" className="state-message state-message--invalid">
      <div className="state-message__symbol" aria-hidden="true">
        !
      </div>
      <div>
        <p className="state-message__eyebrow">AÇÃO NECESSÁRIA</p>
        <h2>NÚMERO NÃO ENCONTRADO</h2>
        <p className="state-message__lead">
          O número <strong>{digits}</strong> não está disponível para esta votação.
        </p>
        <p className="state-message__instruction">
          Pressione <strong>CORRIGE</strong> e informe outro número.
        </p>
      </div>
    </article>
  );
}
