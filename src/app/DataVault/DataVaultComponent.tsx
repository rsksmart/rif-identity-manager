import React from 'react'
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'
import { DataVaultKey } from '../state/reducers/datavault'

interface DataVaultComponentProps {
  declarativeDetails: DataVaultKey[]
  addDeclarativeDetail: (client: DataVaultWebClient, key: string, content: string) => any
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({ addDeclarativeDetail, declarativeDetails }) => {
  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails addDeclarativeDetail={addDeclarativeDetail} />
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
