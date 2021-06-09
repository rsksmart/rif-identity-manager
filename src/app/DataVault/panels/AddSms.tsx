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

  const sendSms = () => {
    setError(''); setMessage('')

    let headerStatus = 0
    fetch(`${ServerConfig.issuerServerUrl}/issuer/smsCode/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ mobile, did })
    }).then(response => {
      headerStatus = response.status
      return response
    }).then(response => response.json())
      .then(responseJson => {
        if (headerStatus !== 200) {
          throw new Error(responseJson.message)
        } else {
          setMessage(responseJson.message)
          setSmsSent(true)
        }
      })
      .catch(handleError)
  }

  const handleError = (error: Error) => {
    setError(error ? error.message : 'Unhandled error')
  }

  const verifyCode = () => {
    setError('')
    setMessage('')

    const msg = `code:${smsCode}`
    context.provider.request({
      method: 'personal_sign',
      params: [msg, address]
    }).then((sig: string) => { issuerAddMobile(msg, sig) })
      .catch((error: any) => { setError(error.message) })
  }

  const issuerAddMobile = (msg: string, sig: string) => {
    setError(''); setMessage('')

    let headerStatus = 0
    fetch(`${ServerConfig.issuerServerUrl}/issuer/AddMobile/`, {
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
        console.log('responseJson=', responseJson)
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
          <BaseButton className="submit turquoise" onClick={sendSms} disabled={smsSent}>Send</BaseButton>
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
          <BaseButton className="submit turquoise" onClick={verifyCode} disabled={!smsSent || (jwt !== '') || (smsCode === '')}>Verify</BaseButton>
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
