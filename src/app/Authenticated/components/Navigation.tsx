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
}

const Navigation: React.FC<NavigationInterface> = ({ selected, showDataVault, handleClick }) => (
  <div className="container">
    <div className="column">
      <ul className="navigation">
        <li className={selected === screens.DASHBOARD ? 'active' : ''}>
          <button onClick={() => handleClick(screens.DASHBOARD)}>Dashboard</button>
        </li>
        <li className={selected === screens.DEFI ? 'active' : ''}>
          <button onClick={() => handleClick(screens.DEFI)}>DeFi Assets</button>
        </li>
        {showDataVault && (
          <li className={selected === screens.DATAVAULT ? 'active' : ''}>
            <button onClick={() => handleClick(screens.DATAVAULT)}>Data Vault</button>
          </li>
        )}
        <li className={selected === screens.IDENTITY ? 'active' : ''}>
          <button onClick={() => handleClick(screens.IDENTITY)}>Manage Identity</button>
        </li>
        <li className="disabled">Request Credentials</li>
        <li className="disabled">My Dapps</li>
      </ul>
    </div>
  </div>
)

export default Navigation
