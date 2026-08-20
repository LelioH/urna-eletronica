import type { Candidate, Office } from "../domain/election";

type VoteReviewProps =
  | { variant: "entry"; digits: string; office: Office }
  | {
      variant: "candidate-review";
      digits: string;
      office: Office;
      candidate: Candidate;
    }
  | { variant: "blank-review" };

export function VoteReview(props: VoteReviewProps) {
  if (props.variant === "blank-review") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-black font-inter">
          <h1 className="text-5xl break-words max-w-[607px] sm:text-4xl">
            VOTO EM BRANCO
          </h1>
          <p className="mt-6 text-xl sm:text-base">
            Aperte CONFIRMA para confirmar ou CORRIGE para voltar.
          </p>
        </div>
      </div>
    );
  }

  const candidate =
    props.variant === "candidate-review" ? props.candidate : undefined;

  return (
    <>
      <div className="flex flex-row w-full h-full justify-between p-2 sm:gap-4 sm:text-center sm:justify-center sm:p-1">
        <div className="flex flex-col justify-evenly sm:justify-between">
          <h1 className="text-black text-lg font-inter sm:text-xs">
            SEU VOTO PARA
          </h1>
          <h1
            className={`text-black text-3xl font-inter sm:text-lg ${
              candidate ? "sm:mt-[160px]" : "sm:mt-[180px]"
            }`}
          >
            {props.office.label}
          </h1>
          <div>
            <label className="text-black text-lg font-inter sm:text-xs">
              NÚMERO:
            </label>
            <div className="flex flex-row gap-2 sm:gap-1">
              {Array.from({ length: props.office.digitCount }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  readOnly
                  value={props.digits[index] ?? ""}
                  className="border-black text-black flex justify-center items-center border w-12 h-14 rounded-md text-2xl font-inter p-3 sm:h-10"
                />
              ))}
            </div>
          </div>
          {candidate && (
            <div>
              <h1 className="text-black text-lg font-inter sm:text-xs">
                NOME: {candidate.name}
              </h1>
              <h1 className="text-black text-lg font-inter sm:text-xs">
                PARTIDO: {candidate.party}
              </h1>
            </div>
          )}
        </div>
        <div
          className={`${
            !candidate && "bg-slate-50"
          } bg-opacity-90 w-[200px] h-[240px] sm:absolute sm:top-[45px] sm:right-[135px] sm:w-[130px] sm:h-[150px] sm:p-0`}
        >
          {candidate && (
            <img
              src={candidate.photoSrc}
              width={200}
              height={240}
              alt={candidate.photoAlt}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          )}
        </div>
      </div>
      {candidate && (
        <>
          <hr className="border border-black w-full mb-1 sm:mb-0 sm:hidden" />
          <div className="flex flex-row gap-3 self-start w-full pl-2 sm:text-center sm:p-1 sm:hidden">
            <h1 className="text-black text-lg font-inter sm:text-xs">
              APERTE A TECLA:
            </h1>
            <div>
              <h1 className="text-black text-lg font-inter sm:text-xs">
                <span className="text-green-500">VERDE</span> para CONFIRMAR
                este voto
              </h1>
              <h1 className="text-black text-lg font-inter sm:text-xs">
                <span className="text-red-500">VERMELHO</span> para REINICIAR
                este voto
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
