import React, { useState } from 'react'
import DelegateContainer from '../../../components/EthrDid/DelegateContainer'
import OwnerContainer from '../../../components/EthrDid/OwnerContainer'
import Panel from '../../../components/Panel/Panel'
import { displayIdentity } from '../../../helpers'

interface IdentityInformationPanelI {
  address: string | null
  chainId: number | null
}

const IdentityInformationPanel: React.FC<IdentityInformationPanelI> = ({ address, chainId }) => {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false)
  const advancedToggle = <button className="advancedToggle" onClick={() => setIsAdvanced(!isAdvanced)}>{isAdvanced ? 'Basic' : 'Advanced'}</button>
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
              <p className="value">{displayIdentity(address, chainId)}</p>
            </div>
            {isAdvanced && (
              <>
                <OwnerContainer />
                <DelegateContainer />
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default IdentityInformationPanel
