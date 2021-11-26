import React, { useContext } from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'
import { DataVaultKey } from '../state/reducers/datavault'
import { Web3ProviderContext } from '../../providerContext'
import AddCredential from './panels/AddCredential'
import CredentialDisplay from './panels/CredentialDisplay'
import DownloadBackup from './panels/DownloadBackup'
import { createPresentation, requestVerification, verifyCode } from '../../features/credentials'
import { createDidFormat } from '../../formatters'

interface DataVaultComponentProps {
  declarativeDetails: DataVaultKey
  credentials: DataVaultKey
  address: string
  chainId: number
  addDataVaultContent: (client: DataVaultWebClient, key: string, content: string) => any
  deleteValue: (client: DataVaultWebClient, key: string, id: string) => any
  swapValue: (client: DataVaultWebClient, key: string, content: string, id: string) => any
  downloadBackup: (client: DataVaultWebClient) => any
  getKeyContent: (client: DataVaultWebClient, key: string) => any
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({
  addDataVaultContent, declarativeDetails, credentials, address, chainId, deleteValue, swapValue, downloadBackup, getKeyContent
}) => {
  const context = useContext(Web3ProviderContext)
  const dvClient = context.dvClient

  if (!dvClient) {
    return (
      <div className="content data-vault">
        <h2>Could not connect to the DataVault</h2>
        <p>Your wallet may be asking for permission.</p>
      </div>
    )
  }

  const handleAdd = (key: string, content: string) => addDataVaultContent(dvClient, key, content)
  const handleDelete = (key: string, id: string) => deleteValue(dvClient, key, id)
  const handleSwap = (key: string, content: string, id: string) => swapValue(dvClient, key, content, id)
  const handleDownload = () => context.dvClient && downloadBackup(dvClient)
  const handleGetKeyContent = (key: string) => getKeyContent(dvClient, key)
  const requestCredential = (credentialType: string, userInput: string) =>
    requestVerification(createDidFormat(address, chainId), credentialType, userInput)
  const verifyRequestCode = (code: string, credentialType: string) =>
    verifyCode(context.provider, code, address, createDidFormat(address, chainId), credentialType)

  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails
            addDeclarativeDetail={handleAdd}
          />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DeclarativeDetailsDisplay
            details={declarativeDetails}
            deleteValue={handleDelete}
            swapValue={handleSwap}
            getKeyContent={handleGetKeyContent}
          />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <AddCredential
            address={address}
            chainId={chainId}
            addVerifiedCredentials={handleAdd}
            requestVerification={requestCredential}
            verifyCode={verifyRequestCode}
          />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <CredentialDisplay
            credentials={credentials}
            deleteValue={handleDelete}
            getKeyContent={handleGetKeyContent}
            createPresentation={(jwt: string) => createPresentation(context.provider, jwt)}
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
