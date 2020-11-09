import React from 'react'
import { BaseButton } from '../components/Buttons'
import logo from '../assets/images/rif-id-manager.svg'
import RLogin from 'jesse-rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

interface LoginScreenInterface {
  handleLogin: (provider: any) => void
}

const LoginScreen: React.FC<LoginScreenInterface> = ({ handleLogin }) => {
  const handleConnect = () => {
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

    rLogin.connect().then((provider: any) => handleLogin(provider))
      .catch((err: string) => console.log(err))
  }

  return (
    <div className="container login-screen">
      <div className="column">
        <img src={logo} alt="RIF identity Manager" />
        <h1>Sign in</h1>
        <BaseButton className="blue" onClick={handleConnect}>Connect your wallet</BaseButton>
        <p>
          {'Don\'t have a wallet? '}
          <a href="https://developers.rsk.co/wallet/use/" target="_blank" rel="noopener noreferrer">
            Download here
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
