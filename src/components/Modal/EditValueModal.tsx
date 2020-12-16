import React, { useState, useEffect } from 'react'
import { BaseButton } from '../Buttons'
import LoadingComponent from '../Loading/LoadingComponent'
import Modal from './Modal'

interface EditValueModalInterface {
  show: boolean
  className?: string
  onConfirm: (value: string) => void
  onClose: () => void
  disabled?: boolean
  isLoading?: boolean
  error?: string | null
  initValue?: string
  inputType?: 'input' | 'textarea'
  strings?: {
    title?: string,
    intro?: string,
    label?: string,
    placeholder?: string,
    submit?: string,
  }
}

const EditValueModal: React.FC<EditValueModalInterface> = ({
  show, className, onConfirm, onClose, disabled, isLoading, error, initValue, inputType, strings
}) => {
  const [editable, setEditable] = useState<string>('')
  const sharedProps = {
    onChange: (evt: { target: { value: React.SetStateAction<string> } }) => setEditable(evt.target.value as string),
    disabled,
    className: 'editable line',
    placeholder: strings?.placeholder,
    value: editable || ''
  }

  useEffect(() => {
    setEditable(initValue || '')
  }, [initValue])

  return (
    <Modal show={show} className={className} onClose={onClose} title={strings?.title || 'Edit Value'}>
      <p className="intro-text">{strings?.intro}</p>
      <p>
        <label>{strings?.label || 'Value:'}</label>
        {inputType === 'textarea'
          ? <textarea {...sharedProps} />
          : <input type="text" {...sharedProps} />}
      </p>
      <p>
        <BaseButton
          onClick={() => onConfirm(editable)}
          disabled={disabled}
          className="submit"
        >{strings?.submit || 'Submit'}</BaseButton>
      </p>
      {isLoading && <LoadingComponent />}
      {error && (
        <div className="error container">
          <div className="alert error">{error}</div>
        </div>
      )}
    </Modal>
  )
}

export default EditValueModal
