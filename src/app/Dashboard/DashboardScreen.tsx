import React from 'react'
import HeaderContainer from '../../components/Header/HeaderContainer'
import IdentityInformationContainer from './containers/IdentityInformationContainer'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  return (
    <>
      <HeaderContainer />
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
        <IdentityInformationContainer />
      </div>
    </>
  )
}

export default DashboardScreen
