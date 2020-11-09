import React, { useContext, useState } from 'react'
import rifIdManager from '../../assets/images/rif-id-manager-gray.svg'
import NetworkStatus from '../NetworkStatus/NetworkStatus'
import { Web3ProviderContext } from '../../providerContext'
import { getAccounts, getNetwork } from '../../helpers'

const Header = () => {
  const [persona, setPersona] = useState<string>('')
  const [chainId, setChainId] = useState<number>(30)

  const context = useContext(Web3ProviderContext)
  getAccounts(context?.provider).then((accounts: string[]) => { setPersona(accounts[0]) })
  getNetwork(context?.provider).then((res: number) => { setChainId(res) })

  return (
    <header className="container">
      <div className="column branding">
        <img src={rifIdManager} alt="RIF Id Manager" />
        <span>{persona}</span>
      </div>
      <div className="column network">
        <NetworkStatus connected chainId={chainId} />
      </div>
    </header>
  )
}

export default Header
