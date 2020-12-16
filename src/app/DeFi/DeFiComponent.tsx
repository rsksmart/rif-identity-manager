import React from 'react'
import { Token } from '../state/reducers/defi'
import Balance from './panels/Balance'

interface DeFiComponentInterface {
  tokens: Token[]
  chainId: number
  balance: number | null
  addCustomToken: (provider: any, tokenAddr: string) => any
}

const DeFiComponent: React.FC<DeFiComponentInterface> = ({ tokens, chainId, balance, addCustomToken }) => {
  return (
    <div className="content defi">
      <div className="container">
        <div className="column">
          <Balance
            tokens={tokens}
            addCustomToken={addCustomToken}
            chainId={chainId}
            balance={balance}
          />
        </div>
      </div>
    </div>
  )
}

export default DeFiComponent
