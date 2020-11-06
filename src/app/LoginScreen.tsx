import React from 'react'
import { BaseButton } from '../components/Buttons'
import logo from '../assets/images/rif-id-manager.svg'
import RLogin from 'jesse-rlogin'

interface LoginScreenInterface {
  handleLogin: () => void
}

const LoginScreen: React.FC<LoginScreenInterface> = ({ handleLogin }) => {
  const handleConnect = () => {
    console.log('handling connect!')
    const rLogin = new RLogin({
      cachedProvider: false,
      providerOptions: {},
      supportedChains: [30, 31]
    })
    console.log('rLogin', rLogin)
    rLogin.connect().then((provider: any) => {
      console.log('Provider!', provider)
      handleLogin()
    })
  }

  return (
    <div className="login-screen">
      <img src={logo} alt="RIF identity Manager" />
      <h1>Sign in</h1>
      <BaseButton className="blue" onClick={handleConnect}>Connect your wallet</BaseButton>
      <p>
        {'Don\'t have a wallet? '}
        <a href="#" target="_blank" rel="noopener noreferrer">Download here</a>
      </p>
    </div>
  )
}

export default LoginScreen
