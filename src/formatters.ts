/**
 * Creates address and truncates it
 * @param address address for the did
 * @param chainId chainId
 */
export const displayIdentity = (address: string, chainId?: number) => {
  const addr = `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  switch (chainId) {
    case 1: return `did:eth:${addr}`
    case 30: return `did:rsk:${addr}`
    case 31: return `did:rsk:testnet:${addr}`
    default: return addr
  }
}

/**
 * Create Identity
 * @param address address for the did
 * @param chainId chainId
 * @param includeEthr include eth:, required for some did tools
 */
export const createDidFormat = (address: string, chainId: number, includeEthr?: boolean) => {
  switch (chainId) {
    case 1: return `did:${includeEthr ? 'ethr:' : ''}mainnet:${address}`
    case 30: return `did:${includeEthr ? 'ethr:' : ''}rsk:${address}`
    case 31: return `did:${includeEthr ? 'ethr:' : ''}rsk:testnet:${address}`
    case 5777: return `did:${includeEthr ? 'ethr:' : ''}development:${address}`
    default: return address
  }
}

/**
 * Truncates a DID or an Address
 * @param value DID or Address to be truncated
 */
export const truncateAddressDid = (value: string) => {
  if (value.lastIndexOf(':') === -1) {
    return `${value.slice(0, 6)}...${value.slice(value.length - 4)}`
  }

  const lastIndex = value.lastIndexOf(':')
  return `${value.slice(0, lastIndex)}${value.slice(lastIndex, lastIndex + 7)}...${value.slice(value.length - 4)}`
}
