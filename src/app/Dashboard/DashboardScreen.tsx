import React from 'react'
import HeaderContainer from '../../components/Header/HeaderContainer'
import Navigation from '../../components/Navigation/Navigation'
import IdentityInformationContainer from './containers/IdentityInformationContainer'

interface DashboardScreenInterface {}

const DashboardScreen: React.FC<DashboardScreenInterface> = () => {
  return (
    <>
      <HeaderContainer />
      <div className="content dashboard">
        <Navigation />
        <IdentityInformationContainer />
      </div>
    </>
  )
}

export default DashboardScreen
