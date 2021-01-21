/* eslint-disable no-unused-vars */
import Eth from 'ethjs-query'

export const getNetwork = (provider: any) => new Eth(provider).net_version()
export const getAccounts = (provider: any) => new Eth(provider).accounts()

export const getAccountAndNetwork = (provider: any) =>
  Promise.all([
    getAccounts(provider).then((accounts: string[]) => accounts[0]),
    getNetwork(provider).then((chainId: string) => parseInt(chainId))
  ])

export interface transactionListenerI { result?: string, error?: string }

export const transactionListener = (provider: any, tx: string, userCallback: any) => {
  const eth = new Eth(provider)

  const checkInterval = setInterval(() =>
    eth.getTransactionReceipt(tx)
      .then((response: any) => {
        if (response) {
          clearInterval(checkInterval)
          return userCallback({
            result: response.transactionHash,
            error: parseInt(response.status) !== 1 ? 'Transaction Recepit Failed' : null
          })
        }
      })
      .catch((err: Error) => userCallback({ error: err.message }))
  , 2000)
}

export enum PROVIDERS {
  METAMASK = 'METAMASK',
  NIFTY = 'NIFTY',
  WALLET_CONNECT = 'WALLET_CONNECT'
}

/**
 * Return the Provider Name. Used to detect DataVault features
 * @param provider web3Provider
 */
export const getProviderName = (provider: any) => {
  if (provider.isNiftyWallet) {
    return PROVIDERS.NIFTY
  }
  if (provider.isMetaMask) {
    return PROVIDERS.METAMASK
  }
  if (provider.wc) {
    return provider.WALLET_CONNECT
  }
}
