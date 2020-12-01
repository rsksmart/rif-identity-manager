import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'

interface DeclarativeDetailsDisplayInterface {
  details: DataVaultKey
  deleteValue: (key: string, id: string) => Promise<any> | null
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, deleteValue }) => {
  const title = <><img src={declarativeIcon} /> Declarative Details</>
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteItem = async (key: string, id: string) => {
    setIsLoading(true)
    const result = await deleteValue(key, id)
    if (result) {
      setIsLoading(false)
    }
  }

  return (
    <Panel title={title} className="display">
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
                          <button disabled={isLoading} className="icon" onClick={() => handleDeleteItem(key, item.id)}>
                        delete
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
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
