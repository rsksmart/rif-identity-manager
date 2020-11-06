import React, { useContext } from 'react'
import rifIdManager from '../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../NetworkStatus/NetworkStatus'
import { Web3ProviderContext } from '../../providerContext'

const Header = () => {
  const context = useContext(Web3ProviderContext)

  return (
    <header className="container">
      <div className="column branding">
        <img src={rifIdManager} alt="RIF Id Manager" />
      </div>
      <div className="column network">
        <NetworkStatus connected chainId={parseInt(context?.provider.chainId)} />
      </div>
    </header>
  )
}

export default Header
