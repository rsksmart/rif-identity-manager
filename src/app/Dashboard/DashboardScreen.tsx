import React from 'react'
import IdentitySummary from './panels/IdentitySummary'
import DataVaultSummary from './panels/DataVaultSummary'
import { screens } from '../Authenticated/components/Navigation'
import { DataVaultStorageState } from '../state/reducers/datavault'
import DeFiSummary from './panels/DeFiSummary'

interface DashboardScreenInterface {
  chainId?: number | null
  address: string | null
  storage?: DataVaultStorageState
  changeScreen: (screen: string) => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({
  chainId, address, storage, changeScreen
}) => {
  return (
    <div className="content dashboard">
      {address && chainId && <IdentitySummary address={address} chainId={chainId} />}
      <div className="container">
        <div className="column">
          <DeFiSummary />
        </div>
        <div className="column">
          <DataVaultSummary storage={storage} handleButton={() => changeScreen(screens.DATAVAULT)} />
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen
