export type Candidate = {
  number: string;
  name: string;
  party: string;
};

export type VoteKind = "candidate" | "blank";

export type VoteState =
  | { phase: "typing"; digits: string }
  | { phase: "candidate-review"; digits: string; candidate: Candidate }
  | { phase: "invalid"; digits: string }
  | { phase: "blank-review" }
  | { phase: "finalizing"; kind: VoteKind }
  | { phase: "completed"; kind: VoteKind };

export type VoteEvent =
  | { type: "DIGIT_PRESSED"; digit: string }
  | { type: "CORRECT_PRESSED" }
  | { type: "BLANK_PRESSED" }
  | { type: "CONFIRM_PRESSED" }
  | { type: "FINALIZATION_COMPLETED" }
  | { type: "RESET" };

export const MAX_DIGITS = 5;

const candidates: Candidate[] = [
  { number: "12000", name: "LARA OLIVEIRA", party: "PDT" },
];

export const initialVoteState: VoteState = { phase: "typing", digits: "" };

export function findCandidate(digits: string): Candidate | undefined {
  return candidates.find((candidate) => candidate.number === digits);
}

export function voteReducer(state: VoteState, event: VoteEvent): VoteState {
  switch (event.type) {
    case "DIGIT_PRESSED": {
      if (state.phase !== "typing" || state.digits.length >= MAX_DIGITS) {
        return state;
      }

      const digits = `${state.digits}${event.digit}`;
      if (digits.length < MAX_DIGITS) {
        return { phase: "typing", digits };
      }

      const candidate = findCandidate(digits);
      return candidate
        ? { phase: "candidate-review", digits, candidate }
        : { phase: "invalid", digits };
    }

    case "CORRECT_PRESSED":
      return state.phase === "typing" ||
        state.phase === "candidate-review" ||
        state.phase === "invalid" ||
        state.phase === "blank-review"
        ? initialVoteState
        : state;

    case "BLANK_PRESSED":
      return state.phase === "typing" ? { phase: "blank-review" } : state;

    case "CONFIRM_PRESSED":
      if (state.phase === "candidate-review") {
        return { phase: "finalizing", kind: "candidate" };
      }

      if (state.phase === "blank-review") {
        return { phase: "finalizing", kind: "blank" };
      }

      return state;

    case "FINALIZATION_COMPLETED":
      return state.phase === "finalizing"
        ? { phase: "completed", kind: state.kind }
        : state;

    case "RESET":
      return state.phase === "completed" ? initialVoteState : state;
  }
}
