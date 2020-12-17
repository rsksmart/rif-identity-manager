import React from 'react'
import IdentitySummary from './panels/IdentitySummary'
import DataVaultSummary from './panels/DataVaultSummary'
import { screens } from '../Authenticated/components/Navigation'
import { DataVaultStorageState } from '../state/reducers/datavault'
import DeFiSummary from './panels/DeFiSummary'
import { Token } from '../state/reducers/defi'

interface DashboardScreenInterface {
  chainId?: number | null
  address: string | null
  storage?: DataVaultStorageState
  balance: number | null
  featuredTokens?: Token[]
  converstion: number | null
  changeScreen: (screen: string) => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({
  chainId, address, storage, balance, featuredTokens, converstion, changeScreen
}) => {
  return (
    <div className="content dashboard">
      {address && chainId && <IdentitySummary address={address} chainId={chainId} />}
      <div className="container">
        <div className="column">
          <DeFiSummary
            balance={balance}
            converstion={converstion}
            chainId={chainId}
            featuredToken={featuredTokens ? featuredTokens[0] : undefined}
            handleButton={() => changeScreen(screens.DEFI)}
          />
        </div>
        <div className="column">
          <DataVaultSummary storage={storage} handleButton={() => changeScreen(screens.DATAVAULT)} />
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen
