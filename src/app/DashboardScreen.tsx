import React, { useContext } from 'react'
import { BaseButton } from '../components/Buttons'
import Header from '../components/Header/Header'
import { Web3ProviderContext } from '../providerContext'

interface DashboardScreenInterface {
  handleLoginOut: () => void
}

const DashboardScreen: React.FC<DashboardScreenInterface> = ({ handleLoginOut }) => {
  const context = useContext(Web3ProviderContext)
  console.log('the provider ;-)', context?.provider)
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
