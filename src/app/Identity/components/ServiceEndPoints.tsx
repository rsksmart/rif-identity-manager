import React, { useState } from 'react'
import { ServiceEndpoint } from 'did-resolver'
import Panel from '../../../components/Panel/Panel'
import Modal from '../../../components/Modal/Modal'
import { BaseButton } from '../../../components/Buttons'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import computerIcon from '../../../assets/images/icons/computer.svg'

interface ServiceEndPointsInterface {
  endpoints?: ServiceEndpoint[],
  addEndpoint: (name: string, url: string, validity: number) => Promise<any>
  isOwner: boolean
}

const ServiceEndPoints: React.FC<ServiceEndPointsInterface> = ({ endpoints, addEndpoint, isOwner }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  const defaults = { name: '', url: '', validity: '86400' }
  const [values, setValues] = useState<{ name: string, url: string, validity: string}>(defaults)

  const sharedProps = (id: string) => ({
    type: 'text',
    className: 'line',
    id,
    onChange: (evt: { target: HTMLInputElement }) =>
      setValues({ ...values, [evt.target.id]: evt.target.value }),
    disabled: isLoading,
    placeholder: id
  })

  const handleAddEndpoint = () => {
    setIsLoading(true)
    setIsError(null)

    if (values.name === '' || values.url === '') {
      setIsLoading(false)
      return setIsError('Name and URL are required fields.')
    }

    if (values.name.indexOf(' ') !== -1) {
      setIsLoading(false)
      return setIsError('Name should not contain spaces.')
    }

    addEndpoint(`did/svc/${values.name}`, values.url, parseInt(values.validity))
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

  return (
    <>
      <Panel
        title={<><img src={computerIcon} /> Service Endpoints</>}
        headerRight={isOwner && <button onClick={() => setIsAdding(true)}>Add Endpoint</button>}
      >
        <h2>Active Endpoints</h2>
        <ul>
          {(!endpoints || endpoints?.length === 0) && <li><em>No service endpoints setup.</em></li>}
          {endpoints?.map((endpoint: ServiceEndpoint) => (
            <li className="endpoint" key={endpoint.id || endpoint.type}>
              <strong>{endpoint.type}</strong> - {endpoint.serviceEndpoint}
            </li>
          ))}
        </ul>
      </Panel>

      <Modal show={isAdding} title="Add Service Endpoint" onClose={() => setIsAdding(false)}>
        <fieldset>
          <p>
            <label htmlFor="name">Name</label>
            <input {...sharedProps('name')} value={values.name} />
          </p>
          <p>
            <label htmlFor="url">URL</label>
            <input {...sharedProps('url')} value={values.url} />
          </p>
          <p>
            <label htmlFor="validity">Validity <span>(in seconds)</span></label>
            <input {...sharedProps('validity')} value={values.validity} />
          </p>
        </fieldset>
        <BaseButton className="submit" disabled={isLoading} onClick={handleAddEndpoint}>Add Endpoint</BaseButton>
        {isError && <div className="alert error">{isError}</div>}
        {isLoading && <LoadingComponent />}
      </Modal>
    </>
  )
}

export default ServiceEndPoints
