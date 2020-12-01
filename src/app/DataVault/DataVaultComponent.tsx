import React, { useContext } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'
import { DataVaultKey } from '../state/reducers/datavault'
import { Web3ProviderContext } from '../../providerContext'

interface DataVaultComponentProps {
  declarativeDetails: DataVaultKey
  addDeclarativeDetail: (client: DataVaultWebClient, key: string, content: string) => any
  deleteValue: (client: DataVaultWebClient, key: string, id: string) => any
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({ addDeclarativeDetail, declarativeDetails, deleteValue }) => {
  const context = useContext(Web3ProviderContext)

  const handleAdd = (key: string, content: string) =>
    context.dvClient && addDeclarativeDetail(context.dvClient, key, content)
  const handleDelete = (key: string, id: string) =>
    context.dvClient && addDeclarativeDetail(context.dvClient, key, id)

  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails addDeclarativeDetail={handleAdd} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DeclarativeDetailsDisplay
            details={declarativeDetails}
            deleteValue={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default DataVaultComponent
