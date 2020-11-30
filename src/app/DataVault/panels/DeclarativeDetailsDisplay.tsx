import React from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import { DataVaultKey } from '../../state/reducers/datavault'

interface DeclarativeDetailsDisplayInterface {
  details?: DataVaultKey[]
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
          {details?.map((item: DataVaultKey) => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.content.map((content: string) => <p key={content}>{content}</p>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
