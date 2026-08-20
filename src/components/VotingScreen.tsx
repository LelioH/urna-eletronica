import type { Office } from "../domain/election";
import type { VotingScreenModel } from "../hooks/useVotingMachine";
import { VoteResult } from "./VoteResult";
import { VoteReview } from "./VoteReview";

type VotingScreenProps = {
  office: Office;
  screen: VotingScreenModel;
};

export function VotingScreen({ office, screen }: VotingScreenProps) {
  switch (screen.view) {
    case "entry":
      return <VoteReview variant="entry" digits={screen.digits} office={office} />;
    case "candidate-review":
      return (
        <VoteReview
          variant="candidate-review"
          digits={screen.digits}
          office={office}
          candidate={screen.candidate}
        />
      );
    case "blank-review":
      return <VoteReview variant="blank-review" />;
    case "invalid":
      return <VoteResult result="invalid" />;
    case "completed":
      return <VoteResult result="completed" />;
  }
}
