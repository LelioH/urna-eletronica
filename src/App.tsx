import React, { useEffect, useReducer, useRef } from "react";
import TSH from "./assets/jh-logo.png";
import { IsentVote } from "./components/IsentVote";
import { EndVote } from "./components/EndVote";
import { WrongVote } from "./components/WrongVote";
import { ActionButtons } from "./components/ActionButtons";
import DialerBtn from "./components/DialerButton";
import { simulatorOffice } from "./domain/election";
import { initialVoteState, voteReducer } from "./voteMachine";

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

  const [voteState, dispatch] = useReducer(voteReducer, initialVoteState);
  const confirmSound = useRef<HTMLAudioElement | null>(null);
  const finalizationTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);
  const digits = "digits" in voteState ? voteState.digits : "";
  const candidate =
    voteState.phase === "candidate-review" ? voteState.candidate : undefined;

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < simulatorOffice.digitCount; i++) {
      inputs.push(
        <React.Fragment key={i}>
          <input
            type="text"
            maxLength={1}
            onChange={() => {}}
            value={digits[i] ?? ""}
            className="border-black text-black flex justify-center items-center border w-12 h-14 rounded-md text-2xl font-inter p-3 sm:h-10"
          />
        </React.Fragment>
      );
    }
    return inputs;
  };

  const handleDialerClick = (value: number) =>
    dispatch({ type: "DIGIT_PRESSED", digit: String(value) });

  const startBlankVote = () => dispatch({ type: "BLANK_PRESSED" });

  const correctVote = () => dispatch({ type: "CORRECT_PRESSED" });

  const confirmVote = () => dispatch({ type: "CONFIRM_PRESSED" });

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
              ) : voteState.phase === "invalid" ? (
                <WrongVote />
              ) : voteState.phase === "finalizing" ||
                voteState.phase === "completed" ? (
                <EndVote />
              ) : (
                <React.Fragment>
                  <div className="flex flex-row w-full h-full justify-between p-2 sm:gap-4 sm:text-center sm:justify-center sm:p-1">
                    <div className="flex flex-col justify-evenly sm:justify-between">
                      <h1 className="text-black text-lg font-inter sm:text-xs">
                        SEU VOTO PARA
                      </h1>
                      <h1
                        className={`text-black text-3xl font-inter sm:text-lg ${
                          candidate
                            ? "sm:mt-[160px]"
                            : "sm:mt-[180px]"
                        }`}
                      >
                        {simulatorOffice.label}
                      </h1>
                      <div>
                        <label className="text-black text-lg font-inter sm:text-xs">
                          NÚMERO:
                        </label>
                        <div className="flex flex-row gap-2 sm:gap-1">
                          {renderInputs()}
                        </div>
                      </div>
                      {candidate && (
                        <React.Fragment>
                          <div>
                            <h1 className="text-black text-lg font-inter sm:text-xs">
                              NOME: {candidate.name}
                            </h1>
                            <h1 className="text-black text-lg font-inter sm:text-xs">
                              PARTIDO: {candidate.party}
                            </h1>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div
                      className={`${
                        !candidate && "bg-slate-50"
                      } bg-opacity-90 w-[200px] h-[240px] sm:absolute sm:top-[45px] sm:right-[135px] sm:w-[130px] sm:h-[150px] sm:p-0`}
                    >
                      {candidate && (
                        <img
                          src={candidate.photoSrc}
                          width={200}
                          height={240}
                          alt={candidate.photoAlt}
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {candidate && (
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
              phase={voteState.phase}
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
