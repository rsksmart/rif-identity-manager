import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getSetting, SETTINGS } from '../config/getConfig'

export const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: getSetting(1, SETTINGS.RPC_URL),
          30: getSetting(30, SETTINGS.RPC_URL),
          31: getSetting(31, SETTINGS.RPC_URL),
          5777: getSetting(5777, SETTINGS.RPC_URL)
        }
      }
    }
  },
  supportedChains: [1, 30, 31, 5777]
})
