import React, { useContext } from 'react'
import { BaseButton } from '../components/Buttons'
import Header from '../components/Header/Header'
import { Context } from '../providerContext'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  const context = useContext(Context)
  return (
    <>
      <Header />
      <div className="container content">
        <div className="column" style={{ textAlign: 'center' }}>
          <p>Context: {context?.name}</p>
          <BaseButton className="blue" onClick={handleLoginOut}>Log Out</BaseButton>
        </div>
      </div>
    </>
  )
}

export default DashboardScreen
