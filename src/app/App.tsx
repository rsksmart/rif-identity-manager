import React, { useState } from 'react'
import '../assets/scss/_index.scss'
import powered from '../assets/images/powered-by-iov.svg'
import poweredGray from '../assets/images/powered-by-iov-gray.svg'
import { version } from '../../package.json'
import { BaseButton } from '../components/Buttons'
import LoginScreen from './LoginScreen'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className={isLoggedIn ? 'app' : 'app login'}>
      {!isLoggedIn && <LoginScreen handleLogin={() => { setIsLoggedIn(true) }} />}
      {isLoggedIn && (
        <div className="logout" style={{ textAlign: 'center', marginTop: 100 }}>
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
