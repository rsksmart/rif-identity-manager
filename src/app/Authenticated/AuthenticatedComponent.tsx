import React, { useContext, useState } from 'react'
import HeaderComponent from './components/HeaderComponent'
import Navigation, { screens } from './components/Navigation'
import DashboardContainer from '../Dashboard/DashboardContainer'
import DataVaultContainer from '../DataVault/DataVaultContainer'
import { Web3ProviderContext } from '../../providerContext'

interface AuthenticatedComponentInterface {
  chainId: number | null
  address: string | null
}

const AuthenticatedComponent: React.FC<AuthenticatedComponentInterface> = ({ chainId, address }) => {
  const [screen, setScreen] = useState<screens>(screens.DASHBOARD)
  const context = useContext(Web3ProviderContext)

  const changeScreen = (screen: screens) => setScreen(screen)

  return (
    <>
      <HeaderComponent chainId={chainId} did={address} />
      <Navigation
        selected={screen}
        handleClick={changeScreen}
        showDataVault={!!context.dvClient}
      />
      {screen === screens.DASHBOARD && <DashboardContainer changeScreen={changeScreen} />}
      {screen === screens.DATAVAULT && <DataVaultContainer />}
    </>
  )
}

export default AuthenticatedComponent
