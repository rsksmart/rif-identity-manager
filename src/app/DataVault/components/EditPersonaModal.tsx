import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal/Modal'
import PersonaIcon from '../../../assets/images/icons/persona.svg'
import PencilIcon from '../../../assets/images/icons/pencil.svg'
import { truncateAddressDid } from '../../../formatters'
import { BaseButton } from '../../../components/Buttons'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import { DataVaultKey } from '../../state/reducers/datavault'

interface EditPersonaModalInterface {
  did?: string
  initValue: DataVaultKey
  updatePersona: (items: DataVaultKey) => Promise<any>
}

const EditPersonaModal: React.FC<EditPersonaModalInterface> = ({ did, initValue, updatePersona }) => {
  if (!did) {
    return <></>
  }

  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    setIsError(null)
    setIsLoading(false)

    setName(initValue.DD_NAME[0].content)
    setEmail(initValue.DD_EMAIL[0].content)
  }, [initValue])

  const valueUpdate = (key: string, newContent: string) =>
    (initValue[key][0].content !== newContent) ? [{ id: initValue[key][0].id, content: name }] : []

  const save = () => {
    setIsLoading(true)
    setIsError(null)

    // update first item in array to send back to be modified
    const prepareData = {
      // DD_NAME: valueUpdate('DD_NAME', name),
      // DD_EMAIL: valueUpdate('DD_EMAIL', email)
      DD_NAME: initValue.DD_NAME[0].content !== name ? [{ id: initValue.DD_NAME[0].id, content: name }] : [],
      DD_EMAIL: initValue.DD_EMAIL[0].content !== email ? [{ id: initValue.DD_EMAIL[0].id, content: email }] : []
    }

    updatePersona(prepareData)
      .then(() => {
        setIsLoading(false)
        setShowModal(false)
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setIsError(err.message)
      })
  }

  return (
    <>
      <button className="edit icon" onClick={() => setShowModal(true)}>
        <img src={PencilIcon} alt="Edit Persona" />
      </button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={<><img src={PersonaIcon} alt="pesona" /> Edit persona</>}
        className="edit-personal-modal"
      >
        <div>
          <h2>Edit Persona</h2>
          {truncateAddressDid(did)}
          <p>You can edit your personal that be saved in your data vault.</p>

          <p>
            <label>
            Name:
              <input
                type="text"
                id="name"
                className="line"
                value={name}
                placeholder="Persona Name"
                onChange={(evt) => setName(evt.target.value)}
                disabled={isLoading}
              />
            </label>
          </p>
          <p>
            <label>
            Email:
              <input
                type="text"
                id="email"
                className="line"
                value={email}
                placeholder="Persona Email"
                onChange={(evt) => setEmail(evt.target.value)}
                disabled={isLoading}
              />
            </label>
          </p>
          <p>
            <BaseButton
              className="save blue"
              onClick={save}
              disabled={isLoading}
            >Save</BaseButton></p>

          {isError && <div className="alert error">{isError}</div>}
          {isLoading && <LoadingComponent />}
        </div>
      </Modal>
    </>
  )
}

export default EditPersonaModal
