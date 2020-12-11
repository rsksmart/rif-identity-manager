import React, { useContext, useState } from 'react'
import HeaderComponent from './components/HeaderComponent'
import Navigation, { screens } from './components/Navigation'
import DashboardContainer from '../Dashboard/DashboardContainer'
import DataVaultContainer from '../DataVault/DataVaultContainer'
import { Web3ProviderContext } from '../../providerContext'
import IdentityContainer from '../Identity/IdentityContainer'
import { createDidFormat } from '../../formatters'
import { DataVaultKey } from '../state/reducers/datavault'

interface AuthenticatedComponentInterface {
  chainId: number | null
  address: string | null
  persona: DataVaultKey
}

const AuthenticatedComponent: React.FC<AuthenticatedComponentInterface> = ({ chainId, address, persona }) => {
  const [screen, setScreen] = useState<screens>(screens.DASHBOARD)
  const context = useContext(Web3ProviderContext)

  const changeScreen = (screen: screens) => setScreen(screen)

  return (
    <>
      <HeaderComponent
        chainId={chainId || undefined}
        did={(address && chainId) ? createDidFormat(address, chainId) : undefined}
        persona={persona}
        hasDataVault={!!context.dvClient}
      />
      <Navigation
        selected={screen}
        handleClick={changeScreen}
        showDataVault={!!context.dvClient}
      />
      {screen === screens.DASHBOARD && <DashboardContainer changeScreen={changeScreen} />}
      {screen === screens.DATAVAULT && <DataVaultContainer />}
      {screen === screens.IDENTITY && <IdentityContainer />}
    </>
  )
}

export default AuthenticatedComponent