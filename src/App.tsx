import React, { useState } from 'react'
import './assets/scss/_index.scss'
import logo from './assets/images/rif-id-manager.svg'
import powered from './assets/images/powered-by-iov.svg'
import poweredGray from './assets/images/powered-by-iov-gray.svg'
import { version } from '../package.json'
import { BaseButton } from './components/Buttons'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className={isLoggedIn ? 'app' : 'app login'}>
      {!isLoggedIn && (
        <div className="login-screen">
          <header>
            <img src={logo} alt="RIF identity Manager" />
          </header>
          <h1>Sign in</h1>
          <BaseButton className="blue" onClick={() => setIsLoggedIn(true)}>Connect your wallet</BaseButton>
          <p>
            {'Don\'t have a wallet? '}
            <a href="#" target="_blank" rel="noopener noreferrer">Download here</a>
          </p>
        </div>
      )}
      {isLoggedIn && (
        <div className="something" style={{ textAlign: 'center', marginTop: 100 }}>
          <BaseButton className="blue" onClick={() => setIsLoggedIn(false)}>Log Out</BaseButton>
        </div>
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
