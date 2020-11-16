import Eth from 'ethjs-query'

export const getNetwork = (provider: any) => new Eth(provider).net_version()
export const getAccounts = (provider: any) => new Eth(provider).accounts()

export const getAccountAndNetwork = (provider: any) =>
  Promise.all([
    getAccounts(provider).then((accounts: string[]) => accounts[0]),
    getNetwork(provider).then((chainId: string) => parseInt(chainId))
  ])
