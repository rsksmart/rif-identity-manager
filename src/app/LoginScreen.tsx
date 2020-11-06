import React, { useState } from 'react'
import { BaseButton } from '../components/Buttons'
import logo from '../assets/images/rif-id-manager.svg'
import RLogin from 'jesse-rlogin'
import Alert from '../components/Alert/Alert'

interface LoginScreenInterface {
  handleLogin: () => void
}

const LoginScreen: React.FC<LoginScreenInterface> = ({ handleLogin }) => {
  const [isError, setIsError] = useState<string | null>(null)

  const handleConnect = () => {
    setIsError(null)
    const rLogin = new RLogin({
      cachedProvider: false,
      providerOptions: {},
      supportedChains: [30, 31]
    })

    console.log('connecting', rLogin)
    rLogin.connect().then((provider: any) => {
      console.log('provider', provider)
      handleLogin()
    }).catch((err: string) => {
      setIsError(err)
    })
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
        {isError && <Alert title="Error" description={isError} />}
      </div>
    </div>
  )
}

export default LoginScreen
