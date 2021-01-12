import React from 'react'
import { BaseButton } from '../../../components/Buttons'

interface DecryptKeyInterface {
  handleGetContent: () => void
  disabled: boolean
}

const DecryptKey: React.FC<DecryptKeyInterface> = ({
  handleGetContent, disabled
}) => {
  return (
    <div className="decrypt">
      <BaseButton
        className="gray small"
        onClick={handleGetContent}
        disabled={disabled}>
        Download
      </BaseButton>
    </div>
  )
}

export default DecryptKey
