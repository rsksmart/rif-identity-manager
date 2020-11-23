import React from 'react'
import Panel from '../../../components/Panel/Panel'
import { Token } from '../../state/reducers/tokens'

interface BalanceInterface {
  tokens?: Token[]
}

const SingleToken: React.FC<{ token: Token, key: any }> = ({ token }) => (
  <div className="token">
    <div className="heading-symbol">{token.name}</div>
    <div>
      <span className="balance">{token.balance}</span>
      <span className="symbol">{token.symbol}</span>
      <span className="conversion">{token.conversion}</span>
    </div>
  </div>
)

const Balance: React.FC<BalanceInterface> = ({ tokens }) => (
  <Panel
    title="Identity Balance"
    className="identity-balance"
    headerRight="[+]"
  >
    {tokens?.map((token: Token) => <SingleToken key={token.address} token={token} />)}
  </Panel>
)

export default Balance
