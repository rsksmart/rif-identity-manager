import React, { useState } from 'react'
import '../assets/scss/_index.scss'
import { version } from '../../package.json'
import LoginScreen from './LoginScreen'
import DashboardScreen from './DashboardScreen'
import RifFooter from '../components/RifFooter/RifFooter'
import { Web3ProviderElement } from '../providerContext'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    setIsLoggedIn(false)
    localStorage.clear() // for development
  }

  return (
    <Web3ProviderElement>
      <div className={isLoggedIn ? 'app loggedin' : 'app login'}>
        {isLoggedIn
          ? <DashboardScreen handleLoginOut={handleLogOut} />
          : <LoginScreen handleLogin={handleLogin} />
        }
        <RifFooter isLoggedIn={isLoggedIn} version={version} />
      </div>
    </Web3ProviderElement>
  )
}

export default App
