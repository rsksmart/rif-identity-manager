import React from 'react'
import DeclarativeDetailsDisplay from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'

interface DataVaultComponentProps {
  addDeclarativeDetail: (key: string, content: string) => Promise<any>
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({ addDeclarativeDetail }) => {
  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails submitData={addDeclarativeDetail} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DeclarativeDetailsDisplay />
        </div>
      </div>
    </div>
  )
}

export default DataVaultComponent
