import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
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

  const candidate = props.variant === "candidate-review" ? props.candidate : undefined;
  const canEditDigits = props.variant === "entry";

  const focusDigit = (index: number) => {
    digitFields.current[index]?.focus();
  };

  const updateDigits = (index: number, replacement: string) => {
    if (props.variant !== "entry") return;

    const maskedDigits = replacement.replace(/\D/g, "");
    if (!maskedDigits) return;

    const insertionIndex = Math.min(index, props.digits.length);
    const nextDigits = `${props.digits.slice(0, insertionIndex)}${maskedDigits}${props.digits.slice(
      insertionIndex + maskedDigits.length,
    )}`.slice(0, props.office.digitCount);

    props.onDigitsChange(nextDigits);
    const nextIndex = Math.min(
      insertionIndex + Math.max(maskedDigits.length, 1),
      props.office.digitCount - 1,
    );
    focusDigit(nextIndex);
  };

  const handleDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const typedDigits = event.currentTarget.value.replace(/\D/g, "");

    if (typedDigits) {
      updateDigits(index, typedDigits);
      return;
    }

    if (props.variant === "entry" && index < props.digits.length) {
      props.onDigitsChange(`${props.digits.slice(0, index)}${props.digits.slice(index + 1)}`);
    }
  };

  const handleDigitKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
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
          `${props.digits.slice(0, previousIndex)}${props.digits.slice(previousIndex + 1)}`,
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
    <article className={`vote-review ${candidate ? "vote-review--candidate" : ""}`}>
      <div className="vote-review__main">
        <div className="vote-review__information">
          <p className="vote-review__eyebrow">SEU VOTO PARA</p>
          <h2>{props.office.label}</h2>

          <form
            aria-label="Número do candidato"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset className="digit-fieldset">
              <legend>NÚMERO</legend>
              <p id="digit-instructions" className="sr-only">
                Digite apenas números. Use Tab ou as setas para navegar entre os campos e Backspace
                para apagar.
              </p>
              <div className="digit-fields">
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
                    className="digit-field"
                  />
                ))}
              </div>
            </fieldset>
          </form>

          {candidate ? (
            <div className="candidate-details">
              <p>NOME: {candidate.name}</p>
              <p>PARTIDO: {candidate.party}</p>
            </div>
          ) : (
            <p className="vote-review__hint">
              Digite os {props.office.digitCount} números no teclado para visualizar a candidatura.
            </p>
          )}
        </div>

        <div className={`candidate-preview ${candidate ? "candidate-preview--ready" : ""}`}>
          {candidate ? (
            <>
              <img src={candidate.photoSrc} width={200} height={240} alt={candidate.photoAlt} />
              <span className="candidate-preview__verified">DADOS PARA CONFERÊNCIA</span>
            </>
          ) : (
            <div className="candidate-preview__empty" aria-hidden="true">
              <span>?</span>
              <p>
                AGUARDANDO
                <br />
                NÚMERO
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="vote-review__footer">
        {candidate ? (
          <p>
            Confira os dados. Pressione <strong>CONFIRMA</strong> para avançar ou{" "}
            <strong>CORRIGE</strong> para reiniciar.
          </p>
        ) : (
          <p>
            Para voto em branco, pressione <strong>BRANCO</strong>. Para apagar tudo, pressione{" "}
            <strong>CORRIGE</strong>.
          </p>
        )}
      </footer>
    </article>
  );
}
