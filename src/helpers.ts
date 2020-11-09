// json rpc methods
export const getAccounts = (provider: any) => provider.request({ method: 'eth_accounts' })
export const getNetwork = (provider: any) => provider.request({ method: 'net_version' }).then(parseInt)
