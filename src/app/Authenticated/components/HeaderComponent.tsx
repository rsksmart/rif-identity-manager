import React from 'react'
import rifIdManager from '../../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../../../components/NetworkStatus/NetworkStatus'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { truncateAddressDid } from '../../../formatters'
import UserIcon from '../../../components/UserIcon/UserIcon'

interface HeaderComponentInterface {
  did?: string
  chainId?: number
  name?: string
}

const Header: React.FC<HeaderComponentInterface> = ({ did, chainId, name }) => (
  <header className="container">
    <div className="column branding">
      <div className="logo">
        <img src={rifIdManager} alt="RIF Id Manager" />
      </div>
      <h1 className="persona">
        {did && (
          <ToolTip hoverContent={did}>
            <UserIcon value={did} size={35} />
            <div>{name || truncateAddressDid(did)}</div>
          </ToolTip>
        )}
      </h1>
    </div>
    <div className="column network">
      {chainId && <NetworkStatus connected chainId={chainId} />}
    </div>
  </header>
)

export default Header
