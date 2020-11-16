import React from 'react'
import { truncateAddressDid } from '../../helpers'

interface OwnerComponentInterface {
  owner?: string | null
  // setOwner?: null
}

const OwnerComponent: React.FC<OwnerComponentInterface> = ({ owner }) => {
  return (
    <div className="column">
      <h2>Owner</h2>
      <p className="value">{owner ? truncateAddressDid(owner) : 'loading...'}</p>
    </div>
  )
}

export default OwnerComponent
