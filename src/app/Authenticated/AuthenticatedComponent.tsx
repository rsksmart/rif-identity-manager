import React, { useContext, useEffect, useState } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import HeaderComponent from './components/HeaderComponent'
import Navigation, { screens } from './components/Navigation'
import DashboardContainer from '../Dashboard/DashboardContainer'
import DataVaultContainer from '../DataVault/DataVaultContainer'
import { Web3ProviderContext } from '../../providerContext'
import IdentityContainer from '../Identity/IdentityContainer'
import { createDidFormat } from '../../formatters'
import { DataVaultKey } from '../state/reducers/datavault'
import DefiContainer from '../DeFi/DeFiContainer'

interface AuthenticatedComponentInterface {
  chainId: number | null
  address: string | null
  persona: DataVaultKey
  modifyMultipleItems: (client: DataVaultWebClient, items: DataVaultKey) => any
  logoutOrSwitchAccounts: (isLoggingOut: boolean) => void
  decryptPersona: (client: DataVaultWebClient | null, keys: string[]) => any
}

const AuthenticatedComponent: React.FC<AuthenticatedComponentInterface> = ({ chainId, address, persona, modifyMultipleItems, logoutOrSwitchAccounts, decryptPersona }) => {
  const [screen, setScreen] = useState<screens>(screens.DASHBOARD)
  const context = useContext(Web3ProviderContext)
  const changeScreen = (screen: screens) => setScreen(screen)
  const updatePersona = (items: DataVaultKey) => context.dvClient && modifyMultipleItems(context.dvClient, items)

  const handleWalletChange = (isLoggingOut: boolean = false) => {
    context.provider.removeAllListeners()
    context.reset()
    logoutOrSwitchAccounts(isLoggingOut)
  }

  useEffect(() => {
    context.provider.on('accountsChanged', () => handleWalletChange())
    context.provider.on('chainChanged', () => handleWalletChange())
    context.provider.on('disconnect', () => handleWalletChange())
  }, [])

  return (
    <>
      <HeaderComponent
        chainId={chainId || undefined}
        did={(address && chainId) ? createDidFormat(address, chainId) : undefined}
        persona={persona}
        hasDataVault={!!context.dvClient}
        updatePersona={updatePersona}
        decryptPersona={(keys: string[]) => decryptPersona(context.dvClient, keys)}
      />
      <Navigation
        selected={screen}
        handleClick={changeScreen}
        showDataVault={!!context.dvClient}
        logout={() => handleWalletChange(true)}
      />
      {screen === screens.DASHBOARD && <DashboardContainer changeScreen={changeScreen} />}
      {screen === screens.DATAVAULT && <DataVaultContainer />}
      {screen === screens.IDENTITY && <IdentityContainer />}
      {screen === screens.DEFI && <DefiContainer />}
    </>
  )
}

export default AuthenticatedComponent
