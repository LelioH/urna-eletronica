import {
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import type { Candidate, Office } from "../domain/election";

type VoteReviewProps =
  | {
      variant: "entry";
      digits: string;
      office: Office;
      onDigitsChange: (digits: string) => void;
    }
  | {
      variant: "candidate-review";
      digits: string;
      office: Office;
      candidate: Candidate;
    }
  | { variant: "blank-review" };

export function VoteReview(props: VoteReviewProps) {
  const digitFields = useRef<Array<HTMLInputElement | null>>([]);

  if (props.variant === "blank-review") {
    return (
      <article className="flex items-center justify-center w-full h-full">
        <div className="text-center text-black font-inter">
          <h1 className="text-5xl break-words max-w-[607px] sm:text-4xl">
            VOTO EM BRANCO
          </h1>
          <p className="mt-6 text-xl sm:text-base">
            Aperte CONFIRMA para confirmar ou CORRIGE para voltar.
          </p>
        </div>
      </article>
    );
  }

  const candidate =
    props.variant === "candidate-review" ? props.candidate : undefined;
  const canEditDigits = props.variant === "entry";

  const focusDigit = (index: number) => {
    digitFields.current[index]?.focus();
  };

  const updateDigits = (index: number, replacement: string) => {
    if (props.variant !== "entry") return;

    const maskedDigits = replacement.replace(/\D/g, "");
    if (!maskedDigits) return;

    const insertionIndex = Math.min(index, props.digits.length);
    const nextDigits = `${props.digits.slice(0, insertionIndex)}${maskedDigits}${
      props.digits.slice(insertionIndex + maskedDigits.length)
    }`.slice(0, props.office.digitCount);

    props.onDigitsChange(nextDigits);
    const nextIndex = Math.min(
      insertionIndex + Math.max(maskedDigits.length, 1),
      props.office.digitCount - 1,
    );
    focusDigit(nextIndex);
  };

  const handleDigitChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const typedDigits = event.currentTarget.value.replace(/\D/g, "");

    if (typedDigits) {
      updateDigits(index, typedDigits);
      return;
    }

    if (props.variant === "entry" && index < props.digits.length) {
      props.onDigitsChange(
        `${props.digits.slice(0, index)}${props.digits.slice(index + 1)}`,
      );
    }
  };

  const handleDigitKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusDigit(Math.max(index - 1, 0));
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusDigit(Math.min(index + 1, props.office.digitCount - 1));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusDigit(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusDigit(Math.max(props.digits.length - 1, 0));
      return;
    }

    if (
      event.key === "Backspace" &&
      props.variant === "entry" &&
      !props.digits[index] &&
      index > 0
    ) {
      event.preventDefault();
      const previousIndex = Math.min(index - 1, props.digits.length - 1);
      if (previousIndex >= 0) {
        props.onDigitsChange(
          `${props.digits.slice(0, previousIndex)}${props.digits.slice(
            previousIndex + 1,
          )}`,
        );
        focusDigit(previousIndex);
      }
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    if (props.variant !== "entry") return;

    event.preventDefault();
    updateDigits(index, event.clipboardData.getData("text"));
  };

  return (
    <article className="w-full h-full flex flex-col">
      <div className="flex flex-row w-full h-full justify-between p-2 sm:gap-4 sm:text-center sm:justify-center sm:p-1">
        <div className="flex flex-col justify-evenly sm:justify-between">
          <p className="text-black text-lg font-inter sm:text-xs">
            SEU VOTO PARA
          </p>
          <h1
            className={`text-black text-3xl font-inter sm:text-lg ${
              candidate ? "sm:mt-[160px]" : "sm:mt-[180px]"
            }`}
          >
            {props.office.label}
          </h1>
          <form
            aria-label="Número do candidato"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset>
              <legend className="text-black text-lg font-inter sm:text-xs">
                NÚMERO:
              </legend>
              <p id="digit-instructions" className="sr-only">
                Digite apenas números. Use Tab ou as setas para navegar entre os
                campos e Backspace para apagar.
              </p>
              <div className="flex flex-row gap-2 sm:gap-1">
                {Array.from({ length: props.office.digitCount }, (_, index) => (
                  <input
                    key={index}
                    ref={(field) => {
                      digitFields.current[index] = field;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    maxLength={1}
                    readOnly={!canEditDigits}
                    tabIndex={canEditDigits ? 0 : -1}
                    aria-label={`Dígito ${index + 1} de ${props.office.digitCount}`}
                    aria-describedby="digit-instructions"
                    value={props.digits[index] ?? ""}
                    onChange={(event) => handleDigitChange(index, event)}
                    onKeyDown={(event) => handleDigitKeyDown(index, event)}
                    onPaste={(event) => handlePaste(index, event)}
                    className="border-black text-black flex justify-center items-center border w-12 h-14 rounded-md text-2xl font-inter p-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:h-10"
                  />
                ))}
              </div>
            </fieldset>
          </form>
          {candidate && (
            <div>
              <p className="text-black text-lg font-inter sm:text-xs">
                NOME: {candidate.name}
              </p>
              <p className="text-black text-lg font-inter sm:text-xs">
                PARTIDO: {candidate.party}
              </p>
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
            <p className="text-black text-lg font-inter sm:text-xs">
              APERTE A TECLA:
            </p>
            <div>
              <p className="text-black text-lg font-inter sm:text-xs">
                Aperte <strong>CONFIRMA</strong> (tecla Enter ou C) para
                confirmar este voto.
              </p>
              <p className="text-black text-lg font-inter sm:text-xs">
                Aperte <strong>CORRIGE</strong> (Backspace, Escape ou R) para
                reiniciar este voto.
              </p>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
