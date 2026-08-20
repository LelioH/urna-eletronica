import React, { useEffect, useRef, useState } from "react";
import Lara from "./assets/lara-urna.jpg";
import TSH from "./assets/jh-logo.png";
import { IsentVote } from "./components/IsentVote";
import { EndVote } from "./components/EndVote";
import { WrongVote } from "./components/WrongVote";
import { ActionButtons } from "./components/ActionButtons";
import DialerBtn from "./components/DialerButton";

type VoteState =
  | { phase: "typing"; inputValues: number[] }
  | { phase: "blank-review" }
  | { phase: "completed" };

const RECOGNIZED_CANDIDATE_NUMBER = "12000";

export default function Home() {
  const numbers = [
    { value: 1, braile: "⠃" },
    { value: 2, braile: "⠉" },
    { value: 3, braile: "⠙" },
    { value: 4, braile: "⠑" },
    { value: 5, braile: "⠋" },
    { value: 6, braile: "⠛" },
    { value: 7, braile: "⠓" },
    { value: 8, braile: "⠊" },
    { value: 9, braile: "⠚" },
    { value: 0, braile: "⠁" },
  ];

  const [voteState, setVoteState] = useState<VoteState>({
    phase: "typing",
    inputValues: [],
  });
  const confirmSound = useRef(new Audio("./confirma-urna.mp3"));
  const inputValues =
    voteState.phase === "typing" ? voteState.inputValues : [];
  const enteredNumber = inputValues.join("");
  const isRecognizedCandidate =
    enteredNumber === RECOGNIZED_CANDIDATE_NUMBER;

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <React.Fragment key={i}>
          <input
            type="text"
            maxLength={1}
            onChange={() => {}}
            value={inputValues[i] ?? ""}
            className="border-black text-black flex justify-center items-center border w-12 h-14 rounded-md text-2xl font-inter p-3 sm:h-10"
          />
        </React.Fragment>
      );
    }
    return inputs;
  };

  const handleDialerClick = (value: number) => {
    if (voteState.phase !== "typing" || inputValues.length === 5) return;

    setVoteState({
      phase: "typing",
      inputValues: [...inputValues, value],
    });
  };

  const startBlankVote = () => {
    if (voteState.phase === "typing" && inputValues.length < 5) {
      setVoteState({ phase: "blank-review" });
    }
  };

  const correctVote = () => {
    if (voteState.phase !== "completed") {
      setVoteState({ phase: "typing", inputValues: [] });
    }
  };

  const confirmVote = () => {
    const canConfirmBlankVote = voteState.phase === "blank-review";
    const canConfirmNumber =
      voteState.phase === "typing" && isRecognizedCandidate;

    if (!canConfirmBlankVote && !canConfirmNumber) return;

    setVoteState({ phase: "completed" });
    confirmSound.current.play();
  };

  useEffect(() => {
    if (voteState.phase === "completed") {
      const timeoutId = window.setTimeout(() => {
        confirmSound.current.currentTime = 0;
        setVoteState({ phase: "typing", inputValues: [] });
      }, 3000);

      return () => window.clearTimeout(timeoutId);
    }
  }, [voteState.phase]);

  return (
    <div className="flex h-svh-100">
      <div
        className="bg-gray-300 flex flex-col m-auto rounded-xl py-2 pl-16 pr-20 sm:max-h-[670px] sm:pl-8 sm:pr-10 sm:w-screen sm:py-0"
        style={{
          boxShadow: "-32px -8px 3px 1px rgba(107, 114, 128, 0.5) inset",
        }}
      >
        <div className="border-gray-400 border-2 border-b-0 rounded-sm">
          <div className="bg-black h-[436px] px-8 py-4 sm:px-4 sm:h-[336px]">
            <div className="bg-slate-100 w-full h-full flex flex-col items-center">
              {voteState.phase === "blank-review" ? (
                <IsentVote />
              ) : voteState.phase === "completed" ? (
                <EndVote />
              ) : inputValues.length === 5 && !isRecognizedCandidate ? (
                <WrongVote />
              ) : (
                <React.Fragment>
                  <div className="flex flex-row w-full h-full justify-between p-2 sm:gap-4 sm:text-center sm:justify-center sm:p-1">
                    <div className="flex flex-col justify-evenly sm:justify-between">
                      <h1 className="text-black text-lg font-inter sm:text-xs">
                        SEU VOTO PARA
                      </h1>
                      <h1
                        className={`text-black text-3xl font-inter sm:text-lg ${
                          inputValues.length === 5
                            ? "sm:mt-[160px]"
                            : "sm:mt-[180px]"
                        }`}
                      >
                        VEREADORA
                      </h1>
                      <div>
                        <label className="text-black text-lg font-inter sm:text-xs">
                          NÚMERO:
                        </label>
                        <div className="flex flex-row gap-2 sm:gap-1">
                          {renderInputs()}
                        </div>
                      </div>
                      {inputValues && inputValues.length === 5 && (
                        <React.Fragment>
                          <div>
                            <h1 className="text-black text-lg font-inter sm:text-xs">
                              NOME: LARA OLIVEIRA
                            </h1>
                            <h1 className="text-black text-lg font-inter sm:text-xs">
                              PARTIDO: PDT
                            </h1>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div
                      className={`${
                        inputValues.length !== 5 && "bg-slate-50"
                      } bg-opacity-90 w-[200px] h-[240px] sm:absolute sm:top-[45px] sm:right-[135px] sm:w-[130px] sm:h-[150px] sm:p-0`}
                    >
                      {inputValues && inputValues.length === 5 && (
                        <img
                          src={Lara}
                          width={200}
                          height={240}
                          alt="Lara Carvalho"
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {inputValues && inputValues.length === 5 && (
                    <React.Fragment>
                      <hr className="border border-black w-full mb-1 sm:mb-0 sm:hidden" />
                      <div className="flex flex-row gap-3 self-start w-full pl-2 sm:text-center sm:p-1 sm:hidden">
                        <h1 className="text-black text-lg font-inter sm:text-xs">
                          APERTE A TECLA:
                        </h1>
                        <div>
                          <h1 className="text-black text-lg font-inter sm:text-xs">
                            <span className="text-green-500">VERDE</span> para
                            CONFIRMAR este voto
                          </h1>
                          <h1 className="text-black text-lg font-inter sm:text-xs">
                            <span className="text-red-500">VERMELHO</span> para
                            REINICIAR este voto
                          </h1>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="flex flex-row pt-24 gap-x-5 sm:flex-col sm:items-center sm:gap-y-1 sm:pt-1 sm:mb-[-8px]">
            <div className="flex flex-wrap items-center max-h-[224px] sm:hidden">
              <img src={TSH} width={209} height={132} alt="JH" />
            </div>
            <div className="max-w-[270px] max-h-[224px] flex flex-wrap flex-row items-center justify-center gap-x-3 gap-y-3 p-2 sm:w-full sm:p-0">
              {numbers.map((number, index) => (
                <DialerBtn
                  key={index}
                  value={number.value}
                  braile={number.braile}
                  handleClick={() => handleDialerClick(number.value)}
                />
              ))}
            </div>
            <ActionButtons
              inputValues={inputValues}
              phase={voteState.phase}
              canConfirmCandidate={isRecognizedCandidate}
              startBlankVote={startBlankVote}
              correctVote={correctVote}
              confirmVote={confirmVote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
