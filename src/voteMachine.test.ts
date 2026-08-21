import { describe, expect, it } from "vitest";
import { initialVoteState, voteReducer, type VoteState } from "./voteMachine";

function enterNumber(number: string): VoteState {
  return [...number].reduce(
    (state, digit) => voteReducer(state, { type: "DIGIT_PRESSED", digit }),
    initialVoteState,
  );
}

describe("voteReducer", () => {
  it("moves a recognized number to candidate review and only then accepts confirmation", () => {
    const state = enterNumber("12000");

    expect(state).toMatchObject({
      phase: "candidate-review",
      digits: "12000",
      candidate: { name: "LARA OLIVEIRA", party: "PDT" },
    });
    expect(voteReducer(state, { type: "CONFIRM_PRESSED" })).toEqual({
      phase: "finalizing",
      kind: "candidate",
    });
  });

  it("marks an unknown number as invalid, blocks confirmation, and allows correction", () => {
    const invalidVote = enterNumber("99999");

    expect(invalidVote).toEqual({ phase: "invalid", digits: "99999" });
    expect(voteReducer(invalidVote, { type: "CONFIRM_PRESSED" })).toBe(
      invalidVote,
    );
    expect(voteReducer(invalidVote, { type: "CORRECT_PRESSED" })).toEqual(
      initialVoteState,
    );
  });

  it("allows a blank vote to be reviewed, confirmed, completed, and reset", () => {
    const review = voteReducer(initialVoteState, { type: "BLANK_PRESSED" });
    const finalizing = voteReducer(review, { type: "CONFIRM_PRESSED" });
    const completed = voteReducer(finalizing, {
      type: "FINALIZATION_COMPLETED",
    });

    expect(review).toEqual({ phase: "blank-review" });
    expect(finalizing).toEqual({ phase: "finalizing", kind: "blank" });
    expect(completed).toEqual({ phase: "completed", kind: "blank" });
    expect(voteReducer(completed, { type: "RESET" })).toEqual(
      initialVoteState,
    );
  });

  it("ignores commands while a vote is finalizing or completed", () => {
    const finalizing: VoteState = { phase: "finalizing", kind: "candidate" };
    const completed: VoteState = { phase: "completed", kind: "candidate" };

    expect(voteReducer(finalizing, { type: "CORRECT_PRESSED" })).toBe(
      finalizing,
    );
    expect(voteReducer(completed, { type: "DIGIT_PRESSED", digit: "1" })).toBe(
      completed,
    );
  });
});
