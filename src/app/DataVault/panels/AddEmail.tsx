import React, { useState, useContext } from 'react'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'
import ServerConfig from '../../../config/config.server.json'
import { createDidFormat } from '../../../formatters'
import { Web3ProviderContext } from '../../../providerContext'

interface AddEmailInterface {
  address: string
  chainId: number
  addVerifiedCredentials: (key: string, content: string) => Promise<any>
}

const AddEmail: React.FC<AddEmailInterface> = ({ address, chainId, addVerifiedCredentials }) => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')
  const [jwt, setJwt] = useState('')
  const did = createDidFormat(address, chainId)
  const context = useContext(Web3ProviderContext)

  const handleError = (error: Error) => {
    setError(error ? error.message : 'Unhandled error')
  }

  const requestVerification = () => fetch(`${ServerConfig.issuerServerUrl}/requestVerification/` + did, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ emailAddress: email })
  }).then((res: any) => {
    setError('')
    if (res.status === 200) {
      setEmailSent(true)
    } else {
      setError('Email count not be sent')
    }
  }).catch(handleError)

  const verify = () => context.provider!.request({
    method: 'personal_sign',
    params: [
      `Verification code: ${emailCode}`, // includes the decoration
      address
    ]
  }).then((sig: string) => fetch(`${ServerConfig.issuerServerUrl}/verify/` + did, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ sig })
  }))
    .then((res: any) => {
      setError('')
      res.status === 200
        ? res.json().then(({ jwt }: { jwt: string }) => { setJwt(jwt); setMessage('Verified. Please save') })
        : res.text().then((error: string) => { handleError(new Error(error)) })
    })
    .catch(handleError)

  const saveInDataVault = () => {
    setError(''); setMessage('')
    addVerifiedCredentials('EmailVerifiableCredential', jwt)
      .then(() => {
        setJwt(''); setEmail(''); setEmailCode(''); setEmailSent(false) // reset
      })
      .catch((err: Error) => {
        setError(err.message)
      })
  }

  const title = <>Add Email Credential</>

  return (
    <Panel title={title} className="add-email">
      <div className="container">
        <div className="column">
          <input type="text"
            className="line type"
            onChange={(evt) => setEmail(evt.target.value)}
            disabled={emailSent}
            value={email}
            placeholder="Email" />
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={requestVerification} disabled={emailSent}>Send</BaseButton>
        </div>
        <div className="column">
          <input type="text"
            className="line type"
            onChange={(evt) => { setEmailCode(evt.target.value); setJwt('') }}
            disabled={!emailSent}
            value={emailCode}
            placeholder="Enter code" />
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={verify} disabled={!emailSent || (jwt !== '') || (emailCode === '')}>Verify</BaseButton>
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={saveInDataVault} disabled={!jwt}>Save</BaseButton>
        </div>
      </div>
      {error && (
        <div className="alert error">
          <p>{error}</p>
        </div>
      )}
      {message && (
        <div className="alert info">
          <p>{message}</p>
        </div>
      )}
    </Panel>
  )
}

export default AddEmail
