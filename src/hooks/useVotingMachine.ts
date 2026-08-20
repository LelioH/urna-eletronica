import { useEffect, useReducer, useRef } from "react";
import type { Candidate } from "../domain/election";
import { initialVoteState, voteReducer, type VoteState } from "../voteMachine";

export type VotingScreenModel =
  | { view: "entry"; digits: string }
  | { view: "candidate-review"; digits: string; candidate: Candidate }
  | { view: "blank-review" }
  | { view: "invalid" }
  | { view: "completed" };

function createScreenModel(state: VoteState): VotingScreenModel {
  switch (state.phase) {
    case "typing":
      return { view: "entry", digits: state.digits };
    case "candidate-review":
      return {
        view: "candidate-review",
        digits: state.digits,
        candidate: state.candidate,
      };
    case "blank-review":
      return { view: "blank-review" };
    case "invalid":
      return { view: "invalid" };
    case "finalizing":
    case "completed":
      return { view: "completed" };
  }
}

export function useVotingMachine() {
  const [voteState, dispatch] = useReducer(voteReducer, initialVoteState);
  const confirmSound = useRef<HTMLAudioElement | null>(null);
  const finalizationTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}confirma-urna.mp3`,
    );
    confirmSound.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      confirmSound.current = null;
    };
  }, []);

  useEffect(() => {
    if (voteState.phase !== "finalizing") return;

    const audio = confirmSound.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch((error: unknown) => {
        console.warn("Não foi possível reproduzir o som de confirmação.", error);
      });
    }

    finalizationTimer.current = window.setTimeout(() => {
      dispatch({ type: "FINALIZATION_COMPLETED" });
    }, 200);

    return () => {
      if (finalizationTimer.current !== null) {
        window.clearTimeout(finalizationTimer.current);
        finalizationTimer.current = null;
      }
    };
  }, [voteState.phase]);

  useEffect(() => {
    if (voteState.phase !== "completed") return;

    resetTimer.current = window.setTimeout(() => {
      const audio = confirmSound.current;
      if (audio) audio.currentTime = 0;
      dispatch({ type: "RESET" });
    }, 3000);

    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };
  }, [voteState.phase]);

  const canStartBlankVote = voteState.phase === "typing";
  const canCorrect =
    voteState.phase === "typing" ||
    voteState.phase === "candidate-review" ||
    voteState.phase === "invalid" ||
    voteState.phase === "blank-review";
  const canConfirm =
    voteState.phase === "candidate-review" ||
    voteState.phase === "blank-review";

  return {
    screen: createScreenModel(voteState),
    canEnterDigits: voteState.phase === "typing",
    canStartBlankVote,
    canCorrect,
    canConfirm,
    enterDigit: (digit: number) =>
      dispatch({ type: "DIGIT_PRESSED", digit: String(digit) }),
    changeDigits: (digits: string) => dispatch({ type: "DIGITS_CHANGED", digits }),
    startBlankVote: () => dispatch({ type: "BLANK_PRESSED" }),
    correctVote: () => dispatch({ type: "CORRECT_PRESSED" }),
    confirmVote: () => dispatch({ type: "CONFIRM_PRESSED" }),
  };
}
