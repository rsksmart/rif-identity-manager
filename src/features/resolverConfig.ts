import { getDIDRegistryAddress, getRPCUrl } from '../config/getConfig'

export const resolverProviderConfig = {
  networks: [
    { name: 'mainnet', registry: getDIDRegistryAddress(1), rpcUrl: getRPCUrl(1) },
    { name: 'rsk', registry: getDIDRegistryAddress(30), rpcUrl: getRPCUrl(30) },
    { name: 'rsk:testnet', registry: getDIDRegistryAddress(31), rpcUrl: getRPCUrl(31) },
    { name: 'development', registry: getDIDRegistryAddress(5777), rpcUrl: getRPCUrl(5777) }
  ]
}
