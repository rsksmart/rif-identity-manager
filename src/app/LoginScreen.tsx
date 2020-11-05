import React from 'react'
import { BaseButton } from '../components/Buttons'
import logo from '../assets/images/rif-id-manager.svg'

interface LoginScreenInterface {
  handleLogin: () => void
}

const LoginScreen: React.FC<LoginScreenInterface> = ({ handleLogin }) => (
  <div className="login-screen">
    <img src={logo} alt="RIF identity Manager" />
    <h1>Sign in</h1>
    <BaseButton className="blue" onClick={handleLogin}>Connect your wallet</BaseButton>
    <p>
      {'Don\'t have a wallet? '}
      <a href="#" target="_blank" rel="noopener noreferrer">Download here</a>
    </p>
  </div>
)

export default LoginScreen
