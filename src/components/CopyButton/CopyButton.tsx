import React, { useRef, useState } from 'react'
import CopyIcon from '../../assets/images/icons/copy.svg'

interface CopyButtonInterface {
  value: string
}

const CopyButton: React.FC<CopyButtonInterface> = ({ value }) => {
  const [showResponse, setShowResponse] = useState<boolean>(false)
  const copyTextField = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    setShowResponse(true)
    copyTextField.current && copyTextField.current.select()
    document.execCommand('copy')
    setTimeout(() => {
      setShowResponse(false)
    }, 1000)
  }

  return (
    <span className="copyButton">
      <button type="button" onClick={handleClick} className="icon">
        <img src={CopyIcon} alt="Copy text" />
      </button>
      {showResponse && <span className="response">Copied to clipboard.</span>}
      <input
        type="text"
        className="copyText"
        defaultValue={value}
        ref={copyTextField}
        style={{ position: 'absolute', left: '-10000px' }}
      />
    </span>
  )
}

export default CopyButton
