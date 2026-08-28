import type { Office } from "../domain/election";
import type { VotingScreenModel } from "../hooks/useVotingMachine";
import type { ReactNode } from "react";
import { BlankVote } from "./BlankVote";
import { InvalidVote } from "./InvalidVote";
import { VoteResult } from "./VoteResult";
import { VoteReview } from "./VoteReview";

type VotingScreenProps = {
  office: Office;
  screen: VotingScreenModel;
  liveAnnouncement: string;
  onDigitsChange: (digits: string) => void;
};

export function VotingScreen({
  office,
  screen,
  liveAnnouncement,
  onDigitsChange,
}: VotingScreenProps) {
  let content: ReactNode;

  switch (screen.view) {
    case "entry":
      content = (
        <VoteReview
          variant="entry"
          digits={screen.digits}
          office={office}
          onDigitsChange={onDigitsChange}
        />
      );
      break;
    case "candidate-review":
      content = (
        <VoteReview
          variant="candidate-review"
          digits={screen.digits}
          office={office}
          candidate={screen.candidate}
        />
      );
      break;
    case "blank-review":
      content = <BlankVote />;
      break;
    case "invalid":
      content = <InvalidVote digits={screen.digits} />;
      break;
    case "completed":
      content = <VoteResult />;
      break;
  }

  const status = {
    entry: { label: "PREENCHA SEU VOTO", detail: "ETAPA 1 DE 2" },
    "candidate-review": { label: "CONFIRA OS DADOS", detail: "ETAPA 2 DE 2" },
    "blank-review": { label: "CONFIRME SUA ESCOLHA", detail: "REVISÃO" },
    invalid: { label: "REVISE O NÚMERO", detail: "AÇÃO NECESSÁRIA" },
    completed: { label: "PROCESSO CONCLUÍDO", detail: "PRONTO" },
  }[screen.view];

  return (
    <section aria-label="Tela da urna" className={`voting-screen voting-screen--${screen.view}`}>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </p>
      <header className="voting-screen__status" aria-hidden="true">
        <span>{status.label}</span>
        <span>{status.detail}</span>
      </header>
      <div className="voting-screen__content">{content}</div>
    </section>
  );
}
