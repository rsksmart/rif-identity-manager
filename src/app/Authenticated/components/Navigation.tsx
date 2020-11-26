/* eslint-disable no-unused-vars */
import React from 'react'

export enum screens {
  DASHBOARD = 'dashboard',
  DATAVAULT = 'datavault'
}

interface NavigationInterface {
  selected: string
  handleClick: (screen: screens) => void
}

const Navigation: React.FC<NavigationInterface> = ({ selected, handleClick }) => (
  <div className="container">
    <div className="column">
      <ul className="navigation">
        <li className={selected === screens.DASHBOARD ? 'active' : ''}>
          <button onClick={() => handleClick(screens.DASHBOARD)}>Dashboard</button>
        </li>
        <li className={selected === screens.DATAVAULT ? 'active' : ''}>
          <button onClick={() => handleClick(screens.DATAVAULT)}>Data Vault</button>
        </li>
        <li>Request Credentials</li>
        <li>My Dapps</li>
      </ul>
    </div>
  </div>
)

export default Navigation
