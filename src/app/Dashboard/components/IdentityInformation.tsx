import { Authentication } from 'did-resolver'
import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import ToolTip from '../../../components/Tooltip/Tooltip'
import { displayIdentity } from '../../../helpers'
import DelegateComponent from '../../../components/EthrDid/DelegateComponent'
import OwnerComponent from '../../../components/EthrDid/OwnerComponent'

interface IdentityInformationPanelI {
  address?: string | null
  chainId?: number | null
  owner?: string | null
  delegates?: Authentication[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
}

const IdentityInformationPanel: React.FC<IdentityInformationPanelI> = ({ address, chainId, owner, delegates, changeOwner, addDelegate }) => {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false)
  const advancedToggle = <button className="advancedToggle" onClick={() => setIsAdvanced(!isAdvanced)}>{isAdvanced ? 'Basic' : 'Advanced'}</button>
  const isOwner = address?.toLowerCase() === owner?.toLowerCase()
  if (!address || !chainId) return <></>

  return (
    <div className="container">
      <div className="column">
        <Panel
          title="Identity information"
          className="identity-information"
          headerRight={advancedToggle}
        >
          <div className="container">
            <div className="column">
              <h2>Identity Address</h2>
              <p className="value">
                <ToolTip hoverContent={address}>{displayIdentity(address, chainId)}</ToolTip>
              </p>
            </div>
            {isAdvanced && (
              <>
                {owner && <OwnerComponent isOwner={isOwner} owner={owner} changeOwner={changeOwner} />}
                {delegates && <DelegateComponent isOwner={isOwner} delegates={delegates} addDelegate={addDelegate} />}
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default IdentityInformationPanel
