import React from 'react'
import IdentitySummary from './panels/IdentitySummary'
import Balance from './panels/Balance'
import { Token } from '../state/reducers/tokens'
import DataVaultSummary from './panels/DataVaultSummary'
import { screens } from '../Authenticated/components/Navigation'
import { DataVaultStorageState } from '../state/reducers/datavault'
import { createDidFormat } from '../../formatters'

interface DashboardScreenInterface {
  chainId?: number | null
  address: string | null
  tokens?: Token[]
  storage?: DataVaultStorageState
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
  addCustomToken: (provider: any, tokenAddr: string) => any
  changeScreen: (screen: string) => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({
  chainId, address, tokens, addCustomToken, changeScreen, storage
}) => {
  return (
    <div className="content dashboard">
      <IdentitySummary
        did={(address && chainId) ? createDidFormat(address, chainId) : undefined}
      />
      <div className="container">
        <div className="column">
          <Balance tokens={tokens} addCustomToken={addCustomToken} />
        </div>
        <div className="column">
          <DataVaultSummary storage={storage} handleButton={() => changeScreen(screens.DATAVAULT)} />
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen
