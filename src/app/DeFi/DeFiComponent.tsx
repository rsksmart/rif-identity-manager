import React from 'react'
import { Token } from '../state/reducers/defi'
import Balance from './panels/Balance'

interface DeFiComponentInterface {
  tokens: Token[]
  addCustomToken: (provider: any, tokenAddr: string) => any
}

const DeFiComponent: React.FC<DeFiComponentInterface> = ({ tokens, addCustomToken }) => {
  return (
    <div className="content defi">
      <div className="container">
        <div className="column">
          <Balance tokens={tokens} addCustomToken={addCustomToken} />
        </div>
      </div>
    </div>
  )
}

export default DeFiComponent
