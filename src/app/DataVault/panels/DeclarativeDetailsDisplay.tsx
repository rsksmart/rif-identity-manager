import React from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import { DataVaultContent, DataVaultKey } from '../../state/reducers/datavault'

interface DeclarativeDetailsDisplayInterface {
  details: DataVaultKey
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details }) => {
  const title = <><img src={declarativeIcon} /> Declarative Details</>
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
          { Object.keys(details).map((key: string) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {details[key].map((item: DataVaultContent) => <p key={item.id}>{item.content}</p>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
