import React from 'react'
import CredentialView from '../../../components/CredentialView/CredentialView'
import Panel from '../../../components/Panel/Panel'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import CredentialIcon from '../../../assets/images/icons/credential.svg'
import DeleteDvContentButton from '../components/DeleteDvContentButton'

interface CredentialDisplayInterface {
  credentials: DataVaultKey
  deleteValue: (key: string, id: string) => Promise<any>
}

const CredentialDisplay: React.FC<CredentialDisplayInterface> = ({ credentials, deleteValue }) => {
  return (
    <Panel title={<><img src={CredentialIcon} /> Credentials</>} className="display credentials">
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
                          options={<DeleteDvContentButton item={item} itemKey={key} deleteValue={deleteValue} />}
                        />
                      </li>)}
                  </ul>
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
