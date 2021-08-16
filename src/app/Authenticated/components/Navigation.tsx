/* eslint-disable no-unused-vars */
import React from 'react'

export enum screens {
  DASHBOARD = 'dashboard',
  DATAVAULT = 'datavault',
  IDENTITY = 'identity',
  DEFI = 'defi'
}

interface NavigationInterface {
  selected: string
  handleClick: (screen: screens) => void
  showDataVault?: boolean
  logout: () => void
}

const Navigation: React.FC<NavigationInterface> = ({ selected, showDataVault, handleClick, logout }) => (
  <div className="container">
    <div className="column">
      <ul className="navigation">
        <li className={selected === screens.DASHBOARD ? 'dashboard active' : 'dashboard'}>
          <button onClick={() => handleClick(screens.DASHBOARD)}>Dashboard</button>
        </li>
        <li className={selected === screens.DEFI ? 'defi active' : 'defi'}>
          <button onClick={() => handleClick(screens.DEFI)}>DeFi Assets</button>
        </li>
        {showDataVault && (
          <li className={selected === screens.DATAVAULT ? 'datavault active' : 'datavault'}>
            <button onClick={() => handleClick(screens.DATAVAULT)}>Data Vault</button>
          </li>
        )}
        <li className={selected === screens.IDENTITY ? 'active' : ''}>
          <button onClick={() => handleClick(screens.IDENTITY)}>Manage Identity</button>
        </li>
        <li className="disabled">My Dapps</li>
        <li className="logout"><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  </div>
)

export default Navigation
