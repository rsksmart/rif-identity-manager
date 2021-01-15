import React, { useContext } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'
import { DataVaultKey } from '../state/reducers/datavault'
import { Web3ProviderContext } from '../../providerContext'
import CredentialDisplay from './panels/CredentialDisplay'
import DownloadBackup from './panels/DownloadBackup'

interface DataVaultComponentProps {
  declarativeDetails: DataVaultKey
  credentials: DataVaultKey
  addDeclarativeDetail: (client: DataVaultWebClient, key: string, content: string) => any
  deleteValue: (client: DataVaultWebClient, key: string, id: string) => any
  swapValue: (client: DataVaultWebClient, key: string, content: string, id: string) => any
  downloadBackup: (client: DataVaultWebClient) => any
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({
  addDeclarativeDetail, declarativeDetails, credentials, deleteValue, swapValue, downloadBackup
}) => {
  const context = useContext(Web3ProviderContext)

  const handleAdd = (key: string, content: string) =>
    context.dvClient && addDeclarativeDetail(context.dvClient, key, content)
  const handleDelete = (key: string, id: string) =>
    context.dvClient && deleteValue(context.dvClient, key, id)
  const handleSwap = (key: string, content: string, id: string) =>
    context.dvClient && swapValue(context.dvClient, key, content, id)
  const handleDownload = () => context.dvClient && downloadBackup(context.dvClient)

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
            deleteValue={handleDelete}
            swapValue={handleSwap}
          />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <CredentialDisplay
            credentials={credentials}
            deleteValue={handleDelete}
          />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DownloadBackup handleDownload={handleDownload} />
        </div>
        <div className="column"></div>
      </div>
    </div>
  )
}

export default DataVaultComponent
