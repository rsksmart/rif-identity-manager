import React, { useState } from 'react'
import CredentialView from '../../../components/CredentialView/CredentialView'
import Panel from '../../../components/Panel/Panel'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import CredentialIcon from '../../../assets/images/icons/credential.svg'
import DecryptKey from '../components/DecryptKey'
import DeleteDvContentButton from '../components/DeleteDvContentButton'
import PresentCredential from '../components/PresentCredential'
import DownloadErrorMessage from '../components/DownloadErrorMessage'

interface CredentialDisplayInterface {
  credentials: DataVaultKey
  getKeyContent: (key: string) => Promise<any>
  deleteValue: (key: string, id: string) => Promise<any>
  createPresentation: (jwt: string) => Promise<any>
}

const CredentialDisplay: React.FC<CredentialDisplayInterface> = ({ credentials, getKeyContent, deleteValue, createPresentation }) => {
  const [isGettingContent, setIsGettingContent] = useState<string[]>([])
  const [isDownloadError, setIsDownloadError] = useState<null | string>(null)
  const handleGetContent = (key: string) => {
    setIsGettingContent([...isGettingContent, key])
    setIsDownloadError(null)
    getKeyContent(key)
      .catch(() => setIsDownloadError(key))
      .finally(() => setIsGettingContent(isGettingContent.filter((k: string) => k !== key)))
  }

  return (
    <Panel title={<><img src={CredentialIcon} /> Credentials</>} className="display credentials" >
      {isDownloadError && <DownloadErrorMessage keyError={isDownloadError} />}
      <table>
        <thead>
          <tr>
            <th className="type">Type</th>
            <th className="content">Content</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(credentials).map((key: string) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <ul>
                    {credentials[key].map((item: DataVaultContent) =>
                      <li key={item.id}>
                        <CredentialView
                          jwt={item.content}
                          options={<>
                            <div><PresentCredential jwt={item.content} createPresentation={createPresentation} /></div>
                            <div><DeleteDvContentButton item={item} itemKey={key} deleteValue={deleteValue} /></div>
                          </>}
                        />
                      </li>)}
                  </ul>
                  {credentials[key].length === 0 && (
                    <DecryptKey handleGetContent={() => handleGetContent(key)} disabled={isGettingContent.includes(key)} />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Panel>
  )
}

export default CredentialDisplay
