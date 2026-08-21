export function InvalidVote() {
  return (
    <article
      aria-label="Número não encontrado"
      className="flex h-full w-full flex-col items-center justify-center gap-state-message-gap px-state-message-inline text-center"
    >
      <h2 className="text-ink text-2xl tablet:text-3xl">
        NÚMERO NÃO ENCONTRADO
      </h2>
      <p className="text-ink text-base tablet:text-xl">
        Pressione CORRIGE para alterar.
      </p>
    </article>
  );
}
