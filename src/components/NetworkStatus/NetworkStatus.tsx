import React from 'react'
import styled from 'styled-components'

const NetworkStatusWrapper = styled.span`
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 25px;
  padding:6px 18px !important;
  color: #6C6B6C;
  opacity: 1 !important;
  border: 1px solid #CCCACD;
  width: auto;
`

// eslint-disable-next-line no-undef
const NetworkLight = styled.div<{connected: boolean}>`
  position: relative;
  margin-left: 8px;
  padding-left: 3px;
  &:before {
    position: absolute;
    right: 98%;
    top: 45%;
    transform: translate(-5px, -50%);
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ connected }) => (connected ? '#40d512' : '#DC3545')};
  }
`

export interface NetworkStatusInterface {
  connected: boolean;
  name?: string;
  chainId?: number;
}

export const chainIdToName = (chainId: number) => {
  switch (chainId) {
    case 1: return 'Ethereum'
    case 3: return 'Ropsten Testnet'
    case 42: return 'Kovan Testnet'
    case 30: return 'RSK Mainnet'
    case 31: return 'RSK Testnet'
    default: return `Network Id ${chainId.toString()}`
  }
}

const NetworkStatus: React.FC<NetworkStatusInterface> = ({ connected, name, chainId }) => {
  return (
    <NetworkStatusWrapper className={connected ? 'connected' : 'disconnected'}>
      <NetworkLight connected={connected}>
        {chainId ? chainIdToName(chainId) : name}
      </NetworkLight>
    </NetworkStatusWrapper>
  )
}

export default NetworkStatus
