import React from 'react'
import rifIdManager from '../assets/images/rif-id-manager-gray.svg'
import { BaseButton } from '../components/Buttons'
import NetworkStatus from '../components/NetworkStatus/NetworkStatus'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  return (
    <>
      <header className="container">
        <div className="column branding">
          <img src={rifIdManager} alt="RIF Id Manager" />
        </div>
        <div className="column network">
          <NetworkStatus connected name="RSK Mainnet" />
        </div>
      </header>
      <div className="container content">
        <div className="column" style={{ textAlign: 'center' }}>
          <BaseButton className="blue" onClick={handleLoginOut}>Log Out</BaseButton>
        </div>
      </div>
    </>
  )
}

export default DashboardScreen
