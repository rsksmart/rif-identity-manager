import React from 'react'
import { BaseButton } from '../components/Buttons'
import Header from '../components/Header/Header'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  return (
    <>
      <Header />
      <div className="container content">
        <div className="column" style={{ textAlign: 'center' }}>
          <BaseButton className="blue" onClick={handleLoginOut}>Log Out</BaseButton>
        </div>
      </div>
    </>
  )
}

export default DashboardScreen
