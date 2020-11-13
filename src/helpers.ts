import Eth from 'ethjs-query'

// json rpc methods
export const getNetwork = (provider: any) => new Eth(provider).net_version()
export const getAccounts = (provider: any) => new Eth(provider).accounts()

export const displayIdentity = (address: string, chainId?: number) => {
  const addr = `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  switch (chainId) {
    case 1: return `did:eth:${addr}`
    case 30: return `did:rsk:${addr}`
    case 31: return `did:rsk:testnet:${addr}`
    default: return addr
  }
}
