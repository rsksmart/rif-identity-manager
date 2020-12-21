import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import trashIcon from '../../../assets/images/icons/trash.svg'
import pencilIcon from '../../../assets/images/icons/pencil.svg'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import BinaryModal from '../../../components/Modal/BinaryModal'
import EditValueModal from '../../../components/Modal/EditValueModal'

interface DeclarativeDetailsDisplayInterface {
  deleteValue: (key: string, id: string) => Promise<any>
  swapValue: (key: string, content: string, id: string) => Promise<any>
  details: DataVaultKey
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, deleteValue, swapValue }) => {
  interface DeleteItemI { key: string; id: string }
  interface EditItemI { key: string; item: DataVaultContent }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const [isDeleting, setIsDeleting] = useState<null | DeleteItemI>(null)
  const [isEditing, setIsEditing] = useState<null | EditItemI>(null)

  const handleDeleteItem = (item: DeleteItemI) => {
    setIsLoading(true)
    setIsError(null)

    deleteValue(item.key, item.id)
      .then(() => setIsDeleting(null))
      .catch((err: Error) => setIsError(err.message))
      .finally(() => setIsLoading(false))
  }

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

  return (
    <Panel title={<><img src={declarativeIcon} /> Declarative Details</>} className="display">
      <table>
        <thead>
          <tr>
            <th className="type">Type</th>
            <th className="content">Content</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(details).map((key: string) => {
            if (details[key].length !== 0) {
              return (
                <tr key={key}>
                  <td>{key.replace('DD_', '')}</td>
                  <td>
                    {details[key].map((item: DataVaultContent) => (
                      <div className="content-row" key={item.id}>
                        <div className="content">
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
                          <button
                            disabled={isLoading}
                            className="icon delete"
                            onClick={() => setIsDeleting({ key, id: item.id })}>
                            <img src={trashIcon} alt="Delete Item" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              )
            }
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

      <BinaryModal
        show={isDeleting !== null}
        onClose={() => setIsDeleting(null)}
        onConfirm={() => isDeleting && handleDeleteItem(isDeleting)}
        disabled={isLoading}
        strings={{ text: 'Do you want to delete this item from the data vault?', confirm: 'Yes', deny: 'No' }}
        className="delete-modal"
      />
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
