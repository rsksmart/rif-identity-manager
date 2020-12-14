import React from 'react'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import Panel from '../../../components/Panel/Panel'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { displayIdentity } from '../../../formatters'

interface IdentityInformationPanelI {
  address?: string | null
  chainId?: number | null
}

const IdentityInformationPanel: React.FC<IdentityInformationPanelI> = ({ address, chainId }) =>
  (!address || !chainId) ? <LoadingComponent />
    : (
      <div className="container">
        <div className="column">
          <Panel
            title="Identity information"
            className="identity-information"
          >
            <div className="container">
              <div className="column">
                <h2>Identity Address</h2>
                <p className="value">
                  <ToolTip hoverContent={address}>{displayIdentity(address, chainId)}</ToolTip>
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    )

export default IdentityInformationPanel
