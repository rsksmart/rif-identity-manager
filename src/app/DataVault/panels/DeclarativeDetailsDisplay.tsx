import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import trashIcon from '../../../assets/images/icons/trash.svg'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import BinaryModal from '../../../components/Modal/BinaryModal'

interface DeclarativeDetailsDisplayInterface {
  deleteValue: (key: string, id: string) => Promise<any>
  details: DataVaultKey
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, deleteValue }) => {
  interface DeleteItemI { key: string; id: string }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<null | DeleteItemI>(null)

  const handleDeleteItem = async (item: DeleteItemI) => {
    setIsLoading(true)
    deleteValue(item.key, item.id)
      .then(() => {
        setIsDeleting(null)
        setIsLoading(false)
      })
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
                  <td>{key}</td>
                  <td>
                    {details[key].map((item: DataVaultContent) => (
                      <div className="content-row" key={item.id}>
                        <div className="content">
                          <p>{item.content}</p>
                        </div>
                        <div className="options">
                          <button
                            disabled={isLoading}
                            className="icon"
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
