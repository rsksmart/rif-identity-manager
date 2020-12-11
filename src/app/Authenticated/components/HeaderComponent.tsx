import React from 'react'
import rifIdManager from '../../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../../../components/NetworkStatus/NetworkStatus'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { truncateAddressDid } from '../../../formatters'
import UserIcon from '../../../components/UserIcon/UserIcon'
import EditPersonaModal from '../../DataVault/components/EditPersonaModal'
import { DataVaultKey } from '../../state/reducers/datavault'

interface HeaderComponentInterface {
  did?: string
  chainId?: number
  persona: DataVaultKey
  hasDataVault: boolean
  updatePersona: (items: DataVaultKey) => Promise<any>
}

const Header: React.FC<HeaderComponentInterface> = ({ did, chainId, persona, hasDataVault, updatePersona }) => (
  <header className="container">
    <div className="columnDouble branding">
      <div className="logo">
        <img src={rifIdManager} alt="RIF Id Manager" />
      </div>
      <h1 className="persona">
        {did && (
          <ToolTip hoverContent={did}>
            <UserIcon value={did} size={40} />
            <div>{persona.DD_NAME[0].content !== '' ? persona.DD_NAME[0].content : truncateAddressDid(did)}</div>
          </ToolTip>
        )}
      </h1>
      {hasDataVault && (
        <EditPersonaModal
          did={did}
          initValue={persona}
          updatePersona={updatePersona}
        />
      )}
    </div>
    <div className="column network">
      {chainId && <NetworkStatus connected chainId={chainId} />}
    </div>
  </header>
)

export default Header
