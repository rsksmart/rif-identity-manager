import React, { useContext, useState } from 'react'
import { truncateAddressDid } from '../../formatters'
import { Web3ProviderContext } from '../../providerContext'
import { BaseButton } from '../Buttons'
import { isValidAddress, isValidChecksumAddress } from 'rskjs-util'
import Modal from '../Modal/Modal'
import ToolTip from '../Tooltip/Tooltip'

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

  const handleClose = () => {
    if (!isLoading) {
      setEdit(false)
      resetState()
    }
  }

  return (
    <div className="column">
      <h2>Owner</h2>
      <p className="value">
        {owner && <ToolTip hoverContent={owner}>{truncateAddressDid(owner)}</ToolTip>}
      </p>

      {isOwner && <BaseButton onClick={() => setEdit(!edit)}>Change Owner</BaseButton>}

      <Modal show={edit} title="Transfer Identity" onClose={handleClose}>
        <div className="change-owner">
          <p>Be aware that once you transfer the identity, you will lose ownership and can no longer manage the identity.</p>
          <p>
            <strong>Transfer to: </strong>
            <input
              type="text"
              value={newOwner}
              onChange={evt => setNewOwner(evt.target.value)}
              placeholder="address"
              className="line"
              disabled={isLoading}
            />
          </p>
          <BaseButton className="blue" disabled={isLoading} onClick={handleSetOwner}>Transfer</BaseButton>
          {isError && <p>{isError}</p>}
        </div>
      </Modal>
    </div>
  )
}

export default OwnerComponent
