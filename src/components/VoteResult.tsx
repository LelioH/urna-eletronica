import CorrectEnding from "../assets/correct-ending.png";

type VoteResultProps = {
  result: "invalid" | "completed";
};

export function VoteResult({ result }: VoteResultProps) {
  if (result === "invalid") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-6 text-center font-inter">
        <h1 className="text-black text-3xl sm:text-2xl">
          NÚMERO NÃO ENCONTRADO
        </h1>
        <p className="text-black text-xl sm:text-base">
          Pressione CORRIGE para alterar o voto.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <img
        src={CorrectEnding}
        width={580}
        height={380}
        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
        alt="Voto concluído"
      />
    </div>
  );
}
