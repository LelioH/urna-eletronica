export function InvalidVote() {
  return (
    <article
      aria-label="Número não encontrado"
      className="flex h-full w-full flex-col items-center justify-center gap-state-message-gap px-state-message-inline text-center"
    >
      <h2 className="text-ink text-3xl max-compact:text-2xl">
        NÚMERO NÃO ENCONTRADO
      </h2>
      <p className="text-ink text-xl max-compact:text-base">
        Pressione CORRIGE para alterar.
      </p>
    </article>
  );
}
