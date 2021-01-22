import React, { useState } from 'react'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'
import uploadIcon from '../../../assets/images/icons/upload.svg'
import LoadingComponent from '../../../components/Loading/LoadingComponent'
import { PROVIDERS } from '../../../ethrpc'

interface AddDeclarativeDetailsInterface {
  addDeclarativeDetail: (key: string, content: string) => Promise<any>
  providerName?: PROVIDERS
}

const AddDeclarativeDetails: React.FC<AddDeclarativeDetailsInterface> = ({ addDeclarativeDetail, providerName }) => {
  const [type, setType] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  const handleClick = () => {
    setIsLoading(true)
    setIsError(null)

    if (type === '' || content === '') {
      setIsLoading(false)
      return setIsError('Type and Content cannot be empty.')
    }

    addDeclarativeDetail(`DD_${type.toUpperCase()}`, content)
      .then(() => {
        setIsLoading(false)
        setContent('')
        setType('')
      })
      .catch((err: Error) => {
        setIsLoading(false)
        setIsError(err.message)
      })
  }

  const title = <><img src={uploadIcon} /> Add New Declarative Details</>

  return (
    <Panel title={title} className="add-declarative">
      {providerName !== PROVIDERS.METAMASK && (
        <div className="alert warning">
          <h2>Warning!</h2>
          <p>Your wallet does not support encrypted content in your data vault. You can still add content, but it will be saved as plaintext.</p>
        </div>
      )}
      <div className="container">
        <div className="column">
          <p className="title">Type</p>
          <input type="text"
            className="line type"
            value={type}
            onChange={(evt) => setType(evt.target.value)}
            disabled={isLoading}
            placeholder="Content type" />
        </div>
        <div className="columnDouble">
          <p className="title">Content</p>
          <textarea
            className="line content"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
            disabled={isLoading}
            placeholder="Content"
          />
        </div>
        <div className="column submitColumn">
          <BaseButton className="submit turquoise" onClick={handleClick} disabled={isLoading}>Add Data</BaseButton>
        </div>
      </div>
      {isError && (
        <div className="alert error">
          <p>{isError}</p>
        </div>
      )}

      {isLoading && <LoadingComponent />}
    </Panel>
  )
}

export default AddDeclarativeDetails
