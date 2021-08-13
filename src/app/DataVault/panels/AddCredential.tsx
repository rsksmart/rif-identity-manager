import { AxiosResponse } from 'axios'
import React, { useState, useContext } from 'react'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'
import { createDidFormat } from '../../../formatters'
import { Web3ProviderContext } from '../../../providerContext'
import { requestVerification, verifyCode } from '../../state/operations/credentials'

interface AddCredentialInterface {
  address: string
  chainId: number
  addVerifiedCredentials: (key: string, content: string) => Promise<any>
}

const AddCredential: React.FC<AddCredentialInterface> = ({ address, chainId, addVerifiedCredentials }) => {
  const [credentialType, setCredentialType] = useState<string>('Email')
  const [userInput, setUserInput] = useState('')
  const [verificationCode, setVerificationCode] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [jwt, setJwt] = useState<string | null>()

  const did = createDidFormat(address, chainId)
  const context = useContext(Web3ProviderContext)

  const handleError = (error: Error) => setError(error ? error.message : 'Unhandled error')

  const resetProcess = () => {
    setCredentialType('Email')
    setUserInput('')
    setVerificationCode(null)
    setVerificationSent(false)
    setError(null)
    setJwt(null)
  }

  // Send the verification code to the user
  const request = () => {
    setError('')
    requestVerification(did, credentialType, userInput).then((res: any) =>
      res.status === 200 ? setVerificationSent(true) : setError('The request could not be sent')
    ).catch(handleError)
  }

  const verify = () => {
    setError('')
    context.provider && verificationCode &&
    verifyCode(context.provider, verificationCode, address, did, credentialType)
      .then((res: AxiosResponse) =>
        res.status === 200 ? setJwt(res.data.jwt) : setError('Credential could not be Issued'))
      .catch(handleError)
  }

  const saveInDataVault = () =>
    jwt && addVerifiedCredentials(`${credentialType}VerifiableCredential`, jwt)
      .then(() => resetProcess())
      .catch(handleError)

  return (
    <Panel
      title={<>Get a Credential</>}
      headerRight={<button onClick={resetProcess}>Start Over</button>}
      className="add-credential"
    >
      {!verificationSent && (
        <div className="container">
          <div className="column">
            <p className="title">Type</p>
            <select
              value={credentialType}
              onChange={evt => setCredentialType(evt.target.value)}
              disabled={verificationSent}
            >
              <option value='Email'>Email</option>
              <option value='Phone'>Phone</option>
            </select>
          </div>
          <div className="columnDouble">
            <p className="title">
              {credentialType === 'Email' ? <>Email Address</> : <>Phone Number</>}
            </p>
            <input type="text"
              className="line type fullWidth"
              onChange={(evt) => setUserInput(evt.target.value)}
              disabled={verificationSent}
              value={userInput}
              placeholder={credentialType} />
          </div>
          <div className="column submitColumn">
            <BaseButton
              className="submit turquoise"
              onClick={request}
              disabled={verificationSent}>Send Code</BaseButton>
          </div>
        </div>
      )}

      {verificationSent && !jwt && (
        <>
          <div className="alert info">
            A verification code has been sent.
          </div>
          <div className="container">
            <div className="column">
              <p className="title">Verification code</p>
              <input type="text"
                className="line type fullWidth"
                onChange={(evt) => setVerificationCode(evt.target.value)}
                disabled={!verificationSent}
                value={verificationCode || ''}
                placeholder="Enter code" />
            </div>
            <div className="column">
              <BaseButton className="submit turquoise" onClick={verify}>Verify</BaseButton>
            </div>
          </div>
        </>
      )}

      {jwt && (
        <>
          <div className="alert info">A credential has been issued!</div>
          <p>Here is the RAW version of the credential:</p>
          <textarea
            className="jwt"
            defaultValue={jwt}
          />
          <p>
            <a
              href={`https://verifier.identity.rifos.org/?jwt=${jwt}`}
              target="_blank"
              rel="no-follow noreferrer"
            >
              Verifiy your new credential
            </a>
          </p>
          <p><BaseButton className="submit turquoise" onClick={saveInDataVault}>Save in Datavault</BaseButton></p>
        </>
      )}

      {error && (
        <div className="alert error">
          <p>{error}</p>
        </div>
      )}
    </Panel>
  )
}

export default AddCredential
