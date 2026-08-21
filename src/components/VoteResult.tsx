import CorrectEnding from "../assets/correct-ending.png";

export function VoteResult() {
  return (
    <article
      aria-label="Voto concluído"
      className="flex items-center justify-center w-full h-full"
    >
      <img
        src={CorrectEnding}
        width={580}
        height={380}
        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
        alt="Voto concluído"
      />
    </article>
  );
}
