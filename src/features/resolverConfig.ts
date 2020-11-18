import { getSetting, SETTINGS } from '../config/getConfig'

export const resolverProviderConfig = {
  networks: [
    { name: 'mainnet', registry: getSetting(1, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(1, SETTINGS.RPC_URL) },
    { name: 'rsk', registry: getSetting(30, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(30, SETTINGS.RPC_URL) },
    { name: 'rsk:testnet', registry: getSetting(31, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(31, SETTINGS.RPC_URL) },
    { name: 'development', registry: getSetting(5777, SETTINGS.ETHR_DID_CONTRACT), rpcUrl: getSetting(5777, SETTINGS.RPC_URL) }
  ]
}
