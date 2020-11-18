import React from 'react'
import HeaderComponent from '../../components/Header/HeaderComponent'
import Navigation from '../../components/Navigation/Navigation'
import IdentityInformationComponent from './components/IdentityInformation'
import { Authentication } from 'did-resolver'

interface DashboardScreenInterface {
  chainId?: number | null
  address: string | null
  owner?: string | null
  delegates?: Authentication[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ chainId, address, owner, delegates, changeOwner, addDelegate }) => {
  return (
    <>
      <HeaderComponent chainId={chainId} did={address} />
      <div className="content dashboard">
        <Navigation />
        <IdentityInformationComponent
          address={address}
          chainId={chainId}
          owner={owner}
          delegates={delegates}
          changeOwner={changeOwner}
          addDelegate={addDelegate}
        />
      </div>
    </>
  )
}

export default DashboardScreen
