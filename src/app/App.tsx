import React, { useContext } from 'react'
import '../assets/scss/_index.scss'
import { version } from '../../package.json'
import LoginScreenContainer from './Login/LoginScreenContainer'
import DashboardScreen from './Dashboard/DashboardScreen'
import RifFooter from '../components/RifFooter/RifFooter'
import { Web3ProviderContext } from '../providerContext'

const App = () => {
  const context = useContext(Web3ProviderContext)
  const handleLogOut = () => {
    context?.setProvider(null)
    localStorage.clear()
  }

  const isLoggedIn = context?.provider
  return (
    <div className={isLoggedIn ? 'app loggedin' : 'app login'}>
      {isLoggedIn
        ? <DashboardScreen handleLoginOut={handleLogOut} />
        : <LoginScreenContainer context={context} />
      }
      <RifFooter isLoggedIn={isLoggedIn} version={version} />
    </div>
  )
}

export default App
