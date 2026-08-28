import {
  findCandidate,
  simulatorElection,
  simulatorOffice,
  type Candidate,
} from "./domain/election";

export type VoteKind = "candidate" | "blank";
export type ConfirmationSound = "candidate-jingle" | "generic";

export type VoteState =
  | { phase: "typing"; digits: string }
  | { phase: "candidate-review"; digits: string; candidate: Candidate }
  | { phase: "invalid"; digits: string }
  | { phase: "blank-review" }
  | { phase: "finalizing"; kind: VoteKind; confirmationSound: ConfirmationSound }
  | { phase: "completed"; kind: VoteKind; confirmationSound: ConfirmationSound };

export type VoteEvent =
  | { type: "DIGIT_PRESSED"; digit: string }
  | { type: "DIGITS_CHANGED"; digits: string }
  | { type: "CORRECT_PRESSED" }
  | { type: "BLANK_PRESSED" }
  | { type: "CONFIRM_PRESSED" }
  | { type: "FINALIZATION_COMPLETED" }
  | { type: "RESET" };

export const initialVoteState: VoteState = { phase: "typing", digits: "" };

function transitionFromDigits(digits: string): VoteState {
  if (digits.length < simulatorOffice.digitCount) {
    return { phase: "typing", digits };
  }

  const candidate = findCandidate(simulatorElection, simulatorOffice, digits);
  return candidate
    ? { phase: "candidate-review", digits, candidate }
    : { phase: "invalid", digits };
}

export function voteReducer(state: VoteState, event: VoteEvent): VoteState {
  if (state.phase === "finalizing" && event.type !== "FINALIZATION_COMPLETED") {
    return state;
  }

  if (state.phase === "completed" && event.type !== "RESET") {
    return state;
  }

  switch (event.type) {
    case "DIGIT_PRESSED": {
      if (state.phase !== "typing" || state.digits.length >= simulatorOffice.digitCount) {
        return state;
      }

      const digits = `${state.digits}${event.digit}`;
      return transitionFromDigits(digits);
    }

    case "DIGITS_CHANGED": {
      if (state.phase !== "typing") return state;

      const digits = event.digits.replace(/\D/g, "").slice(0, simulatorOffice.digitCount);
      return transitionFromDigits(digits);
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
        return {
          phase: "finalizing",
          kind: "candidate",
          confirmationSound: state.candidate.confirmationSound ?? "generic",
        };
      }

      if (state.phase === "blank-review") {
        return { phase: "finalizing", kind: "blank", confirmationSound: "generic" };
      }

      return state;

    case "FINALIZATION_COMPLETED":
      return state.phase === "finalizing"
        ? {
            phase: "completed",
            kind: state.kind,
            confirmationSound: state.confirmationSound,
          }
        : state;

    case "RESET":
      return state.phase === "completed" ? initialVoteState : state;
  }
}
