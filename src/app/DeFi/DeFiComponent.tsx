import React from 'react'
import { Token } from '../state/reducers/defi'
import Balance from './panels/Balance'

interface DeFiComponentInterface {
  tokens: Token[]
  chainId: number
  balance: number | null
  conversion: number | null
  addCustomToken: (provider: any, tokenAddr: string) => any
}

const DeFiComponent: React.FC<DeFiComponentInterface> = ({ tokens, chainId, balance, conversion, addCustomToken }) => (
  <div className="content defi">
    <div className="container">
      <div className="column">
        <Balance
          tokens={tokens}
          addCustomToken={addCustomToken}
          chainId={chainId}
          balance={balance}
          conversion={conversion}
        />
      </div>
    </div>
  </div>
)

export default DeFiComponent
