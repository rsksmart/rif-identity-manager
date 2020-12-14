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
  const [values, setValues] = useState<{ name: string, email: string, address: string, idnumber: string, phone: string, birthdate: string}>({
    name: '',
    email: '',
    address: '',
    idnumber: '',
    phone: '',
    birthdate: ''
  })

  const changeInputValue = (evt: { target: HTMLInputElement }) =>
    setValues({ ...values, [evt.target.id]: evt.target.value })

  useEffect(() => {
    setIsError(null)
    setIsLoading(false)

    setValues({
      name: initValue.DD_NAME[0].content,
      email: initValue.DD_EMAIL[0].content,
      address: initValue.DD_ADDRESS[0].content,
      idnumber: initValue.DD_IDNUMBER[0].content,
      phone: initValue.DD_PHONE[0].content,
      birthdate: initValue.DD_BIRTHDATE[0].content
    })
  }, [initValue])

  const save = () => {
    setIsLoading(true)
    setIsError(null)

    const valueDifferentFromInit = (key: string, content: string) =>
      (initValue[key][0].content !== content) ? [{ ...initValue[key][0], content }] : []

    const prepareData = {
      DD_NAME: valueDifferentFromInit('DD_NAME', values.name),
      DD_EMAIL: valueDifferentFromInit('DD_EMAIL', values.email),
      DD_ADDRESS: valueDifferentFromInit('DD_ADDRESS', values.address),
      DD_IDNUMBER: valueDifferentFromInit('DD_IDNUMBER', values.idnumber),
      DD_PHONE: valueDifferentFromInit('DD_PHONE', values.phone),
      DD_BIRTHDATE: valueDifferentFromInit('DD_BIRTHDATE', values.birthdate)
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

  const dynamicProps = (type:string) => ({ placeholder: `Persona ${type}`, id: type, type: 'text', className: 'line', onChange: changeInputValue, disabled: isLoading })

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

          <p><label>Name: <input value={values.name} {...dynamicProps('name')} /></label></p>
          <p><label>Email: <input value={values.email} {...dynamicProps('email')} /></label></p>
          <p><label>Address: <input value={values.address} {...dynamicProps('address')} /></label></p>
          <p><label>Id Number: <input value={values.idnumber} {...dynamicProps('idnumber')} /></label></p>
          <p><label>Phone Number: <input value={values.phone} {...dynamicProps('phone')} /></label></p>
          <p><label>Birthdate: <input value={values.birthdate} {...dynamicProps('birthdate')} /></label></p>

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
