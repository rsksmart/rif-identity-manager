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
    case 1: return `did:eth:${address}`
    case 30: return `did:${includeEthr ? 'ethr:' : ''}rsk:${address}`
    case 31: return `did:${includeEthr ? 'ethr:' : ''}rsk:testnet:${address}`
    case 5777: return `did:${includeEthr ? 'ethr:' : ''}development:${address}`
    default: return address
  }
}
