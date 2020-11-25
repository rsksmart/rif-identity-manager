import React from 'react'
import HeaderComponent from '../../components/Header/HeaderComponent'
import Navigation from '../../components/Navigation/Navigation'
import DashboardContainer from '../Dashboard/DashboardContainer'

interface RoutesProps {
  chainId: number | null
  address: string | null
}

const Routes: React.FC<RoutesProps> = ({ chainId, address }) => {
  return (
    <>
      <HeaderComponent chainId={chainId} did={address} />
      <Navigation />
      <DashboardContainer />
    </>
  )
}

export default Routes
