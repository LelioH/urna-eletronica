export function BlankVote() {
  return (
    <article className="flex items-center justify-center w-full h-full">
      <div className="text-ink text-center">
        <h2 className="max-w-blank-title-width break-words text-4xl tablet:text-5xl">
          VOTO EM BRANCO
        </h2>
        <p className="mt-blank-message-before text-base tablet:text-xl">
          Pressione CONFIRMA para confirmar ou CORRIGE para voltar.
        </p>
      </div>
    </article>
  );
}
