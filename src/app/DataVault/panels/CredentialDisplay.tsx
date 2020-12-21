import React from 'react'
import CredentialViewInterface from '../../../components/CredentialView/CredentialView'
import Panel from '../../../components/Panel/Panel'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'
import CredentialIcon from '../../../assets/images/icons/credential.svg'

interface CredentialDisplayInterface {
  credentials: DataVaultKey
}

const CredentialDisplay: React.FC<CredentialDisplayInterface> = ({ credentials }) => {
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
                      <li key={item.id}><CredentialViewInterface jwt={item.content} /></li>)}
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
