export function WrongVote() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-6 text-center font-inter">
      <h1 className="text-black text-3xl sm:text-2xl">NÚMERO NÃO ENCONTRADO</h1>
      <p className="text-black text-xl sm:text-base">
        Pressione CORRIGE para alterar o voto.
      </p>
    </div>
  );
}
