import React from 'react'
import Header from '../../components/Header/Header'
import IdentityInformationPanel from './components/IdentityInformation'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  return (
    <>
      <Header />
      <div className="content dashboard">
        <div className="container">
          <div className="column">
            <ul className="navigation">
              <li className="active">Dashboard</li>
              <li>Data Vault</li>
              <li>Request Credentials</li>
              <li>My Dapps</li>
            </ul>
          </div>
        </div>
        <IdentityInformationPanel />
      </div>
    </>
  )
}

export default DashboardScreen
