import TSH from "./assets/jh-logo.png";
import { ActionPanel } from "./components/ActionPanel";
import { Keypad } from "./components/Keypad";
import { VotingScreen } from "./components/VotingScreen";
import { simulatorOffice } from "./domain/election";
import { useVotingMachine } from "./hooks/useVotingMachine";

export default function Home() {
  const votingMachine = useVotingMachine();

  return (
    <main className="flex h-svh-100" aria-label="Simulador de urna eletrônica">
      <div
        className="bg-gray-300 flex flex-col m-auto rounded-xl py-2 pl-16 pr-20 sm:max-h-[670px] sm:pl-8 sm:pr-10 sm:w-screen sm:py-0"
        style={{
          boxShadow: "-32px -8px 3px 1px rgba(107, 114, 128, 0.5) inset",
        }}
      >
        <div className="border-gray-400 border-2 border-b-0 rounded-sm">
          <div className="bg-black h-[436px] px-8 py-4 sm:px-4 sm:h-[336px]">
            <div className="bg-slate-100 w-full h-full flex flex-col items-center">
              <VotingScreen
                office={simulatorOffice}
                screen={votingMachine.screen}
                onDigitsChange={votingMachine.changeDigits}
              />
            </div>
          </div>
          <div className="flex flex-row pt-24 gap-x-5 sm:flex-col sm:items-center sm:gap-y-1 sm:pt-1 sm:mb-[-8px]">
            <div className="flex flex-wrap items-center max-h-[224px] sm:hidden">
              <img src={TSH} width={209} height={132} alt="JH" />
            </div>
            <Keypad
              disabled={!votingMachine.canEnterDigits}
              onDigit={votingMachine.enterDigit}
            />
            <ActionPanel
              blankDisabled={!votingMachine.canStartBlankVote}
              correctDisabled={!votingMachine.canCorrect}
              confirmDisabled={!votingMachine.canConfirm}
              onBlank={votingMachine.startBlankVote}
              onCorrect={votingMachine.correctVote}
              onConfirm={votingMachine.confirmVote}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
