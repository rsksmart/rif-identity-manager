import { Authentication } from 'did-resolver'
import React from 'react'
import DelegateComponent from './components/DelegateComponent'
import OwnerComponent from './components/OwnerComponent'

interface IdentityComponentInterface {
  owner?: string | null
  address: string
  delegates?: Authentication[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
}

const IdentityComponent: React.FC<IdentityComponentInterface> = ({ owner, address, delegates, changeOwner, addDelegate }) => {
  const isOwner = address?.toLowerCase() === owner?.toLowerCase()

  return (
    <div className="content identity">
      <div className="container">
        <div className="column">
          <OwnerComponent owner={owner} isOwner={isOwner} changeOwner={changeOwner} />
        </div>
        <div className="column">
          <DelegateComponent delegates={delegates} addDelegate={addDelegate} isOwner={isOwner} />
        </div>
      </div>
    </div>
  )
}

export default IdentityComponent
