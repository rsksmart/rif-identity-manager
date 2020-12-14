import React, { useContext, useState } from 'react'
import { Authentication } from 'did-resolver'
import { Web3ProviderContext } from '../../../providerContext'
import { BaseButton } from '../../../components/Buttons'
import { isValidAddress, isValidChecksumAddress } from 'rskjs-util'
import Modal from '../../../components/Modal/Modal'
import { truncateAddressDid } from '../../../formatters'
import ToolTip from '../../../components/Tooltip/Tooltip'
import Panel from '../../../components/Panel/Panel'

interface DelegateComponentInterface {
  delegates?: Authentication[] | null
  chainId?: number | null
  addDelegate: (provider: any, delegate: string) => any
  isOwner: boolean
}

const DelegateComponent: React.FC<DelegateComponentInterface> = ({ delegates, chainId, addDelegate, isOwner }) => {
  const [add, setAdd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [newDelegate, setNewDelegate] = useState<string>('')
  const [isError, setIsError] = useState<null | string>(null)
  const context = useContext(Web3ProviderContext)

  const resetState = () => {
    setIsError(null)
    setIsLoading(false)
  }

  const handleAddDelegate = () => {
    resetState()

    if (!isValidAddress(newDelegate)) {
      resetState()
      return setIsError('Invalid Address')
    }

    if (newDelegate !== newDelegate.toLowerCase() && !isValidChecksumAddress(newDelegate, chainId)) {
      resetState()
      return setIsError('Checksum is incorrect.')
    }

    if (delegates?.filter(item => item.publicKey.indexOf(newDelegate) !== -1).length !== 0) {
      resetState()
      return setIsError('This address is already a delegate.')
    }

    setIsLoading(true)
    addDelegate(context?.provider, newDelegate)
      .then(() => {
        setAdd(false)
        setNewDelegate('')
        resetState()
      })
      .catch((err: Error) => {
        resetState()
        setIsError(err.message)
      })
  }

  const handleClose = () => {
    if (!isLoading) {
      setAdd(false)
      resetState()
    }
  }

  return (
    <Panel title="Delegate Identity">
      <ul className="value">
        {delegates?.map((delegate: Authentication) =>
          <li key={delegate.publicKey}>
            <ToolTip hoverContent={delegate.publicKey}>
              {truncateAddressDid(delegate.publicKey.slice(delegate.publicKey.lastIndexOf(':') + 1, delegate.publicKey.indexOf('#')))}
            </ToolTip>
          </li>)
        }
      </ul>

      {isOwner && <BaseButton onClick={() => setAdd(true)}>Add Delegate</BaseButton>}
      <Modal show={add} title="Delegate Identity" onClose={handleClose}>
        <div className="delegate-identity">
          <p>Controllers can manage the identity but they are not the owners. Only the owners can transfer identities.</p>
          <p>
            <strong>Delegate to: </strong>
            <input
              type="text"
              value={newDelegate}
              onChange={evt => setNewDelegate(evt.target.value)}
              placeholder="address"
              className="line"
              disabled={isLoading}
            />
          </p>
          <BaseButton className="blue" disabled={isLoading} onClick={handleAddDelegate}>Add controller</BaseButton>
          {isError && <p>{isError}</p>}
        </div>
      </Modal>
    </Panel>
  )
}

export default DelegateComponent
