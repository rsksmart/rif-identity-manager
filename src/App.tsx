import React from 'react'
import './assets/scss/_index.scss'
import logo from './assets/images/rif-id-manager.svg'
import powered from './assets/images/powered-by-iov.svg'
import { version } from '../package.json'

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="RIF identity Manager" />
      </header>
      <div className="app-content">
        <p style={{ textAlign: 'center' }}>Hello RIF!</p>
      </div>
      <footer className="app-footer">
        <img src={powered} alt="Powered By IOV" />
        <p>Copyright &copy; 2020 IOV Labs. All rights reserved.</p>
        <p>Version {version}</p>
      </footer>
    </div>
  )
}

export default App
