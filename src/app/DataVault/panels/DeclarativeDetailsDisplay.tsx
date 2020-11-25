import React from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'

export interface DeclarativeDetailInterface {
  key: string;
  type: string;
  content: string;
}

interface DeclarativeDetailsDisplayInterface {
  details?: DeclarativeDetailInterface[]
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
          {details?.map((item: DeclarativeDetailInterface) => (
            <tr key={item.key}>
              <td>{item.type}</td>
              <td>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
