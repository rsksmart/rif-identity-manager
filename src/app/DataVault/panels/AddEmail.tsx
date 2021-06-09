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

  const mailCode = () => {
    setError(''); setMessage('')
    let headerStatus = 0
    fetch(`${ServerConfig.issuerServerUrl}/issuer/mailCode/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, did })
    }).then(response => {
      headerStatus = response.status
      return response
    }).then(response => response.json())
      .then(responseJson => {
        if (headerStatus !== 200) {
          throw new Error(responseJson.message)
        } else {
          setMessage(responseJson.message)
          setEmailSent(true)
        }
      })
      .catch(handleError)
  }

  const handleError = (error: Error) => {
    setError(error ? error.message : 'Unhandled error')
  }

  const verifyCode = () => {
    setError(''); setMessage('')
    const msg = `code:${emailCode}`
    context.provider.request({
      method: 'personal_sign',
      params: [msg, address]
    }).then((sig: string) => { issuerAddMail(msg, sig) })
      .catch((error: any) => { setError(error.message) })
  }

  const issuerAddMail = (msg: string, sig: string) => {
    setError(''); setMessage('')
    let headerStatus = 0
    fetch(`${ServerConfig.issuerServerUrl}/issuer/AddMail/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ did, msg, sig })
    }).then(response => {
      headerStatus = response.status
      return response
    }).then(response => response.json())
      .then(responseJson => {
        if (headerStatus !== 200) {
          throw new Error(responseJson.message)
        } else {
          setMessage(responseJson.message)
          setJwt(responseJson.jwt)
        }
      })
      .catch(handleError)
  }

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
          <BaseButton className="submit turquoise" onClick={mailCode} disabled={emailSent}>Send</BaseButton>
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
          <BaseButton className="submit turquoise" onClick={verifyCode} disabled={!emailSent || (jwt !== '') || (emailCode === '')}>Verify</BaseButton>
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
