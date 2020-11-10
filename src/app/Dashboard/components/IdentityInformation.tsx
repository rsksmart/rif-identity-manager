import React, { useState } from 'react'
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
                <div className="column">
                  <h2>Owner</h2>
                  <p className="value">pending</p>
                </div>
                <div className="column">
                  <h2>Controllers</h2>
                  <ul className="value">
                    <li>address</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default IdentityInformationPanel
