import React from 'react'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import Panel from '../../../components/Panel/Panel'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { truncateAddressDid } from '../../../formatters'

interface IdentityInformationPanelI {
  did?: string
}

const IdentityInformationPanel: React.FC<IdentityInformationPanelI> = ({ did }) =>
  !did ? <LoadingComponent />
    : (
      <div className="container">
        <div className="column">
          <Panel
            title="Persona information"
            className="identity-information"
          >
            <div className="container">
              <div className="column">
                <h2>Persona Address</h2>
                <p className="value">
                  <ToolTip hoverContent={did}>{truncateAddressDid(did)}</ToolTip>
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    )

export default IdentityInformationPanel
