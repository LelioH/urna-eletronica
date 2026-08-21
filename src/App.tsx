import TSH from "./assets/jh-logo.png";
import { ActionPanel } from "./components/ActionPanel";
import { Keypad } from "./components/Keypad";
import { VotingScreen } from "./components/VotingScreen";
import { simulatorOffice } from "./domain/election";
import { useVotingMachine } from "./hooks/useVotingMachine";

export default function Home() {
  const votingMachine = useVotingMachine();

  return (
    <main className="flex min-h-svh" aria-label="Simulador de urna eletrônica">
      <h1 className="sr-only">Simulador de urna eletrônica</h1>
      <div className="bg-machine-surface shadow-machine-inset flex w-screen flex-col rounded-machine py-machine-block-compact ps-machine-inline-compact pe-machine-inline-compact tablet:m-auto tablet:min-w-machine-width-tablet tablet:w-auto desktop:py-machine-block desktop:ps-machine-inline-start desktop:pe-machine-inline-end">
        <div className="border-machine-border rounded-display border-2 border-b-0">
          <div className="bg-display-bezel h-display-frame-height-compact px-display-frame-inline-compact py-display-frame-block tablet:h-display-frame-height-tablet tablet:px-display-frame-inline desktop:h-display-frame-height">
            <div className="bg-display-surface flex h-full w-full flex-col items-center">
              <VotingScreen
                office={simulatorOffice}
                screen={votingMachine.screen}
                liveAnnouncement={votingMachine.liveAnnouncement}
                onDigitsChange={votingMachine.changeDigits}
              />
            </div>
          </div>
          <div className="-mb-control-row-overlap flex flex-col items-center gap-y-control-row-gap-compact pt-control-row-before-compact tablet:mb-0 tablet:flex-row tablet:items-stretch tablet:gap-x-control-row-gap tablet:gap-y-0 tablet:pt-control-row-before">
            <div className="hidden max-h-logo-height flex-wrap items-center desktop:flex">
              <img src={TSH} width={209} height={132} alt="JH" />
            </div>
            <Keypad disabled={!votingMachine.canEnterDigits} onDigit={votingMachine.enterDigit} />
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
