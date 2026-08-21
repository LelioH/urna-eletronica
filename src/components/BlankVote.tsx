export function BlankVote() {
  return (
    <article className="flex items-center justify-center w-full h-full">
      <div className="text-center text-black font-inter">
        <h2 className="text-5xl break-words max-w-[607px] sm:text-4xl">
          VOTO EM BRANCO
        </h2>
        <p className="mt-6 text-xl sm:text-base">
          Pressione CONFIRMA para confirmar ou CORRIGE para voltar.
        </p>
      </div>
    </article>
  );
}
