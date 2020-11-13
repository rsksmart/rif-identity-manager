// handle nifty
const providerRPC = (provider: any, args: any) => {
  if (provider.isNiftyWallet) return provider.send(args.method, args.params)
  return provider.request(args)
}

// json rpc methods
export const getAccounts = (provider: any) => providerRPC(provider, { method: 'eth_accounts' })
export const getNetwork = (provider: any) => providerRPC(provider, { method: 'net_version' }).then(parseInt)

export const displayIdentity = (address: string, chainId?: number) => {
  const addr = `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  switch (chainId) {
    case 1: return `did:eth:${addr}`
    case 30: return `did:rsk:${addr}`
    case 31: return `did:rsk:testnet:${addr}`
    default: return addr
  }
}
