import { ActionPanel } from "./components/ActionPanel";
import { Keypad } from "./components/Keypad";
import { VotingScreen } from "./components/VotingScreen";
import { simulatorOffice } from "./domain/election";
import { useVotingMachine } from "./hooks/useVotingMachine";

export default function Home() {
  const votingMachine = useVotingMachine();

  return (
    <main className="urna-experience" aria-label="Simulador independente de urna eletrônica">
      <div className="urna-experience__glow" aria-hidden="true" />
      <div className="urna-layout">
        <header className="experience-header">
          <div className="experience-header__eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Projeto educacional independente
          </div>
          <h1>Entenda o fluxo de uma urna eletrônica.</h1>
          <p>
            Uma demonstração interativa construída para orientar cada etapa da experiência de
            votação com clareza.
          </p>
        </header>

        <article className="urna-machine" aria-label="Urna eletrônica">
          <div className="urna-machine__topline" aria-hidden="true" />
          <div className="display-frame">
            <div className="display-frame__label">
              <span>SIMULADOR DE VOTAÇÃO</span>
              <span className="display-frame__indicator">MODO DEMONSTRAÇÃO</span>
            </div>
            <div className="display-frame__bezel">
              <VotingScreen
                office={simulatorOffice}
                screen={votingMachine.screen}
                liveAnnouncement={votingMachine.liveAnnouncement}
                onDigitsChange={votingMachine.changeDigits}
              />
            </div>
          </div>

          <div className="control-deck">
            <div className="control-deck__brand" aria-label="Identificação do simulador">
              <span className="control-deck__mark" aria-hidden="true">
                SE
              </span>
              <p>
                SIMULADOR
                <br />
                EDUCACIONAL
              </p>
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
        </article>

        <aside className="experience-note" aria-label="Informação sobre o simulador">
          <span aria-hidden="true">✦</span>
          <p>
            Projeto independente e não oficial. Não é afiliado, aprovado nem operado pelo Tribunal
            Superior Eleitoral (TSE), pela Justiça Eleitoral ou por tribunais regionais eleitorais.
            Nenhum voto é armazenado.
          </p>
        </aside>
      </div>
    </main>
  );
}
