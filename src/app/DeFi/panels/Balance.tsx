import React, { useContext, useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import { Web3ProviderContext } from '../../../providerContext'
import { Token } from '../../state/reducers/defi'
import { isValidAddress } from 'rskjs-util'
import { truncateAddressDid } from '../../../formatters'
import BalanceRow from '../../../components/BalanceRow/BalanceRow'
import EditValueModal from '../../../components/Modal/EditValueModal'
import { getBalanceName } from '../../../config/getConfig'

interface BalanceInterface {
  tokens?: Token[]
  chainId: number
  balance: number | null,
  conversion: number | null,
  addCustomToken: (provider: any, tokenAddress: string) => any
}

const Balance: React.FC<BalanceInterface> = ({ tokens, chainId, balance, conversion, addCustomToken }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  const context = useContext(Web3ProviderContext)

  const togglePopup = () => {
    setIsAdding(!isAdding)
    setNewAddress('')
  }

  const addToken = () => {
    setIsLoading(true)
    setIsError(null)

    if (!isValidAddress(newAddress)) {
      setIsLoading(false)
      return setIsError('Not a valid address!')
    }
    addCustomToken(context?.provider, newAddress)
      .then(() => {
        setIsLoading(false)
        setIsAdding(false)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setIsError(err.message)
      })
  }

  return (
    <Panel
      title="Assets"
      className="identity-balance"
      headerRight={<button onClick={togglePopup}>Watch Asset</button>}
    >
      {balance && (
        <BalanceRow
          name="Balance"
          className="defaultBalance"
          balance={balance}
          symbol={getBalanceName(chainId)}
          conversion={conversion || undefined}
        />
      )}

      {tokens?.map((token: Token) =>
        <BalanceRow
          key={token.address}
          name={token.name || `Custom token: ${truncateAddressDid(token.address)}`}
          balance={token.balance}
          symbol={token.symbol}
          conversion={token.conversion}
        />
      )}

      <EditValueModal
        show={isAdding}
        onClose={togglePopup}
        disabled={isLoading}
        error={isError}
        strings={{
          title: 'Add Token',
          intro: 'Add an ERC20 or ERC721 token to the dashboard',
          label: 'Token to add:',
          placeholder: 'contract address',
          submit: 'Add Token'
        }}
        onConfirm={addToken}
      />
    </Panel>
  )
}

export default Balance
