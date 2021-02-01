import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getRPCUrl } from '../config/getConfig'

export const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: getRPCUrl(1),
          30: getRPCUrl(30),
          31: getRPCUrl(31),
          5777: getRPCUrl(5777)
        }
      }
    }
  },
  supportedChains: [1, 30, 31, 5777]
})

export const clearRloginStorage = () => {
  localStorage.removeItem('RLOGIN_ACCESS_TOKEN')
  localStorage.removeItem('RLOGIN_REFRESH_TOKEN')
  localStorage.removeItem('walletconnect')

  Object.keys(localStorage).map((key: string) => {
    if (key.startsWith('DV_ACCESS_TOKEN') || key.startsWith('DV_REFRESH_TOKEN')) {
      localStorage.removeItem(key)
    }
  })
}
