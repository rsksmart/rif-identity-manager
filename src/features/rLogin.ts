import { getRPCUrl } from '../config/getConfig'
import { createRLogin } from '@rsksmart/rlogin-essentials'

const rpcUrls = {
  1: getRPCUrl(1)!,
  3: getRPCUrl(3)!,
  4: getRPCUrl(4)!,
  5: getRPCUrl(5)!,
  30: getRPCUrl(30)!,
  31: getRPCUrl(31)!,
  42: getRPCUrl(42)!,
  5777: getRPCUrl(5777)!
}

export const rLogin = createRLogin(rpcUrls)

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
