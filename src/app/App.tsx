import React, { useState } from 'react'
import '../assets/scss/_index.scss'
import powered from '../assets/images/powered-by-iov.svg'
import poweredGray from '../assets/images/powered-by-iov-gray.svg'
import rifIdManager from '../assets/images/rif-id-manager-gray.svg'
import { version } from '../../package.json'
import { BaseButton } from '../components/Buttons'
import LoginScreen from './LoginScreen'
import NetworkStatus from '../components/NetworkStatus/NetworkStatus'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className={isLoggedIn ? 'app loggedin' : 'app login'}>
      {!isLoggedIn && <LoginScreen handleLogin={() => { setIsLoggedIn(true) }} />}
      {isLoggedIn && (
        <>
          <header className="container">
            <div className="column branding">
              <img src={rifIdManager} alt="RIF Id Manager" />
            </div>
            <div className="column network">
              <NetworkStatus connected name="RSK Mainnet" />
            </div>
          </header>
          <div className="container content">
            <div className="column" style={{ textAlign: 'center' }}>
              <BaseButton className="blue" onClick={() => setIsLoggedIn(false)}>Log Out</BaseButton>
            </div>
          </div>
        </>
      )}
      <footer className="app-footer">
        <img src={isLoggedIn ? poweredGray : powered} alt="Powered By IOV" />
        <p>Copyright &copy; 2020 IOV Labs. All rights reserved.</p>
        <p>Version {version}</p>
      </footer>
    </div>
  )
}

export default App
