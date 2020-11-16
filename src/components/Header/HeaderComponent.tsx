import React from 'react'
import rifIdManager from '../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../NetworkStatus/NetworkStatus'
import { truncateAddressDid } from '../../helpers'

interface HeaderComponentInterface {
  did?: string | null
  chainId: number | null
}

const Header: React.FC<HeaderComponentInterface> = ({ did, chainId }) => (
  <header className="container">
    <div className="column branding">
      <div className="logo">
        <img src={rifIdManager} alt="RIF Id Manager" />
      </div>
      <h1 className="persona">{did && truncateAddressDid(did)}</h1>
    </div>
    <div className="column network">
      {chainId && <NetworkStatus connected chainId={chainId} />}
    </div>
  </header>
)

export default Header
