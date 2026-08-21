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
      <div
        className="bg-machine-surface shadow-machine-inset m-auto flex flex-col rounded-machine py-machine-block ps-machine-inline-start pe-machine-inline-end max-compact:max-h-machine-height-compact max-compact:w-screen max-compact:py-machine-block-compact max-compact:ps-machine-inline-compact max-compact:pe-machine-inline-compact"
      >
        <div className="border-machine-border rounded-display border-2 border-b-0">
          <div className="bg-display-bezel h-display-frame-height px-display-frame-inline py-display-frame-block max-compact:h-display-frame-height-compact max-compact:px-display-frame-inline-compact">
            <div className="bg-display-surface flex h-full w-full flex-col items-center">
              <VotingScreen
                office={simulatorOffice}
                screen={votingMachine.screen}
                liveAnnouncement={votingMachine.liveAnnouncement}
                onDigitsChange={votingMachine.changeDigits}
              />
            </div>
          </div>
          <div className="flex flex-row gap-x-control-row-gap pt-control-row-before max-compact:flex-col max-compact:items-center max-compact:gap-y-control-row-gap-compact max-compact:pt-control-row-before-compact max-compact:-mb-control-row-overlap">
            <div className="flex max-h-logo-height flex-wrap items-center max-compact:hidden">
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
