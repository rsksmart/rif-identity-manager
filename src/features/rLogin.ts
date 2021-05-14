import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import { getRPCUrl } from '../config/getConfig'

export const rLogin = new RLogin({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: getRPCUrl(1),
          3: getRPCUrl(3),
          4: getRPCUrl(4),
          5: getRPCUrl(5),
          30: getRPCUrl(30),
          31: getRPCUrl(31),
          42: getRPCUrl(42),
          5777: getRPCUrl(5777)
        }
      }
    },
    portis: {
      package: Portis,
      options: {
        id: '26ef5a8d-0226-4e3d-ae69-05707c9a453a',
        network: {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 30
        }
      }
    }
  },
  supportedChains: [1, 3, 4, 5, 30, 31, 42, 5777]
})

export const clearRloginStorage = () => {
  localStorage.removeItem('RLOGIN_ACCESS_TOKEN')
  localStorage.removeItem('RLOGIN_REFRESH_TOKEN')
  localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
  localStorage.removeItem('walletconnect')

  Object.keys(localStorage).map((key: string) => {
    if (key.startsWith('DV_ACCESS_TOKEN') || key.startsWith('DV_REFRESH_TOKEN')) {
      localStorage.removeItem(key)
    }
  })
}
