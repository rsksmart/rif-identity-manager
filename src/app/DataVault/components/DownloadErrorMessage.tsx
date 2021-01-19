import React from 'react'

interface DownloadErrorMessageInterface {
 keyError: string
}

const DownloadErrorMessage: React.FC<DownloadErrorMessageInterface> = ({ keyError }) => (
  <p className="alert error">This content is encrypted, and your wallet is unable to decrypt the key <em>{keyError}</em>.</p>
)

export default DownloadErrorMessage
