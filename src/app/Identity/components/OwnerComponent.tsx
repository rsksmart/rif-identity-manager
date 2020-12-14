import React, { useState } from 'react'
import { createDidFormat, truncateAddressDid } from '../../../formatters'
import { BaseButton } from '../../../components/Buttons'
import { isValidAddress, isValidChecksumAddress } from 'rskjs-util'
import ToolTip from '../../../components/Tooltip/Tooltip'
import Panel from '../../../components/Panel/Panel'
import EditValueModal from '../../../components/Modal/EditValueModal'

interface OwnerComponentInterface {
  owner?: string | null
  isOwner: boolean
  chainId?: number | null
  changeOwner: (newOwner: string) => any
}

const OwnerComponent: React.FC<OwnerComponentInterface> = ({ owner, isOwner, chainId, changeOwner }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)

  const resetState = () => {
    setIsError(null)
    setIsLoading(false)
  }

  const handleSetOwner = (newOwner: string) => {
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
    changeOwner(newOwner)
      .then(() => {
        setIsEditing(false)
        resetState()
      })
      .catch((err: Error) => {
        resetState()
        setIsError(err.message)
      })
  }

  const handleClose = () => {
    if (!isLoading) {
      setIsEditing(false)
      resetState()
    }
  }

  const ownerDid = owner && chainId && createDidFormat(owner, chainId, true)

  return (
    <Panel title="Persona owner">
      <h2>Owner</h2>
      <p className="value">
        {ownerDid && <ToolTip hoverContent={ownerDid}>{truncateAddressDid(ownerDid)}</ToolTip>}
      </p>
      {isOwner && <BaseButton onClick={() => setIsEditing(true)}>Transfer</BaseButton>}

      <EditValueModal
        show={isEditing}
        className="change-owner"
        onConfirm={handleSetOwner}
        onClose={handleClose}
        disabled={isLoading}
        error={isError}
        initValue={owner || ''}
        strings={{
          title: 'Transfer Persona Owner',
          intro: 'Be aware that once you transfer the identity, you will lose ownership and can no longer manage the identity.',
          label: 'Transfer to',
          placeholder: 'address',
          submit: 'Transfer'
        }}
      />
    </Panel>
  )
}

export default OwnerComponent
