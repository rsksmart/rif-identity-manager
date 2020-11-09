import React, { useContext } from 'react'
import '../assets/scss/_index.scss'
import { version } from '../../package.json'
import LoginScreen from './LoginScreen'
import DashboardScreen from './DashboardScreen'
import RifFooter from '../components/RifFooter/RifFooter'
import { Web3ProviderContext } from '../providerContext'
import RLogin from 'jesse-rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

const App = () => {
  const context = useContext(Web3ProviderContext)

  const handleLogin = () => {
    const rLogin = new RLogin({
      cachedProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0',
              30: 'https://public-node.rsk.co',
              31: 'https://public-node.testnet.rsk.co'
            }
          }
        }
      },
      supportedChains: [1, 30, 31]
    })
    rLogin.connect().then((provider: any) => context?.setProvider(provider))
      .catch((err: string) => console.log(err))
  }

  const handleLogOut = () => {
    context?.setProvider(null)
    localStorage.clear()
  }

  const isLoggedIn = context?.provider
  return (
    <div className={isLoggedIn ? 'app loggedin' : 'app login'}>
      {isLoggedIn
        ? <DashboardScreen handleLoginOut={handleLogOut} />
        : <LoginScreen handleLogin={handleLogin} />
      }
      <RifFooter isLoggedIn={isLoggedIn} version={version} />
    </div>
  )
}

export default App
