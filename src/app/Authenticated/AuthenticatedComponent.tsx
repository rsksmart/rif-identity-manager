import React, { useState } from 'react'
import HeaderComponent from '../../components/Header/HeaderComponent'
import Navigation, { screens } from '../../components/Navigation/Navigation'
import DashboardContainer from '../Dashboard/DashboardContainer'
import DataVaultContainer from '../DataVault/DataVaultContainer'

interface AuthenticatedComponentInterface {
  chainId: number | null
  address: string | null
}

const AuthenticatedComponent: React.FC<AuthenticatedComponentInterface> = ({ chainId, address }) => {
  const [screen, setScreen] = useState<screens>(screens.DASHBOARD)

  return (
    <>
      <HeaderComponent chainId={chainId} did={address} />
      <Navigation selected={screen} handleClick={(screen: screens) => setScreen(screen)} />
      {screen === screens.DASHBOARD && <DashboardContainer />}
      {screen === screens.DATAVAULT && <DataVaultContainer />}
    </>
  )
}

export default AuthenticatedComponent
