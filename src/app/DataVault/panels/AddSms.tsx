import React, { useState, useContext } from 'react'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'
import ServerConfig from '../../../config/config.server.json'
import { createDidFormat } from '../../../formatters'
import { Web3ProviderContext } from '../../../providerContext'

interface AddSMSInterface {
  address: string
  chainId: number
  addVerifiedCredentials: (key: string, content: string) => Promise<any>
}

const AddSms: React.FC<AddSMSInterface> = ({ address, chainId, addVerifiedCredentials }) => {
  const [message, setMessage] = useState('')
  const [mobile, setMobile] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [smsSent, setSmsSent] = useState(false)
  const [error, setError] = useState('')
  const [jwt, setJwt] = useState('')
  const did = createDidFormat(address, chainId)
  const context = useContext(Web3ProviderContext)

  const requestVerification = () => fetch(`${ServerConfig.issuerServerUrl}/requestSmsVerification/` + did, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ phoneNumber: mobile })
  }).then((res: any) => {
    setError('')
    if (res.status === 200) {
      setSmsSent(true)
    } else {
      setError('SMS count not be sent')
    }
  }).catch(handleError)

  const handleError = (error: Error) => {
    setError(error ? error.message : 'Unhandled error')
  }

  const verify = () => context.provider!.request({
    method: 'personal_sign',
    params: [
      `Verification code: ${smsCode}`, // includes the decoration
      address
    ]
  }).then((sig: string) => fetch(`${ServerConfig.issuerServerUrl}/verifySms/` + did, {
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
      res.status === 200
        ? res.json().then(({ jwt }: { jwt: string }) => { setJwt(jwt); setMessage('Verified. Please save') })
        : res.text().then((error: string) => handleError(new Error(error)))
    })
    .catch(handleError)

  const saveInDataVault = () => {
    setError(''); setMessage('')
    addVerifiedCredentials('SmsVerifiableCredential', jwt)
      .then(() => {
        setJwt(''); setMobile(''); setSmsCode(''); setSmsSent(false) // reset
      })
      .catch((err: Error) => {
        setError(err.message)
      })
  }

  const title = <>Add SMS Credential</>

  return (
    <Panel title={title} className="add-mobile">
      <div className="container">
        <div className="column">
          <input type="text"
            className="line type"
            onChange={(evt) => setMobile(evt.target.value)}
            disabled={smsSent}
            value={mobile}
            placeholder="Mobile number" />
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={requestVerification} disabled={smsSent}>Send</BaseButton>
        </div>
        <div className="column">
          <input type="text"
            className="line type"
            onChange={(evt) => { setSmsCode(evt.target.value); setJwt('') }}
            disabled={!smsSent}
            value={smsCode}
            placeholder="Enter code" />
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={verify} disabled={!smsSent || (jwt !== '') || (smsCode === '')}>Verify</BaseButton>
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

export default AddSms
