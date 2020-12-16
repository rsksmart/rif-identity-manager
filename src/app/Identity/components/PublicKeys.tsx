import React, { useState } from 'react'
import { PublicKey } from 'did-resolver'
import Panel from '../../../components/Panel/Panel'
import Modal from '../../../components/Modal/Modal'
import { BaseButton } from '../../../components/Buttons'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import KeyIcon from '../../../assets/images/icons/key.svg'

interface PublicAttributesInterface {
  addKey: (type: string, value: string, validity: number) => Promise<any>
  publicKeys?: PublicKey[]
  isOwner: boolean
}

const PublicAttributes: React.FC<PublicAttributesInterface> = ({ publicKeys, addKey, isOwner }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)

  const defaults = ({
    algorithm: 'secp256k1',
    purpose: 'veriKey',
    encoding: 'hex',
    validity: '86400',
    value: ''
  })

  const [values, setValues] = useState<{algorithm: string, purpose: string, encoding: string, validity: string, value: string}>(defaults)

  const handleAddKey = () => {
    if (values.value === '') {
      return setIsError('Value can not be empty')
    }

    setIsLoading(true)
    setIsError(null)
    addKey(`did/pub/${values.algorithm}/${values.purpose}/${values.encoding}`, values.value, parseInt(values.validity))
      .then(() => {
        setIsLoading(false)
        setIsAdding(false)
        setValues(defaults)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setIsError(err.message)
      })
  }

  const sharedProps = (id: string) => ({
    id,
    className: 'line',
    onChange: (evt: { target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement }) =>
      setValues({ ...values, [evt.target.id]: evt.target.value })
  })

  return (
    <>
      <Panel
        title={<><img src={KeyIcon} /> Public Keys</>}
        headerRight={isOwner && <button onClick={() => setIsAdding(true)}>Add Public Key</button>}
      >
        <h2>Public Keys</h2>
        <ul>
          {(!publicKeys || publicKeys.length === 0) && <li><em>No public keys</em></li>}
          {publicKeys?.map((pk: PublicKey) => (
            <li key={pk.id}><strong>{pk.type}</strong><br /> {pk.publicKeyBase64 || pk.publicKeyHex}</li>
          ))}
        </ul>
      </Panel>
      <Modal title="Add Public Key" show={isAdding} onClose={() => setIsAdding(false)}>
        <fieldset>
          <p>
            <label>Key Algorithm</label>
            <select {...sharedProps('algorithm')} value={values.algorithm}>
              <option value="secp256k1">secp256k1</option>
              <option value="rsa">RSA</option>
              <option value="Ed25519">Ed25519</option>
            </select>
          </p>
          <p>
            <label htmlFor="purpose">Key Purpose</label>
            <select {...sharedProps('purpose')} value={values.purpose}>
              <option value="veriKey">veriKey</option>
              <option value="sigAuth">sigAuth</option>
            </select>
          </p>
          <p>
            <label htmlFor="encoding">Encoding</label>
            <select {...sharedProps('encoding')} value={values.encoding}>
              <option value="hex">hex</option>
              <option value="base64">base64</option>
            </select>
          </p>
          <p>
            <label htmlFor="validity">Validity <span>(in seconds)</span></label>
            <input {...sharedProps('validity')} type="text" value={values.validity} />
          </p>
          <p>
            <label>Key</label>
            <textarea {...sharedProps('value')}></textarea>
          </p>

          <BaseButton className="submit" disabled={isLoading} onClick={handleAddKey}>Add Public Key</BaseButton>
          {isError && <div className="alert error">{isError}</div>}
          {isLoading && <LoadingComponent />}
        </fieldset>
      </Modal>
    </>
  )
}

export default PublicAttributes
