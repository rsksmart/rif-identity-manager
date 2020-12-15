import { PublicKey, ServiceEndpoint } from 'did-resolver'
import React, { useContext } from 'react'
import DelegateComponent from './components/DelegateComponent'
import OwnerComponent from './components/OwnerComponent'
import { Web3ProviderContext } from '../../providerContext'
import PublicKeys from './components/PublicKeys'
import ServiceEndPoints from './components/ServiceEndPoints'

interface IdentityComponentInterface {
  owner?: string | null
  address: string
  chainId?: number | null
  delegates?: PublicKey[]
  service?: ServiceEndpoint[]
  publicKeys?: PublicKey[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
  addAttribute: (provider: any, type: string, value: string, validity: number) => any
}

const IdentityComponent: React.FC<IdentityComponentInterface> = ({
  owner, address, chainId, delegates, service, publicKeys, changeOwner, addDelegate, addAttribute
}) => {
  const isOwner = address?.toLowerCase() === owner?.toLowerCase()
  const context = useContext(Web3ProviderContext)

  const handleChangeOwner = (newOwner: string) => changeOwner(context?.provider, newOwner)
  const handleAddDelegate = (delegate: string) => addDelegate(context?.provider, delegate)
  const handleAddAttribute = (type: string, value: string, validity: number) =>
    addAttribute(context?.provider, type, value, validity)

  return (
    <div className="content identity">
      <div className="container">
        <div className="column">
          <OwnerComponent owner={owner} chainId={chainId} isOwner={isOwner} changeOwner={handleChangeOwner} />
        </div>
        <div className="column">
          <DelegateComponent delegates={delegates} chainId={chainId} addDelegate={handleAddDelegate} isOwner={isOwner} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <PublicKeys publicKeys={publicKeys} addKey={handleAddAttribute} isOwner={isOwner} />
        </div>
        <div className="column">
          <ServiceEndPoints endpoints={service} addEndpoint={handleAddAttribute} isOwner={isOwner} />
        </div>
      </div>
    </div>
  )
}

export default IdentityComponent
