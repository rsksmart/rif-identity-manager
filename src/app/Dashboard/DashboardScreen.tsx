import React from 'react'
import HeaderComponent from '../../components/Header/HeaderComponent'
import Navigation from '../../components/Navigation/Navigation'
import IdentityInformationComponent from './panels/IdentityInformation'
import { Authentication } from 'did-resolver'
import Balance from './panels/Balance'
import { Token } from '../state/reducers/tokens'

interface DashboardScreenInterface {
  chainId?: number | null
  address: string | null
  owner?: string | null
  delegates?: Authentication[]
  tokens?: Token[]
  changeOwner: (provider: any, newOwner: string) => any
  addDelegate: (provider: any, delegateAddr: string) => any
  addCustomToken: (provider: any, tokenAddr: string) => any
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({
  chainId, address, owner, delegates, tokens, changeOwner, addDelegate, addCustomToken
}) => {
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
        <div className="container">
          <div className="column">
            <Balance tokens={tokens} addCustomToken={addCustomToken} />
          </div>
          <div className="column">&nbsp;</div>
        </div>
      </div>
    </>
  )
}

export default DashboardScreen
