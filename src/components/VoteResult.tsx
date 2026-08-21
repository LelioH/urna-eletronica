import CorrectEnding from "../assets/correct-ending.png";

export function VoteResult() {
  return (
    <article
      aria-label="Voto concluído"
      className="flex h-full w-full items-center justify-center"
    >
      <img
        src={CorrectEnding}
        width={580}
        height={380}
        className="max-h-full max-w-full object-contain"
        alt="Voto concluído"
      />
    </article>
  );
}
