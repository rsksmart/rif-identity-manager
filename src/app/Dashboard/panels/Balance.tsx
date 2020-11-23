import React, { useContext, useState } from 'react'
import { BaseButton } from '../../../components/Buttons'
import Modal from '../../../components/Modal/Modal'
import Panel from '../../../components/Panel/Panel'
import { Web3ProviderContext } from '../../../providerContext'
import { Token } from '../../state/reducers/tokens'
import { isValidAddress } from 'rskjs-util'

interface BalanceInterface {
  tokens?: Token[]
  addCustomToken: (provider: any, tokenAddress: string) => any
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

const DoCTestnet = '0xcb46c0ddc60d18efeb0e586c17af6ea36452dae0'

const Balance: React.FC<BalanceInterface> = ({ tokens, addCustomToken }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState<string>(DoCTestnet)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  const context = useContext(Web3ProviderContext)
  const addToken = () => {
    setIsLoading(true)
    if (!isValidAddress(newAddress)) {
      setIsLoading(false)
      return setIsError('Not a valid address!')
    }
    addCustomToken(context?.provider, newAddress)
      .then(() => {
        setIsLoading(false)
        setIsAdding(false)
      })
  }

  return (
    <Panel
      title="Identity Balance"
      className="identity-balance"
      headerRight={<button onClick={() => setIsAdding(true)}>[+]</button>}
    >
      {tokens?.map((token: Token) => <SingleToken key={token.address} token={token} />)}

      <Modal show={isAdding} title="Add token" onClose={() => setIsAdding(false)}>
        <p>Add an ERC20 or ERC721 token to the dashboard.</p>
        <p>
          <strong>Token to Add:</strong>
          <input
            type="text"
            value={newAddress}
            onChange={evt => setNewAddress(evt.target.value)}
            placeholder="contract address"
            className="line"
            disabled={isLoading}
          />
        </p>
        <BaseButton
          onClick={addToken}
          className="blue"
          disabled={isLoading}
        >Add Token</BaseButton>
        {isError && <p>{isError}</p>}
      </Modal>
    </Panel>
  )
}

export default Balance
