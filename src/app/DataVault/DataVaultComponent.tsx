import React from 'react'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'
import { DataVaultKey } from '../state/reducers/datavault'

interface DataVaultComponentProps {
  declarativeDetails: DataVaultKey[]
  addDeclarativeDetail: (key: string, content: string) => Promise<any>
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({ addDeclarativeDetail, declarativeDetails }) => {
  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails submitData={addDeclarativeDetail} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DeclarativeDetailsDisplay details={declarativeDetails} />
        </div>
      </div>
    </div>
  )
}

export default DataVaultComponent
