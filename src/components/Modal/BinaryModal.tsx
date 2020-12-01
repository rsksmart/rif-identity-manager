import React from 'react'
import { BaseButton } from '../Buttons'
import Modal from './Modal'

interface BinaryModalInterface {
  show: boolean
  title?: string
  disabled?: boolean
  strings?: {
    text?: string
    confirm?: string
    deny?: string
  }
  className?: string
  onConfirm: () => void
  onDeny?: () => void
  onClose: () => void
}

const BinaryModal: React.FC<BinaryModalInterface> = ({
  show, title, disabled, className, onConfirm, onClose, onDeny, strings
}) => {
  return (
    <Modal show={show} className={className} onClose={onClose} title={title || 'Are you sure?'}>
      <p>{strings?.text || 'Are you sure?'}</p>
      <div className="container">
        <div className="column">
          <BaseButton onClick={onDeny || onClose} className="deny gray full" disabled={disabled || false}>
            {strings?.deny || 'Deny'}
          </BaseButton>
        </div>
        <div className="column">
          <BaseButton onClick={onConfirm} className="confirm gray full" disabled={disabled || false}>
            {strings?.confirm || 'Confirm'}
          </BaseButton>
        </div>
      </div>
    </Modal>
  )
}

export default BinaryModal
