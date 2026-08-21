import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { Candidate } from "../domain/election";
import { initialVoteState, voteReducer, type VoteState } from "../voteMachine";

export type VotingScreenModel =
  | { view: "entry"; digits: string }
  | { view: "candidate-review"; digits: string; candidate: Candidate }
  | { view: "blank-review" }
  | { view: "invalid" }
  | { view: "completed" };

function isEditableTarget(target: EventTarget | null) {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    return !target.readOnly && !target.disabled;
  }

  if (target instanceof HTMLSelectElement) return !target.disabled;

  return target instanceof HTMLElement && target.isContentEditable;
}

function reportAudioFailure(error: unknown) {
  console.warn("Não foi possível reproduzir o som de confirmação.", error);
}

function playConfirmationSound(audio: HTMLAudioElement) {
  try {
    const playback = audio.play();
    void playback.catch(reportAudioFailure);
  } catch (error) {
    reportAudioFailure(error);
  }
}

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

function createLiveAnnouncement(
  previousState: VoteState | null,
  currentState: VoteState,
): string | null {
  if (currentState.phase === "typing") {
    if (
      previousState?.phase === "typing" &&
      currentState.digits.length > previousState.digits.length
    ) {
      const newDigits = currentState.digits.slice(previousState.digits.length);
      return newDigits.length === 1
        ? `Dígito ${newDigits} informado.`
        : `Número digitado: ${newDigits}.`;
    }

    return null;
  }

  if (currentState.phase === "candidate-review") {
    return `Candidato encontrado: ${currentState.candidate.name}, partido ${currentState.candidate.party}, número ${currentState.digits}.`;
  }

  if (currentState.phase === "invalid") {
    return `Número ${currentState.digits} não encontrado. Pressione CORRIGE para alterar.`;
  }

  if (currentState.phase === "blank-review") {
    return "Voto em branco em revisão. Pressione CONFIRMA para confirmar ou CORRIGE para voltar.";
  }

  if (currentState.phase === "completed") {
    return "Voto confirmado.";
  }

  return null;
}

export function useVotingMachine() {
  const [voteState, dispatch] = useReducer(voteReducer, initialVoteState);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const confirmSound = useRef<HTMLAudioElement | null>(null);
  const finalizationTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);
  const previousVoteState = useRef<VoteState | null>(null);

  useEffect(() => {
    const announcement = createLiveAnnouncement(previousVoteState.current, voteState);
    previousVoteState.current = voteState;

    if (announcement !== null) setLiveAnnouncement(announcement);
  }, [voteState]);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}confirma-urna.mp3`);
    const handleAudioError = () => reportAudioFailure(audio.error);
    confirmSound.current = audio;
    audio.addEventListener("error", handleAudioError);

    return () => {
      audio.removeEventListener("error", handleAudioError);
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
      playConfirmationSound(audio);
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

  const enterDigit = useCallback(
    (digit: number) => {
      if (voteState.phase !== "typing") return;
      dispatch({ type: "DIGIT_PRESSED", digit: String(digit) });
    },
    [voteState.phase],
  );

  const changeDigits = useCallback(
    (digits: string) => {
      if (voteState.phase !== "typing") return;
      dispatch({ type: "DIGITS_CHANGED", digits });
    },
    [voteState.phase],
  );

  const startBlankVote = useCallback(() => {
    if (voteState.phase !== "typing") return;
    dispatch({ type: "BLANK_PRESSED" });
  }, [voteState.phase]);

  const correctVote = useCallback(() => {
    if (
      voteState.phase !== "typing" &&
      voteState.phase !== "candidate-review" &&
      voteState.phase !== "invalid" &&
      voteState.phase !== "blank-review"
    ) {
      return;
    }

    dispatch({ type: "CORRECT_PRESSED" });
  }, [voteState.phase]);

  const confirmVote = useCallback(() => {
    if (voteState.phase !== "candidate-review" && voteState.phase !== "blank-review") {
      return;
    }

    dispatch({ type: "CONFIRM_PRESSED" });
  }, [voteState.phase]);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (event.key === "Escape") {
        event.preventDefault();
        correctVote();
        return;
      }

      if (isEditableTarget(event.target)) return;

      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        enterDigit(Number(event.key));
        return;
      }

      if (event.key === "Backspace" || event.key.toLowerCase() === "r") {
        event.preventDefault();
        correctVote();
        return;
      }

      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        startBlankVote();
        return;
      }

      if (event.key === "Enter" || event.key.toLowerCase() === "c") {
        event.preventDefault();
        confirmVote();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, [confirmVote, correctVote, enterDigit, startBlankVote]);

  const canStartBlankVote = voteState.phase === "typing";
  const canCorrect =
    voteState.phase === "typing" ||
    voteState.phase === "candidate-review" ||
    voteState.phase === "invalid" ||
    voteState.phase === "blank-review";
  const canConfirm = voteState.phase === "candidate-review" || voteState.phase === "blank-review";

  return {
    screen: createScreenModel(voteState),
    liveAnnouncement,
    canEnterDigits: voteState.phase === "typing",
    canStartBlankVote,
    canCorrect,
    canConfirm,
    enterDigit,
    changeDigits,
    startBlankVote,
    correctVote,
    confirmVote,
  };
}
