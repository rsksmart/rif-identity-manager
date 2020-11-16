import React, { useContext, useState } from 'react'
import { truncateAddressDid } from '../../helpers'
import { Web3ProviderContext } from '../../providerContext'
import { BaseButton } from '../Buttons'
import { isValidAddress, isValidChecksumAddress } from 'rskjs-util'

interface OwnerComponentInterface {
  owner?: string | null
  isOwner: boolean
  chainId?: number | null
  changeOwner: (provider: any, newOwner: string) => any
}

const OwnerComponent: React.FC<OwnerComponentInterface> = ({ owner, isOwner, chainId, changeOwner }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newOwner, setNewOwner] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const context = useContext(Web3ProviderContext)

  const resetState = () => {
    setIsError(null)
    setIsLoading(false)
  }

  const handleSetOwner = () => {
    resetState()

    if (!isValidAddress(newOwner)) {
      resetState()
      return setIsError('Invalid Address')
    }

    if (newOwner !== newOwner.toLowerCase() && !isValidChecksumAddress(newOwner, chainId)) {
      resetState()
      return setIsError('Checksum is incorrect.')
    }
    setIsLoading(true)
    changeOwner(context?.provider, newOwner)
      .then(() => {
        setEdit(false)
        setNewOwner('')
        resetState()
      })
      .catch((err: Error) => {
        resetState()
        setIsError(err.message)
      })
  }

  return (
    <div className="column">
      <h2>Owner</h2>
      <p className="value">{owner ? truncateAddressDid(owner) : 'loading...'}</p>

      {isOwner && <BaseButton onClick={() => setEdit(!edit)}>Change Owner</BaseButton>}

      {edit && (
        <div className="change-owner">
          <input type="text" value={newOwner} onChange={evt => setNewOwner(evt.target.value)} />
          <BaseButton disabled={isLoading} onClick={handleSetOwner}>Set New Owner</BaseButton>
          {isError && <p>{isError}</p>}
        </div>
      )}
    </div>
  )
}

export default OwnerComponent
