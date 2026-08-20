import type { VoteState } from "../voteMachine";

export function ActionButtons({
  phase,
  startBlankVote,
  correctVote,
  confirmVote,
}: {
  phase: VoteState["phase"];
  startBlankVote: () => void;
  correctVote: () => void;
  confirmVote: () => void;
}) {
  const canStartBlankVote = phase === "typing";
  const canCorrect =
    phase === "typing" ||
    phase === "candidate-review" ||
    phase === "invalid" ||
    phase === "blank-review";
  const canConfirm =
    phase === "candidate-review" || phase === "blank-review";

  return (
    <div className="flex flex-col gap-y-4 py-3 mb-24 px-9 sm:flex-row sm:mb-4 sm:gap-x-2 sm:items-end sm:pt-0">
      <button
        disabled={!canStartBlankVote}
        onClick={startBlankVote}
        className="bg-white w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-white transition-all cursor-pointer sm:w-[84px] sm:h-12 sm:pl-2 sm:active:pl-3"
      >
        <h1 className="text-black text-sm font-inter leading-none">BRANCO</h1>
      </button>
      <button
        disabled={!canCorrect}
        onClick={correctVote}
        className="bg-red-400 w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-correct transition-all sm:w-[84px] sm:h-12 sm:pl-2 sm:active:pl-3"
      >
        <h1 className="text-black text-sm font-inter leading-none">CORRIGE</h1>
      </button>
      <button
        disabled={!canConfirm}
        onClick={confirmVote}
        className="bg-green-400 w-24 h-24 rounded-lg text-left justify-center pb-14 pl-2 active:pb-12 active:pl-3 btn-shadow-confirm transition-all cursor-pointer sm:h-20 sm:pb-10 sm:active:pb-8"
      >
        <h1 className="text-black text-sm font-inter leading-none">CONFIRMA</h1>
      </button>
    </div>
  );
}
