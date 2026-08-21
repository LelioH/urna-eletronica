export function InvalidVote() {
  return (
    <article
      aria-label="Número não encontrado"
      className="flex flex-col items-center justify-center w-full h-full gap-4 px-6 text-center font-inter"
    >
      <h2 className="text-black text-3xl sm:text-2xl">
        NÚMERO NÃO ENCONTRADO
      </h2>
      <p className="text-black text-xl sm:text-base">
        Pressione CORRIGE para alterar.
      </p>
    </article>
  );
}
