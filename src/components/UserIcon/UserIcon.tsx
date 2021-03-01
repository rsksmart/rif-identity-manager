import React from 'react'
import Identicon from 'identicon.js'

interface UserIconInterface {
  value: string
  size?: number
}

const UserIcon: React.FC<UserIconInterface> = ({ value, size }) => {
  const options = {
    format: 'svg',
    background: [71, 196, 225, 255],
    margin: '.22',
    saturation: '.8'
  }

  const circle = {
    display: 'inline-block',
    background: '#FFFFFF',
    border: '2px solid #919191',
    padding: '2px',
    margin: '0',
    height: `${size || 50}px`,
    width: `${size || 50}px`,
    borderRadius: '50%'
  }

  return (
    <img
      src={`data:image/svg+xml;base64,${new Identicon(value, options).toString()}`}
      alt={value}
      className="user-icon"
      style={circle}
    />
  )
}

export default UserIcon
