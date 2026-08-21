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
      content = <InvalidVote />;
      break;
    case "completed":
      content = <VoteResult />;
      break;
  }

  return (
    <section aria-label="Tela da urna" className="w-full h-full flex flex-col items-center">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </p>
      {content}
    </section>
  );
}
