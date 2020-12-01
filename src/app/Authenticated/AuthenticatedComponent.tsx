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

  return (
    <>
      <HeaderComponent chainId={chainId} did={address} />
      <Navigation
        selected={screen}
        handleClick={(screen: screens) => setScreen(screen)}
        showDataVault={!!context.dvClient}
      />
      {screen === screens.DASHBOARD && <DashboardContainer />}
      {screen === screens.DATAVAULT && <DataVaultContainer />}
    </>
  )
}

export default AuthenticatedComponent
