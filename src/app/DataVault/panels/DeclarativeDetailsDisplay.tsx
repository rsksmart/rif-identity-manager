import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import pencilIcon from '../../../assets/images/icons/pencil.svg'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import EditValueModal from '../../../components/Modal/EditValueModal'
import DeleteDvContentButton from '../components/DeleteDvContentButton'
import DecryptKey from '../components/DecryptKey'
import DownloadErrorMessage from '../components/DownloadErrorMessage'

interface DeclarativeDetailsDisplayInterface {
  deleteValue: (key: string, id: string) => Promise<any>
  swapValue: (key: string, content: string, id: string) => Promise<any>
  getKeyContent: (key: string) => Promise<any>
  details: DataVaultKey
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, deleteValue, swapValue, getKeyContent }) => {
  interface EditItemI { key: string; item: DataVaultContent }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const [isDownloadError, setIsDownloadError] = useState<null | string>(null)
  const [isEditing, setIsEditing] = useState<null | EditItemI>(null)
  const [isGettingContent, setIsGettingContent] = useState<string[]>([])

  const handleEditItem = (newValue: string, existingItem: EditItemI) => {
    if (newValue === existingItem.item.content) {
      return setIsError('New value is the same as the old.')
    }

    setIsLoading(true)
    setIsError(null)

    swapValue(existingItem.key, newValue, existingItem.item.id)
      .then(() => {
        setIsLoading(false)
        setIsEditing(null)
      })
      .catch((err: Error) => setIsError(err.message))
      .finally(() => setIsLoading(false))
  }

  const handleGetContent = (key: string) => {
    setIsDownloadError(null)
    setIsGettingContent([...isGettingContent, key])
    getKeyContent(key)
      .catch(() => setIsDownloadError(key))
      .finally(() => {
        setIsGettingContent(isGettingContent.filter((k: string) => k !== key))
      })
  }

  const showDownloadMessage = () => {
    const keys = Object.keys(details)
    if (keys.length === 0) {
      return false
    }

    let hasEmpty = false
    for (var key in details) {
      if (details[key].length === 0) {
        hasEmpty = true
      }
    }
    return hasEmpty
  }

  return (
    <Panel title={<><img src={declarativeIcon} /> Declarative Details</>} className="display">
      {showDownloadMessage() && <p className="intro">Click on the download button to decrypt the content. Your wallet will request to decrypt each piece of content.</p>}
      {isDownloadError && <DownloadErrorMessage keyError={isDownloadError} />}
      <table>
        <thead>
          <tr>
            <th className="type">Type</th>
            <th className="content">Content</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(details).map((key: string) => {
            return (
              <tr key={key}>
                <td>{key.replace('DD_', '')}</td>
                <td>
                  {details[key].length === 0 && (
                    <DecryptKey handleGetContent={() => handleGetContent(key)} disabled={isGettingContent.includes(key)} />
                  )}
                  {details[key].map((item: DataVaultContent) => (
                    <div className="content-row" key={item.id}>
                      <div className="content break-all">
                        <p>{item.content}</p>
                      </div>
                      <div className="options">
                        <button
                          disabled={isLoading}
                          className="icon edit"
                          onClick={() => { setIsError(null); setIsEditing({ key, item }) }}
                        >
                          <img src={pencilIcon} alt="Edit item" />
                        </button>
                        <DeleteDvContentButton itemKey={key} item={item} deleteValue={deleteValue} />
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>

      <EditValueModal
        show={isEditing !== null}
        onClose={() => setIsEditing(null)}
        onConfirm={(value: string) => isEditing && handleEditItem(value, isEditing)}
        disabled={isLoading}
        strings={{ title: 'Edit value in the DataVault', label: 'New value', submit: 'Update' }}
        className="edit-modal"
        initValue={isEditing ? isEditing.item.content : ''}
        inputType="textarea"
        error={isError}
      />
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
