import React, { useEffect } from 'react'
import { BaseButton } from '../../components/Buttons'
import logo from '../../assets/images/rif-id-manager.svg'

interface LoginScreenInterface {
  handleLogin: () => void
}

const LoginScreenComponent: React.FC<LoginScreenInterface> = ({ handleLogin }) => {
  useEffect(() => {
    if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      handleLogin()
    }
  }, [])

  return (
    <div className="container login-screen">
      <div className="column">
        <img src={logo} alt="RIF identity Manager" />
        <h1>Sign in</h1>
        <BaseButton className="blue" onClick={handleLogin}>Connect your wallet</BaseButton>
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

export default LoginScreenComponent
