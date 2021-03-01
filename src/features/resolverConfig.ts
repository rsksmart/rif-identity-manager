import { getDIDRegistryAddress, getRPCUrl } from '../config/getConfig'

const add = (name: string, chainId: number) => ({ name, registry: getDIDRegistryAddress(chainId), rpcUrl: getRPCUrl(chainId) })

export const resolverProviderConfig = {
  networks: [
    add('mainnet', 1),
    add('ropsten', 3),
    add('rinkeby', 4),
    add('goerli', 5),
    add('rsk', 30),
    add('rsk:testnet', 31),
    add('kovan', 31),
    add('development', 5777)
  ]
}
