import React, { useState } from 'react'
import '../assets/scss/_index.scss'
import { version } from '../../package.json'
import LoginScreen from './LoginScreen'
import DashboardScreen from './DashboardScreen'
import RifFooter from '../components/RifFooter/RifFooter'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className={isLoggedIn ? 'app loggedin' : 'app login'}>
      {isLoggedIn
        ? <DashboardScreen handleLoginOut={() => setIsLoggedIn(false)} />
        : <LoginScreen handleLogin={() => { setIsLoggedIn(true) }} />
      }
      <RifFooter isLoggedIn={isLoggedIn} version={version} />
    </div>
  )
}

export default App
