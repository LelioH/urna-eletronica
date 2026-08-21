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
    };

export function VoteReview(props: VoteReviewProps) {
  const digitFields = useRef<Array<HTMLInputElement | null>>([]);

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
    <article className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-row justify-between p-review-content max-compact:justify-center max-compact:gap-4 max-compact:p-review-content-compact max-compact:text-center">
        <div className="flex flex-col justify-evenly max-compact:justify-between">
          <p className="text-ink text-lg max-compact:text-xs">
            SEU VOTO PARA
          </p>
          <h2
            className={`text-ink text-3xl max-compact:text-lg ${
              candidate
                ? "max-compact:mt-review-title-candidate-offset-compact"
                : "max-compact:mt-review-title-entry-offset-compact"
            }`}
          >
            {props.office.label}
          </h2>
          <form
            aria-label="Número do candidato"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset>
              <legend className="text-ink text-lg max-compact:text-xs">
                NÚMERO:
              </legend>
              <p id="digit-instructions" className="sr-only">
                Digite apenas números. Use Tab ou as setas para navegar entre os
                campos e Backspace para apagar.
              </p>
              <div className="flex flex-row gap-review-digits-gap max-compact:gap-review-digits-gap-compact">
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
                    className="border-field-border text-ink flex h-review-digit-height w-review-digit-width items-center justify-center rounded-field border p-review-digit-padding text-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring focus-visible:ring-offset-[length:var(--spacing-focus-offset)] focus-visible:ring-offset-focus-offset max-compact:h-review-digit-height-compact"
                  />
                ))}
              </div>
            </fieldset>
          </form>
          {candidate && (
            <div>
              <p className="text-ink text-lg max-compact:text-xs">
                NOME: {candidate.name}
              </p>
              <p className="text-ink text-lg max-compact:text-xs">
                PARTIDO: {candidate.party}
              </p>
            </div>
          )}
        </div>
        <div
          className={`${!candidate ? "bg-photo-placeholder" : ""} h-review-photo-height w-review-photo-width max-compact:absolute max-compact:top-review-photo-offset-block-compact max-compact:right-review-photo-offset-inline-compact max-compact:h-review-photo-height-compact max-compact:w-review-photo-width-compact max-compact:p-0`}
        >
          {candidate && (
            <img
              src={candidate.photoSrc}
              width={200}
              height={240}
              alt={candidate.photoAlt}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
      </div>
      {candidate && (
        <>
          <hr className="border-rule mb-review-divider-bottom w-full border max-compact:mb-0 max-compact:hidden" />
          <div className="flex w-full flex-row self-start gap-review-instructions-gap ps-review-instructions-inline max-compact:hidden">
            <p className="text-ink text-lg max-compact:text-xs">
              APERTE A TECLA:
            </p>
            <div>
              <p className="text-ink text-lg max-compact:text-xs">
                Aperte <strong>CONFIRMA</strong> (tecla Enter ou C) para
                confirmar este voto.
              </p>
              <p className="text-ink text-lg max-compact:text-xs">
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
