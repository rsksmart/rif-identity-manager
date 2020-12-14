import { Authentication } from 'did-resolver'
import React, { useContext } from 'react'
import DelegateComponent from './components/DelegateComponent'
import OwnerComponent from './components/OwnerComponent'
import { Web3ProviderContext } from '../../providerContext'

interface IdentityComponentInterface {
  owner?: string | null
  address: string
  chainId?: number | null
  delegates?: Authentication[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
}

const IdentityComponent: React.FC<IdentityComponentInterface> = ({ owner, address, chainId, delegates, changeOwner, addDelegate }) => {
  const isOwner = address?.toLowerCase() === owner?.toLowerCase()
  const context = useContext(Web3ProviderContext)

  const handleChangeOwner = (newOwner: string) => changeOwner(context?.provider, newOwner)

  return (
    <div className="content identity">
      <div className="container">
        <div className="column">
          <OwnerComponent owner={owner} chainId={chainId} isOwner={isOwner} changeOwner={handleChangeOwner} />
        </div>
        <div className="column">
          <DelegateComponent delegates={delegates} addDelegate={addDelegate} isOwner={isOwner} />
        </div>
      </div>
    </div>
  )
}

export default IdentityComponent
