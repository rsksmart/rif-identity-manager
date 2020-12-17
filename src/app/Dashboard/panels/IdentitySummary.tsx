import React from 'react'
import CopyButton from '../../../components/CopyButton/CopyButton'
import Panel from '../../../components/Panel/Panel'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { createDidFormat, truncateAddressDid } from '../../../formatters'

interface IdentityInformationPanelI {
  address: string
  chainId: number
}

const IdentityInformationPanel: React.FC<IdentityInformationPanelI> = ({ address, chainId }) => {
  const did = createDidFormat(address, chainId)
  return (
    <div className="container">
      <div className="column">
        <Panel
          title="Persona information"
          className="identity-information"
        >
          <div className="container">
            <div className="column">
              <h2>Persona DID</h2>
              <p className="value">
                <ToolTip hoverContent={did}>{truncateAddressDid(did)}</ToolTip>
                <CopyButton value={did} />
              </p>
            </div>
            <div className="column">
              <h2>Persona Address</h2>
              <p className="value">
                {address}
                <CopyButton value={address} />
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default IdentityInformationPanel
