import Eth from 'ethjs-query'

export const getNetwork = (provider: any) => new Eth(provider).net_version()
export const getAccounts = (provider: any) => new Eth(provider).accounts()
