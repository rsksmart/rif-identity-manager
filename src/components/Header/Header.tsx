import React from 'react'
import rifIdManager from '../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../NetworkStatus/NetworkStatus'

const Header = () => (
  <header className="container">
    <div className="column branding">
      <img src={rifIdManager} alt="RIF Id Manager" />
    </div>
    <div className="column network">
      <NetworkStatus connected name="RSK Mainnet" />
    </div>
  </header>
)

export default Header
