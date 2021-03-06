import React from 'react'
import rifIdManager from '../../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../../../components/NetworkStatus/NetworkStatus'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { truncateAddressDid } from '../../../formatters'
import UserIcon from '../../../components/UserIcon/UserIcon'
import EditPersonaModal from '../../DataVault/components/EditPersonaModal'
import { DataVaultKey } from '../../state/reducers/datavault'
import { ENCRYPTED } from '../../DataVault/types'

interface HeaderComponentInterface {
  did?: string
  chainId?: number
  persona: DataVaultKey
  hasDataVault: boolean
  updatePersona: (items: DataVaultKey) => Promise<any>
  decryptPersona: (keys: string[]) => Promise<any>
}

const Header: React.FC<HeaderComponentInterface> = ({ did, chainId, persona, hasDataVault, updatePersona, decryptPersona }) => (
  <header className="container">
    <div className="columnDouble branding">
      <div className="logo">
        <img src={rifIdManager} alt="RIF Id Manager" />
      </div>
      <h1 className="persona">
        {did && (
          <>
            <UserIcon value={did} size={40} />
            {persona.DD_NAME[0].content !== '' && persona.DD_NAME[0].content !== ENCRYPTED
              ? <div>{persona.DD_NAME[0].content}</div>
              : <ToolTip hoverContent={did}><div>{truncateAddressDid(did)}</div></ToolTip>
            }
          </>
        )}
      </h1>
      {hasDataVault && (
        <EditPersonaModal
          did={did}
          initValue={persona}
          updatePersona={updatePersona}
          decryptPersona={decryptPersona}
        />
      )}
    </div>
    <div className="column network">
      {chainId && <NetworkStatus connected chainId={chainId} />}
    </div>
  </header>
)

export default Header
