import React from 'react'
import powered from '../../assets/images/powered-by-iov.svg'
import poweredGray from '../../assets/images/powered-by-iov-gray.svg'

interface RifFooterInterface {
  isLoggedIn: boolean
  version: string
}

const RifFooter: React.FC<RifFooterInterface> = ({ isLoggedIn, version }) => (
  <footer className="app-footer">
    <img src={isLoggedIn ? poweredGray : powered} alt="Powered By IOV" />
    <p>Copyright &copy; 2021 IOV Labs. All rights reserved.</p>
    <p>Version {version}</p>
  </footer>
)

export default RifFooter
