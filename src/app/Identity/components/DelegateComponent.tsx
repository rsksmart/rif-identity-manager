import React, { useState } from 'react'
import { PublicKey } from 'did-resolver'
import { BaseButton } from '../../../components/Buttons'
import { isValidAddress, isValidChecksumAddress } from 'rskjs-util'
import { createDidFormat, truncateAddressDid } from '../../../formatters'
import ToolTip from '../../../components/Tooltip/Tooltip'
import Panel from '../../../components/Panel/Panel'
import EditValueModal from '../../../components/Modal/EditValueModal'

interface DelegateComponentInterface {
  delegates?: PublicKey[] | null
  chainId?: number | null
  addDelegate: (delegate: string) => any
  isOwner: boolean
}

const DelegateComponent: React.FC<DelegateComponentInterface> = ({ delegates, chainId, addDelegate, isOwner }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)

  const resetState = () => {
    setIsError(null)
    setIsLoading(false)
  }

  const handleAddDelegate = (newDelegate: string) => {
    resetState()

    if (!isValidAddress(newDelegate)) {
      resetState()
      return setIsError('Invalid Address')
    }

    if (newDelegate !== newDelegate.toLowerCase() && !isValidChecksumAddress(newDelegate, chainId)) {
      resetState()
      return setIsError('Checksum is incorrect.')
    }

    /*
    if (delegates?.filter(item => item.publicKey.indexOf(newDelegate.toLowerCase()) !== -1).length !== 0) {
      resetState()
      return setIsError('This address is already a delegate.')
    }
    */

    console.log('setting delegate', newDelegate)
    setIsLoading(true)
    addDelegate(newDelegate)
      .then(() => {
        setIsAdding(false)
        resetState()
      })
      .catch((err: Error) => {
        resetState()
        setIsError(err.message)
      })
  }

  const handleClose = () => {
    if (!isLoading) {
      setIsAdding(false)
      resetState()
    }
  }

  return (
    <Panel title="Delegate Identity">
      <h2>Delegates</h2>
      <ul className="value">
        {delegates?.length === 0 && <li><em>No delegates for this persona.</em></li>}
        {delegates?.map((delegate: PublicKey) => {
          if (!delegate.ethereumAddress || !chainId) return <></>
          const did = createDidFormat(delegate.ethereumAddress, chainId)
          return (
            <li key={did}>
              <ToolTip hoverContent={did}>{truncateAddressDid(did)}</ToolTip>
            </li>
          )
        })}
      </ul>
      <p>
        {isOwner && <BaseButton onClick={() => setIsAdding(true)}>Add Delegate</BaseButton>}
      </p>

      <EditValueModal
        show={isAdding}
        onClose={handleClose}
        className="delegate-identity"
        onConfirm={handleAddDelegate}
        disabled={isLoading}
        error={isError}
        initValue='0xEe3D5f22Ea0FF393AeEf5Cf88a81E7d44979633B'
        strings={{
          title: 'Delegate Identity',
          intro: 'Controllers can manage the identity but they are not the owners. Only the owners can transfer identities.',
          label: 'Delegate to',
          submit: 'Add delegate',
          placeholder: 'Address'
        }}
      />
    </Panel>
  )
}

export default DelegateComponent
