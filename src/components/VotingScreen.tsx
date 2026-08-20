import type { Office } from "../domain/election";
import type { VotingScreenModel } from "../hooks/useVotingMachine";
import { VoteResult } from "./VoteResult";
import { VoteReview } from "./VoteReview";

type VotingScreenProps = {
  office: Office;
  screen: VotingScreenModel;
  onDigitsChange: (digits: string) => void;
};

export function VotingScreen({
  office,
  screen,
  onDigitsChange,
}: VotingScreenProps) {
  switch (screen.view) {
    case "entry":
      return (
        <section
          aria-label="Tela da urna"
          aria-live="polite"
          aria-atomic="true"
          className="w-full h-full flex flex-col items-center"
        >
          <VoteReview
            variant="entry"
            digits={screen.digits}
            office={office}
            onDigitsChange={onDigitsChange}
          />
        </section>
      );
    case "candidate-review":
      return (
        <section
          aria-label="Revisão de candidato"
          aria-live="polite"
          aria-atomic="true"
          className="w-full h-full flex flex-col items-center"
        >
          <VoteReview
            variant="candidate-review"
            digits={screen.digits}
            office={office}
            candidate={screen.candidate}
          />
        </section>
      );
    case "blank-review":
      return (
        <section
          aria-label="Revisão de voto em branco"
          aria-live="polite"
          aria-atomic="true"
          className="w-full h-full flex flex-col items-center"
        >
          <VoteReview variant="blank-review" />
        </section>
      );
    case "invalid":
      return (
        <section
          aria-label="Voto inválido"
          aria-live="polite"
          aria-atomic="true"
          className="w-full h-full flex flex-col items-center"
        >
          <VoteResult result="invalid" />
        </section>
      );
    case "completed":
      return (
        <section
          aria-label="Voto concluído"
          aria-live="polite"
          aria-atomic="true"
          className="w-full h-full flex flex-col items-center"
        >
          <VoteResult result="completed" />
        </section>
      );
  }
}
